"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.getAll = function (req, res, next) {
            _this.model.find({}).then(function (docs) { return res.json(docs); }).catch(function (e) { return e; });
        };
        this.count = function (req, res, next) {
            _this.model.count().then(function (count) {
                res.json(count);
            }).catch(function (e) { return e; });
        };
        this.insert = function (req, res, next) {
            var obj = new _this.model(req.body);
            _this.model.save(obj)
                .then(function (doc) { return res.send(obj); })
                .catch(function (e) { return res.sendStatus(400); }); //to verify duplicated key, still missing verification part
        };
        this.get = function (req, res, next) {
            var id = req.body.id;
            _this.model.findById(id)
                .then(function (doc) { return res.json(doc); })
                .catch(function (e) { return e; });
        };
        this.update = function (req, res, next) {
            var id = req.body.id, obj = req.body.id;
            _this.model.findOneAndUpdate(id, obj)
                .then(function () { return res.sendStatus(200); })
                .catch(function (e) { return e; });
        };
        this.delete = function (req, res, next) {
            var id = req.body.id;
            _this.model.findOneAndRemove(id)
                .then(function () { return res.send(200); })
                .catch(function (e) { return e; });
        };
    }
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=base.js.map