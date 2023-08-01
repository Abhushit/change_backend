
const Response = {
    success: ({ msg = "N/A", status = 200, data,token }) => {
        if(token){
            return {
                success: true,
                status: status || 200,
                message: msg,
                data: data || null,
                token: token
            }
        }else{
            return {
                success: true,
                status: status || 200,
                message: msg,
                data: data || null,
            }
        }
    },
    fail: ({ msg, status = 500 }) => {
        return {
            success: false,
            status: status,
            message: msg,
        }
    }
}

export default Response;