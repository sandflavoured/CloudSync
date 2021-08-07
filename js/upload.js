const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
const files = require("./fsWrap");

class Upload {
    static async createFormData(filepath) {
        let form = new FormData();
        const stream = new Promise((resolve, reject) => {
            resolve(filepath);
        });
        form.append(path.basename(filepath), await stream);
        return form;
    }
    static async uploadfile(formData) {
        axios
            .post("url", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                console.log("uploaded!");
            })
            .catch((err) => {
                console.log(err);
                files.errorWrite("Could not Upload!!}" + filepath + "\n");
            });
    }
}

module.exports = Upload;
