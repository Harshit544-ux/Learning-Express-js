const validator = require("validator");

function validateUser(data) {
    console.log("Validating user data:", data);

    if (!data || typeof data !== 'object') {
        throw new Error("Request body is missing or invalid");
    }

    const mandatoryFields = ['username', 'email', 'password'];

    const isAllowed = mandatoryFields.every((k) =>
        Object.keys(data).includes(k)
    );

    if (!isAllowed) {
        throw new Error("Missing mandatory fields");
    }

    // Email validation
    if (!validator.isEmail(data.email)) {
        throw new Error("Invalid email format");
    }

    // Password validation
    if (
        !validator.isStrongPassword(data.password,
            {
                minLength: 6,
                minNumbers: 0,
                minSymbols: 0,
                minLowercase: 0,
                minUppercase: 0
            }
        )
    ) {
        throw new Error(
            "Password must be at least 6 characters long and contain at least one number"
        );
    }
}

module.exports = validateUser;
