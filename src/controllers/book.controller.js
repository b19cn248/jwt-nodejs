const Book = require('../models/book.model')
class BookController {

    create(req, res, next) {
        const userData = req.body; // Lấy dữ liệu người dùng từ body của request
        userData.userId = req.userId

        console.log(req.body)

        // Validate emai

        Book.create(userData)
            .then(user => {
                res.status(201).json(user); // Trả về thông tin người dùng đã được tạo với mã trạng thái 201 (Created)
            })
            .catch(next);
    }
}

module.exports = new BookController();