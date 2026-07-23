const RESPONSE = {
    SUCCESS: {
        code: 200,
        statusMessage: "Success",
        message: "Everything working as expected",
    },

    REQUIRED: {
        code: 400,
        statusMessage: "Failed",
        message: " is required",
    },

    NOT_FOUND: {
        code: 404,
        statusMessage: "Failed",
        message: " not found",
    },

    UNK_ERR: {
        code: 500,
        statusMessage: "Failed",
        message: "Something went wrong",
    },
    INVALID: {
        code: 300,
        statusMessage: "Failed",
        message: " is Invalid",
    },

    ALREADY_EXISTS: {
        code: 700,
        statusMessage: "Failed",
        message: " is alrdy exists",
    },
};

export default RESPONSE;