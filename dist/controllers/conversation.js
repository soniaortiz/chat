"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var conversationSchema_1 = require("../models/conversationSchema");
var Conversation = /** @class */ (function (_super) {
    __extends(Conversation, _super);
    function Conversation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = conversationSchema_1.ConversationModel;
        return _this;
    }
    return Conversation;
}(base_1.Controller));
exports.Conversation = Conversation;
//# sourceMappingURL=conversation.js.map