const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
const files = require("./fsWrap");

const stream = (filepath) => {
    return new Promise((resolve, reject) => {
        resolve(fs.createReadStream(filepath));
    });
};

class Upload {
    static async createFormData(filepath) {
        let form = new FormData();
        form.append(path.basename(filepath), await stream(filepath));
        return form;
    }
    static async uploadfile(formData, filePath) {
        // console.log(formData);
        const formHeaders = formData.getHeaders();
        const url = "http://localhost:5000/posts/data";
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    ...formHeaders,
                },
            });
            console.log(response);
            console.log("Uploaded!");
        } catch (error) {
            console.log(error);
            files.errorWrite("Could Not Upload!");
        }
    }
}

module.exports = Upload;