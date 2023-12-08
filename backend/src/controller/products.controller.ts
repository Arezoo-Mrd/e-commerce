import { HttpResponse } from './../domain/response';
import { Request, Response } from "express";
import { connection } from "../config/mysql.config";
import { QUERY } from "../query/products.query";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { ProcedureCallPacket, OkPacket, RowDataPacket, ResultSetHeader, FieldPacket } from "mysql2";



type ResultSet = [RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]]

export const getProducts = async (req: Request, res: Response): Promise<Response<HttpResponse[]>> => {
    console.log(`${req.originalUrl} Resquest from ${req.rawHeaders[0]}`)
    try {
        const pool = await connection()
        const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCTS)

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, `everything is ok`, result[0]))
    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'bad request'))
    }
}

export const getProduct = async (req: Request, res: Response): Promise<Response<HttpResponse[]>> => {
    console.log(`${req.originalUrl} Resquest from ${req.rawHeaders[0]}`)
    try {
        const pool = await connection()
        const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCTS, [req.params.productId])
        if ((result[0] as Array<ResultSet>).length > 0) {
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, `everything is ok`, result))
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'product not found'))
        }
    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'bad request'))
    }
}

// TODO start at here

export const createProduct = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.log(`${req.originalUrl} Resquest from ${req.rawHeaders[0]}`)
    let product : HttpResponse = {...req.body}
    try {
        const pool = await connection()
        console.log('%c  Object.values(product)','background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', Object.values(product));
        const result: ResultSet = await pool.query(QUERY.CREATE_PRODUCT, Object.values(product))
        product = {id: (result[0] as ResultSetHeader).insertId, ...req.body}
        return res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, `product created`, product))

    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'bad request'))
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response<HttpResponse[]>> => {
    console.log(`${req.originalUrl} Resquest from ${req.rawHeaders[0]}`)
    let product = {...req.body}
    try {
        const pool = await connection()
        // get product by Id
        const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCT, [req.params.productId])
        if ((result[0] as Array<ResultSet>).length > 0) {
             const newResult: ResultSet = await pool.query(QUERY.UPDATE_PRODUCT, [...Object.values(product), req.params.productId])
             return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, `product updated`, {
                ...product, id:req.params.productId
             }))
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'product not found'))
        }
    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'bad request'))
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response<HttpResponse[]>> => {


    try {
        const pool = await connection()
        // get product by Id
        const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCT, [req.params.productId])
        if ((result[0] as Array<ResultSet>).length > 0) {
             const newResult: ResultSet = await pool.query(QUERY.DELETE_PRODUCT, [req.params.productId])
             return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, `product deleted`))
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'product not found'))
        }
    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'bad request'))
    }
}