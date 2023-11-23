import { Request, Response } from "express";
import { IProduct } from "../interfaces/product";
import { connection } from "../config/mysql.config";
import { QUERY } from "../query/products.query";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { ProcedureCallPacket, OkPacket, RowDataPacket, ResultSetHeader, FieldPacket } from "mysql2";



type ResultSet = [RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]]

export const getProducts = async (req: Request, res: Response): Promise<Response<IProduct[]>> => {
    console.log(`${req.originalUrl} Resquest from ${req.rawHeaders[0]}`)
    try {
        const pool = await connection()
        const result: ResultSet = await pool.query(QUERY.SELECT_PRODUCTS)
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, `everything is ok`, result))
    } catch (error: unknown) {
        console.error(error)
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'bad request'))
    }
}

export const getProduct = async (req: Request, res: Response): Promise<Response<IProduct[]>> => {
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

export const createProduct = async (req: Request, res: Response): Promise<Response<IProduct>> => {
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