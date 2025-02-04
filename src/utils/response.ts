export const successResponse = (data: any, message?: string) => {
    return {
        status: 200,
        statusMessage: 'success',
        data,
        message
    }
};

export const errorResponse = (status: number, statusMessage: string, error: any, message: string) => {
    return {
        status,
        statusMessage,
        error,
        message
    }
}