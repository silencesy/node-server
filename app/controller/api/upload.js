'use strict';
const Controller = require('egg').Controller;
// 文件存储
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
    /**
     * 
     * @param {*} stream  传入的Buffer流
     * @param {*} paths 保存的路径
     * @param {*} multiple 是否多文件
     * @param {*} files 多文件返回
     */
    async upload(stream, paths = "app/public/img", multiple = false, files = []) {
        const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
        const target = path.join(this.config.baseDir, paths, filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
            return !!multiple ? files.push(filename) : filename;
        } catch (err) {
            await sendToWormhole(stream);
            return { code: 422, message: '上传失败，请重试！' }
        }
    };
    // 单文件
    async create() {
        const ctx = this.ctx;
        // 获取流
        const stream = await ctx.getFileStream();
        // 生成文件名
        const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
        // pipe流写入信息
        const target = path.join(this.config.baseDir, 'app/public/img', filename);
        const writeStream = fs.createWriteStream(target);
        try {
            // 保存
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            // 保存失败销毁stream 不然接口会pending到超时
            await sendToWormhole(stream);
            this.ctx.body = { code: 422, message: '上传失败，请重试！' }
            throw err;
        }
        this.ctx.body = {
            data: filename
        };
    };
    // 多文件
    async creates() {
        const ctx = this.ctx;
        // 获取文件流组
        const streams = ctx.multipart();
        let stream;
        // 保存返回的文件信息
        let files = [];
        // 其他form 参数
        let fields = {}
        while ((stream = await streams()) != null) {
            // 检查是否有其他参数 如果有写入 这里做案例 不做处理
            if (stream.length) {
                fields[stream[0]] = stream[1]
            } else {
                // 空文件处理
                if (!stream.filename) {
                    return;
                }
                // 设置文件名称
                const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
                // pipe 设置
                const target = path.join(this.config.baseDir, 'app/public/img', filename);
                const writeStream = fs.createWriteStream(target);
                try {
                    // 保存
                    await awaitWriteStream(stream.pipe(writeStream));
                    // 写入数组
                    files.push({ filename, path: `/img/${filename}` })
                } catch (err) {
                    await sendToWormhole(stream);
                    this.ctx.body = { code: 422, message: '上传失败，请重试！' }
                    throw err;
                }
            }
        }
        this.ctx.body = {
            data: { files, fields }
        };
    }
}

module.exports = UploadController