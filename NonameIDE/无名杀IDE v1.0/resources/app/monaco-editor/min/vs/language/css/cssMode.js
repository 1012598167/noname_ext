/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-css version: 3.7.0(116c3cf36d90a2f11f2ac826d7a80e38a209cacf)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-css/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/language/css/workerManager", ["require", "exports", "./fillers/monaco-editor-core"], (function(e, t, n) {
		"use strict";
		t = t || module.exports;
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WorkerManager = void 0;
		var r = function() {
			function e(e) {
				var t = this;
				this._defaults = e, this._worker = null, this._idleCheckInterval = window.setInterval((function() {
					return t._checkIfIdle()
				}), 3e4), this._lastUsedTime = 0, this._configChangeListener = this._defaults.onDidChange((function() {
					return t._stopWorker()
				}))
			}
			return e.prototype._stopWorker = function() {
				this._worker && (this._worker.dispose(), this._worker = null), this._client = null
			}, e.prototype.dispose = function() {
				clearInterval(this._idleCheckInterval), this._configChangeListener.dispose(), this._stopWorker()
			}, e.prototype._checkIfIdle = function() {
				this._worker && (Date.now() - this._lastUsedTime > 12e4 && this._stopWorker())
			}, e.prototype._getClient = function() {
				return this._lastUsedTime = Date.now(), this._client || (this._worker = n.editor.createWebWorker({
					moduleId: "vs/language/css/cssWorker",
					label: this._defaults.languageId,
					createData: {
						options: this._defaults.options,
						languageId: this._defaults.languageId
					}
				}), this._client = this._worker.getProxy()), this._client
			}, e.prototype.getLanguageServiceWorker = function() {
				for (var e, t = this, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
				return this._getClient().then((function(t) {
					e = t
				})).then((function(e) {
					return t._worker.withSyncedResources(n)
				})).then((function(t) {
					return e
				}))
			}, e
		}();
		t.WorkerManager = r
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/cssScanner", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		var n;
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.Scanner = t.MultiLineStream = t.TokenType = void 0,
			function(e) {
				e[e.Ident = 0] = "Ident", e[e.AtKeyword = 1] = "AtKeyword", e[e.String = 2] = "String", e[e.BadString = 3] =
					"BadString", e[e.UnquotedString = 4] = "UnquotedString", e[e.Hash = 5] = "Hash", e[e.Num = 6] = "Num", e[e.Percentage =
						7] = "Percentage", e[e.Dimension = 8] = "Dimension", e[e.UnicodeRange = 9] = "UnicodeRange", e[e.CDO = 10] =
					"CDO", e[e.CDC = 11] = "CDC", e[e.Colon = 12] = "Colon", e[e.SemiColon = 13] = "SemiColon", e[e.CurlyL = 14] =
					"CurlyL", e[e.CurlyR = 15] = "CurlyR", e[e.ParenthesisL = 16] = "ParenthesisL", e[e.ParenthesisR = 17] =
					"ParenthesisR", e[e.BracketL = 18] = "BracketL", e[e.BracketR = 19] = "BracketR", e[e.Whitespace = 20] =
					"Whitespace", e[e.Includes = 21] = "Includes", e[e.Dashmatch = 22] = "Dashmatch", e[e.SubstringOperator = 23] =
					"SubstringOperator", e[e.PrefixOperator = 24] = "PrefixOperator", e[e.SuffixOperator = 25] = "SuffixOperator", e[
						e.Delim = 26] = "Delim", e[e.EMS = 27] = "EMS", e[e.EXS = 28] = "EXS", e[e.Length = 29] = "Length", e[e.Angle =
						30] = "Angle", e[e.Time = 31] = "Time", e[e.Freq = 32] = "Freq", e[e.Exclamation = 33] = "Exclamation", e[e.Resolution =
						34] = "Resolution", e[e.Comma = 35] = "Comma", e[e.Charset = 36] = "Charset", e[e.EscapedJavaScript = 37] =
					"EscapedJavaScript", e[e.BadEscapedJavaScript = 38] = "BadEscapedJavaScript", e[e.Comment = 39] = "Comment", e[e
						.SingleLineComment = 40] = "SingleLineComment", e[e.EOF = 41] = "EOF", e[e.CustomToken = 42] = "CustomToken"
			}(n = t.TokenType || (t.TokenType = {}));
		var r = function() {
			function e(e) {
				this.source = e, this.len = e.length, this.position = 0
			}
			return e.prototype.substring = function(e, t) {
				return void 0 === t && (t = this.position), this.source.substring(e, t)
			}, e.prototype.eos = function() {
				return this.len <= this.position
			}, e.prototype.pos = function() {
				return this.position
			}, e.prototype.goBackTo = function(e) {
				this.position = e
			}, e.prototype.goBack = function(e) {
				this.position -= e
			}, e.prototype.advance = function(e) {
				this.position += e
			}, e.prototype.nextChar = function() {
				return this.source.charCodeAt(this.position++) || 0
			}, e.prototype.peekChar = function(e) {
				return void 0 === e && (e = 0), this.source.charCodeAt(this.position + e) || 0
			}, e.prototype.lookbackChar = function(e) {
				return void 0 === e && (e = 0), this.source.charCodeAt(this.position - e) || 0
			}, e.prototype.advanceIfChar = function(e) {
				return e === this.source.charCodeAt(this.position) && (this.position++, !0)
			}, e.prototype.advanceIfChars = function(e) {
				if (this.position + e.length > this.source.length) return !1;
				for (var t = 0; t < e.length; t++)
					if (this.source.charCodeAt(this.position + t) !== e[t]) return !1;
				return this.advance(t), !0
			}, e.prototype.advanceWhileChar = function(e) {
				for (var t = this.position; this.position < this.len && e(this.source.charCodeAt(this.position));) this.position++;
				return this.position - t
			}, e
		}();
		t.MultiLineStream = r;
		var i = "a".charCodeAt(0),
			o = "f".charCodeAt(0),
			s = "z".charCodeAt(0),
			a = "A".charCodeAt(0),
			l = "F".charCodeAt(0),
			c = "Z".charCodeAt(0),
			d = "0".charCodeAt(0),
			p = "9".charCodeAt(0),
			h = "~".charCodeAt(0),
			u = "^".charCodeAt(0),
			m = "=".charCodeAt(0),
			f = "|".charCodeAt(0),
			g = "-".charCodeAt(0),
			b = "_".charCodeAt(0),
			y = "%".charCodeAt(0),
			v = "*".charCodeAt(0),
			w = "(".charCodeAt(0),
			x = ")".charCodeAt(0),
			S = "<".charCodeAt(0),
			k = ">".charCodeAt(0),
			C = "@".charCodeAt(0),
			T = "#".charCodeAt(0),
			E = "$".charCodeAt(0),
			F = "\\".charCodeAt(0),
			D = "/".charCodeAt(0),
			R = "\n".charCodeAt(0),
			_ = "\r".charCodeAt(0),
			P = "\f".charCodeAt(0),
			z = '"'.charCodeAt(0),
			I = "'".charCodeAt(0),
			N = " ".charCodeAt(0),
			M = "\t".charCodeAt(0),
			A = ";".charCodeAt(0),
			O = ":".charCodeAt(0),
			W = "{".charCodeAt(0),
			L = "}".charCodeAt(0),
			j = "[".charCodeAt(0),
			U = "]".charCodeAt(0),
			K = ",".charCodeAt(0),
			V = ".".charCodeAt(0),
			q = "!".charCodeAt(0),
			B = {};
		B[A] = n.SemiColon, B[O] = n.Colon, B[W] = n.CurlyL, B[L] = n.CurlyR, B[U] = n.BracketR, B[j] = n.BracketL, B[w] =
			n.ParenthesisL, B[x] = n.ParenthesisR, B[K] = n.Comma;
		var $ = {};
		$.em = n.EMS, $.ex = n.EXS, $.px = n.Length, $.cm = n.Length, $.mm = n.Length, $.in = n.Length, $.pt = n.Length, $.pc =
			n.Length, $.deg = n.Angle, $.rad = n.Angle, $.grad = n.Angle, $.ms = n.Time, $.s = n.Time, $.hz = n.Freq, $.khz =
			n.Freq, $["%"] = n.Percentage, $.fr = n.Percentage, $.dpi = n.Resolution, $.dpcm = n.Resolution;
		var G = function() {
			function e() {
				this.stream = new r(""), this.ignoreComment = !0, this.ignoreWhitespace = !0, this.inURL = !1
			}
			return e.prototype.setSource = function(e) {
				this.stream = new r(e)
			}, e.prototype.finishToken = function(e, t, n) {
				return {
					offset: e,
					len: this.stream.pos() - e,
					type: t,
					text: n || this.stream.substring(e)
				}
			}, e.prototype.substring = function(e, t) {
				return this.stream.substring(e, e + t)
			}, e.prototype.pos = function() {
				return this.stream.pos()
			}, e.prototype.goBackTo = function(e) {
				this.stream.goBackTo(e)
			}, e.prototype.scanUnquotedString = function() {
				var e = this.stream.pos(),
					t = [];
				return this._unquotedString(t) ? this.finishToken(e, n.UnquotedString, t.join("")) : null
			}, e.prototype.scan = function() {
				var e = this.trivia();
				if (null !== e) return e;
				var t = this.stream.pos();
				return this.stream.eos() ? this.finishToken(t, n.EOF) : this.scanNext(t)
			}, e.prototype.scanNext = function(e) {
				if (this.stream.advanceIfChars([S, q, g, g])) return this.finishToken(e, n.CDO);
				if (this.stream.advanceIfChars([g, g, k])) return this.finishToken(e, n.CDC);
				var t = [];
				if (this.ident(t)) return this.finishToken(e, n.Ident, t.join(""));
				if (this.stream.advanceIfChar(C)) {
					if (t = ["@"], this._name(t)) {
						var r = t.join("");
						return "@charset" === r ? this.finishToken(e, n.Charset, r) : this.finishToken(e, n.AtKeyword, r)
					}
					return this.finishToken(e, n.Delim)
				}
				if (this.stream.advanceIfChar(T)) return t = ["#"], this._name(t) ? this.finishToken(e, n.Hash, t.join("")) :
					this.finishToken(e, n.Delim);
				if (this.stream.advanceIfChar(q)) return this.finishToken(e, n.Exclamation);
				if (this._number()) {
					var i = this.stream.pos();
					if (t = [this.stream.substring(e, i)], this.stream.advanceIfChar(y)) return this.finishToken(e, n.Percentage);
					if (this.ident(t)) {
						var o = this.stream.substring(i).toLowerCase(),
							s = $[o];
						return void 0 !== s ? this.finishToken(e, s, t.join("")) : this.finishToken(e, n.Dimension, t.join(""))
					}
					return this.finishToken(e, n.Num)
				}
				t = [];
				var a = this._string(t);
				return null !== a ? this.finishToken(e, a, t.join("")) : void 0 !== (a = B[this.stream.peekChar()]) ? (this.stream
						.advance(1), this.finishToken(e, a)) : this.stream.peekChar(0) === h && this.stream.peekChar(1) === m ? (this
						.stream.advance(2), this.finishToken(e, n.Includes)) : this.stream.peekChar(0) === f && this.stream.peekChar(
						1) === m ? (this.stream.advance(2), this.finishToken(e, n.Dashmatch)) : this.stream.peekChar(0) === v && this
					.stream.peekChar(1) === m ? (this.stream.advance(2), this.finishToken(e, n.SubstringOperator)) : this.stream.peekChar(
						0) === u && this.stream.peekChar(1) === m ? (this.stream.advance(2), this.finishToken(e, n.PrefixOperator)) :
					this.stream.peekChar(0) === E && this.stream.peekChar(1) === m ? (this.stream.advance(2), this.finishToken(e,
						n.SuffixOperator)) : (this.stream.nextChar(), this.finishToken(e, n.Delim))
			}, e.prototype.trivia = function() {
				for (;;) {
					var e = this.stream.pos();
					if (this._whitespace()) {
						if (!this.ignoreWhitespace) return this.finishToken(e, n.Whitespace)
					} else {
						if (!this.comment()) return null;
						if (!this.ignoreComment) return this.finishToken(e, n.Comment)
					}
				}
			}, e.prototype.comment = function() {
				if (this.stream.advanceIfChars([D, v])) {
					var e = !1,
						t = !1;
					return this.stream.advanceWhileChar((function(n) {
						return t && n === D ? (e = !0, !1) : (t = n === v, !0)
					})), e && this.stream.advance(1), !0
				}
				return !1
			}, e.prototype._number = function() {
				var e, t = 0;
				return this.stream.peekChar() === V && (t = 1), (e = this.stream.peekChar(t)) >= d && e <= p && (this.stream.advance(
					t + 1), this.stream.advanceWhileChar((function(e) {
					return e >= d && e <= p || 0 === t && e === V
				})), !0)
			}, e.prototype._newline = function(e) {
				var t = this.stream.peekChar();
				switch (t) {
					case _:
					case P:
					case R:
						return this.stream.advance(1), e.push(String.fromCharCode(t)), t === _ && this.stream.advanceIfChar(R) && e.push(
							"\n"), !0
				}
				return !1
			}, e.prototype._escape = function(e, t) {
				var n = this.stream.peekChar();
				if (n === F) {
					this.stream.advance(1), n = this.stream.peekChar();
					for (var r = 0; r < 6 && (n >= d && n <= p || n >= i && n <= o || n >= a && n <= l);) this.stream.advance(1),
						n = this.stream.peekChar(), r++;
					if (r > 0) {
						try {
							var s = parseInt(this.stream.substring(this.stream.pos() - r), 16);
							s && e.push(String.fromCharCode(s))
						} catch (e) {}
						return n === N || n === M ? this.stream.advance(1) : this._newline([]), !0
					}
					if (n !== _ && n !== P && n !== R) return this.stream.advance(1), e.push(String.fromCharCode(n)), !0;
					if (t) return this._newline(e)
				}
				return !1
			}, e.prototype._stringChar = function(e, t) {
				var n = this.stream.peekChar();
				return 0 !== n && n !== e && n !== F && n !== _ && n !== P && n !== R && (this.stream.advance(1), t.push(String
					.fromCharCode(n)), !0)
			}, e.prototype._string = function(e) {
				if (this.stream.peekChar() === I || this.stream.peekChar() === z) {
					var t = this.stream.nextChar();
					for (e.push(String.fromCharCode(t)); this._stringChar(t, e) || this._escape(e, !0););
					return this.stream.peekChar() === t ? (this.stream.nextChar(), e.push(String.fromCharCode(t)), n.String) : n.BadString
				}
				return null
			}, e.prototype._unquotedChar = function(e) {
				var t = this.stream.peekChar();
				return 0 !== t && t !== F && t !== I && t !== z && t !== w && t !== x && t !== N && t !== M && t !== R && t !==
					P && t !== _ && (this.stream.advance(1), e.push(String.fromCharCode(t)), !0)
			}, e.prototype._unquotedString = function(e) {
				for (var t = !1; this._unquotedChar(e) || this._escape(e);) t = !0;
				return t
			}, e.prototype._whitespace = function() {
				return this.stream.advanceWhileChar((function(e) {
					return e === N || e === M || e === R || e === P || e === _
				})) > 0
			}, e.prototype._name = function(e) {
				for (var t = !1; this._identChar(e) || this._escape(e);) t = !0;
				return t
			}, e.prototype.ident = function(e) {
				var t = this.stream.pos();
				if (this._minus(e) && this._minus(e)) {
					if (this._identFirstChar(e) || this._escape(e)) {
						for (; this._identChar(e) || this._escape(e););
						return !0
					}
				} else if (this._identFirstChar(e) || this._escape(e)) {
					for (; this._identChar(e) || this._escape(e););
					return !0
				}
				return this.stream.goBackTo(t), !1
			}, e.prototype._identFirstChar = function(e) {
				var t = this.stream.peekChar();
				return (t === b || t >= i && t <= s || t >= a && t <= c || t >= 128 && t <= 65535) && (this.stream.advance(1),
					e.push(String.fromCharCode(t)), !0)
			}, e.prototype._minus = function(e) {
				var t = this.stream.peekChar();
				return t === g && (this.stream.advance(1), e.push(String.fromCharCode(t)), !0)
			}, e.prototype._identChar = function(e) {
				var t = this.stream.peekChar();
				return (t === b || t === g || t >= i && t <= s || t >= a && t <= c || t >= d && t <= p || t >= 128 && t <=
					65535) && (this.stream.advance(1), e.push(String.fromCharCode(t)), !0)
			}, e
		}();
		t.Scanner = G
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/utils/strings", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.trim = t.getLimitedString = t.difference = t.endsWith = t.startsWith = void 0, t.startsWith = function(e, t) {
			if (e.length < t.length) return !1;
			for (var n = 0; n < t.length; n++)
				if (e[n] !== t[n]) return !1;
			return !0
		}, t.endsWith = function(e, t) {
			var n = e.length - t.length;
			return n > 0 ? e.lastIndexOf(t) === n : 0 === n && e === t
		}, t.difference = function(e, t, n) {
			void 0 === n && (n = 4);
			var r = Math.abs(e.length - t.length);
			if (r > n) return 0;
			var i, o, s = [],
				a = [];
			for (i = 0; i < t.length + 1; ++i) a.push(0);
			for (i = 0; i < e.length + 1; ++i) s.push(a);
			for (i = 1; i < e.length + 1; ++i)
				for (o = 1; o < t.length + 1; ++o) e[i - 1] === t[o - 1] ? s[i][o] = s[i - 1][o - 1] + 1 : s[i][o] = Math.max(s[
					i - 1][o], s[i][o - 1]);
			return s[e.length][t.length] - Math.sqrt(r)
		}, t.getLimitedString = function(e, t) {
			return void 0 === t && (t = !0), e ? e.length < 140 ? e : e.slice(0, 140) + (t ? "…" : "") : ""
		}, t.trim = function(e, t) {
			var n = t.exec(e);
			return n && n[0].length ? e.substr(0, e.length - n[0].length) : e
		}
	}));
var __extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/cssNodes", ["require",
		"exports", "../utils/strings"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ParseErrorCollector = t.Marker = t.Level = t.Module = t.GuardCondition = t.LessGuard = t.ListEntry = t.UnknownAtRule =
		t.MixinDeclaration = t.MixinReference = t.MixinContentDeclaration = t.MixinContentReference = t.ExtendsReference =
		t.Variable = t.Interpolation = t.VariableDeclaration = t.NumericValue = t.HexColorValue = t.Operator = t.AttributeSelector =
		t.Term = t.BinaryExpression = t.Expression = t.PageBoxMarginBox = t.Page = t.SupportsCondition = t.MediaQuery = t.Medialist =
		t.Document = t.Supports = t.Media = t.Namespace = t.ForwardVisibility = t.Forward = t.ModuleConfiguration = t.Use =
		t.Import = t.KeyframeSelector = t.Keyframe = t.NestedProperties = t.FontFace = t.ViewPort = t.FunctionDeclaration =
		t.ElseStatement = t.WhileStatement = t.EachStatement = t.ForStatement = t.IfStatement = t.FunctionArgument = t.FunctionParameter =
		t.Function = t.Invocation = t.Property = t.CustomPropertyDeclaration = t.Declaration = t.CustomPropertySet = t.AbstractDeclaration =
		t.AtApplyRule = t.SimpleSelector = t.Selector = t.RuleSet = t.BodyDeclaration = t.Declarations = t.Stylesheet = t.Identifier =
		t.Nodelist = t.Node = t.getParentDeclaration = t.getNodePath = t.getNodeAtOffset = t.ReferenceType = t.NodeType =
		void 0;
	var n, r = e("../utils/strings");

	function i(e, t) {
		var n = null;
		return !e || t < e.offset || t > e.end ? null : (e.accept((function(e) {
			return -1 === e.offset && -1 === e.length || e.offset <= t && e.end >= t && (n ? e.length <= n.length && (n =
				e) : n = e, !0)
		})), n)
	}! function(e) {
		e[e.Undefined = 0] = "Undefined", e[e.Identifier = 1] = "Identifier", e[e.Stylesheet = 2] = "Stylesheet", e[e.Ruleset =
				3] = "Ruleset", e[e.Selector = 4] = "Selector", e[e.SimpleSelector = 5] = "SimpleSelector", e[e.SelectorInterpolation =
				6] = "SelectorInterpolation", e[e.SelectorCombinator = 7] = "SelectorCombinator", e[e.SelectorCombinatorParent =
				8] = "SelectorCombinatorParent", e[e.SelectorCombinatorSibling = 9] = "SelectorCombinatorSibling", e[e.SelectorCombinatorAllSiblings =
				10] = "SelectorCombinatorAllSiblings", e[e.SelectorCombinatorShadowPiercingDescendant = 11] =
			"SelectorCombinatorShadowPiercingDescendant", e[e.Page = 12] = "Page", e[e.PageBoxMarginBox = 13] =
			"PageBoxMarginBox", e[e.ClassSelector = 14] = "ClassSelector", e[e.IdentifierSelector = 15] = "IdentifierSelector",
			e[e.ElementNameSelector = 16] = "ElementNameSelector", e[e.PseudoSelector = 17] = "PseudoSelector", e[e.AttributeSelector =
				18] = "AttributeSelector", e[e.Declaration = 19] = "Declaration", e[e.Declarations = 20] = "Declarations", e[e.Property =
				21] = "Property", e[e.Expression = 22] = "Expression", e[e.BinaryExpression = 23] = "BinaryExpression", e[e.Term =
				24] = "Term", e[e.Operator = 25] = "Operator", e[e.Value = 26] = "Value", e[e.StringLiteral = 27] =
			"StringLiteral", e[e.URILiteral = 28] = "URILiteral", e[e.EscapedValue = 29] = "EscapedValue", e[e.Function = 30] =
			"Function", e[e.NumericValue = 31] = "NumericValue", e[e.HexColorValue = 32] = "HexColorValue", e[e.MixinDeclaration =
				33] = "MixinDeclaration", e[e.MixinReference = 34] = "MixinReference", e[e.VariableName = 35] = "VariableName", e[
				e.VariableDeclaration = 36] = "VariableDeclaration", e[e.Prio = 37] = "Prio", e[e.Interpolation = 38] =
			"Interpolation", e[e.NestedProperties = 39] = "NestedProperties", e[e.ExtendsReference = 40] = "ExtendsReference",
			e[e.SelectorPlaceholder = 41] = "SelectorPlaceholder", e[e.Debug = 42] = "Debug", e[e.If = 43] = "If", e[e.Else =
				44] = "Else", e[e.For = 45] = "For", e[e.Each = 46] = "Each", e[e.While = 47] = "While", e[e.MixinContentReference =
				48] = "MixinContentReference", e[e.MixinContentDeclaration = 49] = "MixinContentDeclaration", e[e.Media = 50] =
			"Media", e[e.Keyframe = 51] = "Keyframe", e[e.FontFace = 52] = "FontFace", e[e.Import = 53] = "Import", e[e.Namespace =
				54] = "Namespace", e[e.Invocation = 55] = "Invocation", e[e.FunctionDeclaration = 56] = "FunctionDeclaration", e[
				e.ReturnStatement = 57] = "ReturnStatement", e[e.MediaQuery = 58] = "MediaQuery", e[e.FunctionParameter = 59] =
			"FunctionParameter", e[e.FunctionArgument = 60] = "FunctionArgument", e[e.KeyframeSelector = 61] =
			"KeyframeSelector", e[e.ViewPort = 62] = "ViewPort", e[e.Document = 63] = "Document", e[e.AtApplyRule = 64] =
			"AtApplyRule", e[e.CustomPropertyDeclaration = 65] = "CustomPropertyDeclaration", e[e.CustomPropertySet = 66] =
			"CustomPropertySet", e[e.ListEntry = 67] = "ListEntry", e[e.Supports = 68] = "Supports", e[e.SupportsCondition =
				69] = "SupportsCondition", e[e.NamespacePrefix = 70] = "NamespacePrefix", e[e.GridLine = 71] = "GridLine", e[e.Plugin =
				72] = "Plugin", e[e.UnknownAtRule = 73] = "UnknownAtRule", e[e.Use = 74] = "Use", e[e.ModuleConfiguration = 75] =
			"ModuleConfiguration", e[e.Forward = 76] = "Forward", e[e.ForwardVisibility = 77] = "ForwardVisibility", e[e.Module =
				78] = "Module"
	}(n = t.NodeType || (t.NodeType = {})),
	function(e) {
		e[e.Mixin = 0] = "Mixin", e[e.Rule = 1] = "Rule", e[e.Variable = 2] = "Variable", e[e.Function = 3] = "Function", e[
				e.Keyframe = 4] = "Keyframe", e[e.Unknown = 5] = "Unknown", e[e.Module = 6] = "Module", e[e.Forward = 7] =
			"Forward", e[e.ForwardVisibility = 8] = "ForwardVisibility"
	}(t.ReferenceType || (t.ReferenceType = {})), t.getNodeAtOffset = i, t.getNodePath = function(e, t) {
		for (var n = i(e, t), r = []; n;) r.unshift(n), n = n.parent;
		return r
	}, t.getParentDeclaration = function(e) {
		var t = e.findParent(n.Declaration),
			r = t && t.getValue();
		return r && r.encloses(e) ? t : null
	};
	var o = function() {
		function e(e, t, n) {
			void 0 === e && (e = -1), void 0 === t && (t = -1), this.parent = null, this.offset = e, this.length = t, n && (
				this.nodeType = n)
		}
		return Object.defineProperty(e.prototype, "end", {
			get: function() {
				return this.offset + this.length
			},
			enumerable: !1,
			configurable: !0
		}), Object.defineProperty(e.prototype, "type", {
			get: function() {
				return this.nodeType || n.Undefined
			},
			set: function(e) {
				this.nodeType = e
			},
			enumerable: !1,
			configurable: !0
		}), e.prototype.getTextProvider = function() {
			for (var e = this; e && !e.textProvider;) e = e.parent;
			return e ? e.textProvider : function() {
				return "unknown"
			}
		}, e.prototype.getText = function() {
			return this.getTextProvider()(this.offset, this.length)
		}, e.prototype.matches = function(e) {
			return this.length === e.length && this.getTextProvider()(this.offset, this.length) === e
		}, e.prototype.startsWith = function(e) {
			return this.length >= e.length && this.getTextProvider()(this.offset, e.length) === e
		}, e.prototype.endsWith = function(e) {
			return this.length >= e.length && this.getTextProvider()(this.end - e.length, e.length) === e
		}, e.prototype.accept = function(e) {
			if (e(this) && this.children)
				for (var t = 0, n = this.children; t < n.length; t++) {
					n[t].accept(e)
				}
		}, e.prototype.acceptVisitor = function(e) {
			this.accept(e.visitNode.bind(e))
		}, e.prototype.adoptChild = function(e, t) {
			if (void 0 === t && (t = -1), e.parent && e.parent.children) {
				var n = e.parent.children.indexOf(e);
				n >= 0 && e.parent.children.splice(n, 1)
			}
			e.parent = this;
			var r = this.children;
			return r || (r = this.children = []), -1 !== t ? r.splice(t, 0, e) : r.push(e), e
		}, e.prototype.attachTo = function(e, t) {
			return void 0 === t && (t = -1), e && e.adoptChild(this, t), this
		}, e.prototype.collectIssues = function(e) {
			this.issues && e.push.apply(e, this.issues)
		}, e.prototype.addIssue = function(e) {
			this.issues || (this.issues = []), this.issues.push(e)
		}, e.prototype.hasIssue = function(e) {
			return Array.isArray(this.issues) && this.issues.some((function(t) {
				return t.getRule() === e
			}))
		}, e.prototype.isErroneous = function(e) {
			return void 0 === e && (e = !1), !!(this.issues && this.issues.length > 0) || e && Array.isArray(this.children) &&
				this.children.some((function(e) {
					return e.isErroneous(!0)
				}))
		}, e.prototype.setNode = function(e, t, n) {
			return void 0 === n && (n = -1), !!t && (t.attachTo(this, n), this[e] = t, !0)
		}, e.prototype.addChild = function(e) {
			return !!e && (this.children || (this.children = []), e.attachTo(this), this.updateOffsetAndLength(e), !0)
		}, e.prototype.updateOffsetAndLength = function(e) {
			(e.offset < this.offset || -1 === this.offset) && (this.offset = e.offset);
			var t = e.end;
			(t > this.end || -1 === this.length) && (this.length = t - this.offset)
		}, e.prototype.hasChildren = function() {
			return !!this.children && this.children.length > 0
		}, e.prototype.getChildren = function() {
			return this.children ? this.children.slice(0) : []
		}, e.prototype.getChild = function(e) {
			return this.children && e < this.children.length ? this.children[e] : null
		}, e.prototype.addChildren = function(e) {
			for (var t = 0, n = e; t < n.length; t++) {
				var r = n[t];
				this.addChild(r)
			}
		}, e.prototype.findFirstChildBeforeOffset = function(e) {
			if (this.children)
				for (var t = null, n = this.children.length - 1; n >= 0; n--)
					if ((t = this.children[n]).offset <= e) return t;
			return null
		}, e.prototype.findChildAtOffset = function(e, t) {
			var n = this.findFirstChildBeforeOffset(e);
			return n && n.end >= e ? t && n.findChildAtOffset(e, !0) || n : null
		}, e.prototype.encloses = function(e) {
			return this.offset <= e.offset && this.offset + this.length >= e.offset + e.length
		}, e.prototype.getParent = function() {
			for (var e = this.parent; e instanceof s;) e = e.parent;
			return e
		}, e.prototype.findParent = function(e) {
			for (var t = this; t && t.type !== e;) t = t.parent;
			return t
		}, e.prototype.findAParent = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			for (var n = this; n && !e.some((function(e) {
					return n.type === e
				}));) n = n.parent;
			return n
		}, e.prototype.setData = function(e, t) {
			this.options || (this.options = {}), this.options[e] = t
		}, e.prototype.getData = function(e) {
			return this.options && this.options.hasOwnProperty(e) ? this.options[e] : null
		}, e
	}();
	t.Node = o;
	var s = function(e) {
		function t(t, n) {
			void 0 === n && (n = -1);
			var r = e.call(this, -1, -1) || this;
			return r.attachTo(t, n), r.offset = -1, r.length = -1, r
		}
		return __extends(t, e), t
	}(o);
	t.Nodelist = s;
	var a = function(e) {
		function t(t, n) {
			var r = e.call(this, t, n) || this;
			return r.isCustomProperty = !1, r
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Identifier
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.containsInterpolation = function() {
			return this.hasChildren()
		}, t
	}(o);
	t.Identifier = a;
	var l = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Stylesheet
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Stylesheet = l;
	var c = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Declarations
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Declarations = c;
	var d = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), t.prototype.getDeclarations = function() {
			return this.declarations
		}, t.prototype.setDeclarations = function(e) {
			return this.setNode("declarations", e)
		}, t
	}(o);
	t.BodyDeclaration = d;
	var p = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Ruleset
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getSelectors = function() {
			return this.selectors || (this.selectors = new s(this)), this.selectors
		}, t.prototype.isNested = function() {
			return !!this.parent && null !== this.parent.findParent(n.Declarations)
		}, t
	}(d);
	t.RuleSet = p;
	var h = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Selector
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Selector = h;
	var u = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.SimpleSelector
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.SimpleSelector = u;
	var m = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.AtApplyRule
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t
	}(o);
	t.AtApplyRule = m;
	var f = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), t
	}(o);
	t.AbstractDeclaration = f;
	var g = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.CustomPropertySet
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.CustomPropertySet = g;
	var b = function(e) {
		function t(t, n) {
			var r = e.call(this, t, n) || this;
			return r.property = null, r
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Declaration
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setProperty = function(e) {
			return this.setNode("property", e)
		}, t.prototype.getProperty = function() {
			return this.property
		}, t.prototype.getFullPropertyName = function() {
			var e = this.property ? this.property.getName() : "unknown";
			if (this.parent instanceof c && this.parent.getParent() instanceof z) {
				var n = this.parent.getParent().getParent();
				if (n instanceof t) return n.getFullPropertyName() + e
			}
			return e
		}, t.prototype.getNonPrefixedPropertyName = function() {
			var e = this.getFullPropertyName();
			if (e && "-" === e.charAt(0)) {
				var t = e.indexOf("-", 1);
				if (-1 !== t) return e.substring(t + 1)
			}
			return e
		}, t.prototype.setValue = function(e) {
			return this.setNode("value", e)
		}, t.prototype.getValue = function() {
			return this.value
		}, t.prototype.setNestedProperties = function(e) {
			return this.setNode("nestedProperties", e)
		}, t.prototype.getNestedProperties = function() {
			return this.nestedProperties
		}, t
	}(f);
	t.Declaration = b;
	var y = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.CustomPropertyDeclaration
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setPropertySet = function(e) {
			return this.setNode("propertySet", e)
		}, t.prototype.getPropertySet = function() {
			return this.propertySet
		}, t
	}(b);
	t.CustomPropertyDeclaration = y;
	var v = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Property
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return r.trim(this.getText(), /[_\+]+$/)
		}, t.prototype.isCustomProperty = function() {
			return !!this.identifier && this.identifier.isCustomProperty
		}, t
	}(o);
	t.Property = v;
	var w = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Invocation
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getArguments = function() {
			return this.arguments || (this.arguments = new s(this)), this.arguments
		}, t
	}(o);
	t.Invocation = w;
	var x = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Function
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t
	}(w);
	t.Function = x;
	var S = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.FunctionParameter
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t.prototype.setDefaultValue = function(e) {
			return this.setNode("defaultValue", e, 0)
		}, t.prototype.getDefaultValue = function() {
			return this.defaultValue
		}, t
	}(o);
	t.FunctionParameter = S;
	var k = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.FunctionArgument
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t.prototype.setValue = function(e) {
			return this.setNode("value", e, 0)
		}, t.prototype.getValue = function() {
			return this.value
		}, t
	}(o);
	t.FunctionArgument = k;
	var C = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.If
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setExpression = function(e) {
			return this.setNode("expression", e, 0)
		}, t.prototype.setElseClause = function(e) {
			return this.setNode("elseClause", e)
		}, t
	}(d);
	t.IfStatement = C;
	var T = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.For
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setVariable = function(e) {
			return this.setNode("variable", e, 0)
		}, t
	}(d);
	t.ForStatement = T;
	var E = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Each
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getVariables = function() {
			return this.variables || (this.variables = new s(this)), this.variables
		}, t
	}(d);
	t.EachStatement = E;
	var F = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.While
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.WhileStatement = F;
	var D = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Else
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.ElseStatement = D;
	var R = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.FunctionDeclaration
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t.prototype.getParameters = function() {
			return this.parameters || (this.parameters = new s(this)), this.parameters
		}, t
	}(d);
	t.FunctionDeclaration = R;
	var _ = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.ViewPort
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.ViewPort = _;
	var P = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.FontFace
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.FontFace = P;
	var z = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.NestedProperties
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.NestedProperties = z;
	var I = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Keyframe
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setKeyword = function(e) {
			return this.setNode("keyword", e, 0)
		}, t.prototype.getKeyword = function() {
			return this.keyword
		}, t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t
	}(d);
	t.Keyframe = I;
	var N = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.KeyframeSelector
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.KeyframeSelector = N;
	var M = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Import
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setMedialist = function(e) {
			return !!e && (e.attachTo(this), !0)
		}, t
	}(o);
	t.Import = M;
	var A = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Use
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getParameters = function() {
			return this.parameters || (this.parameters = new s(this)), this.parameters
		}, t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t
	}(o);
	t.Use = A;
	var O = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.ModuleConfiguration
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t.prototype.setValue = function(e) {
			return this.setNode("value", e, 0)
		}, t.prototype.getValue = function() {
			return this.value
		}, t
	}(o);
	t.ModuleConfiguration = O;
	var W = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Forward
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getMembers = function() {
			return this.members || (this.members = new s(this)), this.members
		}, t.prototype.getParameters = function() {
			return this.parameters || (this.parameters = new s(this)), this.parameters
		}, t
	}(o);
	t.Forward = W;
	var L = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.ForwardVisibility
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t
	}(o);
	t.ForwardVisibility = L;
	var j = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Namespace
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Namespace = j;
	var U = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Media
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.Media = U;
	var K = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Supports
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.Supports = K;
	var V = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Document
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.Document = V;
	var q = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), t.prototype.getMediums = function() {
			return this.mediums || (this.mediums = new s(this)), this.mediums
		}, t
	}(o);
	t.Medialist = q;
	var B = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.MediaQuery
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.MediaQuery = B;
	var $ = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.SupportsCondition
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.SupportsCondition = $;
	var G = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Page
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.Page = G;
	var H = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.PageBoxMarginBox
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(d);
	t.PageBoxMarginBox = H;
	var J = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Expression
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Expression = J;
	var X = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.BinaryExpression
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setLeft = function(e) {
			return this.setNode("left", e)
		}, t.prototype.getLeft = function() {
			return this.left
		}, t.prototype.setRight = function(e) {
			return this.setNode("right", e)
		}, t.prototype.getRight = function() {
			return this.right
		}, t.prototype.setOperator = function(e) {
			return this.setNode("operator", e)
		}, t.prototype.getOperator = function() {
			return this.operator
		}, t
	}(o);
	t.BinaryExpression = X;
	var Y = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Term
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setOperator = function(e) {
			return this.setNode("operator", e)
		}, t.prototype.getOperator = function() {
			return this.operator
		}, t.prototype.setExpression = function(e) {
			return this.setNode("expression", e)
		}, t.prototype.getExpression = function() {
			return this.expression
		}, t
	}(o);
	t.Term = Y;
	var Z = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.AttributeSelector
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setNamespacePrefix = function(e) {
			return this.setNode("namespacePrefix", e)
		}, t.prototype.getNamespacePrefix = function() {
			return this.namespacePrefix
		}, t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.setOperator = function(e) {
			return this.setNode("operator", e)
		}, t.prototype.getOperator = function() {
			return this.operator
		}, t.prototype.setValue = function(e) {
			return this.setNode("value", e)
		}, t.prototype.getValue = function() {
			return this.value
		}, t
	}(o);
	t.AttributeSelector = Z;
	var Q = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Operator
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Operator = Q;
	var ee = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.HexColorValue
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.HexColorValue = ee;
	var te = ".".charCodeAt(0),
		ne = "0".charCodeAt(0),
		re = "9".charCodeAt(0),
		ie = function(e) {
			function t(t, n) {
				return e.call(this, t, n) || this
			}
			return __extends(t, e), Object.defineProperty(t.prototype, "type", {
				get: function() {
					return n.NumericValue
				},
				enumerable: !1,
				configurable: !0
			}), t.prototype.getValue = function() {
				for (var e, t = this.getText(), n = 0, r = 0, i = t.length; r < i && (e = t.charCodeAt(r), ne <= e && e <= re ||
						e === te); r++) n += 1;
				return {
					value: t.substring(0, n),
					unit: n < t.length ? t.substring(n) : void 0
				}
			}, t
		}(o);
	t.NumericValue = ie;
	var oe = function(e) {
		function t(t, n) {
			var r = e.call(this, t, n) || this;
			return r.variable = null, r.value = null, r.needsSemicolon = !0, r
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.VariableDeclaration
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setVariable = function(e) {
			return !!e && (e.attachTo(this), this.variable = e, !0)
		}, t.prototype.getVariable = function() {
			return this.variable
		}, t.prototype.getName = function() {
			return this.variable ? this.variable.getName() : ""
		}, t.prototype.setValue = function(e) {
			return !!e && (e.attachTo(this), this.value = e, !0)
		}, t.prototype.getValue = function() {
			return this.value
		}, t
	}(f);
	t.VariableDeclaration = oe;
	var se = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Interpolation
			},
			enumerable: !1,
			configurable: !0
		}), t
	}(o);
	t.Interpolation = se;
	var ae = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.VariableName
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getName = function() {
			return this.getText()
		}, t
	}(o);
	t.Variable = ae;
	var le = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.ExtendsReference
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getSelectors = function() {
			return this.selectors || (this.selectors = new s(this)), this.selectors
		}, t
	}(o);
	t.ExtendsReference = le;
	var ce = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.MixinContentReference
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getArguments = function() {
			return this.arguments || (this.arguments = new s(this)), this.arguments
		}, t
	}(o);
	t.MixinContentReference = ce;
	var de = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.MixinContentReference
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getParameters = function() {
			return this.parameters || (this.parameters = new s(this)), this.parameters
		}, t
	}(d);
	t.MixinContentDeclaration = de;
	var pe = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.MixinReference
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.getNamespaces = function() {
			return this.namespaces || (this.namespaces = new s(this)), this.namespaces
		}, t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t.prototype.getArguments = function() {
			return this.arguments || (this.arguments = new s(this)), this.arguments
		}, t.prototype.setContent = function(e) {
			return this.setNode("content", e)
		}, t.prototype.getContent = function() {
			return this.content
		}, t
	}(o);
	t.MixinReference = pe;
	var he = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.MixinDeclaration
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t.prototype.getName = function() {
			return this.identifier ? this.identifier.getText() : ""
		}, t.prototype.getParameters = function() {
			return this.parameters || (this.parameters = new s(this)), this.parameters
		}, t.prototype.setGuard = function(e) {
			return e && (e.attachTo(this), this.guard = e), !1
		}, t
	}(d);
	t.MixinDeclaration = he;
	var ue = function(e) {
		function t(t, n) {
			return e.call(this, t, n) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.UnknownAtRule
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setAtRuleName = function(e) {
			this.atRuleName = e
		}, t.prototype.getAtRuleName = function() {
			return this.atRuleName
		}, t
	}(d);
	t.UnknownAtRule = ue;
	var me = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.ListEntry
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setKey = function(e) {
			return this.setNode("key", e, 0)
		}, t.prototype.setValue = function(e) {
			return this.setNode("value", e, 1)
		}, t
	}(o);
	t.ListEntry = me;
	var fe = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), t.prototype.getConditions = function() {
			return this.conditions || (this.conditions = new s(this)), this.conditions
		}, t
	}(o);
	t.LessGuard = fe;
	var ge = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), t.prototype.setVariable = function(e) {
			return this.setNode("variable", e)
		}, t
	}(o);
	t.GuardCondition = ge;
	var be = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), Object.defineProperty(t.prototype, "type", {
			get: function() {
				return n.Module
			},
			enumerable: !1,
			configurable: !0
		}), t.prototype.setIdentifier = function(e) {
			return this.setNode("identifier", e, 0)
		}, t.prototype.getIdentifier = function() {
			return this.identifier
		}, t
	}(o);
	t.Module = be,
		function(e) {
			e[e.Ignore = 1] = "Ignore", e[e.Warning = 2] = "Warning", e[e.Error = 4] = "Error"
		}(t.Level || (t.Level = {}));
	var ye = function() {
		function e(e, t, n, r, i, o) {
			void 0 === i && (i = e.offset), void 0 === o && (o = e.length), this.node = e, this.rule = t, this.level = n,
				this.message = r || t.message, this.offset = i, this.length = o
		}
		return e.prototype.getRule = function() {
			return this.rule
		}, e.prototype.getLevel = function() {
			return this.level
		}, e.prototype.getOffset = function() {
			return this.offset
		}, e.prototype.getLength = function() {
			return this.length
		}, e.prototype.getNode = function() {
			return this.node
		}, e.prototype.getMessage = function() {
			return this.message
		}, e
	}();
	t.Marker = ye;
	var ve = function() {
		function e() {
			this.entries = []
		}
		return e.entries = function(t) {
			var n = new e;
			return t.acceptVisitor(n), n.entries
		}, e.prototype.visitNode = function(e) {
			return e.isErroneous() && e.collectIssues(this.entries), !0
		}, e
	}();
	t.ParseErrorCollector = ve
})), define("vscode-nls/vscode-nls", ["require", "exports"], (function(e, t) {
		"use strict";

		function n(e, t) {
			return 0 === t.length ? e : e.replace(/\{(\d+)\}/g, (function(e, n) {
				var r = n[0];
				return void 0 !== t[r] ? t[r] : e
			}))
		}

		function r(e, t) {
			for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
			return n(t, r)
		}

		function i(e) {
			return r
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.config = t.loadMessageBundle = void 0, t.loadMessageBundle = i, t.config = function(e) {
			return i
		}
	})), define("vscode-nls", ["vscode-nls/vscode-nls"], (function(e) {
		return e
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/cssErrors", ["require",
			"exports", "vscode-nls"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ParseError = t.CSSIssueType = void 0;
		var n = e("vscode-nls").loadMessageBundle(),
			r = function(e, t) {
				this.id = e, this.message = t
			};
		t.CSSIssueType = r, t.ParseError = {
			NumberExpected: new r("css-numberexpected", n("expected.number", "number expected")),
			ConditionExpected: new r("css-conditionexpected", n("expected.condt", "condition expected")),
			RuleOrSelectorExpected: new r("css-ruleorselectorexpected", n("expected.ruleorselector",
				"at-rule or selector expected")),
			DotExpected: new r("css-dotexpected", n("expected.dot", "dot expected")),
			ColonExpected: new r("css-colonexpected", n("expected.colon", "colon expected")),
			SemiColonExpected: new r("css-semicolonexpected", n("expected.semicolon", "semi-colon expected")),
			TermExpected: new r("css-termexpected", n("expected.term", "term expected")),
			ExpressionExpected: new r("css-expressionexpected", n("expected.expression", "expression expected")),
			OperatorExpected: new r("css-operatorexpected", n("expected.operator", "operator expected")),
			IdentifierExpected: new r("css-identifierexpected", n("expected.ident", "identifier expected")),
			PercentageExpected: new r("css-percentageexpected", n("expected.percentage", "percentage expected")),
			URIOrStringExpected: new r("css-uriorstringexpected", n("expected.uriorstring", "uri or string expected")),
			URIExpected: new r("css-uriexpected", n("expected.uri", "URI expected")),
			VariableNameExpected: new r("css-varnameexpected", n("expected.varname", "variable name expected")),
			VariableValueExpected: new r("css-varvalueexpected", n("expected.varvalue", "variable value expected")),
			PropertyValueExpected: new r("css-propertyvalueexpected", n("expected.propvalue", "property value expected")),
			LeftCurlyExpected: new r("css-lcurlyexpected", n("expected.lcurly", "{ expected")),
			RightCurlyExpected: new r("css-rcurlyexpected", n("expected.rcurly", "} expected")),
			LeftSquareBracketExpected: new r("css-rbracketexpected", n("expected.lsquare", "[ expected")),
			RightSquareBracketExpected: new r("css-lbracketexpected", n("expected.rsquare", "] expected")),
			LeftParenthesisExpected: new r("css-lparentexpected", n("expected.lparen", "( expected")),
			RightParenthesisExpected: new r("css-rparentexpected", n("expected.rparent", ") expected")),
			CommaExpected: new r("css-commaexpected", n("expected.comma", "comma expected")),
			PageDirectiveOrDeclarationExpected: new r("css-pagedirordeclexpected", n("expected.pagedirordecl",
				"page directive or declaraton expected")),
			UnknownAtRule: new r("css-unknownatrule", n("unknown.atrule", "at-rule unknown")),
			UnknownKeyword: new r("css-unknownkeyword", n("unknown.keyword", "unknown keyword")),
			SelectorExpected: new r("css-selectorexpected", n("expected.selector", "selector expected")),
			StringLiteralExpected: new r("css-stringliteralexpected", n("expected.stringliteral", "string literal expected")),
			WhitespaceExpected: new r("css-whitespaceexpected", n("expected.whitespace", "whitespace expected")),
			MediaQueryExpected: new r("css-mediaqueryexpected", n("expected.mediaquery", "media query expected")),
			IdentifierOrWildcardExpected: new r("css-idorwildcardexpected", n("expected.idorwildcard",
				"identifier or wildcard expected")),
			WildcardExpected: new r("css-wildcardexpected", n("expected.wildcard", "wildcard expected")),
			IdentifierOrVariableExpected: new r("css-idorvarexpected", n("expected.idorvar",
				"identifier or variable expected"))
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/languageFacts/entry", [
			"require", "exports"
		], e)
	}((function(e, t) {
		"use strict";

		function n(e) {
			switch (e) {
				case "experimental":
					return "⚠️ Property is experimental. Be cautious when using it.️\n\n";
				case "nonstandard":
					return "🚨️ Property is nonstandard. Avoid using it.\n\n";
				case "obsolete":
					return "🚨️️️ Property is obsolete. Avoid using it.\n\n";
				default:
					return ""
			}
		}

		function r(e) {
			return (e = e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")).replace(/</g, "&lt;").replace(/>/g, "&gt;")
		}

		function i(e, t) {
			if (!e.description || "" === e.description) return "";
			if ("string" != typeof e.description) return e.description.value;
			var r = "";
			if (!1 !== (null == t ? void 0 : t.documentation)) {
				e.status && (r += n(e.status)), r += e.description;
				var i = s(e.browsers);
				i && (r += "\n(" + i + ")"), "syntax" in e && (r += "\n\nSyntax: " + e.syntax)
			}
			return e.references && e.references.length > 0 && !1 !== (null == t ? void 0 : t.references) && (r.length > 0 && (
				r += "\n\n"), r += e.references.map((function(e) {
				return e.name + ": " + e.url
			})).join(" | ")), r
		}

		function o(e, t) {
			if (!e.description || "" === e.description) return "";
			var i = "";
			if (!1 !== (null == t ? void 0 : t.documentation)) {
				e.status && (i += n(e.status)), i += r("string" == typeof e.description ? e.description : e.description.value);
				var o = s(e.browsers);
				o && (i += "\n\n(" + r(o) + ")"), "syntax" in e && e.syntax && (i += "\n\nSyntax: " + r(e.syntax))
			}
			return e.references && e.references.length > 0 && !1 !== (null == t ? void 0 : t.references) && (i.length > 0 && (
				i += "\n\n"), i += e.references.map((function(e) {
				return "[" + e.name + "](" + e.url + ")"
			})).join(" | ")), i
		}

		function s(e) {
			return void 0 === e && (e = []), 0 === e.length ? null : e.map((function(e) {
				var n = "",
					r = e.match(/([A-Z]+)(\d+)?/),
					i = r[1],
					o = r[2];
				return i in t.browserNames && (n += t.browserNames[i]), o && (n += " " + o), n
			})).join(", ")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getBrowserLabel = t.textToMarkedString = t.getEntryDescription = t.browserNames = void 0, t.browserNames = {
			E: "Edge",
			FF: "Firefox",
			S: "Safari",
			C: "Chrome",
			IE: "IE",
			O: "Opera"
		}, t.getEntryDescription = function(e, t, n) {
			var r;
			if ("" !== (r = t ? {
					kind: "markdown",
					value: o(e, n)
				} : {
					kind: "plaintext",
					value: i(e, n)
				}).value) return r
		}, t.textToMarkedString = r, t.getBrowserLabel = s
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/languageFacts/colors", [
			"require", "exports", "../parser/cssNodes", "vscode-nls"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.getColorValue = t.hslFromColor = t.colorFromHSL = t.colorFrom256RGB = t.colorFromHex = t.hexDigit = t.isColorValue =
			t.isColorConstructor = t.colorKeywords = t.colors = t.colorFunctions = void 0;
		var n = e("../parser/cssNodes"),
			r = e("vscode-nls").loadMessageBundle();

		function i(e, t) {
			var n = e.getText().match(/^([-+]?[0-9]*\.?[0-9]+)(%?)$/);
			if (n) {
				n[2] && (t = 100);
				var r = parseFloat(n[1]) / t;
				if (r >= 0 && r <= 1) return r
			}
			throw new Error
		}

		function o(e) {
			var t = e.getName();
			return !!t && /^(rgb|rgba|hsl|hsla)$/gi.test(t)
		}
		t.colorFunctions = [{
			func: "rgb($red, $green, $blue)",
			desc: r("css.builtin.rgb", "Creates a Color from red, green, and blue values.")
		}, {
			func: "rgba($red, $green, $blue, $alpha)",
			desc: r("css.builtin.rgba", "Creates a Color from red, green, blue, and alpha values.")
		}, {
			func: "hsl($hue, $saturation, $lightness)",
			desc: r("css.builtin.hsl", "Creates a Color from hue, saturation, and lightness values.")
		}, {
			func: "hsla($hue, $saturation, $lightness, $alpha)",
			desc: r("css.builtin.hsla", "Creates a Color from hue, saturation, lightness, and alpha values.")
		}], t.colors = {
			aliceblue: "#f0f8ff",
			antiquewhite: "#faebd7",
			aqua: "#00ffff",
			aquamarine: "#7fffd4",
			azure: "#f0ffff",
			beige: "#f5f5dc",
			bisque: "#ffe4c4",
			black: "#000000",
			blanchedalmond: "#ffebcd",
			blue: "#0000ff",
			blueviolet: "#8a2be2",
			brown: "#a52a2a",
			burlywood: "#deb887",
			cadetblue: "#5f9ea0",
			chartreuse: "#7fff00",
			chocolate: "#d2691e",
			coral: "#ff7f50",
			cornflowerblue: "#6495ed",
			cornsilk: "#fff8dc",
			crimson: "#dc143c",
			cyan: "#00ffff",
			darkblue: "#00008b",
			darkcyan: "#008b8b",
			darkgoldenrod: "#b8860b",
			darkgray: "#a9a9a9",
			darkgrey: "#a9a9a9",
			darkgreen: "#006400",
			darkkhaki: "#bdb76b",
			darkmagenta: "#8b008b",
			darkolivegreen: "#556b2f",
			darkorange: "#ff8c00",
			darkorchid: "#9932cc",
			darkred: "#8b0000",
			darksalmon: "#e9967a",
			darkseagreen: "#8fbc8f",
			darkslateblue: "#483d8b",
			darkslategray: "#2f4f4f",
			darkslategrey: "#2f4f4f",
			darkturquoise: "#00ced1",
			darkviolet: "#9400d3",
			deeppink: "#ff1493",
			deepskyblue: "#00bfff",
			dimgray: "#696969",
			dimgrey: "#696969",
			dodgerblue: "#1e90ff",
			firebrick: "#b22222",
			floralwhite: "#fffaf0",
			forestgreen: "#228b22",
			fuchsia: "#ff00ff",
			gainsboro: "#dcdcdc",
			ghostwhite: "#f8f8ff",
			gold: "#ffd700",
			goldenrod: "#daa520",
			gray: "#808080",
			grey: "#808080",
			green: "#008000",
			greenyellow: "#adff2f",
			honeydew: "#f0fff0",
			hotpink: "#ff69b4",
			indianred: "#cd5c5c",
			indigo: "#4b0082",
			ivory: "#fffff0",
			khaki: "#f0e68c",
			lavender: "#e6e6fa",
			lavenderblush: "#fff0f5",
			lawngreen: "#7cfc00",
			lemonchiffon: "#fffacd",
			lightblue: "#add8e6",
			lightcoral: "#f08080",
			lightcyan: "#e0ffff",
			lightgoldenrodyellow: "#fafad2",
			lightgray: "#d3d3d3",
			lightgrey: "#d3d3d3",
			lightgreen: "#90ee90",
			lightpink: "#ffb6c1",
			lightsalmon: "#ffa07a",
			lightseagreen: "#20b2aa",
			lightskyblue: "#87cefa",
			lightslategray: "#778899",
			lightslategrey: "#778899",
			lightsteelblue: "#b0c4de",
			lightyellow: "#ffffe0",
			lime: "#00ff00",
			limegreen: "#32cd32",
			linen: "#faf0e6",
			magenta: "#ff00ff",
			maroon: "#800000",
			mediumaquamarine: "#66cdaa",
			mediumblue: "#0000cd",
			mediumorchid: "#ba55d3",
			mediumpurple: "#9370d8",
			mediumseagreen: "#3cb371",
			mediumslateblue: "#7b68ee",
			mediumspringgreen: "#00fa9a",
			mediumturquoise: "#48d1cc",
			mediumvioletred: "#c71585",
			midnightblue: "#191970",
			mintcream: "#f5fffa",
			mistyrose: "#ffe4e1",
			moccasin: "#ffe4b5",
			navajowhite: "#ffdead",
			navy: "#000080",
			oldlace: "#fdf5e6",
			olive: "#808000",
			olivedrab: "#6b8e23",
			orange: "#ffa500",
			orangered: "#ff4500",
			orchid: "#da70d6",
			palegoldenrod: "#eee8aa",
			palegreen: "#98fb98",
			paleturquoise: "#afeeee",
			palevioletred: "#d87093",
			papayawhip: "#ffefd5",
			peachpuff: "#ffdab9",
			peru: "#cd853f",
			pink: "#ffc0cb",
			plum: "#dda0dd",
			powderblue: "#b0e0e6",
			purple: "#800080",
			red: "#ff0000",
			rebeccapurple: "#663399",
			rosybrown: "#bc8f8f",
			royalblue: "#4169e1",
			saddlebrown: "#8b4513",
			salmon: "#fa8072",
			sandybrown: "#f4a460",
			seagreen: "#2e8b57",
			seashell: "#fff5ee",
			sienna: "#a0522d",
			silver: "#c0c0c0",
			skyblue: "#87ceeb",
			slateblue: "#6a5acd",
			slategray: "#708090",
			slategrey: "#708090",
			snow: "#fffafa",
			springgreen: "#00ff7f",
			steelblue: "#4682b4",
			tan: "#d2b48c",
			teal: "#008080",
			thistle: "#d8bfd8",
			tomato: "#ff6347",
			turquoise: "#40e0d0",
			violet: "#ee82ee",
			wheat: "#f5deb3",
			white: "#ffffff",
			whitesmoke: "#f5f5f5",
			yellow: "#ffff00",
			yellowgreen: "#9acd32"
		}, t.colorKeywords = {
			currentColor: "The value of the 'color' property. The computed value of the 'currentColor' keyword is the computed value of the 'color' property. If the 'currentColor' keyword is set on the 'color' property itself, it is treated as 'color:inherit' at parse time.",
			transparent: "Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value."
		}, t.isColorConstructor = o, t.isColorValue = function(e) {
			if (e.type === n.NodeType.HexColorValue) return !0;
			if (e.type === n.NodeType.Function) return o(e);
			if (e.type === n.NodeType.Identifier) {
				if (e.parent && e.parent.type !== n.NodeType.Term) return !1;
				var r = e.getText().toLowerCase();
				if ("none" === r) return !1;
				if (t.colors[r]) return !0
			}
			return !1
		};

		function s(e) {
			return e < 48 ? 0 : e <= 57 ? e - 48 : (e < 97 && (e += 32), e >= 97 && e <= 102 ? e - 97 + 10 : 0)
		}

		function a(e) {
			if ("#" !== e[0]) return null;
			switch (e.length) {
				case 4:
					return {
						red: 17 * s(e.charCodeAt(1)) / 255,
						green: 17 * s(e.charCodeAt(2)) / 255,
						blue: 17 * s(e.charCodeAt(3)) / 255,
						alpha: 1
					};
				case 5:
					return {
						red: 17 * s(e.charCodeAt(1)) / 255,
						green: 17 * s(e.charCodeAt(2)) / 255,
						blue: 17 * s(e.charCodeAt(3)) / 255,
						alpha: 17 * s(e.charCodeAt(4)) / 255
					};
				case 7:
					return {
						red: (16 * s(e.charCodeAt(1)) + s(e.charCodeAt(2))) / 255,
						green: (16 * s(e.charCodeAt(3)) + s(e.charCodeAt(4))) / 255,
						blue: (16 * s(e.charCodeAt(5)) + s(e.charCodeAt(6))) / 255,
						alpha: 1
					};
				case 9:
					return {
						red: (16 * s(e.charCodeAt(1)) + s(e.charCodeAt(2))) / 255,
						green: (16 * s(e.charCodeAt(3)) + s(e.charCodeAt(4))) / 255,
						blue: (16 * s(e.charCodeAt(5)) + s(e.charCodeAt(6))) / 255,
						alpha: (16 * s(e.charCodeAt(7)) + s(e.charCodeAt(8))) / 255
					}
			}
			return null
		}

		function l(e, t, n, r) {
			if (void 0 === r && (r = 1), 0 === t) return {
				red: n,
				green: n,
				blue: n,
				alpha: r
			};
			var i = function(e, t, n) {
					for (; n < 0;) n += 6;
					for (; n >= 6;) n -= 6;
					return n < 1 ? (t - e) * n + e : n < 3 ? t : n < 4 ? (t - e) * (4 - n) + e : e
				},
				o = n <= .5 ? n * (t + 1) : n + t - n * t,
				s = 2 * n - o;
			return {
				red: i(s, o, (e /= 60) + 2),
				green: i(s, o, e),
				blue: i(s, o, e - 2),
				alpha: r
			}
		}
		t.hexDigit = s, t.colorFromHex = a, t.colorFrom256RGB = function(e, t, n, r) {
			return void 0 === r && (r = 1), {
				red: e / 255,
				green: t / 255,
				blue: n / 255,
				alpha: r
			}
		}, t.colorFromHSL = l, t.hslFromColor = function(e) {
			var t = e.red,
				n = e.green,
				r = e.blue,
				i = e.alpha,
				o = Math.max(t, n, r),
				s = Math.min(t, n, r),
				a = 0,
				l = 0,
				c = (s + o) / 2,
				d = o - s;
			if (d > 0) {
				switch (l = Math.min(c <= .5 ? d / (2 * c) : d / (2 - 2 * c), 1), o) {
					case t:
						a = (n - r) / d + (n < r ? 6 : 0);
						break;
					case n:
						a = (r - t) / d + 2;
						break;
					case r:
						a = (t - n) / d + 4
				}
				a *= 60, a = Math.round(a)
			}
			return {
				h: a,
				s: l,
				l: c,
				a: i
			}
		}, t.getColorValue = function(e) {
			if (e.type === n.NodeType.HexColorValue) return a(e.getText());
			if (e.type === n.NodeType.Function) {
				var r = e,
					o = r.getName(),
					s = r.getArguments().getChildren();
				if (!o || s.length < 3 || s.length > 4) return null;
				try {
					var c = 4 === s.length ? i(s[3], 1) : 1;
					if ("rgb" === o || "rgba" === o) return {
						red: i(s[0], 255),
						green: i(s[1], 255),
						blue: i(s[2], 255),
						alpha: c
					};
					if ("hsl" === o || "hsla" === o) return l(function(e) {
						var t = e.getText();
						if (t.match(/^([-+]?[0-9]*\.?[0-9]+)(deg)?$/)) return parseFloat(t) % 360;
						throw new Error
					}(s[0]), i(s[1], 100), i(s[2], 100), c)
				} catch (e) {
					return null
				}
			} else if (e.type === n.NodeType.Identifier) {
				if (e.parent && e.parent.type !== n.NodeType.Term) return null;
				var d = e.parent;
				if (d && d.parent && d.parent.type === n.NodeType.BinaryExpression) {
					var p = d.parent;
					if (p.parent && p.parent.type === n.NodeType.ListEntry && p.parent.key === p) return null
				}
				var h = e.getText().toLowerCase();
				if ("none" === h) return null;
				var u = t.colors[h];
				if (u) return a(u)
			}
			return null
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/languageFacts/builtinData", [
			"require", "exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.pageBoxDirectives = t.svgElements = t.html5Tags = t.units = t.basicShapeFunctions = t.transitionTimingFunctions =
			t.imageFunctions = t.cssWideKeywords = t.geometryBoxKeywords = t.boxKeywords = t.lineWidthKeywords = t.lineStyleKeywords =
			t.repeatStyleKeywords = t.positionKeywords = void 0, t.positionKeywords = {
				bottom: "Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.",
				center: "Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is.",
				left: "Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.",
				right: "Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.",
				top: "Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset."
			}, t.repeatStyleKeywords = {
				"no-repeat": "Placed once and not repeated in this direction.",
				repeat: "Repeated in this direction as often as needed to cover the background painting area.",
				"repeat-x": "Computes to ‘repeat no-repeat’.",
				"repeat-y": "Computes to ‘no-repeat repeat’.",
				round: "Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does.",
				space: "Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area."
			}, t.lineStyleKeywords = {
				dashed: "A series of square-ended dashes.",
				dotted: "A series of round dots.",
				double: "Two parallel solid lines with some space between them.",
				groove: "Looks as if it were carved in the canvas.",
				hidden: "Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables.",
				inset: "Looks as if the content on the inside of the border is sunken into the canvas.",
				none: "No border. Color and width are ignored.",
				outset: "Looks as if the content on the inside of the border is coming out of the canvas.",
				ridge: "Looks as if it were coming out of the canvas.",
				solid: "A single line segment."
			}, t.lineWidthKeywords = ["medium", "thick", "thin"], t.boxKeywords = {
				"border-box": "The background is painted within (clipped to) the border box.",
				"content-box": "The background is painted within (clipped to) the content box.",
				"padding-box": "The background is painted within (clipped to) the padding box."
			}, t.geometryBoxKeywords = {
				"margin-box": "Uses the margin box as reference box.",
				"fill-box": "Uses the object bounding box as reference box.",
				"stroke-box": "Uses the stroke bounding box as reference box.",
				"view-box": "Uses the nearest SVG viewport as reference box."
			}, t.cssWideKeywords = {
				initial: "Represents the value specified as the property’s initial value.",
				inherit: "Represents the computed value of the property on the element’s parent.",
				unset: "Acts as either `inherit` or `initial`, depending on whether the property is inherited or not."
			}, t.imageFunctions = {
				"url()": "Reference an image file by URL",
				"image()": "Provide image fallbacks and annotations.",
				"-webkit-image-set()": "Provide multiple resolutions. Remember to use unprefixed image-set() in addition.",
				"image-set()": "Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation.",
				"-moz-element()": "Use an element in the document as an image. Remember to use unprefixed element() in addition.",
				"element()": "Use an element in the document as an image.",
				"cross-fade()": "Indicates the two images to be combined and how far along in the transition the combination is.",
				"-webkit-gradient()": "Deprecated. Use modern linear-gradient() or radial-gradient() instead.",
				"-webkit-linear-gradient()": "Linear gradient. Remember to use unprefixed version in addition.",
				"-moz-linear-gradient()": "Linear gradient. Remember to use unprefixed version in addition.",
				"-o-linear-gradient()": "Linear gradient. Remember to use unprefixed version in addition.",
				"linear-gradient()": "A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line.",
				"-webkit-repeating-linear-gradient()": "Repeating Linear gradient. Remember to use unprefixed version in addition.",
				"-moz-repeating-linear-gradient()": "Repeating Linear gradient. Remember to use unprefixed version in addition.",
				"-o-repeating-linear-gradient()": "Repeating Linear gradient. Remember to use unprefixed version in addition.",
				"repeating-linear-gradient()": "Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.",
				"-webkit-radial-gradient()": "Radial gradient. Remember to use unprefixed version in addition.",
				"-moz-radial-gradient()": "Radial gradient. Remember to use unprefixed version in addition.",
				"radial-gradient()": "Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape.",
				"-webkit-repeating-radial-gradient()": "Repeating radial gradient. Remember to use unprefixed version in addition.",
				"-moz-repeating-radial-gradient()": "Repeating radial gradient. Remember to use unprefixed version in addition.",
				"repeating-radial-gradient()": "Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position."
			}, t.transitionTimingFunctions = {
				ease: "Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0).",
				"ease-in": "Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0).",
				"ease-in-out": "Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0).",
				"ease-out": "Equivalent to cubic-bezier(0, 0, 0.58, 1.0).",
				linear: "Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0).",
				"step-end": "Equivalent to steps(1, end).",
				"step-start": "Equivalent to steps(1, start).",
				"steps()": "The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”.",
				"cubic-bezier()": "Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2).",
				"cubic-bezier(0.6, -0.28, 0.735, 0.045)": "Ease-in Back. Overshoots.",
				"cubic-bezier(0.68, -0.55, 0.265, 1.55)": "Ease-in-out Back. Overshoots.",
				"cubic-bezier(0.175, 0.885, 0.32, 1.275)": "Ease-out Back. Overshoots.",
				"cubic-bezier(0.6, 0.04, 0.98, 0.335)": "Ease-in Circular. Based on half circle.",
				"cubic-bezier(0.785, 0.135, 0.15, 0.86)": "Ease-in-out Circular. Based on half circle.",
				"cubic-bezier(0.075, 0.82, 0.165, 1)": "Ease-out Circular. Based on half circle.",
				"cubic-bezier(0.55, 0.055, 0.675, 0.19)": "Ease-in Cubic. Based on power of three.",
				"cubic-bezier(0.645, 0.045, 0.355, 1)": "Ease-in-out Cubic. Based on power of three.",
				"cubic-bezier(0.215, 0.610, 0.355, 1)": "Ease-out Cubic. Based on power of three.",
				"cubic-bezier(0.95, 0.05, 0.795, 0.035)": "Ease-in Exponential. Based on two to the power ten.",
				"cubic-bezier(1, 0, 0, 1)": "Ease-in-out Exponential. Based on two to the power ten.",
				"cubic-bezier(0.19, 1, 0.22, 1)": "Ease-out Exponential. Based on two to the power ten.",
				"cubic-bezier(0.47, 0, 0.745, 0.715)": "Ease-in Sine.",
				"cubic-bezier(0.445, 0.05, 0.55, 0.95)": "Ease-in-out Sine.",
				"cubic-bezier(0.39, 0.575, 0.565, 1)": "Ease-out Sine.",
				"cubic-bezier(0.55, 0.085, 0.68, 0.53)": "Ease-in Quadratic. Based on power of two.",
				"cubic-bezier(0.455, 0.03, 0.515, 0.955)": "Ease-in-out Quadratic. Based on power of two.",
				"cubic-bezier(0.25, 0.46, 0.45, 0.94)": "Ease-out Quadratic. Based on power of two.",
				"cubic-bezier(0.895, 0.03, 0.685, 0.22)": "Ease-in Quartic. Based on power of four.",
				"cubic-bezier(0.77, 0, 0.175, 1)": "Ease-in-out Quartic. Based on power of four.",
				"cubic-bezier(0.165, 0.84, 0.44, 1)": "Ease-out Quartic. Based on power of four.",
				"cubic-bezier(0.755, 0.05, 0.855, 0.06)": "Ease-in Quintic. Based on power of five.",
				"cubic-bezier(0.86, 0, 0.07, 1)": "Ease-in-out Quintic. Based on power of five.",
				"cubic-bezier(0.23, 1, 0.320, 1)": "Ease-out Quintic. Based on power of five."
			}, t.basicShapeFunctions = {
				"circle()": "Defines a circle.",
				"ellipse()": "Defines an ellipse.",
				"inset()": "Defines an inset rectangle.",
				"polygon()": "Defines a polygon."
			}, t.units = {
				length: ["em", "rem", "ex", "px", "cm", "mm", "in", "pt", "pc", "ch", "vw", "vh", "vmin", "vmax"],
				angle: ["deg", "rad", "grad", "turn"],
				time: ["ms", "s"],
				frequency: ["Hz", "kHz"],
				resolution: ["dpi", "dpcm", "dppx"],
				percentage: ["%", "fr"]
			}, t.html5Tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo",
				"blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist",
				"dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure",
				"footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe",
				"img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu",
				"menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param",
				"picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select",
				"small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template",
				"textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "const", "video", "wbr"
			], t.svgElements = ["circle", "clipPath", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix",
				"feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap",
				"feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur",
				"feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting",
				"feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line",
				"linearGradient", "marker", "mask", "mesh", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern",
				"polygon", "polyline", "radialGradient", "rect", "set", "solidcolor", "stop", "svg", "switch", "symbol", "text",
				"textPath", "tspan", "use", "view"
			], t.pageBoxDirectives = ["@bottom-center", "@bottom-left", "@bottom-left-corner", "@bottom-right",
				"@bottom-right-corner", "@left-bottom", "@left-middle", "@left-top", "@right-bottom", "@right-middle",
				"@right-top", "@top-center", "@top-left", "@top-left-corner", "@top-right", "@top-right-corner"
			]
	}));
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
		void 0 === r && (r = n), Object.defineProperty(e, r, {
			enumerable: !0,
			get: function() {
				return t[n]
			}
		})
	} : function(e, t, n, r) {
		void 0 === r && (r = n), e[r] = t[n]
	}),
	__exportStar = this && this.__exportStar || function(e, t) {
		for (var n in e) "default" === n || Object.prototype.hasOwnProperty.call(t, n) || __createBinding(t, e, n)
	};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/languageFacts/facts", [
		"require", "exports", "./entry", "./colors", "./builtinData"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), __exportStar(e("./entry"), t), __exportStar(e("./colors"), t), __exportStar(e("./builtinData"), t)
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/utils/objects", ["require",
		"exports"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.isDefined = t.values = void 0, t.values = function(e) {
		return Object.keys(e).map((function(t) {
			return e[t]
		}))
	}, t.isDefined = function(e) {
		return void 0 !== e
	}
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/cssParser", ["require",
		"exports", "./cssScanner", "./cssNodes", "./cssErrors", "../languageFacts/facts", "../utils/objects"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.Parser = void 0;
	var n = e("./cssScanner"),
		r = e("./cssNodes"),
		i = e("./cssErrors"),
		o = e("../languageFacts/facts"),
		s = e("../utils/objects"),
		a = function() {
			function e(e) {
				void 0 === e && (e = new n.Scanner), this.keyframeRegex = /^@(\-(webkit|ms|moz|o)\-)?keyframes$/i, this.scanner =
					e, this.token = {
						type: n.TokenType.EOF,
						offset: -1,
						len: 0,
						text: ""
					}, this.prevToken = void 0
			}
			return e.prototype.peekIdent = function(e) {
				return n.TokenType.Ident === this.token.type && e.length === this.token.text.length && e === this.token.text.toLowerCase()
			}, e.prototype.peekKeyword = function(e) {
				return n.TokenType.AtKeyword === this.token.type && e.length === this.token.text.length && e === this.token.text
					.toLowerCase()
			}, e.prototype.peekDelim = function(e) {
				return n.TokenType.Delim === this.token.type && e === this.token.text
			}, e.prototype.peek = function(e) {
				return e === this.token.type
			}, e.prototype.peekOne = function(e) {
				return -1 !== e.indexOf(this.token.type)
			}, e.prototype.peekRegExp = function(e, t) {
				return e === this.token.type && t.test(this.token.text)
			}, e.prototype.hasWhitespace = function() {
				return !!this.prevToken && this.prevToken.offset + this.prevToken.len !== this.token.offset
			}, e.prototype.consumeToken = function() {
				this.prevToken = this.token, this.token = this.scanner.scan()
			}, e.prototype.mark = function() {
				return {
					prev: this.prevToken,
					curr: this.token,
					pos: this.scanner.pos()
				}
			}, e.prototype.restoreAtMark = function(e) {
				this.prevToken = e.prev, this.token = e.curr, this.scanner.goBackTo(e.pos)
			}, e.prototype.try = function(e) {
				var t = this.mark(),
					n = e();
				return n || (this.restoreAtMark(t), null)
			}, e.prototype.acceptOneKeyword = function(e) {
				if (n.TokenType.AtKeyword === this.token.type)
					for (var t = 0, r = e; t < r.length; t++) {
						var i = r[t];
						if (i.length === this.token.text.length && i === this.token.text.toLowerCase()) return this.consumeToken(), !0
					}
				return !1
			}, e.prototype.accept = function(e) {
				return e === this.token.type && (this.consumeToken(), !0)
			}, e.prototype.acceptIdent = function(e) {
				return !!this.peekIdent(e) && (this.consumeToken(), !0)
			}, e.prototype.acceptKeyword = function(e) {
				return !!this.peekKeyword(e) && (this.consumeToken(), !0)
			}, e.prototype.acceptDelim = function(e) {
				return !!this.peekDelim(e) && (this.consumeToken(), !0)
			}, e.prototype.acceptRegexp = function(e) {
				return !!e.test(this.token.text) && (this.consumeToken(), !0)
			}, e.prototype._parseRegexp = function(e) {
				var t = this.createNode(r.NodeType.Identifier);
				do {} while (this.acceptRegexp(e));
				return this.finish(t)
			}, e.prototype.acceptUnquotedString = function() {
				var e = this.scanner.pos();
				this.scanner.goBackTo(this.token.offset);
				var t = this.scanner.scanUnquotedString();
				return t ? (this.token = t, this.consumeToken(), !0) : (this.scanner.goBackTo(e), !1)
			}, e.prototype.resync = function(e, t) {
				for (;;) {
					if (e && -1 !== e.indexOf(this.token.type)) return this.consumeToken(), !0;
					if (t && -1 !== t.indexOf(this.token.type)) return !0;
					if (this.token.type === n.TokenType.EOF) return !1;
					this.token = this.scanner.scan()
				}
			}, e.prototype.createNode = function(e) {
				return new r.Node(this.token.offset, this.token.len, e)
			}, e.prototype.create = function(e) {
				return new e(this.token.offset, this.token.len)
			}, e.prototype.finish = function(e, t, n, i) {
				if (!(e instanceof r.Nodelist) && (t && this.markError(e, t, n, i), this.prevToken)) {
					var o = this.prevToken.offset + this.prevToken.len;
					e.length = o > e.offset ? o - e.offset : 0
				}
				return e
			}, e.prototype.markError = function(e, t, n, i) {
				this.token !== this.lastErrorToken && (e.addIssue(new r.Marker(e, t, r.Level.Error, void 0, this.token.offset,
					this.token.len)), this.lastErrorToken = this.token), (n || i) && this.resync(n, i)
			}, e.prototype.parseStylesheet = function(e) {
				var t = e.version,
					n = e.getText();
				return this.internalParse(n, this._parseStylesheet, (function(r, i) {
					if (e.version !== t) throw new Error("Underlying model has changed, AST is no longer valid");
					return n.substr(r, i)
				}))
			}, e.prototype.internalParse = function(e, t, n) {
				this.scanner.setSource(e), this.token = this.scanner.scan();
				var r = t.bind(this)();
				return r && (r.textProvider = n || function(t, n) {
					return e.substr(t, n)
				}), r
			}, e.prototype._parseStylesheet = function() {
				for (var e = this.create(r.Stylesheet); e.addChild(this._parseStylesheetStart()););
				var t = !1;
				do {
					var o = !1;
					do {
						o = !1;
						var s = this._parseStylesheetStatement();
						for (s && (e.addChild(s), o = !0, t = !1, this.peek(n.TokenType.EOF) || !this._needsSemicolonAfter(s) || this.accept(
								n.TokenType.SemiColon) || this.markError(e, i.ParseError.SemiColonExpected)); this.accept(n.TokenType.SemiColon) ||
							this.accept(n.TokenType.CDO) || this.accept(n.TokenType.CDC);) o = !0, t = !1
					} while (o);
					if (this.peek(n.TokenType.EOF)) break;
					t || (this.peek(n.TokenType.AtKeyword) ? this.markError(e, i.ParseError.UnknownAtRule) : this.markError(e, i.ParseError
						.RuleOrSelectorExpected), t = !0), this.consumeToken()
				} while (!this.peek(n.TokenType.EOF));
				return this.finish(e)
			}, e.prototype._parseStylesheetStart = function() {
				return this._parseCharset()
			}, e.prototype._parseStylesheetStatement = function(e) {
				return void 0 === e && (e = !1), this.peek(n.TokenType.AtKeyword) ? this._parseStylesheetAtStatement(e) : this._parseRuleset(
					e)
			}, e.prototype._parseStylesheetAtStatement = function(e) {
				return void 0 === e && (e = !1), this._parseImport() || this._parseMedia(e) || this._parsePage() || this._parseFontFace() ||
					this._parseKeyframe() || this._parseSupports(e) || this._parseViewPort() || this._parseNamespace() || this._parseDocument() ||
					this._parseUnknownAtRule()
			}, e.prototype._tryParseRuleset = function(e) {
				var t = this.mark();
				if (this._parseSelector(e)) {
					for (; this.accept(n.TokenType.Comma) && this._parseSelector(e););
					if (this.accept(n.TokenType.CurlyL)) return this.restoreAtMark(t), this._parseRuleset(e)
				}
				return this.restoreAtMark(t), null
			}, e.prototype._parseRuleset = function(e) {
				void 0 === e && (e = !1);
				var t = this.create(r.RuleSet),
					o = t.getSelectors();
				if (!o.addChild(this._parseSelector(e))) return null;
				for (; this.accept(n.TokenType.Comma);)
					if (!o.addChild(this._parseSelector(e))) return this.finish(t, i.ParseError.SelectorExpected);
				return this._parseBody(t, this._parseRuleSetDeclaration.bind(this))
			}, e.prototype._parseRuleSetDeclarationAtStatement = function() {
				return this._parseUnknownAtRule()
			}, e.prototype._parseRuleSetDeclaration = function() {
				return this.peek(n.TokenType.AtKeyword) ? this._parseRuleSetDeclarationAtStatement() : this._parseDeclaration()
			}, e.prototype._needsSemicolonAfter = function(e) {
				switch (e.type) {
					case r.NodeType.Keyframe:
					case r.NodeType.ViewPort:
					case r.NodeType.Media:
					case r.NodeType.Ruleset:
					case r.NodeType.Namespace:
					case r.NodeType.If:
					case r.NodeType.For:
					case r.NodeType.Each:
					case r.NodeType.While:
					case r.NodeType.MixinDeclaration:
					case r.NodeType.FunctionDeclaration:
					case r.NodeType.MixinContentDeclaration:
						return !1;
					case r.NodeType.ExtendsReference:
					case r.NodeType.MixinContentReference:
					case r.NodeType.ReturnStatement:
					case r.NodeType.MediaQuery:
					case r.NodeType.Debug:
					case r.NodeType.Import:
					case r.NodeType.AtApplyRule:
					case r.NodeType.CustomPropertyDeclaration:
						return !0;
					case r.NodeType.VariableDeclaration:
						return e.needsSemicolon;
					case r.NodeType.MixinReference:
						return !e.getContent();
					case r.NodeType.Declaration:
						return !e.getNestedProperties()
				}
				return !1
			}, e.prototype._parseDeclarations = function(e) {
				var t = this.create(r.Declarations);
				if (!this.accept(n.TokenType.CurlyL)) return null;
				for (var o = e(); t.addChild(o) && !this.peek(n.TokenType.CurlyR);) {
					if (this._needsSemicolonAfter(o) && !this.accept(n.TokenType.SemiColon)) return this.finish(t, i.ParseError.SemiColonExpected,
						[n.TokenType.SemiColon, n.TokenType.CurlyR]);
					for (o && this.prevToken && this.prevToken.type === n.TokenType.SemiColon && (o.semicolonPosition = this.prevToken
							.offset); this.accept(n.TokenType.SemiColon););
					o = e()
				}
				return this.accept(n.TokenType.CurlyR) ? this.finish(t) : this.finish(t, i.ParseError.RightCurlyExpected, [n.TokenType
					.CurlyR, n.TokenType.SemiColon
				])
			}, e.prototype._parseBody = function(e, t) {
				return e.setDeclarations(this._parseDeclarations(t)) ? this.finish(e) : this.finish(e, i.ParseError.LeftCurlyExpected,
					[n.TokenType.CurlyR, n.TokenType.SemiColon])
			}, e.prototype._parseSelector = function(e) {
				var t = this.create(r.Selector),
					n = !1;
				for (e && (n = t.addChild(this._parseCombinator())); t.addChild(this._parseSimpleSelector());) n = !0, t.addChild(
					this._parseCombinator());
				return n ? this.finish(t) : null
			}, e.prototype._parseDeclaration = function(e) {
				var t = this._tryParseCustomPropertyDeclaration(e);
				if (t) return t;
				var o = this.create(r.Declaration);
				return o.setProperty(this._parseProperty()) ? this.accept(n.TokenType.Colon) ? (this.prevToken && (o.colonPosition =
						this.prevToken.offset), o.setValue(this._parseExpr()) ? (o.addChild(this._parsePrio()), this.peek(n.TokenType
						.SemiColon) && (o.semicolonPosition = this.token.offset), this.finish(o)) : this.finish(o, i.ParseError.PropertyValueExpected)) :
					this.finish(o, i.ParseError.ColonExpected, [n.TokenType.Colon], e || [n.TokenType.SemiColon]) : null
			}, e.prototype._tryParseCustomPropertyDeclaration = function(e) {
				if (!this.peekRegExp(n.TokenType.Ident, /^--/)) return null;
				var t = this.create(r.CustomPropertyDeclaration);
				if (!t.setProperty(this._parseProperty())) return null;
				if (!this.accept(n.TokenType.Colon)) return this.finish(t, i.ParseError.ColonExpected, [n.TokenType.Colon]);
				this.prevToken && (t.colonPosition = this.prevToken.offset);
				var o = this.mark();
				if (this.peek(n.TokenType.CurlyL)) {
					var a = this.create(r.CustomPropertySet),
						l = this._parseDeclarations(this._parseRuleSetDeclaration.bind(this));
					if (a.setDeclarations(l) && !l.isErroneous(!0) && (a.addChild(this._parsePrio()), this.peek(n.TokenType.SemiColon)))
						return this.finish(a), t.setPropertySet(a), t.semicolonPosition = this.token.offset, this.finish(t);
					this.restoreAtMark(o)
				}
				var c = this._parseExpr();
				return c && !c.isErroneous(!0) && (this._parsePrio(), this.peekOne(e || [n.TokenType.SemiColon])) ? (t.setValue(
					c), t.semicolonPosition = this.token.offset, this.finish(t)) : (this.restoreAtMark(o), t.addChild(this._parseCustomPropertyValue(
						e)), t.addChild(this._parsePrio()), s.isDefined(t.colonPosition) && this.token.offset === t.colonPosition + 1 ?
					this.finish(t, i.ParseError.PropertyValueExpected) : this.finish(t))
			}, e.prototype._parseCustomPropertyValue = function(e) {
				var t = this;
				void 0 === e && (e = [n.TokenType.CurlyR]);
				var o = this.create(r.Node),
					s = function() {
						return 0 === l && 0 === c && 0 === d
					},
					a = function() {
						return -1 !== e.indexOf(t.token.type)
					},
					l = 0,
					c = 0,
					d = 0;
				e: for (;;) {
					switch (this.token.type) {
						case n.TokenType.SemiColon:
						case n.TokenType.Exclamation:
							if (s()) break e;
							break;
						case n.TokenType.CurlyL:
							l++;
							break;
						case n.TokenType.CurlyR:
							if (--l < 0) {
								if (a() && 0 === c && 0 === d) break e;
								return this.finish(o, i.ParseError.LeftCurlyExpected)
							}
							break;
						case n.TokenType.ParenthesisL:
							c++;
							break;
						case n.TokenType.ParenthesisR:
							if (--c < 0) {
								if (a() && 0 === d && 0 === l) break e;
								return this.finish(o, i.ParseError.LeftParenthesisExpected)
							}
							break;
						case n.TokenType.BracketL:
							d++;
							break;
						case n.TokenType.BracketR:
							if (--d < 0) return this.finish(o, i.ParseError.LeftSquareBracketExpected);
							break;
						case n.TokenType.BadString:
							break e;
						case n.TokenType.EOF:
							var p = i.ParseError.RightCurlyExpected;
							return d > 0 ? p = i.ParseError.RightSquareBracketExpected : c > 0 && (p = i.ParseError.RightParenthesisExpected),
								this.finish(o, p)
					}
					this.consumeToken()
				}
				return this.finish(o)
			}, e.prototype._tryToParseDeclaration = function(e) {
				var t = this.mark();
				return this._parseProperty() && this.accept(n.TokenType.Colon) ? (this.restoreAtMark(t), this._parseDeclaration(
					e)) : (this.restoreAtMark(t), null)
			}, e.prototype._parseProperty = function() {
				var e = this.create(r.Property),
					t = this.mark();
				return (this.acceptDelim("*") || this.acceptDelim("_")) && this.hasWhitespace() ? (this.restoreAtMark(t), null) :
					e.setIdentifier(this._parsePropertyIdentifier()) ? this.finish(e) : null
			}, e.prototype._parsePropertyIdentifier = function() {
				return this._parseIdent()
			}, e.prototype._parseCharset = function() {
				if (!this.peek(n.TokenType.Charset)) return null;
				var e = this.create(r.Node);
				return this.consumeToken(), this.accept(n.TokenType.String) ? this.accept(n.TokenType.SemiColon) ? this.finish(e) :
					this.finish(e, i.ParseError.SemiColonExpected) : this.finish(e, i.ParseError.IdentifierExpected)
			}, e.prototype._parseImport = function() {
				if (!this.peekKeyword("@import")) return null;
				var e = this.create(r.Import);
				return this.consumeToken(), e.addChild(this._parseURILiteral()) || e.addChild(this._parseStringLiteral()) ? (
					this.peek(n.TokenType.SemiColon) || this.peek(n.TokenType.EOF) || e.setMedialist(this._parseMediaQueryList()),
					this.finish(e)) : this.finish(e, i.ParseError.URIOrStringExpected)
			}, e.prototype._parseNamespace = function() {
				if (!this.peekKeyword("@namespace")) return null;
				var e = this.create(r.Namespace);
				return this.consumeToken(), e.addChild(this._parseURILiteral()) || (e.addChild(this._parseIdent()), e.addChild(
						this._parseURILiteral()) || e.addChild(this._parseStringLiteral())) ? this.accept(n.TokenType.SemiColon) ?
					this.finish(e) : this.finish(e, i.ParseError.SemiColonExpected) : this.finish(e, i.ParseError.URIExpected, [n.TokenType
						.SemiColon
					])
			}, e.prototype._parseFontFace = function() {
				if (!this.peekKeyword("@font-face")) return null;
				var e = this.create(r.FontFace);
				return this.consumeToken(), this._parseBody(e, this._parseRuleSetDeclaration.bind(this))
			}, e.prototype._parseViewPort = function() {
				if (!this.peekKeyword("@-ms-viewport") && !this.peekKeyword("@-o-viewport") && !this.peekKeyword("@viewport"))
					return null;
				var e = this.create(r.ViewPort);
				return this.consumeToken(), this._parseBody(e, this._parseRuleSetDeclaration.bind(this))
			}, e.prototype._parseKeyframe = function() {
				if (!this.peekRegExp(n.TokenType.AtKeyword, this.keyframeRegex)) return null;
				var e = this.create(r.Keyframe),
					t = this.create(r.Node);
				return this.consumeToken(), e.setKeyword(this.finish(t)), t.matches("@-ms-keyframes") && this.markError(t, i.ParseError
					.UnknownKeyword), e.setIdentifier(this._parseKeyframeIdent()) ? this._parseBody(e, this._parseKeyframeSelector
					.bind(this)) : this.finish(e, i.ParseError.IdentifierExpected, [n.TokenType.CurlyR])
			}, e.prototype._parseKeyframeIdent = function() {
				return this._parseIdent([r.ReferenceType.Keyframe])
			}, e.prototype._parseKeyframeSelector = function() {
				var e = this.create(r.KeyframeSelector);
				if (!e.addChild(this._parseIdent()) && !this.accept(n.TokenType.Percentage)) return null;
				for (; this.accept(n.TokenType.Comma);)
					if (!e.addChild(this._parseIdent()) && !this.accept(n.TokenType.Percentage)) return this.finish(e, i.ParseError
						.PercentageExpected);
				return this._parseBody(e, this._parseRuleSetDeclaration.bind(this))
			}, e.prototype._tryParseKeyframeSelector = function() {
				var e = this.create(r.KeyframeSelector),
					t = this.mark();
				if (!e.addChild(this._parseIdent()) && !this.accept(n.TokenType.Percentage)) return null;
				for (; this.accept(n.TokenType.Comma);)
					if (!e.addChild(this._parseIdent()) && !this.accept(n.TokenType.Percentage)) return this.restoreAtMark(t), null;
				return this.peek(n.TokenType.CurlyL) ? this._parseBody(e, this._parseRuleSetDeclaration.bind(this)) : (this.restoreAtMark(
					t), null)
			}, e.prototype._parseSupports = function(e) {
				if (void 0 === e && (e = !1), !this.peekKeyword("@supports")) return null;
				var t = this.create(r.Supports);
				return this.consumeToken(), t.addChild(this._parseSupportsCondition()), this._parseBody(t, this._parseSupportsDeclaration
					.bind(this, e))
			}, e.prototype._parseSupportsDeclaration = function(e) {
				return void 0 === e && (e = !1), e ? this._tryParseRuleset(!0) || this._tryToParseDeclaration() || this._parseStylesheetStatement(
					!0) : this._parseStylesheetStatement(!1)
			}, e.prototype._parseSupportsCondition = function() {
				var e = this.create(r.SupportsCondition);
				if (this.acceptIdent("not")) e.addChild(this._parseSupportsConditionInParens());
				else if (e.addChild(this._parseSupportsConditionInParens()), this.peekRegExp(n.TokenType.Ident, /^(and|or)$/i))
					for (var t = this.token.text.toLowerCase(); this.acceptIdent(t);) e.addChild(this._parseSupportsConditionInParens());
				return this.finish(e)
			}, e.prototype._parseSupportsConditionInParens = function() {
				var e = this.create(r.SupportsCondition);
				if (this.accept(n.TokenType.ParenthesisL)) return this.prevToken && (e.lParent = this.prevToken.offset), e.addChild(
					this._tryToParseDeclaration([n.TokenType.ParenthesisR])) || this._parseSupportsCondition() ? this.accept(n.TokenType
					.ParenthesisR) ? (this.prevToken && (e.rParent = this.prevToken.offset), this.finish(e)) : this.finish(e, i.ParseError
					.RightParenthesisExpected, [n.TokenType.ParenthesisR], []) : this.finish(e, i.ParseError.ConditionExpected);
				if (this.peek(n.TokenType.Ident)) {
					var t = this.mark();
					if (this.consumeToken(), !this.hasWhitespace() && this.accept(n.TokenType.ParenthesisL)) {
						for (var o = 1; this.token.type !== n.TokenType.EOF && 0 !== o;) this.token.type === n.TokenType.ParenthesisL ?
							o++ : this.token.type === n.TokenType.ParenthesisR && o--, this.consumeToken();
						return this.finish(e)
					}
					this.restoreAtMark(t)
				}
				return this.finish(e, i.ParseError.LeftParenthesisExpected, [], [n.TokenType.ParenthesisL])
			}, e.prototype._parseMediaDeclaration = function(e) {
				return void 0 === e && (e = !1), e ? this._tryParseRuleset(!0) || this._tryToParseDeclaration() || this._parseStylesheetStatement(
					!0) : this._parseStylesheetStatement(!1)
			}, e.prototype._parseMedia = function(e) {
				if (void 0 === e && (e = !1), !this.peekKeyword("@media")) return null;
				var t = this.create(r.Media);
				return this.consumeToken(), t.addChild(this._parseMediaQueryList()) ? this._parseBody(t, this._parseMediaDeclaration
					.bind(this, e)) : this.finish(t, i.ParseError.MediaQueryExpected)
			}, e.prototype._parseMediaQueryList = function() {
				var e = this.create(r.Medialist);
				if (!e.addChild(this._parseMediaQuery([n.TokenType.CurlyL]))) return this.finish(e, i.ParseError.MediaQueryExpected);
				for (; this.accept(n.TokenType.Comma);)
					if (!e.addChild(this._parseMediaQuery([n.TokenType.CurlyL]))) return this.finish(e, i.ParseError.MediaQueryExpected);
				return this.finish(e)
			}, e.prototype._parseMediaQuery = function(e) {
				var t = this.create(r.MediaQuery),
					o = !0,
					s = !1;
				if (!this.peek(n.TokenType.ParenthesisL)) {
					if (this.acceptIdent("only") || this.acceptIdent("not"), !t.addChild(this._parseIdent())) return null;
					s = !0, o = this.acceptIdent("and")
				}
				for (; o;)
					if (t.addChild(this._parseMediaContentStart())) o = this.acceptIdent("and");
					else {
						if (!this.accept(n.TokenType.ParenthesisL)) return s ? this.finish(t, i.ParseError.LeftParenthesisExpected, [],
							e) : null;
						if (!t.addChild(this._parseMediaFeatureName())) return this.finish(t, i.ParseError.IdentifierExpected, [], e);
						if (this.accept(n.TokenType.Colon) && !t.addChild(this._parseExpr())) return this.finish(t, i.ParseError.TermExpected,
							[], e);
						if (!this.accept(n.TokenType.ParenthesisR)) return this.finish(t, i.ParseError.RightParenthesisExpected, [], e);
						o = this.acceptIdent("and")
					} return this.finish(t)
			}, e.prototype._parseMediaContentStart = function() {
				return null
			}, e.prototype._parseMediaFeatureName = function() {
				return this._parseIdent()
			}, e.prototype._parseMedium = function() {
				var e = this.create(r.Node);
				return e.addChild(this._parseIdent()) ? this.finish(e) : null
			}, e.prototype._parsePageDeclaration = function() {
				return this._parsePageMarginBox() || this._parseRuleSetDeclaration()
			}, e.prototype._parsePage = function() {
				if (!this.peekKeyword("@page")) return null;
				var e = this.create(r.Page);
				if (this.consumeToken(), e.addChild(this._parsePageSelector()))
					for (; this.accept(n.TokenType.Comma);)
						if (!e.addChild(this._parsePageSelector())) return this.finish(e, i.ParseError.IdentifierExpected);
				return this._parseBody(e, this._parsePageDeclaration.bind(this))
			}, e.prototype._parsePageMarginBox = function() {
				if (!this.peek(n.TokenType.AtKeyword)) return null;
				var e = this.create(r.PageBoxMarginBox);
				return this.acceptOneKeyword(o.pageBoxDirectives) || this.markError(e, i.ParseError.UnknownAtRule, [], [n.TokenType
					.CurlyL
				]), this._parseBody(e, this._parseRuleSetDeclaration.bind(this))
			}, e.prototype._parsePageSelector = function() {
				if (!this.peek(n.TokenType.Ident) && !this.peek(n.TokenType.Colon)) return null;
				var e = this.create(r.Node);
				return e.addChild(this._parseIdent()), this.accept(n.TokenType.Colon) && !e.addChild(this._parseIdent()) ? this.finish(
					e, i.ParseError.IdentifierExpected) : this.finish(e)
			}, e.prototype._parseDocument = function() {
				if (!this.peekKeyword("@-moz-document")) return null;
				var e = this.create(r.Document);
				return this.consumeToken(), this.resync([], [n.TokenType.CurlyL]), this._parseBody(e, this._parseStylesheetStatement
					.bind(this))
			}, e.prototype._parseUnknownAtRule = function() {
				if (!this.peek(n.TokenType.AtKeyword)) return null;
				var e = this.create(r.UnknownAtRule);
				e.addChild(this._parseUnknownAtRuleName());
				var t = 0,
					o = 0,
					s = 0,
					a = 0;
				e: for (;;) {
					switch (this.token.type) {
						case n.TokenType.SemiColon:
							if (0 === o && 0 === s && 0 === a) break e;
							break;
						case n.TokenType.EOF:
							return o > 0 ? this.finish(e, i.ParseError.RightCurlyExpected) : a > 0 ? this.finish(e, i.ParseError.RightSquareBracketExpected) :
								s > 0 ? this.finish(e, i.ParseError.RightParenthesisExpected) : this.finish(e);
						case n.TokenType.CurlyL:
							t++, o++;
							break;
						case n.TokenType.CurlyR:
							if (o--, t > 0 && 0 === o) {
								if (this.consumeToken(), a > 0) return this.finish(e, i.ParseError.RightSquareBracketExpected);
								if (s > 0) return this.finish(e, i.ParseError.RightParenthesisExpected);
								break e
							}
							if (o < 0) {
								if (0 === s && 0 === a) break e;
								return this.finish(e, i.ParseError.LeftCurlyExpected)
							}
							break;
						case n.TokenType.ParenthesisL:
							s++;
							break;
						case n.TokenType.ParenthesisR:
							if (--s < 0) return this.finish(e, i.ParseError.LeftParenthesisExpected);
							break;
						case n.TokenType.BracketL:
							a++;
							break;
						case n.TokenType.BracketR:
							if (--a < 0) return this.finish(e, i.ParseError.LeftSquareBracketExpected)
					}
					this.consumeToken()
				}
				return e
			}, e.prototype._parseUnknownAtRuleName = function() {
				var e = this.create(r.Node);
				return this.accept(n.TokenType.AtKeyword) ? this.finish(e) : e
			}, e.prototype._parseOperator = function() {
				if (this.peekDelim("/") || this.peekDelim("*") || this.peekDelim("+") || this.peekDelim("-") || this.peek(n.TokenType
						.Dashmatch) || this.peek(n.TokenType.Includes) || this.peek(n.TokenType.SubstringOperator) || this.peek(n.TokenType
						.PrefixOperator) || this.peek(n.TokenType.SuffixOperator) || this.peekDelim("=")) {
					var e = this.createNode(r.NodeType.Operator);
					return this.consumeToken(), this.finish(e)
				}
				return null
			}, e.prototype._parseUnaryOperator = function() {
				if (!this.peekDelim("+") && !this.peekDelim("-")) return null;
				var e = this.create(r.Node);
				return this.consumeToken(), this.finish(e)
			}, e.prototype._parseCombinator = function() {
				if (this.peekDelim(">")) {
					var e = this.create(r.Node);
					this.consumeToken();
					var t = this.mark();
					if (!this.hasWhitespace() && this.acceptDelim(">")) {
						if (!this.hasWhitespace() && this.acceptDelim(">")) return e.type = r.NodeType.SelectorCombinatorShadowPiercingDescendant,
							this.finish(e);
						this.restoreAtMark(t)
					}
					return e.type = r.NodeType.SelectorCombinatorParent, this.finish(e)
				}
				if (this.peekDelim("+")) {
					e = this.create(r.Node);
					return this.consumeToken(), e.type = r.NodeType.SelectorCombinatorSibling, this.finish(e)
				}
				if (this.peekDelim("~")) {
					e = this.create(r.Node);
					return this.consumeToken(), e.type = r.NodeType.SelectorCombinatorAllSiblings, this.finish(e)
				}
				if (this.peekDelim("/")) {
					e = this.create(r.Node);
					this.consumeToken();
					t = this.mark();
					if (!this.hasWhitespace() && this.acceptIdent("deep") && !this.hasWhitespace() && this.acceptDelim("/")) return e
						.type = r.NodeType.SelectorCombinatorShadowPiercingDescendant, this.finish(e);
					this.restoreAtMark(t)
				}
				return null
			}, e.prototype._parseSimpleSelector = function() {
				var e = this.create(r.SimpleSelector),
					t = 0;
				for (e.addChild(this._parseElementName()) && t++;
					(0 === t || !this.hasWhitespace()) && e.addChild(this._parseSimpleSelectorBody());) t++;
				return t > 0 ? this.finish(e) : null
			}, e.prototype._parseSimpleSelectorBody = function() {
				return this._parsePseudo() || this._parseHash() || this._parseClass() || this._parseAttrib()
			}, e.prototype._parseSelectorIdent = function() {
				return this._parseIdent()
			}, e.prototype._parseHash = function() {
				if (!this.peek(n.TokenType.Hash) && !this.peekDelim("#")) return null;
				var e = this.createNode(r.NodeType.IdentifierSelector);
				if (this.acceptDelim("#")) {
					if (this.hasWhitespace() || !e.addChild(this._parseSelectorIdent())) return this.finish(e, i.ParseError.IdentifierExpected)
				} else this.consumeToken();
				return this.finish(e)
			}, e.prototype._parseClass = function() {
				if (!this.peekDelim(".")) return null;
				var e = this.createNode(r.NodeType.ClassSelector);
				return this.consumeToken(), this.hasWhitespace() || !e.addChild(this._parseSelectorIdent()) ? this.finish(e, i.ParseError
					.IdentifierExpected) : this.finish(e)
			}, e.prototype._parseElementName = function() {
				var e = this.mark(),
					t = this.createNode(r.NodeType.ElementNameSelector);
				return t.addChild(this._parseNamespacePrefix()), t.addChild(this._parseSelectorIdent()) || this.acceptDelim("*") ?
					this.finish(t) : (this.restoreAtMark(e), null)
			}, e.prototype._parseNamespacePrefix = function() {
				var e = this.mark(),
					t = this.createNode(r.NodeType.NamespacePrefix);
				return !t.addChild(this._parseIdent()) && this.acceptDelim("*"), this.acceptDelim("|") ? this.finish(t) : (this.restoreAtMark(
					e), null)
			}, e.prototype._parseAttrib = function() {
				if (!this.peek(n.TokenType.BracketL)) return null;
				var e = this.create(r.AttributeSelector);
				return this.consumeToken(), e.setNamespacePrefix(this._parseNamespacePrefix()), e.setIdentifier(this._parseIdent()) ?
					(e.setOperator(this._parseOperator()) && (e.setValue(this._parseBinaryExpr()), this.acceptIdent("i")), this.accept(
						n.TokenType.BracketR) ? this.finish(e) : this.finish(e, i.ParseError.RightSquareBracketExpected)) : this.finish(
						e, i.ParseError.IdentifierExpected)
			}, e.prototype._parsePseudo = function() {
				var e = this,
					t = this._tryParsePseudoIdentifier();
				if (t) {
					if (!this.hasWhitespace() && this.accept(n.TokenType.ParenthesisL)) {
						if (t.addChild(this.try((function() {
								var t = e.create(r.Node);
								if (!t.addChild(e._parseSelector(!1))) return null;
								for (; e.accept(n.TokenType.Comma) && t.addChild(e._parseSelector(!1)););
								return e.peek(n.TokenType.ParenthesisR) ? e.finish(t) : null
							})) || this._parseBinaryExpr()), !this.accept(n.TokenType.ParenthesisR)) return this.finish(t, i.ParseError.RightParenthesisExpected)
					}
					return this.finish(t)
				}
				return null
			}, e.prototype._tryParsePseudoIdentifier = function() {
				if (!this.peek(n.TokenType.Colon)) return null;
				var e = this.mark(),
					t = this.createNode(r.NodeType.PseudoSelector);
				return this.consumeToken(), this.hasWhitespace() ? (this.restoreAtMark(e), null) : (this.accept(n.TokenType.Colon),
					this.hasWhitespace() || !t.addChild(this._parseIdent()) ? this.finish(t, i.ParseError.IdentifierExpected) :
					this.finish(t))
			}, e.prototype._tryParsePrio = function() {
				var e = this.mark(),
					t = this._parsePrio();
				return t || (this.restoreAtMark(e), null)
			}, e.prototype._parsePrio = function() {
				if (!this.peek(n.TokenType.Exclamation)) return null;
				var e = this.createNode(r.NodeType.Prio);
				return this.accept(n.TokenType.Exclamation) && this.acceptIdent("important") ? this.finish(e) : null
			}, e.prototype._parseExpr = function(e) {
				void 0 === e && (e = !1);
				var t = this.create(r.Expression);
				if (!t.addChild(this._parseBinaryExpr())) return null;
				for (;;) {
					if (this.peek(n.TokenType.Comma)) {
						if (e) return this.finish(t);
						this.consumeToken()
					}
					if (!t.addChild(this._parseBinaryExpr())) break
				}
				return this.finish(t)
			}, e.prototype._parseNamedLine = function() {
				if (!this.peek(n.TokenType.BracketL)) return null;
				var e = this.createNode(r.NodeType.GridLine);
				for (this.consumeToken(); e.addChild(this._parseIdent()););
				return this.accept(n.TokenType.BracketR) ? this.finish(e) : this.finish(e, i.ParseError.RightSquareBracketExpected)
			}, e.prototype._parseBinaryExpr = function(e, t) {
				var n = this.create(r.BinaryExpression);
				if (!n.setLeft(e || this._parseTerm())) return null;
				if (!n.setOperator(t || this._parseOperator())) return this.finish(n);
				if (!n.setRight(this._parseTerm())) return this.finish(n, i.ParseError.TermExpected);
				n = this.finish(n);
				var o = this._parseOperator();
				return o && (n = this._parseBinaryExpr(n, o)), this.finish(n)
			}, e.prototype._parseTerm = function() {
				var e = this.create(r.Term);
				return e.setOperator(this._parseUnaryOperator()), e.setExpression(this._parseTermExpression()) ? this.finish(e) :
					null
			}, e.prototype._parseTermExpression = function() {
				return this._parseURILiteral() || this._parseFunction() || this._parseIdent() || this._parseStringLiteral() ||
					this._parseNumeric() || this._parseHexColor() || this._parseOperation() || this._parseNamedLine()
			}, e.prototype._parseOperation = function() {
				if (!this.peek(n.TokenType.ParenthesisL)) return null;
				var e = this.create(r.Node);
				return this.consumeToken(), e.addChild(this._parseExpr()), this.accept(n.TokenType.ParenthesisR) ? this.finish(e) :
					this.finish(e, i.ParseError.RightParenthesisExpected)
			}, e.prototype._parseNumeric = function() {
				if (this.peek(n.TokenType.Num) || this.peek(n.TokenType.Percentage) || this.peek(n.TokenType.Resolution) || this
					.peek(n.TokenType.Length) || this.peek(n.TokenType.EMS) || this.peek(n.TokenType.EXS) || this.peek(n.TokenType.Angle) ||
					this.peek(n.TokenType.Time) || this.peek(n.TokenType.Dimension) || this.peek(n.TokenType.Freq)) {
					var e = this.create(r.NumericValue);
					return this.consumeToken(), this.finish(e)
				}
				return null
			}, e.prototype._parseStringLiteral = function() {
				if (!this.peek(n.TokenType.String) && !this.peek(n.TokenType.BadString)) return null;
				var e = this.createNode(r.NodeType.StringLiteral);
				return this.consumeToken(), this.finish(e)
			}, e.prototype._parseURILiteral = function() {
				if (!this.peekRegExp(n.TokenType.Ident, /^url(-prefix)?$/i)) return null;
				var e = this.mark(),
					t = this.createNode(r.NodeType.URILiteral);
				return this.accept(n.TokenType.Ident), this.hasWhitespace() || !this.peek(n.TokenType.ParenthesisL) ? (this.restoreAtMark(
					e), null) : (this.scanner.inURL = !0, this.consumeToken(), t.addChild(this._parseURLArgument()), this.scanner.inURL = !
					1, this.accept(n.TokenType.ParenthesisR) ? this.finish(t) : this.finish(t, i.ParseError.RightParenthesisExpected)
				)
			}, e.prototype._parseURLArgument = function() {
				var e = this.create(r.Node);
				return this.accept(n.TokenType.String) || this.accept(n.TokenType.BadString) || this.acceptUnquotedString() ?
					this.finish(e) : null
			}, e.prototype._parseIdent = function(e) {
				if (!this.peek(n.TokenType.Ident)) return null;
				var t = this.create(r.Identifier);
				return e && (t.referenceTypes = e), t.isCustomProperty = this.peekRegExp(n.TokenType.Ident, /^--/), this.consumeToken(),
					this.finish(t)
			}, e.prototype._parseFunction = function() {
				var e = this.mark(),
					t = this.create(r.Function);
				if (!t.setIdentifier(this._parseFunctionIdentifier())) return null;
				if (this.hasWhitespace() || !this.accept(n.TokenType.ParenthesisL)) return this.restoreAtMark(e), null;
				if (t.getArguments().addChild(this._parseFunctionArgument()))
					for (; this.accept(n.TokenType.Comma) && !this.peek(n.TokenType.ParenthesisR);) t.getArguments().addChild(this._parseFunctionArgument()) ||
						this.markError(t, i.ParseError.ExpressionExpected);
				return this.accept(n.TokenType.ParenthesisR) ? this.finish(t) : this.finish(t, i.ParseError.RightParenthesisExpected)
			}, e.prototype._parseFunctionIdentifier = function() {
				if (!this.peek(n.TokenType.Ident)) return null;
				var e = this.create(r.Identifier);
				if (e.referenceTypes = [r.ReferenceType.Function], this.acceptIdent("progid")) {
					if (this.accept(n.TokenType.Colon))
						for (; this.accept(n.TokenType.Ident) && this.acceptDelim("."););
					return this.finish(e)
				}
				return this.consumeToken(), this.finish(e)
			}, e.prototype._parseFunctionArgument = function() {
				var e = this.create(r.FunctionArgument);
				return e.setValue(this._parseExpr(!0)) ? this.finish(e) : null
			}, e.prototype._parseHexColor = function() {
				if (this.peekRegExp(n.TokenType.Hash, /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/g)) {
					var e = this.create(r.HexColorValue);
					return this.consumeToken(), this.finish(e)
				}
				return null
			}, e
		}();
	t.Parser = a
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/utils/arrays", ["require",
		"exports"
	], e)
}((function(e, t) {
	"use strict";

	function n(e, t) {
		return -1 !== e.indexOf(t)
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.union = t.includes = t.findFirst = void 0, t.findFirst = function(e, t) {
		var n = 0,
			r = e.length;
		if (0 === r) return 0;
		for (; n < r;) {
			var i = Math.floor((n + r) / 2);
			t(e[i]) ? r = i : n = i + 1
		}
		return n
	}, t.includes = n, t.union = function() {
		for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
		for (var r = [], i = 0, o = e; i < o.length; i++)
			for (var s = o[i], a = 0, l = s; a < l.length; a++) {
				var c = l[a];
				n(r, c) || r.push(c)
			}
		return r
	}
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/cssSymbolScope", [
		"require", "exports", "./cssNodes", "../utils/arrays"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.Symbols = t.ScopeBuilder = t.Symbol = t.GlobalScope = t.Scope = void 0;
	var n = e("./cssNodes"),
		r = e("../utils/arrays"),
		i = function() {
			function e(e, t) {
				this.offset = e, this.length = t, this.symbols = [], this.parent = null, this.children = []
			}
			return e.prototype.addChild = function(e) {
				this.children.push(e), e.setParent(this)
			}, e.prototype.setParent = function(e) {
				this.parent = e
			}, e.prototype.findScope = function(e, t) {
				return void 0 === t && (t = 0), this.offset <= e && this.offset + this.length > e + t || this.offset === e &&
					this.length === t ? this.findInScope(e, t) : null
			}, e.prototype.findInScope = function(e, t) {
				void 0 === t && (t = 0);
				var n = e + t,
					i = r.findFirst(this.children, (function(e) {
						return e.offset > n
					}));
				if (0 === i) return this;
				var o = this.children[i - 1];
				return o.offset <= e && o.offset + o.length >= e + t ? o.findInScope(e, t) : this
			}, e.prototype.addSymbol = function(e) {
				this.symbols.push(e)
			}, e.prototype.getSymbol = function(e, t) {
				for (var n = 0; n < this.symbols.length; n++) {
					var r = this.symbols[n];
					if (r.name === e && r.type === t) return r
				}
				return null
			}, e.prototype.getSymbols = function() {
				return this.symbols
			}, e
		}();
	t.Scope = i;
	var o = function(e) {
		function t() {
			return e.call(this, 0, Number.MAX_VALUE) || this
		}
		return __extends(t, e), t
	}(i);
	t.GlobalScope = o;
	var s = function(e, t, n, r) {
		this.name = e, this.value = t, this.node = n, this.type = r
	};
	t.Symbol = s;
	var a = function() {
		function e(e) {
			this.scope = e
		}
		return e.prototype.addSymbol = function(e, t, n, r) {
			if (-1 !== e.offset) {
				var i = this.scope.findScope(e.offset, e.length);
				i && i.addSymbol(new s(t, n, e, r))
			}
		}, e.prototype.addScope = function(e) {
			if (-1 !== e.offset) {
				var t = this.scope.findScope(e.offset, e.length);
				if (t && (t.offset !== e.offset || t.length !== e.length)) {
					var n = new i(e.offset, e.length);
					return t.addChild(n), n
				}
				return t
			}
			return null
		}, e.prototype.addSymbolToChildScope = function(e, t, n, r, i) {
			if (e && -1 !== e.offset) {
				var o = this.addScope(e);
				o && o.addSymbol(new s(n, r, t, i))
			}
		}, e.prototype.visitNode = function(e) {
			switch (e.type) {
				case n.NodeType.Keyframe:
					return this.addSymbol(e, e.getName(), void 0, n.ReferenceType.Keyframe), !0;
				case n.NodeType.CustomPropertyDeclaration:
					return this.visitCustomPropertyDeclarationNode(e);
				case n.NodeType.VariableDeclaration:
					return this.visitVariableDeclarationNode(e);
				case n.NodeType.Ruleset:
					return this.visitRuleSet(e);
				case n.NodeType.MixinDeclaration:
					return this.addSymbol(e, e.getName(), void 0, n.ReferenceType.Mixin), !0;
				case n.NodeType.FunctionDeclaration:
					return this.addSymbol(e, e.getName(), void 0, n.ReferenceType.Function), !0;
				case n.NodeType.FunctionParameter:
					return this.visitFunctionParameterNode(e);
				case n.NodeType.Declarations:
					return this.addScope(e), !0;
				case n.NodeType.For:
					var t = e,
						r = t.getDeclarations();
					return r && t.variable && this.addSymbolToChildScope(r, t.variable, t.variable.getName(), void 0, n.ReferenceType
						.Variable), !0;
				case n.NodeType.Each:
					var i = e,
						o = i.getDeclarations();
					if (o)
						for (var s = 0, a = i.getVariables().getChildren(); s < a.length; s++) {
							var l = a[s];
							this.addSymbolToChildScope(o, l, l.getName(), void 0, n.ReferenceType.Variable)
						}
					return !0
			}
			return !0
		}, e.prototype.visitRuleSet = function(e) {
			var t = this.scope.findScope(e.offset, e.length);
			if (t)
				for (var r = 0, i = e.getSelectors().getChildren(); r < i.length; r++) {
					var o = i[r];
					o instanceof n.Selector && 1 === o.getChildren().length && t.addSymbol(new s(o.getChild(0).getText(), void 0,
						o, n.ReferenceType.Rule))
				}
			return !0
		}, e.prototype.visitVariableDeclarationNode = function(e) {
			var t = e.getValue() ? e.getValue().getText() : void 0;
			return this.addSymbol(e, e.getName(), t, n.ReferenceType.Variable), !0
		}, e.prototype.visitFunctionParameterNode = function(e) {
			var t = e.getParent().getDeclarations();
			if (t) {
				var r = e.getDefaultValue(),
					i = r ? r.getText() : void 0;
				this.addSymbolToChildScope(t, e, e.getName(), i, n.ReferenceType.Variable)
			}
			return !0
		}, e.prototype.visitCustomPropertyDeclarationNode = function(e) {
			var t = e.getValue() ? e.getValue().getText() : "";
			return this.addCSSVariable(e.getProperty(), e.getProperty().getName(), t, n.ReferenceType.Variable), !0
		}, e.prototype.addCSSVariable = function(e, t, n, r) {
			-1 !== e.offset && this.scope.addSymbol(new s(t, n, e, r))
		}, e
	}();
	t.ScopeBuilder = a;
	var l = function() {
		function e(e) {
			this.global = new o, e.acceptVisitor(new a(this.global))
		}
		return e.prototype.findSymbolsAtOffset = function(e, t) {
			for (var n = this.global.findScope(e, 0), r = [], i = {}; n;) {
				for (var o = n.getSymbols(), s = 0; s < o.length; s++) {
					var a = o[s];
					a.type !== t || i[a.name] || (r.push(a), i[a.name] = !0)
				}
				n = n.parent
			}
			return r
		}, e.prototype.internalFindSymbol = function(e, t) {
			var r = e;
			if (e.parent instanceof n.FunctionParameter && e.parent.getParent() instanceof n.BodyDeclaration && (r = e.parent
					.getParent().getDeclarations()), e.parent instanceof n.FunctionArgument && e.parent.getParent() instanceof n.Function) {
				var i = e.parent.getParent().getIdentifier();
				if (i) {
					var o = this.internalFindSymbol(i, [n.ReferenceType.Function]);
					o && (r = o.node.getDeclarations())
				}
			}
			if (!r) return null;
			for (var s = e.getText(), a = this.global.findScope(r.offset, r.length); a;) {
				for (var l = 0; l < t.length; l++) {
					var c = t[l],
						d = a.getSymbol(s, c);
					if (d) return d
				}
				a = a.parent
			}
			return null
		}, e.prototype.evaluateReferenceTypes = function(e) {
			if (e instanceof n.Identifier) {
				var t = e.referenceTypes;
				if (t) return t;
				if (e.isCustomProperty) return [n.ReferenceType.Variable];
				var r = n.getParentDeclaration(e);
				if (r) {
					var i = r.getNonPrefixedPropertyName();
					if (("animation" === i || "animation-name" === i) && r.getValue() && r.getValue().offset === e.offset) return [
						n.ReferenceType.Keyframe
					]
				}
			} else if (e instanceof n.Variable) return [n.ReferenceType.Variable];
			return e.findAParent(n.NodeType.Selector, n.NodeType.ExtendsReference) ? [n.ReferenceType.Rule] : null
		}, e.prototype.findSymbolFromNode = function(e) {
			if (!e) return null;
			for (; e.type === n.NodeType.Interpolation;) e = e.getParent();
			var t = this.evaluateReferenceTypes(e);
			return t ? this.internalFindSymbol(e, t) : null
		}, e.prototype.matchesSymbol = function(e, t) {
			if (!e) return !1;
			for (; e.type === n.NodeType.Interpolation;) e = e.getParent();
			if (!e.matches(t.name)) return !1;
			var r = this.evaluateReferenceTypes(e);
			return !(!r || -1 === r.indexOf(t.type)) && this.internalFindSymbol(e, r) === t
		}, e.prototype.findSymbol = function(e, t, n) {
			for (var r = this.global.findScope(n); r;) {
				var i = r.getSymbol(e, t);
				if (i) return i;
				r = r.parent
			}
			return null
		}, e
	}();
	t.Symbols = l
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-languageserver-types/main", ["require", "exports"],
		e)
}((function(e, t) {
	"use strict";
	var n, r, i, o, s, a, l, c, d, p, h, u, m, f, g, b, y;
	Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.TextDocument = t.EOL = t.SelectionRange = t.DocumentLink = t.FormattingOptions = t.CodeLens = t.CodeAction =
		t.CodeActionContext = t.CodeActionKind = t.DocumentSymbol = t.SymbolInformation = t.SymbolTag = t.SymbolKind = t.DocumentHighlight =
		t.DocumentHighlightKind = t.SignatureInformation = t.ParameterInformation = t.Hover = t.MarkedString = t.CompletionList =
		t.CompletionItem = t.InsertTextMode = t.InsertReplaceEdit = t.CompletionItemTag = t.InsertTextFormat = t.CompletionItemKind =
		t.MarkupContent = t.MarkupKind = t.TextDocumentItem = t.OptionalVersionedTextDocumentIdentifier = t.VersionedTextDocumentIdentifier =
		t.TextDocumentIdentifier = t.WorkspaceChange = t.WorkspaceEdit = t.DeleteFile = t.RenameFile = t.CreateFile = t.TextDocumentEdit =
		t.AnnotatedTextEdit = t.ChangeAnnotationIdentifier = t.ChangeAnnotation = t.TextEdit = t.Command = t.Diagnostic = t
		.CodeDescription = t.DiagnosticTag = t.DiagnosticSeverity = t.DiagnosticRelatedInformation = t.FoldingRange = t.FoldingRangeKind =
		t.ColorPresentation = t.ColorInformation = t.Color = t.LocationLink = t.Location = t.Range = t.Position = t.uinteger =
		t.integer = void 0,
		function(e) {
			e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647
		}(t.integer || (t.integer = {})),
		function(e) {
			e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647
		}(n = t.uinteger || (t.uinteger = {})),
		function(e) {
			e.create = function(e, t) {
				return e === Number.MAX_VALUE && (e = n.MAX_VALUE), t === Number.MAX_VALUE && (t = n.MAX_VALUE), {
					line: e,
					character: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.objectLiteral(t) && E.uinteger(t.line) && E.uinteger(t.character)
			}
		}(r = t.Position || (t.Position = {})),
		function(e) {
			e.create = function(e, t, n, i) {
				if (E.uinteger(e) && E.uinteger(t) && E.uinteger(n) && E.uinteger(i)) return {
					start: r.create(e, t),
					end: r.create(n, i)
				};
				if (r.is(e) && r.is(t)) return {
					start: e,
					end: t
				};
				throw new Error("Range#create called with invalid arguments[" + e + ", " + t + ", " + n + ", " + i + "]")
			}, e.is = function(e) {
				var t = e;
				return E.objectLiteral(t) && r.is(t.start) && r.is(t.end)
			}
		}(i = t.Range || (t.Range = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					uri: e,
					range: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && i.is(t.range) && (E.string(t.uri) || E.undefined(t.uri))
			}
		}(o = t.Location || (t.Location = {})),
		function(e) {
			e.create = function(e, t, n, r) {
				return {
					targetUri: e,
					targetRange: t,
					targetSelectionRange: n,
					originSelectionRange: r
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && i.is(t.targetRange) && E.string(t.targetUri) && (i.is(t.targetSelectionRange) || E.undefined(
					t.targetSelectionRange)) && (i.is(t.originSelectionRange) || E.undefined(t.originSelectionRange))
			}
		}(t.LocationLink || (t.LocationLink = {})),
		function(e) {
			e.create = function(e, t, n, r) {
				return {
					red: e,
					green: t,
					blue: n,
					alpha: r
				}
			}, e.is = function(e) {
				var t = e;
				return E.numberRange(t.red, 0, 1) && E.numberRange(t.green, 0, 1) && E.numberRange(t.blue, 0, 1) && E.numberRange(
					t.alpha, 0, 1)
			}
		}(s = t.Color || (t.Color = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					range: e,
					color: t
				}
			}, e.is = function(e) {
				var t = e;
				return i.is(t.range) && s.is(t.color)
			}
		}(t.ColorInformation || (t.ColorInformation = {})),
		function(e) {
			e.create = function(e, t, n) {
				return {
					label: e,
					textEdit: t,
					additionalTextEdits: n
				}
			}, e.is = function(e) {
				var t = e;
				return E.string(t.label) && (E.undefined(t.textEdit) || d.is(t)) && (E.undefined(t.additionalTextEdits) || E.typedArray(
					t.additionalTextEdits, d.is))
			}
		}(t.ColorPresentation || (t.ColorPresentation = {})),
		function(e) {
			e.Comment = "comment", e.Imports = "imports", e.Region = "region"
		}(t.FoldingRangeKind || (t.FoldingRangeKind = {})),
		function(e) {
			e.create = function(e, t, n, r, i) {
				var o = {
					startLine: e,
					endLine: t
				};
				return E.defined(n) && (o.startCharacter = n), E.defined(r) && (o.endCharacter = r), E.defined(i) && (o.kind = i),
					o
			}, e.is = function(e) {
				var t = e;
				return E.uinteger(t.startLine) && E.uinteger(t.startLine) && (E.undefined(t.startCharacter) || E.uinteger(t.startCharacter)) &&
					(E.undefined(t.endCharacter) || E.uinteger(t.endCharacter)) && (E.undefined(t.kind) || E.string(t.kind))
			}
		}(t.FoldingRange || (t.FoldingRange = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					location: e,
					message: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && o.is(t.location) && E.string(t.message)
			}
		}(a = t.DiagnosticRelatedInformation || (t.DiagnosticRelatedInformation = {})),
		function(e) {
			e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4
		}(t.DiagnosticSeverity || (t.DiagnosticSeverity = {})),
		function(e) {
			e.Unnecessary = 1, e.Deprecated = 2
		}(t.DiagnosticTag || (t.DiagnosticTag = {})),
		function(e) {
			e.is = function(e) {
				var t = e;
				return null != t && E.string(t.href)
			}
		}(t.CodeDescription || (t.CodeDescription = {})),
		function(e) {
			e.create = function(e, t, n, r, i, o) {
				var s = {
					range: e,
					message: t
				};
				return E.defined(n) && (s.severity = n), E.defined(r) && (s.code = r), E.defined(i) && (s.source = i), E.defined(
					o) && (s.relatedInformation = o), s
			}, e.is = function(e) {
				var t, n = e;
				return E.defined(n) && i.is(n.range) && E.string(n.message) && (E.number(n.severity) || E.undefined(n.severity)) &&
					(E.integer(n.code) || E.string(n.code) || E.undefined(n.code)) && (E.undefined(n.codeDescription) || E.string(
						null === (t = n.codeDescription) || void 0 === t ? void 0 : t.href)) && (E.string(n.source) || E.undefined(n.source)) &&
					(E.undefined(n.relatedInformation) || E.typedArray(n.relatedInformation, a.is))
			}
		}(l = t.Diagnostic || (t.Diagnostic = {})),
		function(e) {
			e.create = function(e, t) {
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				var i = {
					title: e,
					command: t
				};
				return E.defined(n) && n.length > 0 && (i.arguments = n), i
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.string(t.title) && E.string(t.command)
			}
		}(c = t.Command || (t.Command = {})),
		function(e) {
			e.replace = function(e, t) {
				return {
					range: e,
					newText: t
				}
			}, e.insert = function(e, t) {
				return {
					range: {
						start: e,
						end: e
					},
					newText: t
				}
			}, e.del = function(e) {
				return {
					range: e,
					newText: ""
				}
			}, e.is = function(e) {
				var t = e;
				return E.objectLiteral(t) && E.string(t.newText) && i.is(t.range)
			}
		}(d = t.TextEdit || (t.TextEdit = {})),
		function(e) {
			e.create = function(e, t, n) {
				var r = {
					label: e
				};
				return void 0 !== t && (r.needsConfirmation = t), void 0 !== n && (r.description = n), r
			}, e.is = function(e) {
				var t = e;
				return void 0 !== t && E.objectLiteral(t) && E.string(t.label) && (E.boolean(t.needsConfirmation) || void 0 ===
					t.needsConfirmation) && (E.string(t.description) || void 0 === t.description)
			}
		}(p = t.ChangeAnnotation || (t.ChangeAnnotation = {})),
		function(e) {
			e.is = function(e) {
				return "string" == typeof e
			}
		}(h = t.ChangeAnnotationIdentifier || (t.ChangeAnnotationIdentifier = {})),
		function(e) {
			e.replace = function(e, t, n) {
				return {
					range: e,
					newText: t,
					annotationId: n
				}
			}, e.insert = function(e, t, n) {
				return {
					range: {
						start: e,
						end: e
					},
					newText: t,
					annotationId: n
				}
			}, e.del = function(e, t) {
				return {
					range: e,
					newText: "",
					annotationId: t
				}
			}, e.is = function(e) {
				var t = e;
				return d.is(t) && (p.is(t.annotationId) || h.is(t.annotationId))
			}
		}(u = t.AnnotatedTextEdit || (t.AnnotatedTextEdit = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					textDocument: e,
					edits: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && v.is(t.textDocument) && Array.isArray(t.edits)
			}
		}(m = t.TextDocumentEdit || (t.TextDocumentEdit = {})),
		function(e) {
			e.create = function(e, t, n) {
				var r = {
					kind: "create",
					uri: e
				};
				return void 0 === t || void 0 === t.overwrite && void 0 === t.ignoreIfExists || (r.options = t), void 0 !== n &&
					(r.annotationId = n), r
			}, e.is = function(e) {
				var t = e;
				return t && "create" === t.kind && E.string(t.uri) && (void 0 === t.options || (void 0 === t.options.overwrite ||
						E.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || E.boolean(t.options.ignoreIfExists))) &&
					(void 0 === t.annotationId || h.is(t.annotationId))
			}
		}(f = t.CreateFile || (t.CreateFile = {})),
		function(e) {
			e.create = function(e, t, n, r) {
				var i = {
					kind: "rename",
					oldUri: e,
					newUri: t
				};
				return void 0 === n || void 0 === n.overwrite && void 0 === n.ignoreIfExists || (i.options = n), void 0 !== r &&
					(i.annotationId = r), i
			}, e.is = function(e) {
				var t = e;
				return t && "rename" === t.kind && E.string(t.oldUri) && E.string(t.newUri) && (void 0 === t.options || (void 0 ===
					t.options.overwrite || E.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || E.boolean(t
					.options.ignoreIfExists))) && (void 0 === t.annotationId || h.is(t.annotationId))
			}
		}(g = t.RenameFile || (t.RenameFile = {})),
		function(e) {
			e.create = function(e, t, n) {
				var r = {
					kind: "delete",
					uri: e
				};
				return void 0 === t || void 0 === t.recursive && void 0 === t.ignoreIfNotExists || (r.options = t), void 0 !==
					n && (r.annotationId = n), r
			}, e.is = function(e) {
				var t = e;
				return t && "delete" === t.kind && E.string(t.uri) && (void 0 === t.options || (void 0 === t.options.recursive ||
						E.boolean(t.options.recursive)) && (void 0 === t.options.ignoreIfNotExists || E.boolean(t.options.ignoreIfNotExists))) &&
					(void 0 === t.annotationId || h.is(t.annotationId))
			}
		}(b = t.DeleteFile || (t.DeleteFile = {})),
		function(e) {
			e.is = function(e) {
				var t = e;
				return t && (void 0 !== t.changes || void 0 !== t.documentChanges) && (void 0 === t.documentChanges || t.documentChanges
					.every((function(e) {
						return E.string(e.kind) ? f.is(e) || g.is(e) || b.is(e) : m.is(e)
					})))
			}
		}(y = t.WorkspaceEdit || (t.WorkspaceEdit = {}));
	var v, w, x, S, k = function() {
			function e(e, t) {
				this.edits = e, this.changeAnnotations = t
			}
			return e.prototype.insert = function(e, t, n) {
				var r, i;
				if (void 0 === n ? r = d.insert(e, t) : h.is(n) ? (i = n, r = u.insert(e, t, n)) : (this.assertChangeAnnotations(
						this.changeAnnotations), i = this.changeAnnotations.manage(n), r = u.insert(e, t, i)), this.edits.push(r),
					void 0 !== i) return i
			}, e.prototype.replace = function(e, t, n) {
				var r, i;
				if (void 0 === n ? r = d.replace(e, t) : h.is(n) ? (i = n, r = u.replace(e, t, n)) : (this.assertChangeAnnotations(
						this.changeAnnotations), i = this.changeAnnotations.manage(n), r = u.replace(e, t, i)), this.edits.push(r),
					void 0 !== i) return i
			}, e.prototype.delete = function(e, t) {
				var n, r;
				if (void 0 === t ? n = d.del(e) : h.is(t) ? (r = t, n = u.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations),
						r = this.changeAnnotations.manage(t), n = u.del(e, r)), this.edits.push(n), void 0 !== r) return r
			}, e.prototype.add = function(e) {
				this.edits.push(e)
			}, e.prototype.all = function() {
				return this.edits
			}, e.prototype.clear = function() {
				this.edits.splice(0, this.edits.length)
			}, e.prototype.assertChangeAnnotations = function(e) {
				if (void 0 === e) throw new Error("Text edit change is not configured to manage change annotations.")
			}, e
		}(),
		C = function() {
			function e(e) {
				this._annotations = void 0 === e ? Object.create(null) : e, this._counter = 0, this._size = 0
			}
			return e.prototype.all = function() {
				return this._annotations
			}, Object.defineProperty(e.prototype, "size", {
				get: function() {
					return this._size
				},
				enumerable: !1,
				configurable: !0
			}), e.prototype.manage = function(e, t) {
				var n;
				if (h.is(e) ? n = e : (n = this.nextId(), t = e), void 0 !== this._annotations[n]) throw new Error("Id " + n +
					" is already in use.");
				if (void 0 === t) throw new Error("No annotation provided for id " + n);
				return this._annotations[n] = t, this._size++, n
			}, e.prototype.nextId = function() {
				return this._counter++, this._counter.toString()
			}, e
		}(),
		T = function() {
			function e(e) {
				var t = this;
				this._textEditChanges = Object.create(null), void 0 !== e ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations =
					new C(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((
						function(e) {
							if (m.is(e)) {
								var n = new k(e.edits, t._changeAnnotations);
								t._textEditChanges[e.textDocument.uri] = n
							}
						}))) : e.changes && Object.keys(e.changes).forEach((function(n) {
					var r = new k(e.changes[n]);
					t._textEditChanges[n] = r
				}))) : this._workspaceEdit = {}
			}
			return Object.defineProperty(e.prototype, "edit", {
				get: function() {
					return this.initDocumentChanges(), void 0 !== this._changeAnnotations && (0 === this._changeAnnotations.size ?
						this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations
						.all()), this._workspaceEdit
				},
				enumerable: !1,
				configurable: !0
			}), e.prototype.getTextEditChange = function(e) {
				if (v.is(e)) {
					if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
						"Workspace edit is not configured for document changes.");
					var t = {
						uri: e.uri,
						version: e.version
					};
					if (!(r = this._textEditChanges[t.uri])) {
						var n = {
							textDocument: t,
							edits: i = []
						};
						this._workspaceEdit.documentChanges.push(n), r = new k(i, this._changeAnnotations), this._textEditChanges[t.uri] =
							r
					}
					return r
				}
				if (this.initChanges(), void 0 === this._workspaceEdit.changes) throw new Error(
					"Workspace edit is not configured for normal text edit changes.");
				var r;
				if (!(r = this._textEditChanges[e])) {
					var i = [];
					this._workspaceEdit.changes[e] = i, r = new k(i), this._textEditChanges[e] = r
				}
				return r
			}, e.prototype.initDocumentChanges = function() {
				void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._changeAnnotations =
					new C, this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations
					.all())
			}, e.prototype.initChanges = function() {
				void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._workspaceEdit
					.changes = Object.create(null))
			}, e.prototype.createFile = function(e, t, n) {
				if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
					"Workspace edit is not configured for document changes.");
				var r, i, o;
				if (p.is(t) || h.is(t) ? r = t : n = t, void 0 === r ? i = f.create(e, n) : (o = h.is(r) ? r : this._changeAnnotations
						.manage(r), i = f.create(e, n, o)), this._workspaceEdit.documentChanges.push(i), void 0 !== o) return o
			}, e.prototype.renameFile = function(e, t, n, r) {
				if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
					"Workspace edit is not configured for document changes.");
				var i, o, s;
				if (p.is(n) || h.is(n) ? i = n : r = n, void 0 === i ? o = g.create(e, t, r) : (s = h.is(i) ? i : this._changeAnnotations
						.manage(i), o = g.create(e, t, r, s)), this._workspaceEdit.documentChanges.push(o), void 0 !== s) return s
			}, e.prototype.deleteFile = function(e, t, n) {
				if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
					"Workspace edit is not configured for document changes.");
				var r, i, o;
				if (p.is(t) || h.is(t) ? r = t : n = t, void 0 === r ? i = b.create(e, n) : (o = h.is(r) ? r : this._changeAnnotations
						.manage(r), i = b.create(e, n, o)), this._workspaceEdit.documentChanges.push(i), void 0 !== o) return o
			}, e
		}();
	t.WorkspaceChange = T,
		function(e) {
			e.create = function(e) {
				return {
					uri: e
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.string(t.uri)
			}
		}(t.TextDocumentIdentifier || (t.TextDocumentIdentifier = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					uri: e,
					version: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.string(t.uri) && E.integer(t.version)
			}
		}(t.VersionedTextDocumentIdentifier || (t.VersionedTextDocumentIdentifier = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					uri: e,
					version: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.string(t.uri) && (null === t.version || E.integer(t.version))
			}
		}(v = t.OptionalVersionedTextDocumentIdentifier || (t.OptionalVersionedTextDocumentIdentifier = {})),
		function(e) {
			e.create = function(e, t, n, r) {
				return {
					uri: e,
					languageId: t,
					version: n,
					text: r
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.string(t.uri) && E.string(t.languageId) && E.integer(t.version) && E.string(t.text)
			}
		}(t.TextDocumentItem || (t.TextDocumentItem = {})),
		function(e) {
			e.PlainText = "plaintext", e.Markdown = "markdown"
		}(w = t.MarkupKind || (t.MarkupKind = {})),
		function(e) {
			e.is = function(t) {
				var n = t;
				return n === e.PlainText || n === e.Markdown
			}
		}(w = t.MarkupKind || (t.MarkupKind = {})),
		function(e) {
			e.is = function(e) {
				var t = e;
				return E.objectLiteral(e) && w.is(t.kind) && E.string(t.value)
			}
		}(x = t.MarkupContent || (t.MarkupContent = {})),
		function(e) {
			e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface =
				8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color =
				16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23,
				e.Operator = 24, e.TypeParameter = 25
		}(t.CompletionItemKind || (t.CompletionItemKind = {})),
		function(e) {
			e.PlainText = 1, e.Snippet = 2
		}(t.InsertTextFormat || (t.InsertTextFormat = {})),
		function(e) {
			e.Deprecated = 1
		}(t.CompletionItemTag || (t.CompletionItemTag = {})),
		function(e) {
			e.create = function(e, t, n) {
				return {
					newText: e,
					insert: t,
					replace: n
				}
			}, e.is = function(e) {
				var t = e;
				return t && E.string(t.newText) && i.is(t.insert) && i.is(t.replace)
			}
		}(t.InsertReplaceEdit || (t.InsertReplaceEdit = {})),
		function(e) {
			e.asIs = 1, e.adjustIndentation = 2
		}(t.InsertTextMode || (t.InsertTextMode = {})),
		function(e) {
			e.create = function(e) {
				return {
					label: e
				}
			}
		}(t.CompletionItem || (t.CompletionItem = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					items: e || [],
					isIncomplete: !!t
				}
			}
		}(t.CompletionList || (t.CompletionList = {})),
		function(e) {
			e.fromPlainText = function(e) {
				return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
			}, e.is = function(e) {
				var t = e;
				return E.string(t) || E.objectLiteral(t) && E.string(t.language) && E.string(t.value)
			}
		}(S = t.MarkedString || (t.MarkedString = {})),
		function(e) {
			e.is = function(e) {
				var t = e;
				return !!t && E.objectLiteral(t) && (x.is(t.contents) || S.is(t.contents) || E.typedArray(t.contents, S.is)) &&
					(void 0 === e.range || i.is(e.range))
			}
		}(t.Hover || (t.Hover = {})),
		function(e) {
			e.create = function(e, t) {
				return t ? {
					label: e,
					documentation: t
				} : {
					label: e
				}
			}
		}(t.ParameterInformation || (t.ParameterInformation = {})),
		function(e) {
			e.create = function(e, t) {
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				var i = {
					label: e
				};
				return E.defined(t) && (i.documentation = t), E.defined(n) ? i.parameters = n : i.parameters = [], i
			}
		}(t.SignatureInformation || (t.SignatureInformation = {})),
		function(e) {
			e.Text = 1, e.Read = 2, e.Write = 3
		}(t.DocumentHighlightKind || (t.DocumentHighlightKind = {})),
		function(e) {
			e.create = function(e, t) {
				var n = {
					range: e
				};
				return E.number(t) && (n.kind = t), n
			}
		}(t.DocumentHighlight || (t.DocumentHighlight = {})),
		function(e) {
			e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8,
				e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String =
				15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct =
				23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26
		}(t.SymbolKind || (t.SymbolKind = {})),
		function(e) {
			e.Deprecated = 1
		}(t.SymbolTag || (t.SymbolTag = {})),
		function(e) {
			e.create = function(e, t, n, r, i) {
				var o = {
					name: e,
					kind: t,
					location: {
						uri: r,
						range: n
					}
				};
				return i && (o.containerName = i), o
			}
		}(t.SymbolInformation || (t.SymbolInformation = {})),
		function(e) {
			e.create = function(e, t, n, r, i, o) {
				var s = {
					name: e,
					detail: t,
					kind: n,
					range: r,
					selectionRange: i
				};
				return void 0 !== o && (s.children = o), s
			}, e.is = function(e) {
				var t = e;
				return t && E.string(t.name) && E.number(t.kind) && i.is(t.range) && i.is(t.selectionRange) && (void 0 === t.detail ||
					E.string(t.detail)) && (void 0 === t.deprecated || E.boolean(t.deprecated)) && (void 0 === t.children || Array
					.isArray(t.children)) && (void 0 === t.tags || Array.isArray(t.tags))
			}
		}(t.DocumentSymbol || (t.DocumentSymbol = {})),
		function(e) {
			e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline =
				"refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports =
				"source.organizeImports", e.SourceFixAll = "source.fixAll"
		}(t.CodeActionKind || (t.CodeActionKind = {})),
		function(e) {
			e.create = function(e, t) {
				var n = {
					diagnostics: e
				};
				return null != t && (n.only = t), n
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.typedArray(t.diagnostics, l.is) && (void 0 === t.only || E.typedArray(t.only, E.string))
			}
		}(t.CodeActionContext || (t.CodeActionContext = {})),
		function(e) {
			e.create = function(e, t, n) {
				var r = {
						title: e
					},
					i = !0;
				return "string" == typeof t ? (i = !1, r.kind = t) : c.is(t) ? r.command = t : r.edit = t, i && void 0 !== n &&
					(r.kind = n), r
			}, e.is = function(e) {
				var t = e;
				return t && E.string(t.title) && (void 0 === t.diagnostics || E.typedArray(t.diagnostics, l.is)) && (void 0 ===
						t.kind || E.string(t.kind)) && (void 0 !== t.edit || void 0 !== t.command) && (void 0 === t.command || c.is(t.command)) &&
					(void 0 === t.isPreferred || E.boolean(t.isPreferred)) && (void 0 === t.edit || y.is(t.edit))
			}
		}(t.CodeAction || (t.CodeAction = {})),
		function(e) {
			e.create = function(e, t) {
				var n = {
					range: e
				};
				return E.defined(t) && (n.data = t), n
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && i.is(t.range) && (E.undefined(t.command) || c.is(t.command))
			}
		}(t.CodeLens || (t.CodeLens = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					tabSize: e,
					insertSpaces: t
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && E.uinteger(t.tabSize) && E.boolean(t.insertSpaces)
			}
		}(t.FormattingOptions || (t.FormattingOptions = {})),
		function(e) {
			e.create = function(e, t, n) {
				return {
					range: e,
					target: t,
					data: n
				}
			}, e.is = function(e) {
				var t = e;
				return E.defined(t) && i.is(t.range) && (E.undefined(t.target) || E.string(t.target))
			}
		}(t.DocumentLink || (t.DocumentLink = {})),
		function(e) {
			e.create = function(e, t) {
				return {
					range: e,
					parent: t
				}
			}, e.is = function(t) {
				var n = t;
				return void 0 !== n && i.is(n.range) && (void 0 === n.parent || e.is(n.parent))
			}
		}(t.SelectionRange || (t.SelectionRange = {})), t.EOL = ["\n", "\r\n", "\r"],
		function(e) {
			function t(e, n) {
				if (e.length <= 1) return e;
				var r = e.length / 2 | 0,
					i = e.slice(0, r),
					o = e.slice(r);
				t(i, n), t(o, n);
				for (var s = 0, a = 0, l = 0; s < i.length && a < o.length;) {
					var c = n(i[s], o[a]);
					e[l++] = c <= 0 ? i[s++] : o[a++]
				}
				for (; s < i.length;) e[l++] = i[s++];
				for (; a < o.length;) e[l++] = o[a++];
				return e
			}
			e.create = function(e, t, n, r) {
				return new F(e, t, n, r)
			}, e.is = function(e) {
				var t = e;
				return !!(E.defined(t) && E.string(t.uri) && (E.undefined(t.languageId) || E.string(t.languageId)) && E.uinteger(
					t.lineCount) && E.func(t.getText) && E.func(t.positionAt) && E.func(t.offsetAt))
			}, e.applyEdits = function(e, n) {
				for (var r = e.getText(), i = t(n, (function(e, t) {
						var n = e.range.start.line - t.range.start.line;
						return 0 === n ? e.range.start.character - t.range.start.character : n
					})), o = r.length, s = i.length - 1; s >= 0; s--) {
					var a = i[s],
						l = e.offsetAt(a.range.start),
						c = e.offsetAt(a.range.end);
					if (!(c <= o)) throw new Error("Overlapping edit");
					r = r.substring(0, l) + a.newText + r.substring(c, r.length), o = l
				}
				return r
			}
		}(t.TextDocument || (t.TextDocument = {}));
	var E, F = function() {
		function e(e, t, n, r) {
			this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0
		}
		return Object.defineProperty(e.prototype, "uri", {
			get: function() {
				return this._uri
			},
			enumerable: !1,
			configurable: !0
		}), Object.defineProperty(e.prototype, "languageId", {
			get: function() {
				return this._languageId
			},
			enumerable: !1,
			configurable: !0
		}), Object.defineProperty(e.prototype, "version", {
			get: function() {
				return this._version
			},
			enumerable: !1,
			configurable: !0
		}), e.prototype.getText = function(e) {
			if (e) {
				var t = this.offsetAt(e.start),
					n = this.offsetAt(e.end);
				return this._content.substring(t, n)
			}
			return this._content
		}, e.prototype.update = function(e, t) {
			this._content = e.text, this._version = t, this._lineOffsets = void 0
		}, e.prototype.getLineOffsets = function() {
			if (void 0 === this._lineOffsets) {
				for (var e = [], t = this._content, n = !0, r = 0; r < t.length; r++) {
					n && (e.push(r), n = !1);
					var i = t.charAt(r);
					n = "\r" === i || "\n" === i, "\r" === i && r + 1 < t.length && "\n" === t.charAt(r + 1) && r++
				}
				n && t.length > 0 && e.push(t.length), this._lineOffsets = e
			}
			return this._lineOffsets
		}, e.prototype.positionAt = function(e) {
			e = Math.max(Math.min(e, this._content.length), 0);
			var t = this.getLineOffsets(),
				n = 0,
				i = t.length;
			if (0 === i) return r.create(0, e);
			for (; n < i;) {
				var o = Math.floor((n + i) / 2);
				t[o] > e ? i = o : n = o + 1
			}
			var s = n - 1;
			return r.create(s, e - t[s])
		}, e.prototype.offsetAt = function(e) {
			var t = this.getLineOffsets();
			if (e.line >= t.length) return this._content.length;
			if (e.line < 0) return 0;
			var n = t[e.line],
				r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
			return Math.max(Math.min(n + e.character, r), n)
		}, Object.defineProperty(e.prototype, "lineCount", {
			get: function() {
				return this.getLineOffsets().length
			},
			enumerable: !1,
			configurable: !0
		}), e
	}();
	! function(e) {
		var t = Object.prototype.toString;
		e.defined = function(e) {
			return void 0 !== e
		}, e.undefined = function(e) {
			return void 0 === e
		}, e.boolean = function(e) {
			return !0 === e || !1 === e
		}, e.string = function(e) {
			return "[object String]" === t.call(e)
		}, e.number = function(e) {
			return "[object Number]" === t.call(e)
		}, e.numberRange = function(e, n, r) {
			return "[object Number]" === t.call(e) && n <= e && e <= r
		}, e.integer = function(e) {
			return "[object Number]" === t.call(e) && -2147483648 <= e && e <= 2147483647
		}, e.uinteger = function(e) {
			return "[object Number]" === t.call(e) && 0 <= e && e <= 2147483647
		}, e.func = function(e) {
			return "[object Function]" === t.call(e)
		}, e.objectLiteral = function(e) {
			return null !== e && "object" == typeof e
		}, e.typedArray = function(e, t) {
			return Array.isArray(e) && e.every(t)
		}
	}(E || (E = {}))
})), define("vscode-languageserver-types", ["vscode-languageserver-types/main"], (function(e) {
		return e
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-languageserver-textdocument/main", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = function() {
			function e(e, t, n, r) {
				this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0
			}
			return Object.defineProperty(e.prototype, "uri", {
				get: function() {
					return this._uri
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "languageId", {
				get: function() {
					return this._languageId
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "version", {
				get: function() {
					return this._version
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getText = function(e) {
				if (e) {
					var t = this.offsetAt(e.start),
						n = this.offsetAt(e.end);
					return this._content.substring(t, n)
				}
				return this._content
			}, e.prototype.update = function(t, n) {
				for (var r = 0, s = t; r < s.length; r++) {
					var a = s[r];
					if (e.isIncremental(a)) {
						var l = o(a.range),
							c = this.offsetAt(l.start),
							d = this.offsetAt(l.end);
						this._content = this._content.substring(0, c) + a.text + this._content.substring(d, this._content.length);
						var p = Math.max(l.start.line, 0),
							h = Math.max(l.end.line, 0),
							u = this._lineOffsets,
							m = i(a.text, !1, c);
						if (h - p === m.length)
							for (var f = 0, g = m.length; f < g; f++) u[f + p + 1] = m[f];
						else m.length < 1e4 ? u.splice.apply(u, [p + 1, h - p].concat(m)) : this._lineOffsets = u = u.slice(0, p + 1)
							.concat(m, u.slice(h + 1));
						var b = a.text.length - (d - c);
						if (0 !== b)
							for (f = p + 1 + m.length, g = u.length; f < g; f++) u[f] = u[f] + b
					} else {
						if (!e.isFull(a)) throw new Error("Unknown change event received");
						this._content = a.text, this._lineOffsets = void 0
					}
				}
				this._version = n
			}, e.prototype.getLineOffsets = function() {
				return void 0 === this._lineOffsets && (this._lineOffsets = i(this._content, !0)), this._lineOffsets
			}, e.prototype.positionAt = function(e) {
				e = Math.max(Math.min(e, this._content.length), 0);
				var t = this.getLineOffsets(),
					n = 0,
					r = t.length;
				if (0 === r) return {
					line: 0,
					character: e
				};
				for (; n < r;) {
					var i = Math.floor((n + r) / 2);
					t[i] > e ? r = i : n = i + 1
				}
				var o = n - 1;
				return {
					line: o,
					character: e - t[o]
				}
			}, e.prototype.offsetAt = function(e) {
				var t = this.getLineOffsets();
				if (e.line >= t.length) return this._content.length;
				if (e.line < 0) return 0;
				var n = t[e.line],
					r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
				return Math.max(Math.min(n + e.character, r), n)
			}, Object.defineProperty(e.prototype, "lineCount", {
				get: function() {
					return this.getLineOffsets().length
				},
				enumerable: !0,
				configurable: !0
			}), e.isIncremental = function(e) {
				var t = e;
				return null != t && "string" == typeof t.text && void 0 !== t.range && (void 0 === t.rangeLength || "number" ==
					typeof t.rangeLength)
			}, e.isFull = function(e) {
				var t = e;
				return null != t && "string" == typeof t.text && void 0 === t.range && void 0 === t.rangeLength
			}, e
		}();

		function r(e, t) {
			if (e.length <= 1) return e;
			var n = e.length / 2 | 0,
				i = e.slice(0, n),
				o = e.slice(n);
			r(i, t), r(o, t);
			for (var s = 0, a = 0, l = 0; s < i.length && a < o.length;) {
				var c = t(i[s], o[a]);
				e[l++] = c <= 0 ? i[s++] : o[a++]
			}
			for (; s < i.length;) e[l++] = i[s++];
			for (; a < o.length;) e[l++] = o[a++];
			return e
		}

		function i(e, t, n) {
			void 0 === n && (n = 0);
			for (var r = t ? [n] : [], i = 0; i < e.length; i++) {
				var o = e.charCodeAt(i);
				13 !== o && 10 !== o || (13 === o && i + 1 < e.length && 10 === e.charCodeAt(i + 1) && i++, r.push(n + i + 1))
			}
			return r
		}

		function o(e) {
			var t = e.start,
				n = e.end;
			return t.line > n.line || t.line === n.line && t.character > n.character ? {
				start: n,
				end: t
			} : e
		}

		function s(e) {
			var t = o(e.range);
			return t !== e.range ? {
				newText: e.newText,
				range: t
			} : e
		}! function(e) {
			e.create = function(e, t, r, i) {
				return new n(e, t, r, i)
			}, e.update = function(e, t, r) {
				if (e instanceof n) return e.update(t, r), e;
				throw new Error("TextDocument.update: document must be created by TextDocument.create")
			}, e.applyEdits = function(e, t) {
				for (var n = e.getText(), i = 0, o = [], a = 0, l = r(t.map(s), (function(e, t) {
						var n = e.range.start.line - t.range.start.line;
						return 0 === n ? e.range.start.character - t.range.start.character : n
					})); a < l.length; a++) {
					var c = l[a],
						d = e.offsetAt(c.range.start);
					if (d < i) throw new Error("Overlapping edit");
					d > i && o.push(n.substring(i, d)), c.newText.length && o.push(c.newText), i = e.offsetAt(c.range.end)
				}
				return o.push(n.substr(i)), o.join("")
			}
		}(t.TextDocument || (t.TextDocument = {}))
	})), define("vscode-languageserver-textdocument", ["vscode-languageserver-textdocument/main"], (function(e) {
		return e
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-css-languageservice/cssLanguageTypes", ["require",
			"exports", "vscode-languageserver-types", "vscode-languageserver-textdocument"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.FileType = t.ClientCapabilities = t.DocumentHighlightKind = t.VersionedTextDocumentIdentifier = t.TextDocumentEdit =
			t.CodeActionKind = t.TextEdit = t.WorkspaceEdit = t.DocumentLink = t.DocumentHighlight = t.CodeAction = t.Command =
			t.CodeActionContext = t.MarkedString = t.Hover = t.Location = t.DocumentSymbol = t.SymbolKind = t.SymbolInformation =
			t.InsertTextFormat = t.CompletionItemTag = t.CompletionList = t.CompletionItemKind = t.CompletionItem = t.DiagnosticSeverity =
			t.Diagnostic = t.SelectionRange = t.FoldingRangeKind = t.FoldingRange = t.ColorPresentation = t.ColorInformation =
			t.Color = t.MarkupKind = t.MarkupContent = t.Position = t.Range = t.TextDocument = void 0;
		var n = e("vscode-languageserver-types");
		Object.defineProperty(t, "Range", {
			enumerable: !0,
			get: function() {
				return n.Range
			}
		}), Object.defineProperty(t, "Position", {
			enumerable: !0,
			get: function() {
				return n.Position
			}
		}), Object.defineProperty(t, "MarkupContent", {
			enumerable: !0,
			get: function() {
				return n.MarkupContent
			}
		}), Object.defineProperty(t, "MarkupKind", {
			enumerable: !0,
			get: function() {
				return n.MarkupKind
			}
		}), Object.defineProperty(t, "Color", {
			enumerable: !0,
			get: function() {
				return n.Color
			}
		}), Object.defineProperty(t, "ColorInformation", {
			enumerable: !0,
			get: function() {
				return n.ColorInformation
			}
		}), Object.defineProperty(t, "ColorPresentation", {
			enumerable: !0,
			get: function() {
				return n.ColorPresentation
			}
		}), Object.defineProperty(t, "FoldingRange", {
			enumerable: !0,
			get: function() {
				return n.FoldingRange
			}
		}), Object.defineProperty(t, "FoldingRangeKind", {
			enumerable: !0,
			get: function() {
				return n.FoldingRangeKind
			}
		}), Object.defineProperty(t, "SelectionRange", {
			enumerable: !0,
			get: function() {
				return n.SelectionRange
			}
		}), Object.defineProperty(t, "Diagnostic", {
			enumerable: !0,
			get: function() {
				return n.Diagnostic
			}
		}), Object.defineProperty(t, "DiagnosticSeverity", {
			enumerable: !0,
			get: function() {
				return n.DiagnosticSeverity
			}
		}), Object.defineProperty(t, "CompletionItem", {
			enumerable: !0,
			get: function() {
				return n.CompletionItem
			}
		}), Object.defineProperty(t, "CompletionItemKind", {
			enumerable: !0,
			get: function() {
				return n.CompletionItemKind
			}
		}), Object.defineProperty(t, "CompletionList", {
			enumerable: !0,
			get: function() {
				return n.CompletionList
			}
		}), Object.defineProperty(t, "CompletionItemTag", {
			enumerable: !0,
			get: function() {
				return n.CompletionItemTag
			}
		}), Object.defineProperty(t, "InsertTextFormat", {
			enumerable: !0,
			get: function() {
				return n.InsertTextFormat
			}
		}), Object.defineProperty(t, "SymbolInformation", {
			enumerable: !0,
			get: function() {
				return n.SymbolInformation
			}
		}), Object.defineProperty(t, "SymbolKind", {
			enumerable: !0,
			get: function() {
				return n.SymbolKind
			}
		}), Object.defineProperty(t, "DocumentSymbol", {
			enumerable: !0,
			get: function() {
				return n.DocumentSymbol
			}
		}), Object.defineProperty(t, "Location", {
			enumerable: !0,
			get: function() {
				return n.Location
			}
		}), Object.defineProperty(t, "Hover", {
			enumerable: !0,
			get: function() {
				return n.Hover
			}
		}), Object.defineProperty(t, "MarkedString", {
			enumerable: !0,
			get: function() {
				return n.MarkedString
			}
		}), Object.defineProperty(t, "CodeActionContext", {
			enumerable: !0,
			get: function() {
				return n.CodeActionContext
			}
		}), Object.defineProperty(t, "Command", {
			enumerable: !0,
			get: function() {
				return n.Command
			}
		}), Object.defineProperty(t, "CodeAction", {
			enumerable: !0,
			get: function() {
				return n.CodeAction
			}
		}), Object.defineProperty(t, "DocumentHighlight", {
			enumerable: !0,
			get: function() {
				return n.DocumentHighlight
			}
		}), Object.defineProperty(t, "DocumentLink", {
			enumerable: !0,
			get: function() {
				return n.DocumentLink
			}
		}), Object.defineProperty(t, "WorkspaceEdit", {
			enumerable: !0,
			get: function() {
				return n.WorkspaceEdit
			}
		}), Object.defineProperty(t, "TextEdit", {
			enumerable: !0,
			get: function() {
				return n.TextEdit
			}
		}), Object.defineProperty(t, "CodeActionKind", {
			enumerable: !0,
			get: function() {
				return n.CodeActionKind
			}
		}), Object.defineProperty(t, "TextDocumentEdit", {
			enumerable: !0,
			get: function() {
				return n.TextDocumentEdit
			}
		}), Object.defineProperty(t, "VersionedTextDocumentIdentifier", {
			enumerable: !0,
			get: function() {
				return n.VersionedTextDocumentIdentifier
			}
		}), Object.defineProperty(t, "DocumentHighlightKind", {
			enumerable: !0,
			get: function() {
				return n.DocumentHighlightKind
			}
		});
		var r = e("vscode-languageserver-textdocument");
		Object.defineProperty(t, "TextDocument", {
				enumerable: !0,
				get: function() {
					return r.TextDocument
				}
			}),
			function(e) {
				e.LATEST = {
					textDocument: {
						completion: {
							completionItem: {
								documentationFormat: [n.MarkupKind.Markdown, n.MarkupKind.PlainText]
							}
						},
						hover: {
							contentFormat: [n.MarkupKind.Markdown, n.MarkupKind.PlainText]
						}
					}
				}
			}(t.ClientCapabilities || (t.ClientCapabilities = {})),
			function(e) {
				e[e.Unknown = 0] = "Unknown", e[e.File = 1] = "File", e[e.Directory = 2] = "Directory", e[e.SymbolicLink = 64] =
					"SymbolicLink"
			}(t.FileType || (t.FileType = {}))
	})),
	function(e, t) {
		if ("object" == typeof exports && "object" == typeof module) module.exports = t();
		else if ("function" == typeof define && define.amd) define("vscode-uri/index", [], t);
		else {
			var n = t();
			for (var r in n)("object" == typeof exports ? exports : e)[r] = n[r]
		}
	}(this, (function() {
		return (() => {
			"use strict";
			var e = {
					470: e => {
						function t(e) {
							if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e))
						}

						function n(e, t) {
							for (var n, r = "", i = 0, o = -1, s = 0, a = 0; a <= e.length; ++a) {
								if (a < e.length) n = e.charCodeAt(a);
								else {
									if (47 === n) break;
									n = 47
								}
								if (47 === n) {
									if (o === a - 1 || 1 === s);
									else if (o !== a - 1 && 2 === s) {
										if (r.length < 2 || 2 !== i || 46 !== r.charCodeAt(r.length - 1) || 46 !== r.charCodeAt(r.length - 2))
											if (r.length > 2) {
												var l = r.lastIndexOf("/");
												if (l !== r.length - 1) {
													-1 === l ? (r = "", i = 0) : i = (r = r.slice(0, l)).length - 1 - r.lastIndexOf("/"), o = a, s = 0;
													continue
												}
											} else if (2 === r.length || 1 === r.length) {
											r = "", i = 0, o = a, s = 0;
											continue
										}
										t && (r.length > 0 ? r += "/.." : r = "..", i = 2)
									} else r.length > 0 ? r += "/" + e.slice(o + 1, a) : r = e.slice(o + 1, a), i = a - o - 1;
									o = a, s = 0
								} else 46 === n && -1 !== s ? ++s : s = -1
							}
							return r
						}
						var r = {
							resolve: function() {
								for (var e, r = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
									var s;
									o >= 0 ? s = arguments[o] : (void 0 === e && (e = process.cwd()), s = e), t(s), 0 !== s.length && (r =
										s + "/" + r, i = 47 === s.charCodeAt(0))
								}
								return r = n(r, !i), i ? r.length > 0 ? "/" + r : "/" : r.length > 0 ? r : "."
							},
							normalize: function(e) {
								if (t(e), 0 === e.length) return ".";
								var r = 47 === e.charCodeAt(0),
									i = 47 === e.charCodeAt(e.length - 1);
								return 0 !== (e = n(e, !r)).length || r || (e = "."), e.length > 0 && i && (e += "/"), r ? "/" + e : e
							},
							isAbsolute: function(e) {
								return t(e), e.length > 0 && 47 === e.charCodeAt(0)
							},
							join: function() {
								if (0 === arguments.length) return ".";
								for (var e, n = 0; n < arguments.length; ++n) {
									var i = arguments[n];
									t(i), i.length > 0 && (void 0 === e ? e = i : e += "/" + i)
								}
								return void 0 === e ? "." : r.normalize(e)
							},
							relative: function(e, n) {
								if (t(e), t(n), e === n) return "";
								if ((e = r.resolve(e)) === (n = r.resolve(n))) return "";
								for (var i = 1; i < e.length && 47 === e.charCodeAt(i); ++i);
								for (var o = e.length, s = o - i, a = 1; a < n.length && 47 === n.charCodeAt(a); ++a);
								for (var l = n.length - a, c = s < l ? s : l, d = -1, p = 0; p <= c; ++p) {
									if (p === c) {
										if (l > c) {
											if (47 === n.charCodeAt(a + p)) return n.slice(a + p + 1);
											if (0 === p) return n.slice(a + p)
										} else s > c && (47 === e.charCodeAt(i + p) ? d = p : 0 === p && (d = 0));
										break
									}
									var h = e.charCodeAt(i + p);
									if (h !== n.charCodeAt(a + p)) break;
									47 === h && (d = p)
								}
								var u = "";
								for (p = i + d + 1; p <= o; ++p) p !== o && 47 !== e.charCodeAt(p) || (0 === u.length ? u += ".." : u +=
									"/..");
								return u.length > 0 ? u + n.slice(a + d) : (a += d, 47 === n.charCodeAt(a) && ++a, n.slice(a))
							},
							_makeLong: function(e) {
								return e
							},
							dirname: function(e) {
								if (t(e), 0 === e.length) return ".";
								for (var n = e.charCodeAt(0), r = 47 === n, i = -1, o = !0, s = e.length - 1; s >= 1; --s)
									if (47 === (n = e.charCodeAt(s))) {
										if (!o) {
											i = s;
											break
										}
									} else o = !1;
								return -1 === i ? r ? "/" : "." : r && 1 === i ? "//" : e.slice(0, i)
							},
							basename: function(e, n) {
								if (void 0 !== n && "string" != typeof n) throw new TypeError('"ext" argument must be a string');
								t(e);
								var r, i = 0,
									o = -1,
									s = !0;
								if (void 0 !== n && n.length > 0 && n.length <= e.length) {
									if (n.length === e.length && n === e) return "";
									var a = n.length - 1,
										l = -1;
									for (r = e.length - 1; r >= 0; --r) {
										var c = e.charCodeAt(r);
										if (47 === c) {
											if (!s) {
												i = r + 1;
												break
											}
										} else -1 === l && (s = !1, l = r + 1), a >= 0 && (c === n.charCodeAt(a) ? -1 == --a && (o = r) : (a = -
											1, o = l))
									}
									return i === o ? o = l : -1 === o && (o = e.length), e.slice(i, o)
								}
								for (r = e.length - 1; r >= 0; --r)
									if (47 === e.charCodeAt(r)) {
										if (!s) {
											i = r + 1;
											break
										}
									} else -1 === o && (s = !1, o = r + 1);
								return -1 === o ? "" : e.slice(i, o)
							},
							extname: function(e) {
								t(e);
								for (var n = -1, r = 0, i = -1, o = !0, s = 0, a = e.length - 1; a >= 0; --a) {
									var l = e.charCodeAt(a);
									if (47 !== l) - 1 === i && (o = !1, i = a + 1), 46 === l ? -1 === n ? n = a : 1 !== s && (s = 1) : -1 !==
										n && (s = -1);
									else if (!o) {
										r = a + 1;
										break
									}
								}
								return -1 === n || -1 === i || 0 === s || 1 === s && n === i - 1 && n === r + 1 ? "" : e.slice(n, i)
							},
							format: function(e) {
								if (null === e || "object" != typeof e) throw new TypeError(
									'The "pathObject" argument must be of type Object. Received type ' + typeof e);
								return function(e, t) {
									var n = t.dir || t.root,
										r = t.base || (t.name || "") + (t.ext || "");
									return n ? n === t.root ? n + r : n + "/" + r : r
								}(0, e)
							},
							parse: function(e) {
								t(e);
								var n = {
									root: "",
									dir: "",
									base: "",
									ext: "",
									name: ""
								};
								if (0 === e.length) return n;
								var r, i = e.charCodeAt(0),
									o = 47 === i;
								o ? (n.root = "/", r = 1) : r = 0;
								for (var s = -1, a = 0, l = -1, c = !0, d = e.length - 1, p = 0; d >= r; --d)
									if (47 !== (i = e.charCodeAt(d))) - 1 === l && (c = !1, l = d + 1), 46 === i ? -1 === s ? s = d : 1 !==
										p && (p = 1) : -1 !== s && (p = -1);
									else if (!c) {
									a = d + 1;
									break
								}
								return -1 === s || -1 === l || 0 === p || 1 === p && s === l - 1 && s === a + 1 ? -1 !== l && (n.base =
										n.name = 0 === a && o ? e.slice(1, l) : e.slice(a, l)) : (0 === a && o ? (n.name = e.slice(1, s), n.base =
										e.slice(1, l)) : (n.name = e.slice(a, s), n.base = e.slice(a, l)), n.ext = e.slice(s, l)), a > 0 ? n.dir =
									e.slice(0, a - 1) : o && (n.dir = "/"), n
							},
							sep: "/",
							delimiter: ":",
							win32: null,
							posix: null
						};
						r.posix = r, e.exports = r
					},
					465: (e, t, n) => {
						Object.defineProperty(t, "__esModule", {
							value: !0
						}), t.Utils = t.URI = void 0;
						var r = n(796);
						Object.defineProperty(t, "URI", {
							enumerable: !0,
							get: function() {
								return r.URI
							}
						});
						var i = n(679);
						Object.defineProperty(t, "Utils", {
							enumerable: !0,
							get: function() {
								return i.Utils
							}
						})
					},
					674: (e, t) => {
						if (Object.defineProperty(t, "__esModule", {
								value: !0
							}), t.isWindows = void 0, "object" == typeof process) t.isWindows = "win32" === process.platform;
						else if ("object" == typeof navigator) {
							var n = navigator.userAgent;
							t.isWindows = n.indexOf("Windows") >= 0
						}
					},
					796: function(e, t, n) {
						var r, i, o = this && this.__extends || (r = function(e, t) {
							return (r = Object.setPrototypeOf || {
									__proto__: []
								}
								instanceof Array && function(e, t) {
									e.__proto__ = t
								} || function(e, t) {
									for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
								})(e, t)
						}, function(e, t) {
							function n() {
								this.constructor = e
							}
							r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
						});
						Object.defineProperty(t, "__esModule", {
							value: !0
						}), t.uriToFsPath = t.URI = void 0;
						var s = n(674),
							a = /^\w[\w\d+.-]*$/,
							l = /^\//,
							c = /^\/\//,
							d = "",
							p = "/",
							h = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
							u = function() {
								function e(e, t, n, r, i, o) {
									void 0 === o && (o = !1), "object" == typeof e ? (this.scheme = e.scheme || d, this.authority = e.authority ||
										d, this.path = e.path || d, this.query = e.query || d, this.fragment = e.fragment || d) : (this.scheme =
										function(e, t) {
											return e || t ? e : "file"
										}(e, o), this.authority = t || d, this.path = function(e, t) {
											switch (e) {
												case "https":
												case "http":
												case "file":
													t ? t[0] !== p && (t = p + t) : t = p
											}
											return t
										}(this.scheme, n || d), this.query = r || d, this.fragment = i || d,
										function(e, t) {
											if (!e.scheme && t) throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + e.authority +
												'", path: "' + e.path + '", query: "' + e.query + '", fragment: "' + e.fragment + '"}');
											if (e.scheme && !a.test(e.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
											if (e.path)
												if (e.authority) {
													if (!l.test(e.path)) throw new Error(
														'[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
													)
												} else if (c.test(e.path)) throw new Error(
												'[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
											)
										}(this, o))
								}
								return e.isUri = function(t) {
									return t instanceof e || !!t && "string" == typeof t.authority && "string" == typeof t.fragment &&
										"string" == typeof t.path && "string" == typeof t.query && "string" == typeof t.scheme && "function" ==
										typeof t.fsPath && "function" == typeof t.with && "function" == typeof t.toString
								}, Object.defineProperty(e.prototype, "fsPath", {
									get: function() {
										return v(this, !1)
									},
									enumerable: !1,
									configurable: !0
								}), e.prototype.with = function(e) {
									if (!e) return this;
									var t = e.scheme,
										n = e.authority,
										r = e.path,
										i = e.query,
										o = e.fragment;
									return void 0 === t ? t = this.scheme : null === t && (t = d), void 0 === n ? n = this.authority : null ===
										n && (n = d), void 0 === r ? r = this.path : null === r && (r = d), void 0 === i ? i = this.query :
										null === i && (i = d), void 0 === o ? o = this.fragment : null === o && (o = d), t === this.scheme && n ===
										this.authority && r === this.path && i === this.query && o === this.fragment ? this : new f(t, n, r, i,
											o)
								}, e.parse = function(e, t) {
									void 0 === t && (t = !1);
									var n = h.exec(e);
									return n ? new f(n[2] || d, k(n[4] || d), k(n[5] || d), k(n[7] || d), k(n[9] || d), t) : new f(d, d, d,
										d, d)
								}, e.file = function(e) {
									var t = d;
									if (s.isWindows && (e = e.replace(/\\/g, p)), e[0] === p && e[1] === p) {
										var n = e.indexOf(p, 2); - 1 === n ? (t = e.substring(2), e = p) : (t = e.substring(2, n), e = e.substring(
											n) || p)
									}
									return new f("file", t, e, d, d)
								}, e.from = function(e) {
									return new f(e.scheme, e.authority, e.path, e.query, e.fragment)
								}, e.prototype.toString = function(e) {
									return void 0 === e && (e = !1), w(this, e)
								}, e.prototype.toJSON = function() {
									return this
								}, e.revive = function(t) {
									if (t) {
										if (t instanceof e) return t;
										var n = new f(t);
										return n._formatted = t.external, n._fsPath = t._sep === m ? t.fsPath : null, n
									}
									return t
								}, e
							}();
						t.URI = u;
						var m = s.isWindows ? 1 : void 0,
							f = function(e) {
								function t() {
									var t = null !== e && e.apply(this, arguments) || this;
									return t._formatted = null, t._fsPath = null, t
								}
								return o(t, e), Object.defineProperty(t.prototype, "fsPath", {
									get: function() {
										return this._fsPath || (this._fsPath = v(this, !1)), this._fsPath
									},
									enumerable: !1,
									configurable: !0
								}), t.prototype.toString = function(e) {
									return void 0 === e && (e = !1), e ? w(this, !0) : (this._formatted || (this._formatted = w(this, !1)),
										this._formatted)
								}, t.prototype.toJSON = function() {
									var e = {
										$mid: 1
									};
									return this._fsPath && (e.fsPath = this._fsPath, e._sep = m), this._formatted && (e.external = this._formatted),
										this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority =
											this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment),
										e
								}, t
							}(u),
							g = ((i = {})[58] = "%3A", i[47] = "%2F", i[63] = "%3F", i[35] = "%23", i[91] = "%5B", i[93] = "%5D", i[64] =
								"%40", i[33] = "%21", i[36] = "%24", i[38] = "%26", i[39] = "%27", i[40] = "%28", i[41] = "%29", i[42] =
								"%2A", i[43] = "%2B", i[44] = "%2C", i[59] = "%3B", i[61] = "%3D", i[32] = "%20", i);

						function b(e, t) {
							for (var n = void 0, r = -1, i = 0; i < e.length; i++) {
								var o = e.charCodeAt(i);
								if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || 45 === o || 46 === o || 95 === o ||
									126 === o || t && 47 === o) - 1 !== r && (n += encodeURIComponent(e.substring(r, i)), r = -1), void 0 !==
									n && (n += e.charAt(i));
								else {
									void 0 === n && (n = e.substr(0, i));
									var s = g[o];
									void 0 !== s ? (-1 !== r && (n += encodeURIComponent(e.substring(r, i)), r = -1), n += s) : -1 === r && (
										r = i)
								}
							}
							return -1 !== r && (n += encodeURIComponent(e.substring(r))), void 0 !== n ? n : e
						}

						function y(e) {
							for (var t = void 0, n = 0; n < e.length; n++) {
								var r = e.charCodeAt(n);
								35 === r || 63 === r ? (void 0 === t && (t = e.substr(0, n)), t += g[r]) : void 0 !== t && (t += e[n])
							}
							return void 0 !== t ? t : e
						}

						function v(e, t) {
							var n;
							return n = e.authority && e.path.length > 1 && "file" === e.scheme ? "//" + e.authority + e.path : 47 ===
								e.path.charCodeAt(0) && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >=
									97 && e.path.charCodeAt(1) <= 122) && 58 === e.path.charCodeAt(2) ? t ? e.path.substr(1) : e.path[1].toLowerCase() +
								e.path.substr(2) : e.path, s.isWindows && (n = n.replace(/\//g, "\\")), n
						}

						function w(e, t) {
							var n = t ? y : b,
								r = "",
								i = e.scheme,
								o = e.authority,
								s = e.path,
								a = e.query,
								l = e.fragment;
							if (i && (r += i, r += ":"), (o || "file" === i) && (r += p, r += p), o) {
								var c = o.indexOf("@");
								if (-1 !== c) {
									var d = o.substr(0, c);
									o = o.substr(c + 1), -1 === (c = d.indexOf(":")) ? r += n(d, !1) : (r += n(d.substr(0, c), !1), r += ":",
										r += n(d.substr(c + 1), !1)), r += "@"
								} - 1 === (c = (o = o.toLowerCase()).indexOf(":")) ? r += n(o, !1) : (r += n(o.substr(0, c), !1), r += o.substr(
									c))
							}
							if (s) {
								if (s.length >= 3 && 47 === s.charCodeAt(0) && 58 === s.charCodeAt(2))(h = s.charCodeAt(1)) >= 65 && h <=
									90 && (s = "/" + String.fromCharCode(h + 32) + ":" + s.substr(3));
								else if (s.length >= 2 && 58 === s.charCodeAt(1)) {
									var h;
									(h = s.charCodeAt(0)) >= 65 && h <= 90 && (s = String.fromCharCode(h + 32) + ":" + s.substr(2))
								}
								r += n(s, !0)
							}
							return a && (r += "?", r += n(a, !1)), l && (r += "#", r += t ? l : b(l, !1)), r
						}

						function x(e) {
							try {
								return decodeURIComponent(e)
							} catch (t) {
								return e.length > 3 ? e.substr(0, 3) + x(e.substr(3)) : e
							}
						}
						t.uriToFsPath = v;
						var S = /(%[0-9A-Za-z][0-9A-Za-z])+/g;

						function k(e) {
							return e.match(S) ? e.replace(S, (function(e) {
								return x(e)
							})) : e
						}
					},
					679: function(e, t, n) {
						var r = this && this.__spreadArrays || function() {
							for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
							var r = Array(e),
								i = 0;
							for (t = 0; t < n; t++)
								for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
							return r
						};
						Object.defineProperty(t, "__esModule", {
							value: !0
						}), t.Utils = void 0;
						var i, o = n(470),
							s = o.posix || o;
						(i = t.Utils || (t.Utils = {})).joinPath = function(e) {
							for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
							return e.with({
								path: s.join.apply(s, r([e.path], t))
							})
						}, i.resolvePath = function(e) {
							for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
							var i = e.path || "/";
							return e.with({
								path: s.resolve.apply(s, r([i], t))
							})
						}, i.dirname = function(e) {
							var t = s.dirname(e.path);
							return 1 === t.length && 46 === t.charCodeAt(0) ? e : e.with({
								path: t
							})
						}, i.basename = function(e) {
							return s.basename(e.path)
						}, i.extname = function(e) {
							return s.extname(e.path)
						}
					}
				},
				t = {};
			return function n(r) {
				if (t[r]) return t[r].exports;
				var i = t[r] = {
					exports: {}
				};
				return e[r].call(i.exports, i, i.exports, n), i.exports
			}(465)
		})()
	})), define("vscode-uri", ["vscode-uri/index"], (function(e) {
		return e
	}));
var __spreadArray = this && this.__spreadArray || function(e, t) {
	for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
	return e
};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/utils/resources", ["require",
		"exports", "vscode-uri"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.joinPath = t.dirname = void 0;
	var n = e("vscode-uri");
	t.dirname = function(e) {
		return n.Utils.dirname(n.URI.parse(e)).toString()
	}, t.joinPath = function(e) {
		for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
		return n.Utils.joinPath.apply(n.Utils, __spreadArray([n.URI.parse(e)], t)).toString()
	}
}));
var __awaiter = this && this.__awaiter || function(e, t, n, r) {
		return new(n || (n = Promise))((function(i, o) {
			function s(e) {
				try {
					l(r.next(e))
				} catch (e) {
					o(e)
				}
			}

			function a(e) {
				try {
					l(r.throw(e))
				} catch (e) {
					o(e)
				}
			}

			function l(e) {
				var t;
				e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
					e(t)
				}))).then(s, a)
			}
			l((r = r.apply(e, t || [])).next())
		}))
	},
	__generator = this && this.__generator || function(e, t) {
		var n, r, i, o, s = {
			label: 0,
			sent: function() {
				if (1 & i[0]) throw i[1];
				return i[1]
			},
			trys: [],
			ops: []
		};
		return o = {
			next: a(0),
			throw: a(1),
			return: a(2)
		}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
			return this
		}), o;

		function a(o) {
			return function(a) {
				return function(o) {
					if (n) throw new TypeError("Generator is already executing.");
					for (; s;) try {
						if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i =
								i.call(r, o[1])).done) return i;
						switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
							case 0:
							case 1:
								i = o;
								break;
							case 4:
								return s.label++, {
									value: o[1],
									done: !1
								};
							case 5:
								s.label++, r = o[1], o = [0];
								continue;
							case 7:
								o = s.ops.pop(), s.trys.pop();
								continue;
							default:
								if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
									s = 0;
									continue
								}
								if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
									s.label = o[1];
									break
								}
								if (6 === o[0] && s.label < i[1]) {
									s.label = i[1], i = o;
									break
								}
								if (i && s.label < i[2]) {
									s.label = i[2], s.ops.push(o);
									break
								}
								i[2] && s.ops.pop(), s.trys.pop();
								continue
						}
						o = t.call(e, s)
					} catch (e) {
						o = [6, e], r = 0
					} finally {
						n = i = 0
					}
					if (5 & o[0]) throw o[1];
					return {
						value: o[0] ? o[1] : void 0,
						done: !0
					}
				}([o, a])
			}
		}
	};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/pathCompletion", [
		"require", "exports", "../cssLanguageTypes", "../utils/strings", "../utils/resources"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.PathCompletionParticipant = void 0;
	var n = e("../cssLanguageTypes"),
		r = e("../utils/strings"),
		i = e("../utils/resources"),
		o = function() {
			function e(e) {
				this.readDirectory = e, this.literalCompletions = [], this.importCompletions = []
			}
			return e.prototype.onCssURILiteralValue = function(e) {
				this.literalCompletions.push(e)
			}, e.prototype.onCssImportPath = function(e) {
				this.importCompletions.push(e)
			}, e.prototype.computeCompletions = function(e, t) {
				return __awaiter(this, void 0, void 0, (function() {
					var n, i, o, s, l, c, d, p, h, u, m, f, g, b, y, v, w;
					return __generator(this, (function(x) {
						switch (x.label) {
							case 0:
								n = {
									items: [],
									isIncomplete: !1
								}, i = 0, o = this.literalCompletions, x.label = 1;
							case 1:
								return i < o.length ? (s = o[i], l = s.uriValue, "." !== (g = a(l)) && ".." !== g ? [3, 2] : (n.isIncomplete = !
									0, [3, 4])) : [3, 5];
							case 2:
								return [4, this.providePathSuggestions(l, s.position, s.range, e, t)];
							case 3:
								for (c = x.sent(), d = 0, p = c; d < p.length; d++) w = p[d], n.items.push(w);
								x.label = 4;
							case 4:
								return i++, [3, 1];
							case 5:
								h = 0, u = this.importCompletions, x.label = 6;
							case 6:
								return h < u.length ? (m = u[h], f = m.pathValue, "." !== (g = a(f)) && ".." !== g ? [3, 7] : (n.isIncomplete = !
									0, [3, 9])) : [3, 10];
							case 7:
								return [4, this.providePathSuggestions(f, m.position, m.range, e, t)];
							case 8:
								for (b = x.sent(), "scss" === e.languageId && b.forEach((function(e) {
										r.startsWith(e.label, "_") && r.endsWith(e.label, ".scss") && (e.textEdit ? e.textEdit.newText = e
											.label.slice(1, -5) : e.label = e.label.slice(1, -5))
									})), y = 0, v = b; y < v.length; y++) w = v[y], n.items.push(w);
								x.label = 9;
							case 9:
								return h++, [3, 6];
							case 10:
								return [2, n]
						}
					}))
				}))
			}, e.prototype.providePathSuggestions = function(e, t, o, c, p) {
				return __awaiter(this, void 0, void 0, (function() {
					var h, u, m, f, g, b, y, v, w, x, S, k, C, T, E;
					return __generator(this, (function(F) {
						switch (F.label) {
							case 0:
								if (h = a(e), u = r.startsWith(e, "'") || r.startsWith(e, '"'), m = u ? h.slice(0, t.character - (o.start
										.character + 1)) : h.slice(0, t.character - o.start.character), f = c.uri, g = u ? function(e, t, r) {
										var i = d(e.start, t),
											o = d(e.end, r);
										return n.Range.create(i, o)
									}(o, 1, -1) : o, b = function(e, t, r) {
										var i, o = e.lastIndexOf("/");
										if (-1 === o) i = r;
										else {
											var s = t.slice(o + 1),
												a = d(r.end, -s.length),
												l = s.indexOf(" "),
												c = void 0;
											c = -1 !== l ? d(a, l) : r.end, i = n.Range.create(a, c)
										}
										return i
									}(m, h, g), y = m.substring(0, m.lastIndexOf("/") + 1), !(v = p.resolveReference(y || ".", f))) return [
									3, 4
								];
								F.label = 1;
							case 1:
								return F.trys.push([1, 3, , 4]), w = [], [4, this.readDirectory(v)];
							case 2:
								for (x = F.sent(), S = 0, k = x; S < k.length; S++) C = k[S], T = C[0], E = C[1], T.charCodeAt(0) ===
									s || E !== n.FileType.Directory && i.joinPath(v, T) === f || w.push(l(T, E === n.FileType.Directory,
										b));
								return [2, w];
							case 3:
								return F.sent(), [3, 4];
							case 4:
								return [2, []]
						}
					}))
				}))
			}, e
		}();
	t.PathCompletionParticipant = o;
	var s = ".".charCodeAt(0);

	function a(e) {
		return r.startsWith(e, "'") || r.startsWith(e, '"') ? e.slice(1, -1) : e
	}

	function l(e, t, r) {
		return t ? {
			label: c(e += "/"),
			kind: n.CompletionItemKind.Folder,
			textEdit: n.TextEdit.replace(r, c(e)),
			command: {
				title: "Suggest",
				command: "editor.action.triggerSuggest"
			}
		} : {
			label: c(e),
			kind: n.CompletionItemKind.File,
			textEdit: n.TextEdit.replace(r, c(e))
		}
	}

	function c(e) {
		return e.replace(/(\s|\(|\)|,|"|')/g, "\\$1")
	}

	function d(e, t) {
		return n.Position.create(e.line, e.character + t)
	}
}));
__awaiter = this && this.__awaiter || function(e, t, n, r) {
	return new(n || (n = Promise))((function(i, o) {
		function s(e) {
			try {
				l(r.next(e))
			} catch (e) {
				o(e)
			}
		}

		function a(e) {
			try {
				l(r.throw(e))
			} catch (e) {
				o(e)
			}
		}

		function l(e) {
			var t;
			e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
				e(t)
			}))).then(s, a)
		}
		l((r = r.apply(e, t || [])).next())
	}))
}, __generator = this && this.__generator || function(e, t) {
	var n, r, i, o, s = {
		label: 0,
		sent: function() {
			if (1 & i[0]) throw i[1];
			return i[1]
		},
		trys: [],
		ops: []
	};
	return o = {
		next: a(0),
		throw: a(1),
		return: a(2)
	}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
		return this
	}), o;

	function a(o) {
		return function(a) {
			return function(o) {
				if (n) throw new TypeError("Generator is already executing.");
				for (; s;) try {
					if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i =
							i.call(r, o[1])).done) return i;
					switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
						case 0:
						case 1:
							i = o;
							break;
						case 4:
							return s.label++, {
								value: o[1],
								done: !1
							};
						case 5:
							s.label++, r = o[1], o = [0];
							continue;
						case 7:
							o = s.ops.pop(), s.trys.pop();
							continue;
						default:
							if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
								s = 0;
								continue
							}
							if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
								s.label = o[1];
								break
							}
							if (6 === o[0] && s.label < i[1]) {
								s.label = i[1], i = o;
								break
							}
							if (i && s.label < i[2]) {
								s.label = i[2], s.ops.push(o);
								break
							}
							i[2] && s.ops.pop(), s.trys.pop();
							continue
					}
					o = t.call(e, s)
				} catch (e) {
					o = [6, e], r = 0
				} finally {
					n = i = 0
				}
				if (5 & o[0]) throw o[1];
				return {
					value: o[0] ? o[1] : void 0,
					done: !0
				}
			}([o, a])
		}
	}
};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssCompletion", [
		"require", "exports", "../parser/cssNodes", "../parser/cssSymbolScope", "../languageFacts/facts",
		"../utils/strings", "../cssLanguageTypes", "vscode-nls", "../utils/objects", "./pathCompletion"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSCompletion = void 0;
	var n, r = e("../parser/cssNodes"),
		i = e("../parser/cssSymbolScope"),
		o = e("../languageFacts/facts"),
		s = e("../utils/strings"),
		a = e("../cssLanguageTypes"),
		l = e("vscode-nls"),
		c = e("../utils/objects"),
		d = e("./pathCompletion"),
		p = l.loadMessageBundle(),
		h = a.InsertTextFormat.Snippet;
	! function(e) {
		e.Enums = " ", e.Normal = "d", e.VendorPrefixed = "x", e.Term = "y", e.Variable = "z"
	}(n || (n = {}));
	var u = function() {
		function e(e, t, n) {
			void 0 === e && (e = null), this.variablePrefix = e, this.lsOptions = t, this.cssDataManager = n, this.completionParticipants = []
		}
		return e.prototype.configure = function(e) {
			this.defaultSettings = e
		}, e.prototype.getSymbolContext = function() {
			return this.symbolContext || (this.symbolContext = new i.Symbols(this.styleSheet)), this.symbolContext
		}, e.prototype.setCompletionParticipants = function(e) {
			this.completionParticipants = e || []
		}, e.prototype.doComplete2 = function(e, t, n, r, i) {
			return void 0 === i && (i = this.defaultSettings), __awaiter(this, void 0, void 0, (function() {
				var o, s, a, l;
				return __generator(this, (function(c) {
					switch (c.label) {
						case 0:
							if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory) return [2,
								this.doComplete(e, t, n, i)
							];
							o = new d.PathCompletionParticipant(this.lsOptions.fileSystemProvider.readDirectory), s = this.completionParticipants,
								this.completionParticipants = [o].concat(s), a = this.doComplete(e, t, n, i), c.label = 1;
						case 1:
							return c.trys.push([1, , 3, 4]), [4, o.computeCompletions(e, r)];
						case 2:
							return l = c.sent(), [2, {
								isIncomplete: a.isIncomplete || l.isIncomplete,
								items: l.items.concat(a.items)
							}];
						case 3:
							return this.completionParticipants = s, [7];
						case 4:
							return [2]
					}
				}))
			}))
		}, e.prototype.doComplete = function(e, t, n, i) {
			this.offset = e.offsetAt(t), this.position = t, this.currentWord = function(e, t) {
					var n = t - 1,
						r = e.getText();
					for (; n >= 0 && -1 === ' \t\n\r":{[()]},*>+'.indexOf(r.charAt(n));) n--;
					return r.substring(n + 1, t)
				}(e, this.offset), this.defaultReplaceRange = a.Range.create(a.Position.create(this.position.line, this.position
					.character - this.currentWord.length), this.position), this.textDocument = e, this.styleSheet = n, this.documentSettings =
				i;
			try {
				var o = {
					isIncomplete: !1,
					items: []
				};
				this.nodePath = r.getNodePath(this.styleSheet, this.offset);
				for (var s = this.nodePath.length - 1; s >= 0; s--) {
					var l = this.nodePath[s];
					if (l instanceof r.Property) this.getCompletionsForDeclarationProperty(l.getParent(), o);
					else if (l instanceof r.Expression) l.parent instanceof r.Interpolation ? this.getVariableProposals(null, o) :
						this.getCompletionsForExpression(l, o);
					else if (l instanceof r.SimpleSelector) {
						var c = l.findAParent(r.NodeType.ExtendsReference, r.NodeType.Ruleset);
						if (c)
							if (c.type === r.NodeType.ExtendsReference) this.getCompletionsForExtendsReference(c, l, o);
							else {
								var d = c;
								this.getCompletionsForSelector(d, d && d.isNested(), o)
							}
					} else if (l instanceof r.FunctionArgument) this.getCompletionsForFunctionArgument(l, l.getParent(), o);
					else if (l instanceof r.Declarations) this.getCompletionsForDeclarations(l, o);
					else if (l instanceof r.VariableDeclaration) this.getCompletionsForVariableDeclaration(l, o);
					else if (l instanceof r.RuleSet) this.getCompletionsForRuleSet(l, o);
					else if (l instanceof r.Interpolation) this.getCompletionsForInterpolation(l, o);
					else if (l instanceof r.FunctionDeclaration) this.getCompletionsForFunctionDeclaration(l, o);
					else if (l instanceof r.MixinReference) this.getCompletionsForMixinReference(l, o);
					else if (l instanceof r.Function) this.getCompletionsForFunctionArgument(null, l, o);
					else if (l instanceof r.Supports) this.getCompletionsForSupports(l, o);
					else if (l instanceof r.SupportsCondition) this.getCompletionsForSupportsCondition(l, o);
					else if (l instanceof r.ExtendsReference) this.getCompletionsForExtendsReference(l, null, o);
					else if (l.type === r.NodeType.URILiteral) this.getCompletionForUriLiteralValue(l, o);
					else if (null === l.parent) this.getCompletionForTopLevel(o);
					else {
						if (l.type !== r.NodeType.StringLiteral || !this.isImportPathParent(l.parent.type)) continue;
						this.getCompletionForImportPath(l, o)
					}
					if (o.items.length > 0 || this.offset > l.offset) return this.finalize(o)
				}
				return this.getCompletionsForStylesheet(o), 0 === o.items.length && this.variablePrefix && 0 === this.currentWord
					.indexOf(this.variablePrefix) && this.getVariableProposals(null, o), this.finalize(o)
			} finally {
				this.position = null, this.currentWord = null, this.textDocument = null, this.styleSheet = null, this.symbolContext =
					null, this.defaultReplaceRange = null, this.nodePath = null
			}
		}, e.prototype.isImportPathParent = function(e) {
			return e === r.NodeType.Import
		}, e.prototype.finalize = function(e) {
			return e
		}, e.prototype.findInNodePath = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			for (var n = this.nodePath.length - 1; n >= 0; n--) {
				var r = this.nodePath[n];
				if (-1 !== e.indexOf(r.type)) return r
			}
			return null
		}, e.prototype.getCompletionsForDeclarationProperty = function(e, t) {
			return this.getPropertyProposals(e, t)
		}, e.prototype.getPropertyProposals = function(e, t) {
			var r = this,
				i = this.isTriggerPropertyValueCompletionEnabled,
				l = this.isCompletePropertyWithSemicolonEnabled;
			return this.cssDataManager.getProperties().forEach((function(d) {
				var p, h, u = !1;
				e ? (p = r.getCompletionRange(e.getProperty()), h = d.name, c.isDefined(e.colonPosition) || (h += ": ", u = !
						0)) : (p = r.getCompletionRange(null), h = d.name + ": ", u = !0), !e && l && (h += "$0;"), e && !e.semicolonPosition &&
					l && r.offset >= r.textDocument.offsetAt(p.end) && (h += "$0;");
				var f = {
					label: d.name,
					documentation: o.getEntryDescription(d, r.doesSupportMarkdown()),
					tags: m(d) ? [a.CompletionItemTag.Deprecated] : [],
					textEdit: a.TextEdit.replace(p, h),
					insertTextFormat: a.InsertTextFormat.Snippet,
					kind: a.CompletionItemKind.Property
				};
				d.restrictions || (u = !1), i && u && (f.command = {
					title: "Suggest",
					command: "editor.action.triggerSuggest"
				});
				var g = (255 - ("number" == typeof d.relevance ? Math.min(Math.max(d.relevance, 0), 99) : 50)).toString(16),
					b = s.startsWith(d.name, "-") ? n.VendorPrefixed : n.Normal;
				f.sortText = b + "_" + g, t.items.push(f)
			})), this.completionParticipants.forEach((function(e) {
				e.onCssProperty && e.onCssProperty({
					propertyName: r.currentWord,
					range: r.defaultReplaceRange
				})
			})), t
		}, Object.defineProperty(e.prototype, "isTriggerPropertyValueCompletionEnabled", {
			get: function() {
				var e, t;
				return null === (t = null === (e = this.documentSettings) || void 0 === e ? void 0 : e.triggerPropertyValueCompletion) ||
					void 0 === t || t
			},
			enumerable: !1,
			configurable: !0
		}), Object.defineProperty(e.prototype, "isCompletePropertyWithSemicolonEnabled", {
			get: function() {
				var e, t;
				return null === (t = null === (e = this.documentSettings) || void 0 === e ? void 0 : e.completePropertyWithSemicolon) ||
					void 0 === t || t
			},
			enumerable: !1,
			configurable: !0
		}), e.prototype.getCompletionsForDeclarationValue = function(e, t) {
			for (var n = this, i = e.getFullPropertyName(), o = this.cssDataManager.getProperty(i), s = e.getValue() || null; s &&
				s.hasChildren();) s = s.findChildAtOffset(this.offset, !1);
			if (this.completionParticipants.forEach((function(e) {
					e.onCssPropertyValue && e.onCssPropertyValue({
						propertyName: i,
						propertyValue: n.currentWord,
						range: n.getCompletionRange(s)
					})
				})), o) {
				if (o.restrictions)
					for (var l = 0, c = o.restrictions; l < c.length; l++) {
						switch (c[l]) {
							case "color":
								this.getColorProposals(o, s, t);
								break;
							case "position":
								this.getPositionProposals(o, s, t);
								break;
							case "repeat":
								this.getRepeatStyleProposals(o, s, t);
								break;
							case "line-style":
								this.getLineStyleProposals(o, s, t);
								break;
							case "line-width":
								this.getLineWidthProposals(o, s, t);
								break;
							case "geometry-box":
								this.getGeometryBoxProposals(o, s, t);
								break;
							case "box":
								this.getBoxProposals(o, s, t);
								break;
							case "image":
								this.getImageProposals(o, s, t);
								break;
							case "timing-function":
								this.getTimingFunctionProposals(o, s, t);
								break;
							case "shape":
								this.getBasicShapeProposals(o, s, t)
						}
					}
				this.getValueEnumProposals(o, s, t), this.getCSSWideKeywordProposals(o, s, t), this.getUnitProposals(o, s, t)
			} else
				for (var d = 0, p = function(e, t) {
						var n = t.getFullPropertyName(),
							i = new f;

						function o(e) {
							return (e instanceof r.Identifier || e instanceof r.NumericValue || e instanceof r.HexColorValue) && i.add(
								e.getText()), !0
						}

						function s(e) {
							var t = e.getFullPropertyName();
							return n === t
						}

						function a(e) {
							if (e instanceof r.Declaration && e !== t && s(e)) {
								var n = e.getValue();
								n && n.accept(o)
							}
							return !0
						}
						return e.accept(a), i
					}(this.styleSheet, e).getEntries(); d < p.length; d++) {
					var h = p[d];
					t.items.push({
						label: h,
						textEdit: a.TextEdit.replace(this.getCompletionRange(s), h),
						kind: a.CompletionItemKind.Value
					})
				}
			return this.getVariableProposals(s, t), this.getTermProposals(o, s, t), t
		}, e.prototype.getValueEnumProposals = function(e, t, r) {
			if (e.values)
				for (var i = 0, l = e.values; i < l.length; i++) {
					var c = l[i],
						d = c.name,
						p = void 0;
					if (s.endsWith(d, ")")) {
						var u = d.lastIndexOf("("); - 1 !== u && (d = d.substr(0, u) + "($1)", p = h)
					}
					var f = n.Enums;
					s.startsWith(c.name, "-") && (f += n.VendorPrefixed);
					var g = {
						label: c.name,
						documentation: o.getEntryDescription(c, this.doesSupportMarkdown()),
						tags: m(e) ? [a.CompletionItemTag.Deprecated] : [],
						textEdit: a.TextEdit.replace(this.getCompletionRange(t), d),
						sortText: f,
						kind: a.CompletionItemKind.Value,
						insertTextFormat: p
					};
					r.items.push(g)
				}
			return r
		}, e.prototype.getCSSWideKeywordProposals = function(e, t, n) {
			for (var r in o.cssWideKeywords) n.items.push({
				label: r,
				documentation: o.cssWideKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			return n
		}, e.prototype.getCompletionsForInterpolation = function(e, t) {
			return this.offset >= e.offset + 2 && this.getVariableProposals(null, t), t
		}, e.prototype.getVariableProposals = function(e, t) {
			for (var i = 0, o = this.getSymbolContext().findSymbolsAtOffset(this.offset, r.ReferenceType.Variable); i < o.length; i++) {
				var l = o[i],
					c = s.startsWith(l.name, "--") ? "var(" + l.name + ")" : l.name,
					d = {
						label: l.name,
						documentation: l.value ? s.getLimitedString(l.value) : l.value,
						textEdit: a.TextEdit.replace(this.getCompletionRange(e), c),
						kind: a.CompletionItemKind.Variable,
						sortText: n.Variable
					};
				if ("string" == typeof d.documentation && y(d.documentation) && (d.kind = a.CompletionItemKind.Color), l.node.type ===
					r.NodeType.FunctionParameter) {
					var h = l.node.getParent();
					h.type === r.NodeType.MixinDeclaration && (d.detail = p("completion.argument", "argument from '{0}'", h.getName()))
				}
				t.items.push(d)
			}
			return t
		}, e.prototype.getVariableProposalsForCSSVarFunction = function(e) {
			for (var t = this.getSymbolContext().findSymbolsAtOffset(this.offset, r.ReferenceType.Variable), n = 0, i = t =
					t.filter((function(e) {
						return s.startsWith(e.name, "--")
					})); n < i.length; n++) {
				var o = i[n],
					l = {
						label: o.name,
						documentation: o.value ? s.getLimitedString(o.value) : o.value,
						textEdit: a.TextEdit.replace(this.getCompletionRange(null), o.name),
						kind: a.CompletionItemKind.Variable
					};
				"string" == typeof l.documentation && y(l.documentation) && (l.kind = a.CompletionItemKind.Color), e.items.push(
					l)
			}
			return e
		}, e.prototype.getUnitProposals = function(e, t, n) {
			var i = "0";
			if (this.currentWord.length > 0) {
				var s = this.currentWord.match(/^-?\d[\.\d+]*/);
				s && (i = s[0], n.isIncomplete = i.length === this.currentWord.length)
			} else 0 === this.currentWord.length && (n.isIncomplete = !0);
			if (t && t.parent && t.parent.type === r.NodeType.Term && (t = t.getParent()), e.restrictions)
				for (var l = 0, c = e.restrictions; l < c.length; l++) {
					var d = c[l],
						p = o.units[d];
					if (p)
						for (var h = 0, u = p; h < u.length; h++) {
							var m = i + u[h];
							n.items.push({
								label: m,
								textEdit: a.TextEdit.replace(this.getCompletionRange(t), m),
								kind: a.CompletionItemKind.Unit
							})
						}
				}
			return n
		}, e.prototype.getCompletionRange = function(e) {
			if (e && e.offset <= this.offset && this.offset <= e.end) {
				var t = -1 !== e.end ? this.textDocument.positionAt(e.end) : this.position,
					n = this.textDocument.positionAt(e.offset);
				if (n.line === t.line) return a.Range.create(n, t)
			}
			return this.defaultReplaceRange
		}, e.prototype.getColorProposals = function(e, t, n) {
			for (var r in o.colors) n.items.push({
				label: r,
				documentation: o.colors[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Color
			});
			for (var r in o.colorKeywords) n.items.push({
				label: r,
				documentation: o.colorKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			var i = new f;
			this.styleSheet.acceptVisitor(new b(i, this.offset));
			for (var s = 0, l = i.getEntries(); s < l.length; s++) {
				r = l[s];
				n.items.push({
					label: r,
					textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
					kind: a.CompletionItemKind.Color
				})
			}
			for (var c = function(e) {
					var r = 1,
						i = e.func.replace(/\[?\$(\w+)\]?/g, (function(e, t) {
							return "${" + r++ + ":" + t + "}"
						}));
					n.items.push({
						label: e.func.substr(0, e.func.indexOf("(")),
						detail: e.func,
						documentation: e.desc,
						textEdit: a.TextEdit.replace(d.getCompletionRange(t), i),
						insertTextFormat: h,
						kind: a.CompletionItemKind.Function
					})
				}, d = this, p = 0, u = o.colorFunctions; p < u.length; p++) {
				c(u[p])
			}
			return n
		}, e.prototype.getPositionProposals = function(e, t, n) {
			for (var r in o.positionKeywords) n.items.push({
				label: r,
				documentation: o.positionKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			return n
		}, e.prototype.getRepeatStyleProposals = function(e, t, n) {
			for (var r in o.repeatStyleKeywords) n.items.push({
				label: r,
				documentation: o.repeatStyleKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			return n
		}, e.prototype.getLineStyleProposals = function(e, t, n) {
			for (var r in o.lineStyleKeywords) n.items.push({
				label: r,
				documentation: o.lineStyleKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			return n
		}, e.prototype.getLineWidthProposals = function(e, t, n) {
			for (var r = 0, i = o.lineWidthKeywords; r < i.length; r++) {
				var s = i[r];
				n.items.push({
					label: s,
					textEdit: a.TextEdit.replace(this.getCompletionRange(t), s),
					kind: a.CompletionItemKind.Value
				})
			}
			return n
		}, e.prototype.getGeometryBoxProposals = function(e, t, n) {
			for (var r in o.geometryBoxKeywords) n.items.push({
				label: r,
				documentation: o.geometryBoxKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			return n
		}, e.prototype.getBoxProposals = function(e, t, n) {
			for (var r in o.boxKeywords) n.items.push({
				label: r,
				documentation: o.boxKeywords[r],
				textEdit: a.TextEdit.replace(this.getCompletionRange(t), r),
				kind: a.CompletionItemKind.Value
			});
			return n
		}, e.prototype.getImageProposals = function(e, t, n) {
			for (var r in o.imageFunctions) {
				var i = g(r);
				n.items.push({
					label: r,
					documentation: o.imageFunctions[r],
					textEdit: a.TextEdit.replace(this.getCompletionRange(t), i),
					kind: a.CompletionItemKind.Function,
					insertTextFormat: r !== i ? h : void 0
				})
			}
			return n
		}, e.prototype.getTimingFunctionProposals = function(e, t, n) {
			for (var r in o.transitionTimingFunctions) {
				var i = g(r);
				n.items.push({
					label: r,
					documentation: o.transitionTimingFunctions[r],
					textEdit: a.TextEdit.replace(this.getCompletionRange(t), i),
					kind: a.CompletionItemKind.Function,
					insertTextFormat: r !== i ? h : void 0
				})
			}
			return n
		}, e.prototype.getBasicShapeProposals = function(e, t, n) {
			for (var r in o.basicShapeFunctions) {
				var i = g(r);
				n.items.push({
					label: r,
					documentation: o.basicShapeFunctions[r],
					textEdit: a.TextEdit.replace(this.getCompletionRange(t), i),
					kind: a.CompletionItemKind.Function,
					insertTextFormat: r !== i ? h : void 0
				})
			}
			return n
		}, e.prototype.getCompletionsForStylesheet = function(e) {
			var t = this.styleSheet.findFirstChildBeforeOffset(this.offset);
			return t ? t instanceof r.RuleSet ? this.getCompletionsForRuleSet(t, e) : t instanceof r.Supports ? this.getCompletionsForSupports(
				t, e) : e : this.getCompletionForTopLevel(e)
		}, e.prototype.getCompletionForTopLevel = function(e) {
			var t = this;
			return this.cssDataManager.getAtDirectives().forEach((function(n) {
				e.items.push({
					label: n.name,
					textEdit: a.TextEdit.replace(t.getCompletionRange(null), n.name),
					documentation: o.getEntryDescription(n, t.doesSupportMarkdown()),
					tags: m(n) ? [a.CompletionItemTag.Deprecated] : [],
					kind: a.CompletionItemKind.Keyword
				})
			})), this.getCompletionsForSelector(null, !1, e), e
		}, e.prototype.getCompletionsForRuleSet = function(e, t) {
			var n = e.getDeclarations();
			return n && n.endsWith("}") && this.offset >= n.end ? this.getCompletionForTopLevel(t) : !n || this.offset <= n.offset ?
				this.getCompletionsForSelector(e, e.isNested(), t) : this.getCompletionsForDeclarations(e.getDeclarations(), t)
		}, e.prototype.getCompletionsForSelector = function(e, t, i) {
			var l = this,
				c = this.findInNodePath(r.NodeType.PseudoSelector, r.NodeType.IdentifierSelector, r.NodeType.ClassSelector, r.NodeType
					.ElementNameSelector);
			if (!c && this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ":") && (this.currentWord = ":" +
					this.currentWord, this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ":") && (this.currentWord =
						":" + this.currentWord), this.defaultReplaceRange = a.Range.create(a.Position.create(this.position.line, this
						.position.character - this.currentWord.length), this.position)), this.cssDataManager.getPseudoClasses().forEach(
					(function(e) {
						var t = g(e.name),
							r = {
								label: e.name,
								textEdit: a.TextEdit.replace(l.getCompletionRange(c), t),
								documentation: o.getEntryDescription(e, l.doesSupportMarkdown()),
								tags: m(e) ? [a.CompletionItemTag.Deprecated] : [],
								kind: a.CompletionItemKind.Function,
								insertTextFormat: e.name !== t ? h : void 0
							};
						s.startsWith(e.name, ":-") && (r.sortText = n.VendorPrefixed), i.items.push(r)
					})), this.cssDataManager.getPseudoElements().forEach((function(e) {
					var t = g(e.name),
						r = {
							label: e.name,
							textEdit: a.TextEdit.replace(l.getCompletionRange(c), t),
							documentation: o.getEntryDescription(e, l.doesSupportMarkdown()),
							tags: m(e) ? [a.CompletionItemTag.Deprecated] : [],
							kind: a.CompletionItemKind.Function,
							insertTextFormat: e.name !== t ? h : void 0
						};
					s.startsWith(e.name, "::-") && (r.sortText = n.VendorPrefixed), i.items.push(r)
				})), !t) {
				for (var d = 0, p = o.html5Tags; d < p.length; d++) {
					var u = p[d];
					i.items.push({
						label: u,
						textEdit: a.TextEdit.replace(this.getCompletionRange(c), u),
						kind: a.CompletionItemKind.Keyword
					})
				}
				for (var f = 0, b = o.svgElements; f < b.length; f++) {
					u = b[f];
					i.items.push({
						label: u,
						textEdit: a.TextEdit.replace(this.getCompletionRange(c), u),
						kind: a.CompletionItemKind.Keyword
					})
				}
			}
			var y = {};
			y[this.currentWord] = !0;
			var v = this.textDocument.getText();
			if (this.styleSheet.accept((function(e) {
					if (e.type === r.NodeType.SimpleSelector && e.length > 0) {
						var t = v.substr(e.offset, e.length);
						return "." !== t.charAt(0) || y[t] || (y[t] = !0, i.items.push({
							label: t,
							textEdit: a.TextEdit.replace(l.getCompletionRange(c), t),
							kind: a.CompletionItemKind.Keyword
						})), !1
					}
					return !0
				})), e && e.isNested()) {
				var w = e.getSelectors().findFirstChildBeforeOffset(this.offset);
				w && 0 === e.getSelectors().getChildren().indexOf(w) && this.getPropertyProposals(null, i)
			}
			return i
		}, e.prototype.getCompletionsForDeclarations = function(e, t) {
			if (!e || this.offset === e.offset) return t;
			var n = e.findFirstChildBeforeOffset(this.offset);
			if (!n) return this.getCompletionsForDeclarationProperty(null, t);
			if (n instanceof r.AbstractDeclaration) {
				var i = n;
				if (!c.isDefined(i.colonPosition) || this.offset <= i.colonPosition) return this.getCompletionsForDeclarationProperty(
					i, t);
				if (c.isDefined(i.semicolonPosition) && i.semicolonPosition < this.offset) return this.offset === i.semicolonPosition +
					1 ? t : this.getCompletionsForDeclarationProperty(null, t);
				if (i instanceof r.Declaration) return this.getCompletionsForDeclarationValue(i, t)
			} else n instanceof r.ExtendsReference ? this.getCompletionsForExtendsReference(n, null, t) : (this.currentWord &&
				"@" === this.currentWord[0] || n instanceof r.RuleSet) && this.getCompletionsForDeclarationProperty(null, t);
			return t
		}, e.prototype.getCompletionsForVariableDeclaration = function(e, t) {
			return this.offset && c.isDefined(e.colonPosition) && this.offset > e.colonPosition && this.getVariableProposals(
				e.getValue(), t), t
		}, e.prototype.getCompletionsForExpression = function(e, t) {
			var n = e.getParent();
			if (n instanceof r.FunctionArgument) return this.getCompletionsForFunctionArgument(n, n.getParent(), t), t;
			var i = e.findParent(r.NodeType.Declaration);
			if (!i) return this.getTermProposals(void 0, null, t), t;
			var o = e.findChildAtOffset(this.offset, !0);
			return o ? o instanceof r.NumericValue || o instanceof r.Identifier ? this.getCompletionsForDeclarationValue(i,
				t) : t : this.getCompletionsForDeclarationValue(i, t)
		}, e.prototype.getCompletionsForFunctionArgument = function(e, t, n) {
			var r = t.getIdentifier();
			return r && r.matches("var") && (t.getArguments().hasChildren() && t.getArguments().getChild(0) !== e || this.getVariableProposalsForCSSVarFunction(
				n)), n
		}, e.prototype.getCompletionsForFunctionDeclaration = function(e, t) {
			var n = e.getDeclarations();
			return n && this.offset > n.offset && this.offset < n.end && this.getTermProposals(void 0, null, t), t
		}, e.prototype.getCompletionsForMixinReference = function(e, t) {
			for (var n = this, i = 0, o = this.getSymbolContext().findSymbolsAtOffset(this.offset, r.ReferenceType.Mixin); i <
				o.length; i++) {
				var s = o[i];
				s.node instanceof r.MixinDeclaration && t.items.push(this.makeTermProposal(s, s.node.getParameters(), null))
			}
			var a = e.getIdentifier() || null;
			return this.completionParticipants.forEach((function(e) {
				e.onCssMixinReference && e.onCssMixinReference({
					mixinName: n.currentWord,
					range: n.getCompletionRange(a)
				})
			})), t
		}, e.prototype.getTermProposals = function(e, t, n) {
			for (var i = 0, o = this.getSymbolContext().findSymbolsAtOffset(this.offset, r.ReferenceType.Function); i < o.length; i++) {
				var s = o[i];
				s.node instanceof r.FunctionDeclaration && n.items.push(this.makeTermProposal(s, s.node.getParameters(), t))
			}
			return n
		}, e.prototype.makeTermProposal = function(e, t, i) {
			e.node;
			var o = t.getChildren().map((function(e) {
					return e instanceof r.FunctionParameter ? e.getName() : e.getText()
				})),
				s = e.name + "(" + o.map((function(e, t) {
					return "${" + (t + 1) + ":" + e + "}"
				})).join(", ") + ")";
			return {
				label: e.name,
				detail: e.name + "(" + o.join(", ") + ")",
				textEdit: a.TextEdit.replace(this.getCompletionRange(i), s),
				insertTextFormat: h,
				kind: a.CompletionItemKind.Function,
				sortText: n.Term
			}
		}, e.prototype.getCompletionsForSupportsCondition = function(e, t) {
			var n = e.findFirstChildBeforeOffset(this.offset);
			if (n) {
				if (n instanceof r.Declaration) return !c.isDefined(n.colonPosition) || this.offset <= n.colonPosition ? this.getCompletionsForDeclarationProperty(
					n, t) : this.getCompletionsForDeclarationValue(n, t);
				if (n instanceof r.SupportsCondition) return this.getCompletionsForSupportsCondition(n, t)
			}
			return c.isDefined(e.lParent) && this.offset > e.lParent && (!c.isDefined(e.rParent) || this.offset <= e.rParent) ?
				this.getCompletionsForDeclarationProperty(null, t) : t
		}, e.prototype.getCompletionsForSupports = function(e, t) {
			var n = e.getDeclarations();
			if (!n || this.offset <= n.offset) {
				var i = e.findFirstChildBeforeOffset(this.offset);
				return i instanceof r.SupportsCondition ? this.getCompletionsForSupportsCondition(i, t) : t
			}
			return this.getCompletionForTopLevel(t)
		}, e.prototype.getCompletionsForExtendsReference = function(e, t, n) {
			return n
		}, e.prototype.getCompletionForUriLiteralValue = function(e, t) {
			var n, r, i;
			if (e.hasChildren()) {
				var o = e.getChild(0);
				n = o.getText(), r = this.position, i = this.getCompletionRange(o)
			} else {
				n = "", r = this.position;
				var s = this.textDocument.positionAt(e.offset + "url(".length);
				i = a.Range.create(s, s)
			}
			return this.completionParticipants.forEach((function(e) {
				e.onCssURILiteralValue && e.onCssURILiteralValue({
					uriValue: n,
					position: r,
					range: i
				})
			})), t
		}, e.prototype.getCompletionForImportPath = function(e, t) {
			var n = this;
			return this.completionParticipants.forEach((function(t) {
				t.onCssImportPath && t.onCssImportPath({
					pathValue: e.getText(),
					position: n.position,
					range: n.getCompletionRange(e)
				})
			})), t
		}, e.prototype.hasCharacterAtPosition = function(e, t) {
			var n = this.textDocument.getText();
			return e >= 0 && e < n.length && n.charAt(e) === t
		}, e.prototype.doesSupportMarkdown = function() {
			var e, t, n;
			if (!c.isDefined(this.supportsMarkdown)) {
				if (!c.isDefined(this.lsOptions.clientCapabilities)) return this.supportsMarkdown = !0, this.supportsMarkdown;
				var r = null === (n = null === (t = null === (e = this.lsOptions.clientCapabilities.textDocument) || void 0 ===
					e ? void 0 : e.completion) || void 0 === t ? void 0 : t.completionItem) || void 0 === n ? void 0 : n.documentationFormat;
				this.supportsMarkdown = Array.isArray(r) && -1 !== r.indexOf(a.MarkupKind.Markdown)
			}
			return this.supportsMarkdown
		}, e
	}();

	function m(e) {
		return !(!e.status || "nonstandard" !== e.status && "obsolete" !== e.status)
	}
	t.CSSCompletion = u;
	var f = function() {
		function e() {
			this.entries = {}
		}
		return e.prototype.add = function(e) {
			this.entries[e] = !0
		}, e.prototype.getEntries = function() {
			return Object.keys(this.entries)
		}, e
	}();

	function g(e) {
		return e.replace(/\(\)$/, "($1)")
	}
	var b = function() {
		function e(e, t) {
			this.entries = e, this.currentOffset = t
		}
		return e.prototype.visitNode = function(e) {
			return (e instanceof r.HexColorValue || e instanceof r.Function && o.isColorConstructor(e)) && (this.currentOffset <
				e.offset || e.end < this.currentOffset) && this.entries.add(e.getText()), !0
		}, e
	}();

	function y(e) {
		return e.toLowerCase() in o.colors || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)
	}
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/selectorPrinting", [
		"require", "exports", "../parser/cssNodes", "../parser/cssScanner", "vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.selectorToElement = t.SelectorPrinting = t.toElement = t.LabelElement = t.RootElement = t.Element = void 0;
	var n = e("../parser/cssNodes"),
		r = e("../parser/cssScanner"),
		i = e("vscode-nls").loadMessageBundle(),
		o = function() {
			function e() {
				this.parent = null, this.children = null, this.attributes = null
			}
			return e.prototype.findAttribute = function(e) {
				if (this.attributes)
					for (var t = 0, n = this.attributes; t < n.length; t++) {
						var r = n[t];
						if (r.name === e) return r.value
					}
				return null
			}, e.prototype.addChild = function(t) {
				t instanceof e && (t.parent = this), this.children || (this.children = []), this.children.push(t)
			}, e.prototype.append = function(e) {
				if (this.attributes) {
					var t = this.attributes[this.attributes.length - 1];
					t.value = t.value + e
				}
			}, e.prototype.prepend = function(e) {
				if (this.attributes) {
					var t = this.attributes[0];
					t.value = e + t.value
				}
			}, e.prototype.findRoot = function() {
				for (var e = this; e.parent && !(e.parent instanceof s);) e = e.parent;
				return e
			}, e.prototype.removeChild = function(e) {
				if (this.children) {
					var t = this.children.indexOf(e);
					if (-1 !== t) return this.children.splice(t, 1), !0
				}
				return !1
			}, e.prototype.addAttr = function(e, t) {
				this.attributes || (this.attributes = []);
				for (var n = 0, r = this.attributes; n < r.length; n++) {
					var i = r[n];
					if (i.name === e) return void(i.value += " " + t)
				}
				this.attributes.push({
					name: e,
					value: t
				})
			}, e.prototype.clone = function(t) {
				void 0 === t && (t = !0);
				var n = new e;
				if (this.attributes) {
					n.attributes = [];
					for (var r = 0, i = this.attributes; r < i.length; r++) {
						var o = i[r];
						n.addAttr(o.name, o.value)
					}
				}
				if (t && this.children) {
					n.children = [];
					for (var s = 0; s < this.children.length; s++) n.addChild(this.children[s].clone())
				}
				return n
			}, e.prototype.cloneWithParent = function() {
				var e = this.clone(!1);
				!this.parent || this.parent instanceof s || this.parent.cloneWithParent().addChild(e);
				return e
			}, e
		}();
	t.Element = o;
	var s = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(t, e), t
	}(o);
	t.RootElement = s;
	var a = function(e) {
		function t(t) {
			var n = e.call(this) || this;
			return n.addAttr("name", t), n
		}
		return __extends(t, e), t
	}(o);
	t.LabelElement = a;
	var l, c = function() {
		function e(e) {
			this.quote = e, this.result = []
		}
		return e.prototype.print = function(e) {
			return this.result = [], e instanceof s ? e.children && this.doPrint(e.children, 0) : this.doPrint([e], 0), [{
				language: "html",
				value: this.result.join("\n")
			}]
		}, e.prototype.doPrint = function(e, t) {
			for (var n = 0, r = e; n < r.length; n++) {
				var i = r[n];
				this.doPrintElement(i, t), i.children && this.doPrint(i.children, t + 1)
			}
		}, e.prototype.writeLine = function(e, t) {
			var n = new Array(e + 1).join("  ");
			this.result.push(n + t)
		}, e.prototype.doPrintElement = function(e, t) {
			var n = e.findAttribute("name");
			if (e instanceof a || "…" === n) this.writeLine(t, n);
			else {
				var r = ["<"];
				if (n ? r.push(n) : r.push("element"), e.attributes)
					for (var i = 0, o = e.attributes; i < o.length; i++) {
						var s = o[i];
						if ("name" !== s.name) {
							r.push(" "), r.push(s.name);
							var c = s.value;
							c && (r.push("="), r.push(l.ensure(c, this.quote)))
						}
					}
				r.push(">"), this.writeLine(t, r.join(""))
			}
		}, e
	}();
	! function(e) {
		function t(e) {
			var t = e.match(/^['"](.*)["']$/);
			return t ? t[1] : e
		}
		e.ensure = function(e, n) {
			return n + t(e) + n
		}, e.remove = t
	}(l || (l = {}));
	var d = function() {
		this.id = 0, this.attr = 0, this.tag = 0
	};

	function p(e, t) {
		for (var r = new o, i = 0, s = e.getChildren(); i < s.length; i++) {
			var a = s[i];
			switch (a.type) {
				case n.NodeType.SelectorCombinator:
					if (t) {
						var c = a.getText().split("&");
						if (1 === c.length) {
							r.addAttr("name", c[0]);
							break
						}
						if (r = t.cloneWithParent(), c[0]) r.findRoot().prepend(c[0]);
						for (var d = 1; d < c.length; d++) {
							if (d > 1) {
								var p = t.cloneWithParent();
								r.addChild(p.findRoot()), r = p
							}
							r.append(c[d])
						}
					}
					break;
				case n.NodeType.SelectorPlaceholder:
					if (a.matches("@at-root")) return r;
				case n.NodeType.ElementNameSelector:
					var u = a.getText();
					r.addAttr("name", "*" === u ? "element" : h(u));
					break;
				case n.NodeType.ClassSelector:
					r.addAttr("class", h(a.getText().substring(1)));
					break;
				case n.NodeType.IdentifierSelector:
					r.addAttr("id", h(a.getText().substring(1)));
					break;
				case n.NodeType.MixinDeclaration:
					r.addAttr("class", a.getName());
					break;
				case n.NodeType.PseudoSelector:
					r.addAttr(h(a.getText()), "");
					break;
				case n.NodeType.AttributeSelector:
					var m = a,
						f = m.getIdentifier();
					if (f) {
						var g = m.getValue(),
							b = m.getOperator(),
							y = void 0;
						if (g && b) switch (h(b.getText())) {
							case "|=":
								y = l.remove(h(g.getText())) + "-…";
								break;
							case "^=":
								y = l.remove(h(g.getText())) + "…";
								break;
							case "$=":
								y = "…" + l.remove(h(g.getText()));
								break;
							case "~=":
								y = " … " + l.remove(h(g.getText())) + " … ";
								break;
							case "*=":
								y = "…" + l.remove(h(g.getText())) + "…";
								break;
							default:
								y = l.remove(h(g.getText()))
						}
						r.addAttr(h(f.getText()), y)
					}
			}
		}
		return r
	}

	function h(e) {
		var t = new r.Scanner;
		t.setSource(e);
		var n = t.scanUnquotedString();
		return n ? n.text : e
	}
	t.toElement = p;
	var u = function() {
		function e(e) {
			this.cssDataManager = e
		}
		return e.prototype.selectorToMarkedString = function(e) {
			var t = g(e);
			if (t) {
				var n = new c('"').print(t);
				return n.push(this.selectorToSpecificityMarkedString(e)), n
			}
			return []
		}, e.prototype.simpleSelectorToMarkedString = function(e) {
			var t = p(e),
				n = new c('"').print(t);
			return n.push(this.selectorToSpecificityMarkedString(e)), n
		}, e.prototype.isPseudoElementIdentifier = function(e) {
			var t = e.match(/^::?([\w-]+)/);
			return !!t && !!this.cssDataManager.getPseudoElement("::" + t[1])
		}, e.prototype.selectorToSpecificityMarkedString = function(e) {
			var t = this,
				r = function(e) {
					for (var i = 0, s = e.getChildren(); i < s.length; i++) {
						var a = s[i];
						switch (a.type) {
							case n.NodeType.IdentifierSelector:
								o.id++;
								break;
							case n.NodeType.ClassSelector:
							case n.NodeType.AttributeSelector:
								o.attr++;
								break;
							case n.NodeType.ElementNameSelector:
								if (a.matches("*")) break;
								o.tag++;
								break;
							case n.NodeType.PseudoSelector:
								var l = a.getText();
								if (t.isPseudoElementIdentifier(l)) o.tag++;
								else {
									if (l.match(/^:not/i)) break;
									o.attr++
								}
						}
						a.getChildren().length > 0 && r(a)
					}
				},
				o = new d;
			return r(e), i("specificity",
				"[Selector Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity): ({0}, {1}, {2})", o.id,
				o.attr, o.tag)
		}, e
	}();
	t.SelectorPrinting = u;
	var m = function() {
		function e(e) {
			this.prev = null, this.element = e
		}
		return e.prototype.processSelector = function(e) {
			var t = null;
			if (!(this.element instanceof s) && e.getChildren().some((function(e) {
					return e.hasChildren() && e.getChild(0).type === n.NodeType.SelectorCombinator
				}))) {
				var r = this.element.findRoot();
				r.parent instanceof s && (t = this.element, this.element = r.parent, this.element.removeChild(r), this.prev =
					null)
			}
			for (var i = 0, o = e.getChildren(); i < o.length; i++) {
				var l = o[i];
				if (l instanceof n.SimpleSelector) {
					if (this.prev instanceof n.SimpleSelector) {
						var c = new a("…");
						this.element.addChild(c), this.element = c
					} else this.prev && (this.prev.matches("+") || this.prev.matches("~")) && this.element.parent && (this.element =
						this.element.parent);
					this.prev && this.prev.matches("~") && this.element.addChild(new a("⋮"));
					var d = p(l, t),
						h = d.findRoot();
					this.element.addChild(h), this.element = d
				}(l instanceof n.SimpleSelector || l.type === n.NodeType.SelectorCombinatorParent || l.type === n.NodeType.SelectorCombinatorShadowPiercingDescendant ||
					l.type === n.NodeType.SelectorCombinatorSibling || l.type === n.NodeType.SelectorCombinatorAllSiblings) && (
					this.prev = l)
			}
		}, e
	}();

	function f(e) {
		switch (e.type) {
			case n.NodeType.MixinDeclaration:
			case n.NodeType.Stylesheet:
				return !0
		}
		return !1
	}

	function g(e) {
		if (e.matches("@at-root")) return null;
		var t = new s,
			r = [],
			i = e.getParent();
		if (i instanceof n.RuleSet)
			for (var o = i.getParent(); o && !f(o);) {
				if (o instanceof n.RuleSet) {
					if (o.getSelectors().matches("@at-root")) break;
					r.push(o)
				}
				o = o.getParent()
			}
		for (var a = new m(t), l = r.length - 1; l >= 0; l--) {
			var c = r[l].getSelectors().getChild(0);
			c && a.processSelector(c)
		}
		return a.processSelector(e), t
	}
	t.selectorToElement = g
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssHover", ["require",
		"exports", "../parser/cssNodes", "../languageFacts/facts", "./selectorPrinting", "../utils/strings",
		"../cssLanguageTypes", "../utils/objects"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSHover = void 0;
	var n = e("../parser/cssNodes"),
		r = e("../languageFacts/facts"),
		i = e("./selectorPrinting"),
		o = e("../utils/strings"),
		s = e("../cssLanguageTypes"),
		a = e("../utils/objects"),
		l = function() {
			function e(e, t) {
				this.clientCapabilities = e, this.cssDataManager = t, this.selectorPrinting = new i.SelectorPrinting(t)
			}
			return e.prototype.configure = function(e) {
				this.defaultSettings = e
			}, e.prototype.doHover = function(e, t, i, a) {
				function l(t) {
					return s.Range.create(e.positionAt(t.offset), e.positionAt(t.end))
				}
				void 0 === a && (a = this.defaultSettings);
				for (var c = e.offsetAt(t), d = n.getNodePath(i, c), p = null, h = 0; h < d.length; h++) {
					var u = d[h];
					if (u instanceof n.Selector) {
						p = {
							contents: this.selectorPrinting.selectorToMarkedString(u),
							range: l(u)
						};
						break
					}
					if (u instanceof n.SimpleSelector) {
						o.startsWith(u.getText(), "@") || (p = {
							contents: this.selectorPrinting.simpleSelectorToMarkedString(u),
							range: l(u)
						});
						break
					}
					if (u instanceof n.Declaration) {
						var m = u.getFullPropertyName();
						(g = this.cssDataManager.getProperty(m)) && (p = (b = r.getEntryDescription(g, this.doesSupportMarkdown(), a)) ?
							{
								contents: b,
								range: l(u)
							} : null)
					} else if (u instanceof n.UnknownAtRule) {
						var f = u.getText();
						(g = this.cssDataManager.getAtDirective(f)) && (p = (b = r.getEntryDescription(g, this.doesSupportMarkdown(),
							a)) ? {
							contents: b,
							range: l(u)
						} : null)
					} else if (u instanceof n.Node && u.type === n.NodeType.PseudoSelector) {
						var g, b, y = u.getText();
						(g = "::" === y.slice(0, 2) ? this.cssDataManager.getPseudoElement(y) : this.cssDataManager.getPseudoClass(y)) &&
						(p = (b = r.getEntryDescription(g, this.doesSupportMarkdown(), a)) ? {
							contents: b,
							range: l(u)
						} : null)
					} else;
				}
				return p && (p.contents = this.convertContents(p.contents)), p
			}, e.prototype.convertContents = function(e) {
				return this.doesSupportMarkdown() || "string" == typeof e ? e : "kind" in e ? {
					kind: "plaintext",
					value: e.value
				} : Array.isArray(e) ? e.map((function(e) {
					return "string" == typeof e ? e : e.value
				})) : e.value
			}, e.prototype.doesSupportMarkdown = function() {
				if (!a.isDefined(this.supportsMarkdown)) {
					if (!a.isDefined(this.clientCapabilities)) return this.supportsMarkdown = !0, this.supportsMarkdown;
					var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.hover;
					this.supportsMarkdown = e && e.contentFormat && Array.isArray(e.contentFormat) && -1 !== e.contentFormat.indexOf(
						s.MarkupKind.Markdown)
				}
				return this.supportsMarkdown
			}, e
		}();
	t.CSSHover = l
}));
__awaiter = this && this.__awaiter || function(e, t, n, r) {
	return new(n || (n = Promise))((function(i, o) {
		function s(e) {
			try {
				l(r.next(e))
			} catch (e) {
				o(e)
			}
		}

		function a(e) {
			try {
				l(r.throw(e))
			} catch (e) {
				o(e)
			}
		}

		function l(e) {
			var t;
			e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
				e(t)
			}))).then(s, a)
		}
		l((r = r.apply(e, t || [])).next())
	}))
}, __generator = this && this.__generator || function(e, t) {
	var n, r, i, o, s = {
		label: 0,
		sent: function() {
			if (1 & i[0]) throw i[1];
			return i[1]
		},
		trys: [],
		ops: []
	};
	return o = {
		next: a(0),
		throw: a(1),
		return: a(2)
	}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
		return this
	}), o;

	function a(o) {
		return function(a) {
			return function(o) {
				if (n) throw new TypeError("Generator is already executing.");
				for (; s;) try {
					if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i =
							i.call(r, o[1])).done) return i;
					switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
						case 0:
						case 1:
							i = o;
							break;
						case 4:
							return s.label++, {
								value: o[1],
								done: !1
							};
						case 5:
							s.label++, r = o[1], o = [0];
							continue;
						case 7:
							o = s.ops.pop(), s.trys.pop();
							continue;
						default:
							if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
								s = 0;
								continue
							}
							if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
								s.label = o[1];
								break
							}
							if (6 === o[0] && s.label < i[1]) {
								s.label = i[1], i = o;
								break
							}
							if (i && s.label < i[2]) {
								s.label = i[2], s.ops.push(o);
								break
							}
							i[2] && s.ops.pop(), s.trys.pop();
							continue
					}
					o = t.call(e, s)
				} catch (e) {
					o = [6, e], r = 0
				} finally {
					n = i = 0
				}
				if (5 & o[0]) throw o[1];
				return {
					value: o[0] ? o[1] : void 0,
					done: !0
				}
			}([o, a])
		}
	}
};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssNavigation", [
		"require", "exports", "../cssLanguageTypes", "vscode-nls", "../parser/cssNodes", "../parser/cssSymbolScope",
		"../languageFacts/facts", "../utils/strings", "../utils/resources"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSNavigation = void 0;
	var n = e("../cssLanguageTypes"),
		r = e("vscode-nls"),
		i = e("../parser/cssNodes"),
		o = e("../parser/cssSymbolScope"),
		s = e("../languageFacts/facts"),
		a = e("../utils/strings"),
		l = e("../utils/resources"),
		c = r.loadMessageBundle(),
		d = /^\w+:\/\//,
		p = /^data:/,
		h = function() {
			function e(e) {
				this.fileSystemProvider = e
			}
			return e.prototype.findDefinition = function(e, t, n) {
				var r = new o.Symbols(n),
					s = e.offsetAt(t),
					a = i.getNodeAtOffset(n, s);
				if (!a) return null;
				var l = r.findSymbolFromNode(a);
				return l ? {
					uri: e.uri,
					range: u(l.node, e)
				} : null
			}, e.prototype.findReferences = function(e, t, n) {
				return this.findDocumentHighlights(e, t, n).map((function(t) {
					return {
						uri: e.uri,
						range: t.range
					}
				}))
			}, e.prototype.findDocumentHighlights = function(e, t, n) {
				var r = [],
					s = e.offsetAt(t),
					a = i.getNodeAtOffset(n, s);
				if (!a || a.type === i.NodeType.Stylesheet || a.type === i.NodeType.Declarations) return r;
				a.type === i.NodeType.Identifier && a.parent && a.parent.type === i.NodeType.ClassSelector && (a = a.parent);
				var l = new o.Symbols(n),
					c = l.findSymbolFromNode(a),
					d = a.getText();
				return n.accept((function(t) {
					if (c) {
						if (l.matchesSymbol(t, c)) return r.push({
							kind: m(t),
							range: u(t, e)
						}), !1
					} else a && a.type === t.type && t.matches(d) && r.push({
						kind: m(t),
						range: u(t, e)
					});
					return !0
				})), r
			}, e.prototype.isRawStringDocumentLinkNode = function(e) {
				return e.type === i.NodeType.Import
			}, e.prototype.findDocumentLinks = function(e, t, n) {
				for (var r = [], i = 0, o = this.findUnresolvedLinks(e, t); i < o.length; i++) {
					var s = o[i].link,
						a = s.target;
					if (!a || p.test(a));
					else if (d.test(a)) r.push(s);
					else {
						var l = n.resolveReference(a, e.uri);
						l && (s.target = l), r.push(s)
					}
				}
				return r
			}, e.prototype.findDocumentLinks2 = function(e, t, n) {
				return __awaiter(this, void 0, void 0, (function() {
					var r, i, o, s, a, l, c, h;
					return __generator(this, (function(u) {
						switch (u.label) {
							case 0:
								r = this.findUnresolvedLinks(e, t), i = [], o = 0, s = r, u.label = 1;
							case 1:
								return o < s.length ? (a = s[o], l = a.link, (c = l.target) && !p.test(c) ? [3, 2] : [3, 5]) : [3, 6];
							case 2:
								return d.test(c) ? (i.push(l), [3, 5]) : [3, 3];
							case 3:
								return [4, this.resolveRelativeReference(c, e.uri, n, a.isRawLink)];
							case 4:
								void 0 !== (h = u.sent()) && (l.target = h, i.push(l)), u.label = 5;
							case 5:
								return o++, [3, 1];
							case 6:
								return [2, i]
						}
					}))
				}))
			}, e.prototype.findUnresolvedLinks = function(e, t) {
				var n = this,
					r = [],
					o = function(t) {
						var i = t.getText(),
							o = u(t, e);
						if (o.start.line !== o.end.line || o.start.character !== o.end.character) {
							(a.startsWith(i, "'") || a.startsWith(i, '"')) && (i = i.slice(1, -1));
							var s = !!t.parent && n.isRawStringDocumentLinkNode(t.parent);
							r.push({
								link: {
									target: i,
									range: o
								},
								isRawLink: s
							})
						}
					};
				return t.accept((function(e) {
					if (e.type === i.NodeType.URILiteral) {
						var t = e.getChild(0);
						return t && o(t), !1
					}
					if (e.parent && n.isRawStringDocumentLinkNode(e.parent)) {
						var r = e.getText();
						return (a.startsWith(r, "'") || a.startsWith(r, '"')) && o(e), !1
					}
					return !0
				})), r
			}, e.prototype.findDocumentSymbols = function(e, t) {
				var r = [];
				return t.accept((function(t) {
					var o = {
							name: null,
							kind: n.SymbolKind.Class,
							location: null
						},
						s = t;
					if (t instanceof i.Selector) return o.name = t.getText(), (s = t.findAParent(i.NodeType.Ruleset, i.NodeType.ExtendsReference)) &&
						(o.location = n.Location.create(e.uri, u(s, e)), r.push(o)), !1;
					if (t instanceof i.VariableDeclaration) o.name = t.getName(), o.kind = n.SymbolKind.Variable;
					else if (t instanceof i.MixinDeclaration) o.name = t.getName(), o.kind = n.SymbolKind.Method;
					else if (t instanceof i.FunctionDeclaration) o.name = t.getName(), o.kind = n.SymbolKind.Function;
					else if (t instanceof i.Keyframe) o.name = c("literal.keyframes", "@keyframes {0}", t.getName());
					else if (t instanceof i.FontFace) o.name = c("literal.fontface", "@font-face");
					else if (t instanceof i.Media) {
						var a = t.getChild(0);
						a instanceof i.Medialist && (o.name = "@media " + a.getText(), o.kind = n.SymbolKind.Module)
					}
					return o.name && (o.location = n.Location.create(e.uri, u(s, e)), r.push(o)), !0
				})), r
			}, e.prototype.findDocumentColors = function(e, t) {
				var n = [];
				return t.accept((function(t) {
					var r = function(e, t) {
						var n = s.getColorValue(e);
						if (n) {
							return {
								color: n,
								range: u(e, t)
							}
						}
						return null
					}(t, e);
					return r && n.push(r), !0
				})), n
			}, e.prototype.getColorPresentations = function(e, t, r, i) {
				var o, a = [],
					l = Math.round(255 * r.red),
					c = Math.round(255 * r.green),
					d = Math.round(255 * r.blue);
				o = 1 === r.alpha ? "rgb(" + l + ", " + c + ", " + d + ")" : "rgba(" + l + ", " + c + ", " + d + ", " + r.alpha +
					")", a.push({
						label: o,
						textEdit: n.TextEdit.replace(i, o)
					}), o = 1 === r.alpha ? "#" + f(l) + f(c) + f(d) : "#" + f(l) + f(c) + f(d) + f(Math.round(255 * r.alpha)), a.push({
						label: o,
						textEdit: n.TextEdit.replace(i, o)
					});
				var p = s.hslFromColor(r);
				return o = 1 === p.a ? "hsl(" + p.h + ", " + Math.round(100 * p.s) + "%, " + Math.round(100 * p.l) + "%)" :
					"hsla(" + p.h + ", " + Math.round(100 * p.s) + "%, " + Math.round(100 * p.l) + "%, " + p.a + ")", a.push({
						label: o,
						textEdit: n.TextEdit.replace(i, o)
					}), a
			}, e.prototype.doRename = function(e, t, r, i) {
				var o, s = this.findDocumentHighlights(e, t, i).map((function(e) {
					return n.TextEdit.replace(e.range, r)
				}));
				return {
					changes: (o = {}, o[e.uri] = s, o)
				}
			}, e.prototype.resolveRelativeReference = function(e, t, n, r) {
				return __awaiter(this, void 0, void 0, (function() {
					var r, i, o, s, c;
					return __generator(this, (function(d) {
						switch (d.label) {
							case 0:
								return "~" === e[0] && "/" !== e[1] && this.fileSystemProvider ? (e = e.substring(1), a.startsWith(t,
									"file://") ? (r = function(e) {
									if ("@" === e[0]) return e.substring(0, e.indexOf("/", e.indexOf("/") + 1));
									return e.substring(0, e.indexOf("/"))
								}(e), i = n.resolveReference("/", t), o = l.dirname(t), [4, this.resolvePathToModule(r, o, i)]) : [3,
									2
								]) : [3, 3];
							case 1:
								if (s = d.sent()) return c = e.substring(r.length + 1), [2, l.joinPath(s, c)];
								d.label = 2;
							case 2:
							case 3:
								return [2, n.resolveReference(e, t)]
						}
					}))
				}))
			}, e.prototype.resolvePathToModule = function(e, t, n) {
				return __awaiter(this, void 0, void 0, (function() {
					var r;
					return __generator(this, (function(i) {
						switch (i.label) {
							case 0:
								return r = l.joinPath(t, "node_modules", e, "package.json"), [4, this.fileExists(r)];
							case 1:
								return i.sent() ? [2, l.dirname(r)] : n && t.startsWith(n) && t.length !== n.length ? [2, this.resolvePathToModule(
									e, l.dirname(t), n)] : [2, void 0]
						}
					}))
				}))
			}, e.prototype.fileExists = function(e) {
				return __awaiter(this, void 0, void 0, (function() {
					var t;
					return __generator(this, (function(r) {
						switch (r.label) {
							case 0:
								if (!this.fileSystemProvider) return [2, !1];
								r.label = 1;
							case 1:
								return r.trys.push([1, 3, , 4]), [4, this.fileSystemProvider.stat(e)];
							case 2:
								return (t = r.sent()).type === n.FileType.Unknown && -1 === t.size ? [2, !1] : [2, !0];
							case 3:
								return r.sent(), [2, !1];
							case 4:
								return [2]
						}
					}))
				}))
			}, e
		}();

	function u(e, t) {
		return n.Range.create(t.positionAt(e.offset), t.positionAt(e.end))
	}

	function m(e) {
		if (e.type === i.NodeType.Selector) return n.DocumentHighlightKind.Write;
		if (e instanceof i.Identifier && e.parent && e.parent instanceof i.Property && e.isCustomProperty) return n.DocumentHighlightKind
			.Write;
		if (e.parent) switch (e.parent.type) {
			case i.NodeType.FunctionDeclaration:
			case i.NodeType.MixinDeclaration:
			case i.NodeType.Keyframe:
			case i.NodeType.VariableDeclaration:
			case i.NodeType.FunctionParameter:
				return n.DocumentHighlightKind.Write
		}
		return n.DocumentHighlightKind.Read
	}

	function f(e) {
		var t = e.toString(16);
		return 2 !== t.length ? "0" + t : t
	}
	t.CSSNavigation = h
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/lintRules", ["require",
		"exports", "../parser/cssNodes", "vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.LintConfigurationSettings = t.Settings = t.Rules = t.Setting = t.Rule = void 0;
	var n = e("../parser/cssNodes"),
		r = e("vscode-nls").loadMessageBundle(),
		i = n.Level.Warning,
		o = n.Level.Error,
		s = n.Level.Ignore,
		a = function(e, t, n) {
			this.id = e, this.message = t, this.defaultValue = n
		};
	t.Rule = a;
	var l = function(e, t, n) {
		this.id = e, this.message = t, this.defaultValue = n
	};
	t.Setting = l, t.Rules = {
		AllVendorPrefixes: new a("compatibleVendorPrefixes", r("rule.vendorprefixes.all",
			"When using a vendor-specific prefix make sure to also include all other vendor-specific properties"), s),
		IncludeStandardPropertyWhenUsingVendorPrefix: new a("vendorPrefix", r("rule.standardvendorprefix.all",
			"When using a vendor-specific prefix also include the standard property"), i),
		DuplicateDeclarations: new a("duplicateProperties", r("rule.duplicateDeclarations",
			"Do not use duplicate style definitions"), s),
		EmptyRuleSet: new a("emptyRules", r("rule.emptyRuleSets", "Do not use empty rulesets"), i),
		ImportStatemement: new a("importStatement", r("rule.importDirective", "Import statements do not load in parallel"),
			s),
		BewareOfBoxModelSize: new a("boxModel", r("rule.bewareOfBoxModelSize",
			"Do not use width or height when using padding or border"), s),
		UniversalSelector: new a("universalSelector", r("rule.universalSelector",
			"The universal selector (*) is known to be slow"), s),
		ZeroWithUnit: new a("zeroUnits", r("rule.zeroWidthUnit", "No unit for zero needed"), s),
		RequiredPropertiesForFontFace: new a("fontFaceProperties", r("rule.fontFaceProperties",
			"@font-face rule must define 'src' and 'font-family' properties"), i),
		HexColorLength: new a("hexColorLength", r("rule.hexColor",
			"Hex colors must consist of three, four, six or eight hex numbers"), o),
		ArgsInColorFunction: new a("argumentsInColorFunction", r("rule.colorFunction", "Invalid number of parameters"), o),
		UnknownProperty: new a("unknownProperties", r("rule.unknownProperty", "Unknown property."), i),
		UnknownAtRules: new a("unknownAtRules", r("rule.unknownAtRules", "Unknown at-rule."), i),
		IEStarHack: new a("ieHack", r("rule.ieHack", "IE hacks are only necessary when supporting IE7 and older"), s),
		UnknownVendorSpecificProperty: new a("unknownVendorSpecificProperties", r("rule.unknownVendorSpecificProperty",
			"Unknown vendor specific property."), s),
		PropertyIgnoredDueToDisplay: new a("propertyIgnoredDueToDisplay", r("rule.propertyIgnoredDueToDisplay",
			"Property is ignored due to the display."), i),
		AvoidImportant: new a("important", r("rule.avoidImportant",
			"Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored."
		), s),
		AvoidFloat: new a("float", r("rule.avoidFloat",
				"Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes."),
			s),
		AvoidIdSelector: new a("idSelector", r("rule.avoidIdSelector",
			"Selectors should not contain IDs because these rules are too tightly coupled with the HTML."), s)
	}, t.Settings = {
		ValidProperties: new l("validProperties", r("rule.validProperties",
			"A list of properties that are not validated against the `unknownProperties` rule."), [])
	};
	var c = function() {
		function e(e) {
			void 0 === e && (e = {}), this.conf = e
		}
		return e.prototype.getRule = function(e) {
			if (this.conf.hasOwnProperty(e.id)) {
				var t = function(e) {
					switch (e) {
						case "ignore":
							return n.Level.Ignore;
						case "warning":
							return n.Level.Warning;
						case "error":
							return n.Level.Error
					}
					return null
				}(this.conf[e.id]);
				if (t) return t
			}
			return e.defaultValue
		}, e.prototype.getSetting = function(e) {
			return this.conf[e.id]
		}, e
	}();
	t.LintConfigurationSettings = c
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssCodeActions", [
		"require", "exports", "../parser/cssNodes", "../utils/strings", "../services/lintRules", "../cssLanguageTypes",
		"vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSCodeActions = void 0;
	var n = e("../parser/cssNodes"),
		r = e("../utils/strings"),
		i = e("../services/lintRules"),
		o = e("../cssLanguageTypes"),
		s = e("vscode-nls").loadMessageBundle(),
		a = function() {
			function e(e) {
				this.cssDataManager = e
			}
			return e.prototype.doCodeActions = function(e, t, n, r) {
				return this.doCodeActions2(e, t, n, r).map((function(t) {
					var n = t.edit && t.edit.documentChanges && t.edit.documentChanges[0];
					return o.Command.create(t.title, "_css.applyCodeAction", e.uri, e.version, n && n.edits)
				}))
			}, e.prototype.doCodeActions2 = function(e, t, n, r) {
				var i = [];
				if (n.diagnostics)
					for (var o = 0, s = n.diagnostics; o < s.length; o++) {
						var a = s[o];
						this.appendFixesForMarker(e, r, a, i)
					}
				return i
			}, e.prototype.getFixesForUnknownProperty = function(e, t, n, i) {
				var a = t.getName(),
					l = [];
				this.cssDataManager.getProperties().forEach((function(e) {
					var t = r.difference(a, e.name);
					t >= a.length / 2 && l.push({
						property: e.name,
						score: t
					})
				})), l.sort((function(e, t) {
					return t.score - e.score || e.property.localeCompare(t.property)
				}));
				for (var c = 3, d = 0, p = l; d < p.length; d++) {
					var h = p[d].property,
						u = s("css.codeaction.rename", "Rename to '{0}'", h),
						m = o.TextEdit.replace(n.range, h),
						f = o.VersionedTextDocumentIdentifier.create(e.uri, e.version),
						g = {
							documentChanges: [o.TextDocumentEdit.create(f, [m])]
						},
						b = o.CodeAction.create(u, g, o.CodeActionKind.QuickFix);
					if (b.diagnostics = [n], i.push(b), --c <= 0) return
				}
			}, e.prototype.appendFixesForMarker = function(e, t, r, o) {
				if (r.code === i.Rules.UnknownProperty.id)
					for (var s = e.offsetAt(r.range.start), a = e.offsetAt(r.range.end), l = n.getNodePath(t, s), c = l.length - 1; c >=
						0; c--) {
						var d = l[c];
						if (d instanceof n.Declaration) {
							var p = d.getProperty();
							if (p && p.offset === s && p.end === a) return void this.getFixesForUnknownProperty(e, p, r, o)
						}
					}
			}, e
		}();
	t.CSSCodeActions = a
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/lintUtil", ["require",
		"exports", "../utils/arrays"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.Element = void 0;
	var n = e("../utils/arrays"),
		r = function(e) {
			this.fullPropertyName = e.getFullPropertyName().toLowerCase(), this.node = e
		};

	function i(e, t, r, i) {
		var o = e[t];
		o.value = r, r && (n.includes(o.properties, i) || o.properties.push(i))
	}

	function o(e, t, n, r) {
		"top" === t || "right" === t || "bottom" === t || "left" === t ? i(e, t, n, r) : function(e, t, n) {
			i(e, "top", t, n), i(e, "right", t, n), i(e, "bottom", t, n), i(e, "left", t, n)
		}(e, n, r)
	}

	function s(e, t, n) {
		switch (t.length) {
			case 1:
				o(e, void 0, t[0], n);
				break;
			case 2:
				o(e, "top", t[0], n), o(e, "bottom", t[0], n), o(e, "right", t[1], n), o(e, "left", t[1], n);
				break;
			case 3:
				o(e, "top", t[0], n), o(e, "right", t[1], n), o(e, "left", t[1], n), o(e, "bottom", t[2], n);
				break;
			case 4:
				o(e, "top", t[0], n), o(e, "right", t[1], n), o(e, "bottom", t[2], n), o(e, "left", t[3], n)
		}
	}

	function a(e, t) {
		for (var n = 0, r = t; n < r.length; n++) {
			var i = r[n];
			if (e.matches(i)) return !0
		}
		return !1
	}

	function l(e, t) {
		return void 0 === t && (t = !0), (!t || !a(e, ["initial", "unset"])) && 0 !== parseFloat(e.getText())
	}

	function c(e, t) {
		return void 0 === t && (t = !0), e.map((function(e) {
			return l(e, t)
		}))
	}

	function d(e, t) {
		return void 0 === t && (t = !0), !a(e, ["none", "hidden"]) && (!t || !a(e, ["initial", "unset"]))
	}

	function p(e, t) {
		return void 0 === t && (t = !0), e.map((function(e) {
			return d(e, t)
		}))
	}

	function h(e) {
		var t = e.getChildren();
		if (1 === t.length) return l(i = t[0]) && d(i);
		for (var n = 0, r = t; n < r.length; n++) {
			var i;
			if (!l(i = r[n], !1) || !d(i, !1)) return !1
		}
		return !0
	}
	t.Element = r, t.default = function(e) {
		for (var t = {
				top: {
					value: !1,
					properties: []
				},
				right: {
					value: !1,
					properties: []
				},
				bottom: {
					value: !1,
					properties: []
				},
				left: {
					value: !1,
					properties: []
				}
			}, n = 0, r = e; n < r.length; n++) {
			var i = r[n],
				a = i.node.value;
			if (void 0 !== a) switch (i.fullPropertyName) {
				case "box-sizing":
					return {
						top: {
							value: !1,
							properties: []
						},
						right: {
							value: !1,
							properties: []
						},
						bottom: {
							value: !1,
							properties: []
						},
						left: {
							value: !1,
							properties: []
						}
					};
				case "width":
					t.width = i;
					break;
				case "height":
					t.height = i;
					break;
				default:
					var u = i.fullPropertyName.split("-");
					switch (u[0]) {
						case "border":
							switch (u[1]) {
								case void 0:
								case "top":
								case "right":
								case "bottom":
								case "left":
									switch (u[2]) {
										case void 0:
											o(t, u[1], h(a), i);
											break;
										case "width":
											o(t, u[1], l(a, !1), i);
											break;
										case "style":
											o(t, u[1], d(a, !0), i)
									}
									break;
								case "width":
									s(t, c(a.getChildren(), !1), i);
									break;
								case "style":
									s(t, p(a.getChildren(), !0), i)
							}
							break;
						case "padding":
							1 === u.length ? s(t, c(a.getChildren(), !0), i) : o(t, u[1], l(a, !0), i)
					}
			}
		}
		return t
	}
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/lint", ["require",
		"exports", "vscode-nls", "../languageFacts/facts", "../parser/cssNodes", "../utils/arrays", "./lintRules",
		"./lintUtil"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.LintVisitor = void 0;
	var n = e("vscode-nls"),
		r = e("../languageFacts/facts"),
		i = e("../parser/cssNodes"),
		o = e("../utils/arrays"),
		s = e("./lintRules"),
		a = e("./lintUtil"),
		l = n.loadMessageBundle(),
		c = function() {
			function e() {
				this.data = {}
			}
			return e.prototype.add = function(e, t, n) {
				var r = this.data[e];
				r || (r = {
					nodes: [],
					names: []
				}, this.data[e] = r), r.names.push(t), n && r.nodes.push(n)
			}, e
		}(),
		d = function() {
			function e(e, t, n) {
				var r = this;
				this.cssDataManager = n, this.warnings = [], this.settings = t, this.documentText = e.getText(), this.keyframes =
					new c, this.validProperties = {};
				var i = t.getSetting(s.Settings.ValidProperties);
				Array.isArray(i) && i.forEach((function(e) {
					if ("string" == typeof e) {
						var t = e.trim().toLowerCase();
						t.length && (r.validProperties[t] = !0)
					}
				}))
			}
			return e.entries = function(t, n, r, i, o) {
				var s = new e(n, r, i);
				return t.acceptVisitor(s), s.completeValidations(), s.getEntries(o)
			}, e.prototype.isValidPropertyDeclaration = function(e) {
				var t = e.fullPropertyName;
				return this.validProperties[t]
			}, e.prototype.fetch = function(e, t) {
				for (var n = [], r = 0, i = e; r < i.length; r++) {
					var o = i[r];
					o.fullPropertyName === t && n.push(o)
				}
				return n
			}, e.prototype.fetchWithValue = function(e, t, n) {
				for (var r = [], i = 0, o = e; i < o.length; i++) {
					var s = o[i];
					if (s.fullPropertyName === t) {
						var a = s.node.getValue();
						a && this.findValueInExpression(a, n) && r.push(s)
					}
				}
				return r
			}, e.prototype.findValueInExpression = function(e, t) {
				var n = !1;
				return e.accept((function(e) {
					return e.type === i.NodeType.Identifier && e.matches(t) && (n = !0), !n
				})), n
			}, e.prototype.getEntries = function(e) {
				return void 0 === e && (e = i.Level.Warning | i.Level.Error), this.warnings.filter((function(t) {
					return 0 != (t.getLevel() & e)
				}))
			}, e.prototype.addEntry = function(e, t, n) {
				var r = new i.Marker(e, t, this.settings.getRule(t), n);
				this.warnings.push(r)
			}, e.prototype.getMissingNames = function(e, t) {
				for (var n = e.slice(0), r = 0; r < t.length; r++) {
					var i = n.indexOf(t[r]); - 1 !== i && (n[i] = null)
				}
				var o = null;
				for (r = 0; r < n.length; r++) {
					var s = n[r];
					s && (o = null === o ? l("namelist.single", "'{0}'", s) : l("namelist.concatenated", "{0}, '{1}'", o, s))
				}
				return o
			}, e.prototype.visitNode = function(e) {
				switch (e.type) {
					case i.NodeType.UnknownAtRule:
						return this.visitUnknownAtRule(e);
					case i.NodeType.Keyframe:
						return this.visitKeyframe(e);
					case i.NodeType.FontFace:
						return this.visitFontFace(e);
					case i.NodeType.Ruleset:
						return this.visitRuleSet(e);
					case i.NodeType.SimpleSelector:
						return this.visitSimpleSelector(e);
					case i.NodeType.Function:
						return this.visitFunction(e);
					case i.NodeType.NumericValue:
						return this.visitNumericValue(e);
					case i.NodeType.Import:
						return this.visitImport(e);
					case i.NodeType.HexColorValue:
						return this.visitHexColorValue(e);
					case i.NodeType.Prio:
						return this.visitPrio(e);
					case i.NodeType.IdentifierSelector:
						return this.visitIdentifierSelector(e)
				}
				return !0
			}, e.prototype.completeValidations = function() {
				this.validateKeyframes()
			}, e.prototype.visitUnknownAtRule = function(e) {
				var t = e.getChild(0);
				return !!t && (!this.cssDataManager.getAtDirective(t.getText()) && (this.addEntry(t, s.Rules.UnknownAtRules,
					"Unknown at rule " + t.getText()), !0))
			}, e.prototype.visitKeyframe = function(e) {
				var t = e.getKeyword();
				if (!t) return !1;
				var n = t.getText();
				return this.keyframes.add(e.getName(), n, "@keyframes" !== n ? t : null), !0
			}, e.prototype.validateKeyframes = function() {
				var e = ["@-webkit-keyframes", "@-moz-keyframes", "@-o-keyframes"];
				for (var t in this.keyframes.data) {
					var n = this.keyframes.data[t].names,
						r = -1 === n.indexOf("@keyframes");
					if (r || 1 !== n.length) {
						var i = this.getMissingNames(e, n);
						if (i || r)
							for (var o = 0, a = this.keyframes.data[t].nodes; o < a.length; o++) {
								var c = a[o];
								if (r) {
									var d = l("keyframes.standardrule.missing",
										"Always define standard rule '@keyframes' when defining keyframes.");
									this.addEntry(c, s.Rules.IncludeStandardPropertyWhenUsingVendorPrefix, d)
								}
								if (i) {
									d = l("keyframes.vendorspecific.missing", "Always include all vendor specific rules: Missing: {0}", i);
									this.addEntry(c, s.Rules.AllVendorPrefixes, d)
								}
							}
					}
				}
				return !0
			}, e.prototype.visitSimpleSelector = function(e) {
				var t = this.documentText.charAt(e.offset);
				return 1 === e.length && "*" === t && this.addEntry(e, s.Rules.UniversalSelector), !0
			}, e.prototype.visitIdentifierSelector = function(e) {
				return this.addEntry(e, s.Rules.AvoidIdSelector), !0
			}, e.prototype.visitImport = function(e) {
				return this.addEntry(e, s.Rules.ImportStatemement), !0
			}, e.prototype.visitRuleSet = function(t) {
				var n = t.getDeclarations();
				if (!n) return !1;
				n.hasChildren() || this.addEntry(t.getSelectors(), s.Rules.EmptyRuleSet);
				for (var r = [], d = 0, p = n.getChildren(); d < p.length; d++) {
					(C = p[d]) instanceof i.Declaration && r.push(new a.Element(C))
				}
				var h = a.default(r);
				if (h.width) {
					var u = [];
					if (h.right.value && (u = o.union(u, h.right.properties)), h.left.value && (u = o.union(u, h.left.properties)),
						0 !== u.length) {
						for (var m = 0, f = u; m < f.length; m++) {
							var g = f[m];
							this.addEntry(g.node, s.Rules.BewareOfBoxModelSize)
						}
						this.addEntry(h.width.node, s.Rules.BewareOfBoxModelSize)
					}
				}
				if (h.height) {
					u = [];
					if (h.top.value && (u = o.union(u, h.top.properties)), h.bottom.value && (u = o.union(u, h.bottom.properties)),
						0 !== u.length) {
						for (var b = 0, y = u; b < y.length; b++) {
							g = y[b];
							this.addEntry(g.node, s.Rules.BewareOfBoxModelSize)
						}
						this.addEntry(h.height.node, s.Rules.BewareOfBoxModelSize)
					}
				}
				var v = this.fetchWithValue(r, "display", "inline-block");
				if (v.length > 0)
					for (var w = this.fetch(r, "float"), x = 0; x < w.length; x++) {
						var S = w[x].node;
						(E = S.getValue()) && !E.matches("none") && this.addEntry(S, s.Rules.PropertyIgnoredDueToDisplay, l(
							"rule.propertyIgnoredDueToDisplayInlineBlock",
							"inline-block is ignored due to the float. If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'"
						))
					}
				if ((v = this.fetchWithValue(r, "display", "block")).length > 0)
					for (w = this.fetch(r, "vertical-align"), x = 0; x < w.length; x++) this.addEntry(w[x].node, s.Rules.PropertyIgnoredDueToDisplay,
						l("rule.propertyIgnoredDueToDisplayBlock",
							"Property is ignored due to the display. With 'display: block', vertical-align should not be used."));
				var k = this.fetch(r, "float");
				for (x = 0; x < k.length; x++) {
					var C = k[x];
					this.isValidPropertyDeclaration(C) || this.addEntry(C.node, s.Rules.AvoidFloat)
				}
				for (var T = 0; T < r.length; T++) {
					var E;
					if ("background" !== (C = r[T]).fullPropertyName && !this.validProperties[C.fullPropertyName])
						if ((E = C.node.getValue()) && "-" !== this.documentText.charAt(E.offset)) {
							var F = this.fetch(r, C.fullPropertyName);
							if (F.length > 1)
								for (var D = 0; D < F.length; D++) {
									var R = F[D].node.getValue();
									R && "-" !== this.documentText.charAt(R.offset) && F[D] !== C && this.addEntry(C.node, s.Rules.DuplicateDeclarations)
								}
						}
				}
				if (!t.getSelectors().matches(":export")) {
					for (var _ = new c, P = !1, z = 0, I = r; z < I.length; z++) {
						var N = (C = I[z]).node;
						if (this.isCSSDeclaration(N)) {
							var M = C.fullPropertyName,
								A = M.charAt(0);
							if ("-" === A) {
								if ("-" !== M.charAt(1)) {
									this.cssDataManager.isKnownProperty(M) || this.validProperties[M] || this.addEntry(N.getProperty(), s.Rules
										.UnknownVendorSpecificProperty);
									var O = N.getNonPrefixedPropertyName();
									_.add(O, M, N.getProperty())
								}
							} else {
								var W = M;
								"*" !== A && "_" !== A || (this.addEntry(N.getProperty(), s.Rules.IEStarHack), M = M.substr(1)), this.cssDataManager
									.isKnownProperty(W) || this.cssDataManager.isKnownProperty(M) || this.validProperties[M] || this.addEntry(N
										.getProperty(), s.Rules.UnknownProperty, l("property.unknownproperty.detailed", "Unknown property: '{0}'",
											N.getFullPropertyName())), _.add(M, M, null)
							}
						} else P = !0
					}
					if (!P)
						for (var L in _.data) {
							var j = _.data[L],
								U = j.names,
								K = this.cssDataManager.isStandardProperty(L) && -1 === U.indexOf(L);
							if (K || 1 !== U.length) {
								for (var V = [], q = (T = 0, e.prefixes.length); T < q; T++) {
									var B = e.prefixes[T];
									this.cssDataManager.isStandardProperty(B + L) && V.push(B + L)
								}
								var $ = this.getMissingNames(V, U);
								if ($ || K)
									for (var G = 0, H = j.nodes; G < H.length; G++) {
										var J = H[G];
										if (K) {
											var X = l("property.standard.missing", "Also define the standard property '{0}' for compatibility", L);
											this.addEntry(J, s.Rules.IncludeStandardPropertyWhenUsingVendorPrefix, X)
										}
										if ($) {
											X = l("property.vendorspecific.missing", "Always include all vendor specific properties: Missing: {0}", $);
											this.addEntry(J, s.Rules.AllVendorPrefixes, X)
										}
									}
							}
						}
				}
				return !0
			}, e.prototype.visitPrio = function(e) {
				return this.addEntry(e, s.Rules.AvoidImportant), !0
			}, e.prototype.visitNumericValue = function(e) {
				var t = e.findParent(i.NodeType.Function);
				if (t && "calc" === t.getName()) return !0;
				var n = e.findParent(i.NodeType.Declaration);
				if (n && n.getValue()) {
					var o = e.getValue();
					if (!o.unit || -1 === r.units.length.indexOf(o.unit.toLowerCase())) return !0;
					0 === parseFloat(o.value) && o.unit && !this.validProperties[n.getFullPropertyName()] && this.addEntry(e, s.Rules
						.ZeroWithUnit)
				}
				return !0
			}, e.prototype.visitFontFace = function(e) {
				var t = e.getDeclarations();
				if (!t) return !1;
				for (var n = !1, r = !1, i = !1, o = 0, a = t.getChildren(); o < a.length; o++) {
					var l = a[o];
					if (this.isCSSDeclaration(l)) {
						var c = l.getProperty().getName().toLowerCase();
						"src" === c && (n = !0), "font-family" === c && (r = !0)
					} else i = !0
				}
				return i || n && r || this.addEntry(e, s.Rules.RequiredPropertiesForFontFace), !0
			}, e.prototype.isCSSDeclaration = function(e) {
				if (e instanceof i.Declaration) {
					if (!e.getValue()) return !1;
					var t = e.getProperty();
					if (!t) return !1;
					var n = t.getIdentifier();
					return !(!n || n.containsInterpolation())
				}
				return !1
			}, e.prototype.visitHexColorValue = function(e) {
				var t = e.length;
				return 9 !== t && 7 !== t && 5 !== t && 4 !== t && this.addEntry(e, s.Rules.HexColorLength), !1
			}, e.prototype.visitFunction = function(e) {
				var t = e.getName().toLowerCase(),
					n = -1,
					r = 0;
				switch (t) {
					case "rgb(":
					case "hsl(":
						n = 3;
						break;
					case "rgba(":
					case "hsla(":
						n = 4
				}
				return -1 !== n && (e.getArguments().accept((function(e) {
					return !(e instanceof i.BinaryExpression) || (r += 1, !1)
				})), r !== n && this.addEntry(e, s.Rules.ArgsInColorFunction)), !0
			}, e.prefixes = ["-ms-", "-moz-", "-o-", "-webkit-"], e
		}();
	t.LintVisitor = d
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssValidation", [
		"require", "exports", "../parser/cssNodes", "./lintRules", "./lint", "../cssLanguageTypes"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSValidation = void 0;
	var n = e("../parser/cssNodes"),
		r = e("./lintRules"),
		i = e("./lint"),
		o = e("../cssLanguageTypes"),
		s = function() {
			function e(e) {
				this.cssDataManager = e
			}
			return e.prototype.configure = function(e) {
				this.settings = e
			}, e.prototype.doValidation = function(e, t, s) {
				if (void 0 === s && (s = this.settings), s && !1 === s.validate) return [];
				var a = [];
				a.push.apply(a, n.ParseErrorCollector.entries(t)), a.push.apply(a, i.LintVisitor.entries(t, e, new r.LintConfigurationSettings(
					s && s.lint), this.cssDataManager));
				var l = [];
				for (var c in r.Rules) l.push(r.Rules[c].id);
				return a.filter((function(e) {
					return e.getLevel() !== n.Level.Ignore
				})).map((function(t) {
					var r = o.Range.create(e.positionAt(t.getOffset()), e.positionAt(t.getOffset() + t.getLength())),
						i = e.languageId;
					return {
						code: t.getRule().id,
						source: i,
						message: t.getMessage(),
						severity: t.getLevel() === n.Level.Warning ? o.DiagnosticSeverity.Warning : o.DiagnosticSeverity.Error,
						range: r
					}
				}))
			}, e
		}();
	t.CSSValidation = s
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/scssScanner", ["require",
		"exports", "./cssScanner"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SCSSScanner = t.Module = t.Ellipsis = t.SmallerEqualsOperator = t.GreaterEqualsOperator = t.NotEqualsOperator =
		t.EqualsOperator = t.Default = t.InterpolationFunction = t.VariableName = void 0;
	var n = e("./cssScanner"),
		r = "/".charCodeAt(0),
		i = "\n".charCodeAt(0),
		o = "\r".charCodeAt(0),
		s = "\f".charCodeAt(0),
		a = "$".charCodeAt(0),
		l = "#".charCodeAt(0),
		c = "{".charCodeAt(0),
		d = "=".charCodeAt(0),
		p = "!".charCodeAt(0),
		h = "<".charCodeAt(0),
		u = ">".charCodeAt(0),
		m = ".".charCodeAt(0),
		f = ("@".charCodeAt(0), n.TokenType.CustomToken);
	t.VariableName = f++, t.InterpolationFunction = f++, t.Default = f++, t.EqualsOperator = f++, t.NotEqualsOperator =
		f++, t.GreaterEqualsOperator = f++, t.SmallerEqualsOperator = f++, t.Ellipsis = f++, t.Module = f++;
	var g = function(e) {
		function f() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(f, e), f.prototype.scanNext = function(r) {
			if (this.stream.advanceIfChar(a)) {
				var i = ["$"];
				if (this.ident(i)) return this.finishToken(r, t.VariableName, i.join(""));
				this.stream.goBackTo(r)
			}
			return this.stream.advanceIfChars([l, c]) ? this.finishToken(r, t.InterpolationFunction) : this.stream.advanceIfChars(
					[d, d]) ? this.finishToken(r, t.EqualsOperator) : this.stream.advanceIfChars([p, d]) ? this.finishToken(r, t.NotEqualsOperator) :
				this.stream.advanceIfChar(h) ? this.stream.advanceIfChar(d) ? this.finishToken(r, t.SmallerEqualsOperator) :
				this.finishToken(r, n.TokenType.Delim) : this.stream.advanceIfChar(u) ? this.stream.advanceIfChar(d) ? this.finishToken(
					r, t.GreaterEqualsOperator) : this.finishToken(r, n.TokenType.Delim) : this.stream.advanceIfChars([m, m, m]) ?
				this.finishToken(r, t.Ellipsis) : e.prototype.scanNext.call(this, r)
		}, f.prototype.comment = function() {
			return !!e.prototype.comment.call(this) || !(this.inURL || !this.stream.advanceIfChars([r, r])) && (this.stream.advanceWhileChar(
				(function(e) {
					switch (e) {
						case i:
						case o:
						case s:
							return !1;
						default:
							return !0
					}
				})), !0)
		}, f
	}(n.Scanner);
	t.SCSSScanner = g
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/scssErrors", ["require",
		"exports", "vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.SCSSParseError = t.SCSSIssueType = void 0;
	var n = e("vscode-nls").loadMessageBundle(),
		r = function(e, t) {
			this.id = e, this.message = t
		};
	t.SCSSIssueType = r, t.SCSSParseError = {
		FromExpected: new r("scss-fromexpected", n("expected.from", "'from' expected")),
		ThroughOrToExpected: new r("scss-throughexpected", n("expected.through", "'through' or 'to' expected")),
		InExpected: new r("scss-fromexpected", n("expected.in", "'in' expected"))
	}
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/scssParser", ["require",
		"exports", "./scssScanner", "./cssScanner", "./cssParser", "./cssNodes", "./scssErrors", "./cssErrors"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.SCSSParser = void 0;
	var n = e("./scssScanner"),
		r = e("./cssScanner"),
		i = e("./cssParser"),
		o = e("./cssNodes"),
		s = e("./scssErrors"),
		a = e("./cssErrors"),
		l = function(e) {
			function t() {
				return e.call(this, new n.SCSSScanner) || this
			}
			return __extends(t, e), t.prototype._parseStylesheetStatement = function(t) {
				return void 0 === t && (t = !1), this.peek(r.TokenType.AtKeyword) ? this._parseWarnAndDebug() || this._parseControlStatement() ||
					this._parseMixinDeclaration() || this._parseMixinContent() || this._parseMixinReference() || this._parseFunctionDeclaration() ||
					this._parseForward() || this._parseUse() || this._parseRuleset(t) || e.prototype._parseStylesheetAtStatement.call(
						this, t) : this._parseRuleset(!0) || this._parseVariableDeclaration()
			}, t.prototype._parseImport = function() {
				if (!this.peekKeyword("@import")) return null;
				var e = this.create(o.Import);
				if (this.consumeToken(), !e.addChild(this._parseURILiteral()) && !e.addChild(this._parseStringLiteral())) return this
					.finish(e, a.ParseError.URIOrStringExpected);
				for (; this.accept(r.TokenType.Comma);)
					if (!e.addChild(this._parseURILiteral()) && !e.addChild(this._parseStringLiteral())) return this.finish(e, a.ParseError
						.URIOrStringExpected);
				return this.peek(r.TokenType.SemiColon) || this.peek(r.TokenType.EOF) || e.setMedialist(this._parseMediaQueryList()),
					this.finish(e)
			}, t.prototype._parseVariableDeclaration = function(e) {
				if (void 0 === e && (e = []), !this.peek(n.VariableName)) return null;
				var t = this.create(o.VariableDeclaration);
				if (!t.setVariable(this._parseVariable())) return null;
				if (!this.accept(r.TokenType.Colon)) return this.finish(t, a.ParseError.ColonExpected);
				if (this.prevToken && (t.colonPosition = this.prevToken.offset), !t.setValue(this._parseExpr())) return this.finish(
					t, a.ParseError.VariableValueExpected, [], e);
				for (; this.peek(r.TokenType.Exclamation);)
					if (t.addChild(this._tryParsePrio()));
					else {
						if (this.consumeToken(), !this.peekRegExp(r.TokenType.Ident, /^(default|global)$/)) return this.finish(t, a.ParseError
							.UnknownKeyword);
						this.consumeToken()
					} return this.peek(r.TokenType.SemiColon) && (t.semicolonPosition = this.token.offset), this.finish(t)
			}, t.prototype._parseMediaContentStart = function() {
				return this._parseInterpolation()
			}, t.prototype._parseMediaFeatureName = function() {
				return this._parseModuleMember() || this._parseFunction() || this._parseIdent() || this._parseVariable()
			}, t.prototype._parseKeyframeSelector = function() {
				return this._tryParseKeyframeSelector() || this._parseControlStatement(this._parseKeyframeSelector.bind(this)) ||
					this._parseVariableDeclaration() || this._parseMixinContent()
			}, t.prototype._parseVariable = function() {
				if (!this.peek(n.VariableName)) return null;
				var e = this.create(o.Variable);
				return this.consumeToken(), e
			}, t.prototype._parseModuleMember = function() {
				var e = this.mark(),
					t = this.create(o.Module);
				return t.setIdentifier(this._parseIdent([o.ReferenceType.Module])) ? this.hasWhitespace() || !this.acceptDelim(
						".") || this.hasWhitespace() ? (this.restoreAtMark(e), null) : t.addChild(this._parseVariable() || this._parseFunction()) ?
					t : this.finish(t, a.ParseError.IdentifierOrVariableExpected) : null
			}, t.prototype._parseIdent = function(e) {
				var t = this;
				if (!this.peek(r.TokenType.Ident) && !this.peek(n.InterpolationFunction) && !this.peekDelim("-")) return null;
				var i = this.create(o.Identifier);
				i.referenceTypes = e, i.isCustomProperty = this.peekRegExp(r.TokenType.Ident, /^--/);
				for (var s, a = !1;
					(this.accept(r.TokenType.Ident) || i.addChild((s = void 0, s = t.mark(), t.acceptDelim("-") && (t.hasWhitespace() ||
						t.acceptDelim("-"), t.hasWhitespace()) ? (t.restoreAtMark(s), null) : t._parseInterpolation())) || a && this.acceptRegexp(
						/^[\w-]/)) && (a = !0, !this.hasWhitespace()););
				return a ? this.finish(i) : null
			}, t.prototype._parseTermExpression = function() {
				return this._parseModuleMember() || this._parseVariable() || this._parseSelectorCombinator() || e.prototype._parseTermExpression
					.call(this)
			}, t.prototype._parseInterpolation = function() {
				if (this.peek(n.InterpolationFunction)) {
					var e = this.create(o.Interpolation);
					return this.consumeToken(), e.addChild(this._parseExpr()) || this._parseSelectorCombinator() ? this.accept(r.TokenType
							.CurlyR) ? this.finish(e) : this.finish(e, a.ParseError.RightCurlyExpected) : this.accept(r.TokenType.CurlyR) ?
						this.finish(e) : this.finish(e, a.ParseError.ExpressionExpected)
				}
				return null
			}, t.prototype._parseOperator = function() {
				if (this.peek(n.EqualsOperator) || this.peek(n.NotEqualsOperator) || this.peek(n.GreaterEqualsOperator) || this.peek(
						n.SmallerEqualsOperator) || this.peekDelim(">") || this.peekDelim("<") || this.peekIdent("and") || this.peekIdent(
						"or") || this.peekDelim("%")) {
					var t = this.createNode(o.NodeType.Operator);
					return this.consumeToken(), this.finish(t)
				}
				return e.prototype._parseOperator.call(this)
			}, t.prototype._parseUnaryOperator = function() {
				if (this.peekIdent("not")) {
					var t = this.create(o.Node);
					return this.consumeToken(), this.finish(t)
				}
				return e.prototype._parseUnaryOperator.call(this)
			}, t.prototype._parseRuleSetDeclaration = function() {
				return this.peek(r.TokenType.AtKeyword) ? this._parseKeyframe() || this._parseImport() || this._parseMedia(!0) ||
					this._parseFontFace() || this._parseWarnAndDebug() || this._parseControlStatement() || this._parseFunctionDeclaration() ||
					this._parseExtends() || this._parseMixinReference() || this._parseMixinContent() || this._parseMixinDeclaration() ||
					this._parseRuleset(!0) || this._parseSupports(!0) || e.prototype._parseRuleSetDeclarationAtStatement.call(this) :
					this._parseVariableDeclaration() || this._tryParseRuleset(!0) || e.prototype._parseRuleSetDeclaration.call(this)
			}, t.prototype._parseDeclaration = function(e) {
				var t = this._tryParseCustomPropertyDeclaration(e);
				if (t) return t;
				var n = this.create(o.Declaration);
				if (!n.setProperty(this._parseProperty())) return null;
				if (!this.accept(r.TokenType.Colon)) return this.finish(n, a.ParseError.ColonExpected, [r.TokenType.Colon], e ||
					[r.TokenType.SemiColon]);
				this.prevToken && (n.colonPosition = this.prevToken.offset);
				var i = !1;
				if (n.setValue(this._parseExpr()) && (i = !0, n.addChild(this._parsePrio())), this.peek(r.TokenType.CurlyL)) n.setNestedProperties(
					this._parseNestedProperties());
				else if (!i) return this.finish(n, a.ParseError.PropertyValueExpected);
				return this.peek(r.TokenType.SemiColon) && (n.semicolonPosition = this.token.offset), this.finish(n)
			}, t.prototype._parseNestedProperties = function() {
				var e = this.create(o.NestedProperties);
				return this._parseBody(e, this._parseDeclaration.bind(this))
			}, t.prototype._parseExtends = function() {
				if (this.peekKeyword("@extend")) {
					var e = this.create(o.ExtendsReference);
					if (this.consumeToken(), !e.getSelectors().addChild(this._parseSimpleSelector())) return this.finish(e, a.ParseError
						.SelectorExpected);
					for (; this.accept(r.TokenType.Comma);) e.getSelectors().addChild(this._parseSimpleSelector());
					return this.accept(r.TokenType.Exclamation) && !this.acceptIdent("optional") ? this.finish(e, a.ParseError.UnknownKeyword) :
						this.finish(e)
				}
				return null
			}, t.prototype._parseSimpleSelectorBody = function() {
				return this._parseSelectorCombinator() || this._parseSelectorPlaceholder() || e.prototype._parseSimpleSelectorBody
					.call(this)
			}, t.prototype._parseSelectorCombinator = function() {
				if (this.peekDelim("&")) {
					var e = this.createNode(o.NodeType.SelectorCombinator);
					for (this.consumeToken(); !this.hasWhitespace() && (this.acceptDelim("-") || this.accept(r.TokenType.Num) ||
							this.accept(r.TokenType.Dimension) || e.addChild(this._parseIdent()) || this.acceptDelim("&")););
					return this.finish(e)
				}
				return null
			}, t.prototype._parseSelectorPlaceholder = function() {
				if (this.peekDelim("%")) {
					var e = this.createNode(o.NodeType.SelectorPlaceholder);
					return this.consumeToken(), this._parseIdent(), this.finish(e)
				}
				if (this.peekKeyword("@at-root")) {
					e = this.createNode(o.NodeType.SelectorPlaceholder);
					return this.consumeToken(), this.finish(e)
				}
				return null
			}, t.prototype._parseElementName = function() {
				var t = this.mark(),
					n = e.prototype._parseElementName.call(this);
				return n && !this.hasWhitespace() && this.peek(r.TokenType.ParenthesisL) ? (this.restoreAtMark(t), null) : n
			}, t.prototype._tryParsePseudoIdentifier = function() {
				return this._parseInterpolation() || e.prototype._tryParsePseudoIdentifier.call(this)
			}, t.prototype._parseWarnAndDebug = function() {
				if (!this.peekKeyword("@debug") && !this.peekKeyword("@warn") && !this.peekKeyword("@error")) return null;
				var e = this.createNode(o.NodeType.Debug);
				return this.consumeToken(), e.addChild(this._parseExpr()), this.finish(e)
			}, t.prototype._parseControlStatement = function(e) {
				return void 0 === e && (e = this._parseRuleSetDeclaration.bind(this)), this.peek(r.TokenType.AtKeyword) ? this._parseIfStatement(
					e) || this._parseForStatement(e) || this._parseEachStatement(e) || this._parseWhileStatement(e) : null
			}, t.prototype._parseIfStatement = function(e) {
				return this.peekKeyword("@if") ? this._internalParseIfStatement(e) : null
			}, t.prototype._internalParseIfStatement = function(e) {
				var t = this.create(o.IfStatement);
				if (this.consumeToken(), !t.setExpression(this._parseExpr(!0))) return this.finish(t, a.ParseError.ExpressionExpected);
				if (this._parseBody(t, e), this.acceptKeyword("@else"))
					if (this.peekIdent("if")) t.setElseClause(this._internalParseIfStatement(e));
					else if (this.peek(r.TokenType.CurlyL)) {
					var n = this.create(o.ElseStatement);
					this._parseBody(n, e), t.setElseClause(n)
				}
				return this.finish(t)
			}, t.prototype._parseForStatement = function(e) {
				if (!this.peekKeyword("@for")) return null;
				var t = this.create(o.ForStatement);
				return this.consumeToken(), t.setVariable(this._parseVariable()) ? this.acceptIdent("from") ? t.addChild(this._parseBinaryExpr()) ?
					this.acceptIdent("to") || this.acceptIdent("through") ? t.addChild(this._parseBinaryExpr()) ? this._parseBody(t,
						e) : this.finish(t, a.ParseError.ExpressionExpected, [r.TokenType.CurlyR]) : this.finish(t, s.SCSSParseError.ThroughOrToExpected,
						[r.TokenType.CurlyR]) : this.finish(t, a.ParseError.ExpressionExpected, [r.TokenType.CurlyR]) : this.finish(t,
						s.SCSSParseError.FromExpected, [r.TokenType.CurlyR]) : this.finish(t, a.ParseError.VariableNameExpected, [r.TokenType
						.CurlyR
					])
			}, t.prototype._parseEachStatement = function(e) {
				if (!this.peekKeyword("@each")) return null;
				var t = this.create(o.EachStatement);
				this.consumeToken();
				var n = t.getVariables();
				if (!n.addChild(this._parseVariable())) return this.finish(t, a.ParseError.VariableNameExpected, [r.TokenType.CurlyR]);
				for (; this.accept(r.TokenType.Comma);)
					if (!n.addChild(this._parseVariable())) return this.finish(t, a.ParseError.VariableNameExpected, [r.TokenType.CurlyR]);
				return this.finish(n), this.acceptIdent("in") ? t.addChild(this._parseExpr()) ? this._parseBody(t, e) : this.finish(
					t, a.ParseError.ExpressionExpected, [r.TokenType.CurlyR]) : this.finish(t, s.SCSSParseError.InExpected, [r.TokenType
					.CurlyR
				])
			}, t.prototype._parseWhileStatement = function(e) {
				if (!this.peekKeyword("@while")) return null;
				var t = this.create(o.WhileStatement);
				return this.consumeToken(), t.addChild(this._parseBinaryExpr()) ? this._parseBody(t, e) : this.finish(t, a.ParseError
					.ExpressionExpected, [r.TokenType.CurlyR])
			}, t.prototype._parseFunctionBodyDeclaration = function() {
				return this._parseVariableDeclaration() || this._parseReturnStatement() || this._parseWarnAndDebug() || this._parseControlStatement(
					this._parseFunctionBodyDeclaration.bind(this))
			}, t.prototype._parseFunctionDeclaration = function() {
				if (!this.peekKeyword("@function")) return null;
				var e = this.create(o.FunctionDeclaration);
				if (this.consumeToken(), !e.setIdentifier(this._parseIdent([o.ReferenceType.Function]))) return this.finish(e, a
					.ParseError.IdentifierExpected, [r.TokenType.CurlyR]);
				if (!this.accept(r.TokenType.ParenthesisL)) return this.finish(e, a.ParseError.LeftParenthesisExpected, [r.TokenType
					.CurlyR
				]);
				if (e.getParameters().addChild(this._parseParameterDeclaration()))
					for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
						if (!e.getParameters().addChild(this._parseParameterDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
				return this.accept(r.TokenType.ParenthesisR) ? this._parseBody(e, this._parseFunctionBodyDeclaration.bind(this)) :
					this.finish(e, a.ParseError.RightParenthesisExpected, [r.TokenType.CurlyR])
			}, t.prototype._parseReturnStatement = function() {
				if (!this.peekKeyword("@return")) return null;
				var e = this.createNode(o.NodeType.ReturnStatement);
				return this.consumeToken(), e.addChild(this._parseExpr()) ? this.finish(e) : this.finish(e, a.ParseError.ExpressionExpected)
			}, t.prototype._parseMixinDeclaration = function() {
				if (!this.peekKeyword("@mixin")) return null;
				var e = this.create(o.MixinDeclaration);
				if (this.consumeToken(), !e.setIdentifier(this._parseIdent([o.ReferenceType.Mixin]))) return this.finish(e, a.ParseError
					.IdentifierExpected, [r.TokenType.CurlyR]);
				if (this.accept(r.TokenType.ParenthesisL)) {
					if (e.getParameters().addChild(this._parseParameterDeclaration()))
						for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
							if (!e.getParameters().addChild(this._parseParameterDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, a.ParseError.RightParenthesisExpected, [r.TokenType
						.CurlyR
					])
				}
				return this._parseBody(e, this._parseRuleSetDeclaration.bind(this))
			}, t.prototype._parseParameterDeclaration = function() {
				var e = this.create(o.FunctionParameter);
				return e.setIdentifier(this._parseVariable()) ? (this.accept(n.Ellipsis), this.accept(r.TokenType.Colon) && !e.setDefaultValue(
					this._parseExpr(!0)) ? this.finish(e, a.ParseError.VariableValueExpected, [], [r.TokenType.Comma, r.TokenType
					.ParenthesisR
				]) : this.finish(e)) : null
			}, t.prototype._parseMixinContent = function() {
				if (!this.peekKeyword("@content")) return null;
				var e = this.create(o.MixinContentReference);
				if (this.consumeToken(), this.accept(r.TokenType.ParenthesisL)) {
					if (e.getArguments().addChild(this._parseFunctionArgument()))
						for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
							if (!e.getArguments().addChild(this._parseFunctionArgument())) return this.finish(e, a.ParseError.ExpressionExpected);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, a.ParseError.RightParenthesisExpected)
				}
				return this.finish(e)
			}, t.prototype._parseMixinReference = function() {
				if (!this.peekKeyword("@include")) return null;
				var e = this.create(o.MixinReference);
				this.consumeToken();
				var t = this._parseIdent([o.ReferenceType.Mixin]);
				if (!e.setIdentifier(t)) return this.finish(e, a.ParseError.IdentifierExpected, [r.TokenType.CurlyR]);
				if (!this.hasWhitespace() && this.acceptDelim(".") && !this.hasWhitespace()) {
					var n = this._parseIdent([o.ReferenceType.Mixin]);
					if (!n) return this.finish(e, a.ParseError.IdentifierExpected, [r.TokenType.CurlyR]);
					var i = this.create(o.Module);
					t.referenceTypes = [o.ReferenceType.Module], i.setIdentifier(t), e.setIdentifier(n), e.addChild(i)
				}
				if (this.accept(r.TokenType.ParenthesisL)) {
					if (e.getArguments().addChild(this._parseFunctionArgument()))
						for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
							if (!e.getArguments().addChild(this._parseFunctionArgument())) return this.finish(e, a.ParseError.ExpressionExpected);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, a.ParseError.RightParenthesisExpected)
				}
				return (this.peekIdent("using") || this.peek(r.TokenType.CurlyL)) && e.setContent(this._parseMixinContentDeclaration()),
					this.finish(e)
			}, t.prototype._parseMixinContentDeclaration = function() {
				var e = this.create(o.MixinContentDeclaration);
				if (this.acceptIdent("using")) {
					if (!this.accept(r.TokenType.ParenthesisL)) return this.finish(e, a.ParseError.LeftParenthesisExpected, [r.TokenType
						.CurlyL
					]);
					if (e.getParameters().addChild(this._parseParameterDeclaration()))
						for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
							if (!e.getParameters().addChild(this._parseParameterDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, a.ParseError.RightParenthesisExpected, [r.TokenType
						.CurlyL
					])
				}
				return this.peek(r.TokenType.CurlyL) && this._parseBody(e, this._parseMixinReferenceBodyStatement.bind(this)),
					this.finish(e)
			}, t.prototype._parseMixinReferenceBodyStatement = function() {
				return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration()
			}, t.prototype._parseFunctionArgument = function() {
				var e = this.create(o.FunctionArgument),
					t = this.mark(),
					i = this._parseVariable();
				if (i)
					if (this.accept(r.TokenType.Colon)) e.setIdentifier(i);
					else {
						if (this.accept(n.Ellipsis)) return e.setValue(i), this.finish(e);
						this.restoreAtMark(t)
					} return e.setValue(this._parseExpr(!0)) ? (this.accept(n.Ellipsis), e.addChild(this._parsePrio()), this.finish(
					e)) : e.setValue(this._tryParsePrio()) ? this.finish(e) : null
			}, t.prototype._parseURLArgument = function() {
				var t = this.mark(),
					n = e.prototype._parseURLArgument.call(this);
				if (!n || !this.peek(r.TokenType.ParenthesisR)) {
					this.restoreAtMark(t);
					var i = this.create(o.Node);
					return i.addChild(this._parseBinaryExpr()), this.finish(i)
				}
				return n
			}, t.prototype._parseOperation = function() {
				if (!this.peek(r.TokenType.ParenthesisL)) return null;
				var e = this.create(o.Node);
				for (this.consumeToken(); e.addChild(this._parseListElement());) this.accept(r.TokenType.Comma);
				return this.accept(r.TokenType.ParenthesisR) ? this.finish(e) : this.finish(e, a.ParseError.RightParenthesisExpected)
			}, t.prototype._parseListElement = function() {
				var e = this.create(o.ListEntry),
					t = this._parseBinaryExpr();
				if (!t) return null;
				if (this.accept(r.TokenType.Colon)) {
					if (e.setKey(t), !e.setValue(this._parseBinaryExpr())) return this.finish(e, a.ParseError.ExpressionExpected)
				} else e.setValue(t);
				return this.finish(e)
			}, t.prototype._parseUse = function() {
				if (!this.peekKeyword("@use")) return null;
				var e = this.create(o.Use);
				if (this.consumeToken(), !e.addChild(this._parseStringLiteral())) return this.finish(e, a.ParseError.StringLiteralExpected);
				if (!this.peek(r.TokenType.SemiColon) && !this.peek(r.TokenType.EOF)) {
					if (!this.peekRegExp(r.TokenType.Ident, /as|with/)) return this.finish(e, a.ParseError.UnknownKeyword);
					if (this.acceptIdent("as") && !e.setIdentifier(this._parseIdent([o.ReferenceType.Module])) && !this.acceptDelim(
							"*")) return this.finish(e, a.ParseError.IdentifierOrWildcardExpected);
					if (this.acceptIdent("with")) {
						if (!this.accept(r.TokenType.ParenthesisL)) return this.finish(e, a.ParseError.LeftParenthesisExpected, [r.TokenType
							.ParenthesisR
						]);
						if (!e.getParameters().addChild(this._parseModuleConfigDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
						for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
							if (!e.getParameters().addChild(this._parseModuleConfigDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
						if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, a.ParseError.RightParenthesisExpected)
					}
				}
				return this.accept(r.TokenType.SemiColon) || this.accept(r.TokenType.EOF) ? this.finish(e) : this.finish(e, a.ParseError
					.SemiColonExpected)
			}, t.prototype._parseModuleConfigDeclaration = function() {
				var e = this.create(o.ModuleConfiguration);
				return e.setIdentifier(this._parseVariable()) ? this.accept(r.TokenType.Colon) && e.setValue(this._parseExpr(!0)) ?
					!this.accept(r.TokenType.Exclamation) || !this.hasWhitespace() && this.acceptIdent("default") ? this.finish(e) :
					this.finish(e, a.ParseError.UnknownKeyword) : this.finish(e, a.ParseError.VariableValueExpected, [], [r.TokenType
						.Comma, r.TokenType.ParenthesisR
					]) : null
			}, t.prototype._parseForward = function() {
				if (!this.peekKeyword("@forward")) return null;
				var e = this.create(o.Forward);
				if (this.consumeToken(), !e.addChild(this._parseStringLiteral())) return this.finish(e, a.ParseError.StringLiteralExpected);
				if (this.acceptIdent("with")) {
					if (!this.accept(r.TokenType.ParenthesisL)) return this.finish(e, a.ParseError.LeftParenthesisExpected, [r.TokenType
						.ParenthesisR
					]);
					if (!e.getParameters().addChild(this._parseModuleConfigDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
					for (; this.accept(r.TokenType.Comma) && !this.peek(r.TokenType.ParenthesisR);)
						if (!e.getParameters().addChild(this._parseModuleConfigDeclaration())) return this.finish(e, a.ParseError.VariableNameExpected);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, a.ParseError.RightParenthesisExpected)
				}
				if (!this.peek(r.TokenType.SemiColon) && !this.peek(r.TokenType.EOF)) {
					if (!this.peekRegExp(r.TokenType.Ident, /as|hide|show/)) return this.finish(e, a.ParseError.UnknownKeyword);
					if (this.acceptIdent("as")) {
						var t = this._parseIdent([o.ReferenceType.Forward]);
						if (!e.setIdentifier(t)) return this.finish(e, a.ParseError.IdentifierExpected);
						if (this.hasWhitespace() || !this.acceptDelim("*")) return this.finish(e, a.ParseError.WildcardExpected)
					}
					if ((this.peekIdent("hide") || this.peekIdent("show")) && !e.addChild(this._parseForwardVisibility())) return this
						.finish(e, a.ParseError.IdentifierOrVariableExpected)
				}
				return this.accept(r.TokenType.SemiColon) || this.accept(r.TokenType.EOF) ? this.finish(e) : this.finish(e, a.ParseError
					.SemiColonExpected)
			}, t.prototype._parseForwardVisibility = function() {
				var e = this.create(o.ForwardVisibility);
				for (e.setIdentifier(this._parseIdent()); e.addChild(this._parseVariable() || this._parseIdent());) this.accept(
					r.TokenType.Comma);
				return e.getChildren().length > 1 ? e : null
			}, t.prototype._parseSupportsCondition = function() {
				return this._parseInterpolation() || e.prototype._parseSupportsCondition.call(this)
			}, t
		}(i.Parser);
	t.SCSSParser = l
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/scssCompletion", [
		"require", "exports", "./cssCompletion", "../parser/cssNodes", "../cssLanguageTypes", "vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.SCSSCompletion = void 0;
	var n = e("./cssCompletion"),
		r = e("../parser/cssNodes"),
		i = e("../cssLanguageTypes"),
		o = e("vscode-nls").loadMessageBundle(),
		s = function(e) {
			function t(n, r) {
				var i = e.call(this, "$", n, r) || this;
				return a(t.scssModuleLoaders), a(t.scssModuleBuiltIns), i
			}
			return __extends(t, e), t.prototype.isImportPathParent = function(t) {
				return t === r.NodeType.Forward || t === r.NodeType.Use || e.prototype.isImportPathParent.call(this, t)
			}, t.prototype.getCompletionForImportPath = function(n, o) {
				var s = n.getParent().type;
				if (s === r.NodeType.Forward || s === r.NodeType.Use)
					for (var a = 0, l = t.scssModuleBuiltIns; a < l.length; a++) {
						var c = l[a],
							d = {
								label: c.label,
								documentation: c.documentation,
								textEdit: i.TextEdit.replace(this.getCompletionRange(n), "'" + c.label + "'"),
								kind: i.CompletionItemKind.Module
							};
						o.items.push(d)
					}
				return e.prototype.getCompletionForImportPath.call(this, n, o)
			}, t.prototype.createReplaceFunction = function() {
				var e = 1;
				return function(n, r) {
					return "\\" + r + ": ${" + e++ + ":" + (t.variableDefaults[r] || "") + "}"
				}
			}, t.prototype.createFunctionProposals = function(e, t, n, r) {
				for (var o = 0, s = e; o < s.length; o++) {
					var a = s[o],
						l = a.func.replace(/\[?(\$\w+)\]?/g, this.createReplaceFunction()),
						c = {
							label: a.func.substr(0, a.func.indexOf("(")),
							detail: a.func,
							documentation: a.desc,
							textEdit: i.TextEdit.replace(this.getCompletionRange(t), l),
							insertTextFormat: i.InsertTextFormat.Snippet,
							kind: i.CompletionItemKind.Function
						};
					n && (c.sortText = "z"), r.items.push(c)
				}
				return r
			}, t.prototype.getCompletionsForSelector = function(n, r, i) {
				return this.createFunctionProposals(t.selectorFuncs, null, !0, i), e.prototype.getCompletionsForSelector.call(
					this, n, r, i)
			}, t.prototype.getTermProposals = function(n, r, i) {
				var o = t.builtInFuncs;
				return n && (o = o.filter((function(e) {
					return !e.type || !n.restrictions || -1 !== n.restrictions.indexOf(e.type)
				}))), this.createFunctionProposals(o, r, !0, i), e.prototype.getTermProposals.call(this, n, r, i)
			}, t.prototype.getColorProposals = function(n, r, i) {
				return this.createFunctionProposals(t.colorProposals, r, !1, i), e.prototype.getColorProposals.call(this, n, r,
					i)
			}, t.prototype.getCompletionsForDeclarationProperty = function(t, n) {
				return this.getCompletionForAtDirectives(n), this.getCompletionsForSelector(null, !0, n), e.prototype.getCompletionsForDeclarationProperty
					.call(this, t, n)
			}, t.prototype.getCompletionsForExtendsReference = function(e, t, n) {
				for (var o = 0, s = this.getSymbolContext().findSymbolsAtOffset(this.offset, r.ReferenceType.Rule); o < s.length; o++) {
					var a = s[o],
						l = {
							label: a.name,
							textEdit: i.TextEdit.replace(this.getCompletionRange(t), a.name),
							kind: i.CompletionItemKind.Function
						};
					n.items.push(l)
				}
				return n
			}, t.prototype.getCompletionForAtDirectives = function(e) {
				var n;
				return (n = e.items).push.apply(n, t.scssAtDirectives), e
			}, t.prototype.getCompletionForTopLevel = function(t) {
				return this.getCompletionForAtDirectives(t), this.getCompletionForModuleLoaders(t), e.prototype.getCompletionForTopLevel
					.call(this, t), t
			}, t.prototype.getCompletionForModuleLoaders = function(e) {
				var n;
				return (n = e.items).push.apply(n, t.scssModuleLoaders), e
			}, t.variableDefaults = {
				$red: "1",
				$green: "2",
				$blue: "3",
				$alpha: "1.0",
				$color: "#000000",
				$weight: "0.5",
				$hue: "0",
				$saturation: "0%",
				$lightness: "0%",
				$degrees: "0",
				$amount: "0",
				$string: '""',
				$substring: '"s"',
				$number: "0",
				$limit: "1"
			}, t.colorProposals = [{
				func: "red($color)",
				desc: o("scss.builtin.red", "Gets the red component of a color.")
			}, {
				func: "green($color)",
				desc: o("scss.builtin.green", "Gets the green component of a color.")
			}, {
				func: "blue($color)",
				desc: o("scss.builtin.blue", "Gets the blue component of a color.")
			}, {
				func: "mix($color, $color, [$weight])",
				desc: o("scss.builtin.mix", "Mixes two colors together.")
			}, {
				func: "hue($color)",
				desc: o("scss.builtin.hue", "Gets the hue component of a color.")
			}, {
				func: "saturation($color)",
				desc: o("scss.builtin.saturation", "Gets the saturation component of a color.")
			}, {
				func: "lightness($color)",
				desc: o("scss.builtin.lightness", "Gets the lightness component of a color.")
			}, {
				func: "adjust-hue($color, $degrees)",
				desc: o("scss.builtin.adjust-hue", "Changes the hue of a color.")
			}, {
				func: "lighten($color, $amount)",
				desc: o("scss.builtin.lighten", "Makes a color lighter.")
			}, {
				func: "darken($color, $amount)",
				desc: o("scss.builtin.darken", "Makes a color darker.")
			}, {
				func: "saturate($color, $amount)",
				desc: o("scss.builtin.saturate", "Makes a color more saturated.")
			}, {
				func: "desaturate($color, $amount)",
				desc: o("scss.builtin.desaturate", "Makes a color less saturated.")
			}, {
				func: "grayscale($color)",
				desc: o("scss.builtin.grayscale", "Converts a color to grayscale.")
			}, {
				func: "complement($color)",
				desc: o("scss.builtin.complement", "Returns the complement of a color.")
			}, {
				func: "invert($color)",
				desc: o("scss.builtin.invert", "Returns the inverse of a color.")
			}, {
				func: "alpha($color)",
				desc: o("scss.builtin.alpha", "Gets the opacity component of a color.")
			}, {
				func: "opacity($color)",
				desc: "Gets the alpha component (opacity) of a color."
			}, {
				func: "rgba($color, $alpha)",
				desc: o("scss.builtin.rgba", "Changes the alpha component for a color.")
			}, {
				func: "opacify($color, $amount)",
				desc: o("scss.builtin.opacify", "Makes a color more opaque.")
			}, {
				func: "fade-in($color, $amount)",
				desc: o("scss.builtin.fade-in", "Makes a color more opaque.")
			}, {
				func: "transparentize($color, $amount)",
				desc: o("scss.builtin.transparentize", "Makes a color more transparent.")
			}, {
				func: "fade-out($color, $amount)",
				desc: o("scss.builtin.fade-out", "Makes a color more transparent.")
			}, {
				func: "adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])",
				desc: o("scss.builtin.adjust-color", "Increases or decreases one or more components of a color.")
			}, {
				func: "scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])",
				desc: o("scss.builtin.scale-color", "Fluidly scales one or more properties of a color.")
			}, {
				func: "change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])",
				desc: o("scss.builtin.change-color", "Changes one or more properties of a color.")
			}, {
				func: "ie-hex-str($color)",
				desc: o("scss.builtin.ie-hex-str", "Converts a color into the format understood by IE filters.")
			}], t.selectorFuncs = [{
				func: "selector-nest($selectors…)",
				desc: o("scss.builtin.selector-nest",
					"Nests selector beneath one another like they would be nested in the stylesheet.")
			}, {
				func: "selector-append($selectors…)",
				desc: o("scss.builtin.selector-append", "Appends selectors to one another without spaces in between.")
			}, {
				func: "selector-extend($selector, $extendee, $extender)",
				desc: o("scss.builtin.selector-extend", "Extends $extendee with $extender within $selector.")
			}, {
				func: "selector-replace($selector, $original, $replacement)",
				desc: o("scss.builtin.selector-replace", "Replaces $original with $replacement within $selector.")
			}, {
				func: "selector-unify($selector1, $selector2)",
				desc: o("scss.builtin.selector-unify",
					"Unifies two selectors to produce a selector that matches elements matched by both.")
			}, {
				func: "is-superselector($super, $sub)",
				desc: o("scss.builtin.is-superselector",
					"Returns whether $super matches all the elements $sub does, and possibly more.")
			}, {
				func: "simple-selectors($selector)",
				desc: o("scss.builtin.simple-selectors", "Returns the simple selectors that comprise a compound selector.")
			}, {
				func: "selector-parse($selector)",
				desc: o("scss.builtin.selector-parse", "Parses a selector into the format returned by &.")
			}], t.builtInFuncs = [{
				func: "unquote($string)",
				desc: o("scss.builtin.unquote", "Removes quotes from a string.")
			}, {
				func: "quote($string)",
				desc: o("scss.builtin.quote", "Adds quotes to a string.")
			}, {
				func: "str-length($string)",
				desc: o("scss.builtin.str-length", "Returns the number of characters in a string.")
			}, {
				func: "str-insert($string, $insert, $index)",
				desc: o("scss.builtin.str-insert", "Inserts $insert into $string at $index.")
			}, {
				func: "str-index($string, $substring)",
				desc: o("scss.builtin.str-index", "Returns the index of the first occurance of $substring in $string.")
			}, {
				func: "str-slice($string, $start-at, [$end-at])",
				desc: o("scss.builtin.str-slice", "Extracts a substring from $string.")
			}, {
				func: "to-upper-case($string)",
				desc: o("scss.builtin.to-upper-case", "Converts a string to upper case.")
			}, {
				func: "to-lower-case($string)",
				desc: o("scss.builtin.to-lower-case", "Converts a string to lower case.")
			}, {
				func: "percentage($number)",
				desc: o("scss.builtin.percentage", "Converts a unitless number to a percentage."),
				type: "percentage"
			}, {
				func: "round($number)",
				desc: o("scss.builtin.round", "Rounds a number to the nearest whole number.")
			}, {
				func: "ceil($number)",
				desc: o("scss.builtin.ceil", "Rounds a number up to the next whole number.")
			}, {
				func: "floor($number)",
				desc: o("scss.builtin.floor", "Rounds a number down to the previous whole number.")
			}, {
				func: "abs($number)",
				desc: o("scss.builtin.abs", "Returns the absolute value of a number.")
			}, {
				func: "min($numbers)",
				desc: o("scss.builtin.min", "Finds the minimum of several numbers.")
			}, {
				func: "max($numbers)",
				desc: o("scss.builtin.max", "Finds the maximum of several numbers.")
			}, {
				func: "random([$limit])",
				desc: o("scss.builtin.random", "Returns a random number.")
			}, {
				func: "length($list)",
				desc: o("scss.builtin.length", "Returns the length of a list.")
			}, {
				func: "nth($list, $n)",
				desc: o("scss.builtin.nth", "Returns a specific item in a list.")
			}, {
				func: "set-nth($list, $n, $value)",
				desc: o("scss.builtin.set-nth", "Replaces the nth item in a list.")
			}, {
				func: "join($list1, $list2, [$separator])",
				desc: o("scss.builtin.join", "Joins together two lists into one.")
			}, {
				func: "append($list1, $val, [$separator])",
				desc: o("scss.builtin.append", "Appends a single value onto the end of a list.")
			}, {
				func: "zip($lists)",
				desc: o("scss.builtin.zip", "Combines several lists into a single multidimensional list.")
			}, {
				func: "index($list, $value)",
				desc: o("scss.builtin.index", "Returns the position of a value within a list.")
			}, {
				func: "list-separator(#list)",
				desc: o("scss.builtin.list-separator", "Returns the separator of a list.")
			}, {
				func: "map-get($map, $key)",
				desc: o("scss.builtin.map-get", "Returns the value in a map associated with a given key.")
			}, {
				func: "map-merge($map1, $map2)",
				desc: o("scss.builtin.map-merge", "Merges two maps together into a new map.")
			}, {
				func: "map-remove($map, $keys)",
				desc: o("scss.builtin.map-remove", "Returns a new map with keys removed.")
			}, {
				func: "map-keys($map)",
				desc: o("scss.builtin.map-keys", "Returns a list of all keys in a map.")
			}, {
				func: "map-values($map)",
				desc: o("scss.builtin.map-values", "Returns a list of all values in a map.")
			}, {
				func: "map-has-key($map, $key)",
				desc: o("scss.builtin.map-has-key", "Returns whether a map has a value associated with a given key.")
			}, {
				func: "keywords($args)",
				desc: o("scss.builtin.keywords", "Returns the keywords passed to a function that takes variable arguments.")
			}, {
				func: "feature-exists($feature)",
				desc: o("scss.builtin.feature-exists", "Returns whether a feature exists in the current Sass runtime.")
			}, {
				func: "variable-exists($name)",
				desc: o("scss.builtin.variable-exists",
					"Returns whether a variable with the given name exists in the current scope.")
			}, {
				func: "global-variable-exists($name)",
				desc: o("scss.builtin.global-variable-exists",
					"Returns whether a variable with the given name exists in the global scope.")
			}, {
				func: "function-exists($name)",
				desc: o("scss.builtin.function-exists", "Returns whether a function with the given name exists.")
			}, {
				func: "mixin-exists($name)",
				desc: o("scss.builtin.mixin-exists", "Returns whether a mixin with the given name exists.")
			}, {
				func: "inspect($value)",
				desc: o("scss.builtin.inspect",
					"Returns the string representation of a value as it would be represented in Sass.")
			}, {
				func: "type-of($value)",
				desc: o("scss.builtin.type-of", "Returns the type of a value.")
			}, {
				func: "unit($number)",
				desc: o("scss.builtin.unit", "Returns the unit(s) associated with a number.")
			}, {
				func: "unitless($number)",
				desc: o("scss.builtin.unitless", "Returns whether a number has units.")
			}, {
				func: "comparable($number1, $number2)",
				desc: o("scss.builtin.comparable", "Returns whether two numbers can be added, subtracted, or compared.")
			}, {
				func: "call($name, $args…)",
				desc: o("scss.builtin.call", "Dynamically calls a Sass function.")
			}], t.scssAtDirectives = [{
				label: "@extend",
				documentation: o("scss.builtin.@extend", "Inherits the styles of another selector."),
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@at-root",
				documentation: o("scss.builtin.@at-root", "Causes one or more rules to be emitted at the root of the document."),
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@debug",
				documentation: o("scss.builtin.@debug",
					"Prints the value of an expression to the standard error output stream. Useful for debugging complicated Sass files."
				),
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@warn",
				documentation: o("scss.builtin.@warn",
					"Prints the value of an expression to the standard error output stream. Useful for libraries that need to warn users of deprecations or recovering from minor mixin usage mistakes. Warnings can be turned off with the `--quiet` command-line option or the `:quiet` Sass option."
				),
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@error",
				documentation: o("scss.builtin.@error",
					"Throws the value of an expression as a fatal error with stack trace. Useful for validating arguments to mixins and functions."
				),
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@if",
				documentation: o("scss.builtin.@if",
					"Includes the body if the expression does not evaluate to `false` or `null`."),
				insertText: "@if ${1:expr} {\n\t$0\n}",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@for",
				documentation: o("scss.builtin.@for",
					"For loop that repeatedly outputs a set of styles for each `$var` in the `from/through` or `from/to` clause."
				),
				insertText: "@for \\$${1:var} from ${2:start} ${3|to,through|} ${4:end} {\n\t$0\n}",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@each",
				documentation: o("scss.builtin.@each",
					"Each loop that sets `$var` to each item in the list or map, then outputs the styles it contains using that value of `$var`."
				),
				insertText: "@each \\$${1:var} in ${2:list} {\n\t$0\n}",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@while",
				documentation: o("scss.builtin.@while",
					"While loop that takes an expression and repeatedly outputs the nested styles until the statement evaluates to `false`."
				),
				insertText: "@while ${1:condition} {\n\t$0\n}",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@mixin",
				documentation: o("scss.builtin.@mixin",
					"Defines styles that can be re-used throughout the stylesheet with `@include`."),
				insertText: "@mixin ${1:name} {\n\t$0\n}",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@include",
				documentation: o("scss.builtin.@include", "Includes the styles defined by another mixin into the current rule."),
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@function",
				documentation: o("scss.builtin.@function",
					"Defines complex operations that can be re-used throughout stylesheets."),
				kind: i.CompletionItemKind.Keyword
			}], t.scssModuleLoaders = [{
				label: "@use",
				documentation: o("scss.builtin.@use",
					"Loads mixins, functions, and variables from other Sass stylesheets as 'modules', and combines CSS from multiple stylesheets together."
				),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/at-rules/use"
				}],
				insertText: "@use $0;",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}, {
				label: "@forward",
				documentation: o("scss.builtin.@forward",
					"Loads a Sass stylesheet and makes its mixins, functions, and variables available when this stylesheet is loaded with the @use rule."
				),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/at-rules/forward"
				}],
				insertText: "@forward $0;",
				insertTextFormat: i.InsertTextFormat.Snippet,
				kind: i.CompletionItemKind.Keyword
			}], t.scssModuleBuiltIns = [{
				label: "sass:math",
				documentation: o("scss.builtin.sass:math", "Provides functions that operate on numbers."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/math"
				}]
			}, {
				label: "sass:string",
				documentation: o("scss.builtin.sass:string", "Makes it easy to combine, search, or split apart strings."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/string"
				}]
			}, {
				label: "sass:color",
				documentation: o("scss.builtin.sass:color",
					"Generates new colors based on existing ones, making it easy to build color themes."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/color"
				}]
			}, {
				label: "sass:list",
				documentation: o("scss.builtin.sass:list", "Lets you access and modify values in lists."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/list"
				}]
			}, {
				label: "sass:map",
				documentation: o("scss.builtin.sass:map",
					"Makes it possible to look up the value associated with a key in a map, and much more."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/map"
				}]
			}, {
				label: "sass:selector",
				documentation: o("scss.builtin.sass:selector", "Provides access to Sass’s powerful selector engine."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/selector"
				}]
			}, {
				label: "sass:meta",
				documentation: o("scss.builtin.sass:meta", "Exposes the details of Sass’s inner workings."),
				references: [{
					name: "Sass documentation",
					url: "https://sass-lang.com/documentation/modules/meta"
				}]
			}], t
		}(n.CSSCompletion);

	function a(e) {
		e.forEach((function(e) {
			if (e.documentation && e.references && e.references.length > 0) {
				var t = "string" == typeof e.documentation ? {
					kind: "markdown",
					value: e.documentation
				} : {
					kind: "markdown",
					value: e.documentation.value
				};
				t.value += "\n\n", t.value += e.references.map((function(e) {
					return "[" + e.name + "](" + e.url + ")"
				})).join(" | "), e.documentation = t
			}
		}))
	}
	t.SCSSCompletion = s
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/lessScanner", ["require",
		"exports", "./cssScanner"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.LESSScanner = t.Ellipsis = void 0;
	var n = e("./cssScanner"),
		r = "/".charCodeAt(0),
		i = "\n".charCodeAt(0),
		o = "\r".charCodeAt(0),
		s = "\f".charCodeAt(0),
		a = "`".charCodeAt(0),
		l = ".".charCodeAt(0),
		c = n.TokenType.CustomToken;
	t.Ellipsis = c++;
	var d = function(e) {
		function c() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends(c, e), c.prototype.scanNext = function(n) {
			var r = this.escapedJavaScript();
			return null !== r ? this.finishToken(n, r) : this.stream.advanceIfChars([l, l, l]) ? this.finishToken(n, t.Ellipsis) :
				e.prototype.scanNext.call(this, n)
		}, c.prototype.comment = function() {
			return !!e.prototype.comment.call(this) || !(this.inURL || !this.stream.advanceIfChars([r, r])) && (this.stream.advanceWhileChar(
				(function(e) {
					switch (e) {
						case i:
						case o:
						case s:
							return !1;
						default:
							return !0
					}
				})), !0)
		}, c.prototype.escapedJavaScript = function() {
			return this.stream.peekChar() === a ? (this.stream.advance(1), this.stream.advanceWhileChar((function(e) {
				return e !== a
			})), this.stream.advanceIfChar(a) ? n.TokenType.EscapedJavaScript : n.TokenType.BadEscapedJavaScript) : null
		}, c
	}(n.Scanner);
	t.LESSScanner = d
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/parser/lessParser", ["require",
		"exports", "./lessScanner", "./cssScanner", "./cssParser", "./cssNodes", "./cssErrors"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.LESSParser = void 0;
	var n = e("./lessScanner"),
		r = e("./cssScanner"),
		i = e("./cssParser"),
		o = e("./cssNodes"),
		s = e("./cssErrors"),
		a = function(e) {
			function t() {
				return e.call(this, new n.LESSScanner) || this
			}
			return __extends(t, e), t.prototype._parseStylesheetStatement = function(t) {
				return void 0 === t && (t = !1), this.peek(r.TokenType.AtKeyword) ? this._parseVariableDeclaration() || this._parsePlugin() ||
					e.prototype._parseStylesheetAtStatement.call(this, t) : this._tryParseMixinDeclaration() || this._tryParseMixinReference() ||
					this._parseFunction() || this._parseRuleset(!0)
			}, t.prototype._parseImport = function() {
				if (!this.peekKeyword("@import") && !this.peekKeyword("@import-once")) return null;
				var e = this.create(o.Import);
				if (this.consumeToken(), this.accept(r.TokenType.ParenthesisL)) {
					if (!this.accept(r.TokenType.Ident)) return this.finish(e, s.ParseError.IdentifierExpected, [r.TokenType.SemiColon]);
					do {
						if (!this.accept(r.TokenType.Comma)) break
					} while (this.accept(r.TokenType.Ident));
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(e, s.ParseError.RightParenthesisExpected, [r.TokenType
						.SemiColon
					])
				}
				return e.addChild(this._parseURILiteral()) || e.addChild(this._parseStringLiteral()) ? (this.peek(r.TokenType.SemiColon) ||
					this.peek(r.TokenType.EOF) || e.setMedialist(this._parseMediaQueryList()), this.finish(e)) : this.finish(e, s.ParseError
					.URIOrStringExpected, [r.TokenType.SemiColon])
			}, t.prototype._parsePlugin = function() {
				if (!this.peekKeyword("@plugin")) return null;
				var e = this.createNode(o.NodeType.Plugin);
				return this.consumeToken(), e.addChild(this._parseStringLiteral()) ? this.accept(r.TokenType.SemiColon) ? this.finish(
					e) : this.finish(e, s.ParseError.SemiColonExpected) : this.finish(e, s.ParseError.StringLiteralExpected)
			}, t.prototype._parseMediaQuery = function(t) {
				var n = e.prototype._parseMediaQuery.call(this, t);
				if (!n) {
					var r = this.create(o.MediaQuery);
					return r.addChild(this._parseVariable()) ? this.finish(r) : null
				}
				return n
			}, t.prototype._parseMediaDeclaration = function(e) {
				return void 0 === e && (e = !1), this._tryParseRuleset(e) || this._tryToParseDeclaration() || this._tryParseMixinDeclaration() ||
					this._tryParseMixinReference() || this._parseDetachedRuleSetMixin() || this._parseStylesheetStatement(e)
			}, t.prototype._parseMediaFeatureName = function() {
				return this._parseIdent() || this._parseVariable()
			}, t.prototype._parseVariableDeclaration = function(e) {
				void 0 === e && (e = []);
				var t = this.create(o.VariableDeclaration),
					n = this.mark();
				if (!t.setVariable(this._parseVariable(!0))) return null;
				if (!this.accept(r.TokenType.Colon)) return this.restoreAtMark(n), null;
				if (this.prevToken && (t.colonPosition = this.prevToken.offset), t.setValue(this._parseDetachedRuleSet())) t.needsSemicolon = !
					1;
				else if (!t.setValue(this._parseExpr())) return this.finish(t, s.ParseError.VariableValueExpected, [], e);
				return t.addChild(this._parsePrio()), this.peek(r.TokenType.SemiColon) && (t.semicolonPosition = this.token.offset),
					this.finish(t)
			}, t.prototype._parseDetachedRuleSet = function() {
				var e = this.mark();
				if (this.peekDelim("#") || this.peekDelim(".")) {
					if (this.consumeToken(), this.hasWhitespace() || !this.accept(r.TokenType.ParenthesisL)) return this.restoreAtMark(
						e), null;
					var t = this.create(o.MixinDeclaration);
					if (t.getParameters().addChild(this._parseMixinParameter()))
						for (;
							(this.accept(r.TokenType.Comma) || this.accept(r.TokenType.SemiColon)) && !this.peek(r.TokenType.ParenthesisR);
						) t.getParameters().addChild(this._parseMixinParameter()) || this.markError(t, s.ParseError.IdentifierExpected,
							[], [r.TokenType.ParenthesisR]);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.restoreAtMark(e), null
				}
				if (!this.peek(r.TokenType.CurlyL)) return null;
				var n = this.create(o.BodyDeclaration);
				return this._parseBody(n, this._parseDetachedRuleSetBody.bind(this)), this.finish(n)
			}, t.prototype._parseDetachedRuleSetBody = function() {
				return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration()
			}, t.prototype._addLookupChildren = function(e) {
				if (!e.addChild(this._parseLookupValue())) return !1;
				for (var t = !1; this.peek(r.TokenType.BracketL) && (t = !0), e.addChild(this._parseLookupValue());) t = !1;
				return !t
			}, t.prototype._parseLookupValue = function() {
				var e = this.create(o.Node),
					t = this.mark();
				return this.accept(r.TokenType.BracketL) && ((e.addChild(this._parseVariable(!1, !0)) || e.addChild(this._parsePropertyIdentifier())) &&
					this.accept(r.TokenType.BracketR) || this.accept(r.TokenType.BracketR)) ? e : (this.restoreAtMark(t), null)
			}, t.prototype._parseVariable = function(e, t) {
				void 0 === e && (e = !1), void 0 === t && (t = !1);
				var n = !e && this.peekDelim("$");
				if (!this.peekDelim("@") && !n && !this.peek(r.TokenType.AtKeyword)) return null;
				for (var i = this.create(o.Variable), s = this.mark(); this.acceptDelim("@") || !e && this.acceptDelim("$");)
					if (this.hasWhitespace()) return this.restoreAtMark(s), null;
				return (this.accept(r.TokenType.AtKeyword) || this.accept(r.TokenType.Ident)) && (t || !this.peek(r.TokenType.BracketL) ||
					this._addLookupChildren(i)) ? i : (this.restoreAtMark(s), null)
			}, t.prototype._parseTermExpression = function() {
				return this._parseVariable() || this._parseEscaped() || e.prototype._parseTermExpression.call(this) || this._tryParseMixinReference(
					!1)
			}, t.prototype._parseEscaped = function() {
				if (this.peek(r.TokenType.EscapedJavaScript) || this.peek(r.TokenType.BadEscapedJavaScript)) {
					var e = this.createNode(o.NodeType.EscapedValue);
					return this.consumeToken(), this.finish(e)
				}
				if (this.peekDelim("~")) {
					e = this.createNode(o.NodeType.EscapedValue);
					return this.consumeToken(), this.accept(r.TokenType.String) || this.accept(r.TokenType.EscapedJavaScript) ?
						this.finish(e) : this.finish(e, s.ParseError.TermExpected)
				}
				return null
			}, t.prototype._parseOperator = function() {
				var t = this._parseGuardOperator();
				return t || e.prototype._parseOperator.call(this)
			}, t.prototype._parseGuardOperator = function() {
				if (this.peekDelim(">")) {
					var e = this.createNode(o.NodeType.Operator);
					return this.consumeToken(), this.acceptDelim("="), e
				}
				if (this.peekDelim("=")) {
					e = this.createNode(o.NodeType.Operator);
					return this.consumeToken(), this.acceptDelim("<"), e
				}
				if (this.peekDelim("<")) {
					e = this.createNode(o.NodeType.Operator);
					return this.consumeToken(), this.acceptDelim("="), e
				}
				return null
			}, t.prototype._parseRuleSetDeclaration = function() {
				return this.peek(r.TokenType.AtKeyword) ? this._parseKeyframe() || this._parseMedia(!0) || this._parseImport() ||
					this._parseSupports(!0) || this._parseDetachedRuleSetMixin() || this._parseVariableDeclaration() || e.prototype
					._parseRuleSetDeclarationAtStatement.call(this) : this._tryParseMixinDeclaration() || this._tryParseRuleset(!0) ||
					this._tryParseMixinReference() || this._parseFunction() || this._parseExtend() || e.prototype._parseRuleSetDeclaration
					.call(this)
			}, t.prototype._parseKeyframeIdent = function() {
				return this._parseIdent([o.ReferenceType.Keyframe]) || this._parseVariable()
			}, t.prototype._parseKeyframeSelector = function() {
				return this._parseDetachedRuleSetMixin() || e.prototype._parseKeyframeSelector.call(this)
			}, t.prototype._parseSimpleSelectorBody = function() {
				return this._parseSelectorCombinator() || e.prototype._parseSimpleSelectorBody.call(this)
			}, t.prototype._parseSelector = function(e) {
				var t = this.create(o.Selector),
					n = !1;
				for (e && (n = t.addChild(this._parseCombinator())); t.addChild(this._parseSimpleSelector());) {
					n = !0;
					var i = this.mark();
					if (t.addChild(this._parseGuard()) && this.peek(r.TokenType.CurlyL)) break;
					this.restoreAtMark(i), t.addChild(this._parseCombinator())
				}
				return n ? this.finish(t) : null
			}, t.prototype._parseSelectorCombinator = function() {
				if (this.peekDelim("&")) {
					var e = this.createNode(o.NodeType.SelectorCombinator);
					for (this.consumeToken(); !this.hasWhitespace() && (this.acceptDelim("-") || this.accept(r.TokenType.Num) ||
							this.accept(r.TokenType.Dimension) || e.addChild(this._parseIdent()) || this.acceptDelim("&")););
					return this.finish(e)
				}
				return null
			}, t.prototype._parseSelectorIdent = function() {
				if (!this.peekInterpolatedIdent()) return null;
				var e = this.createNode(o.NodeType.SelectorInterpolation);
				return this._acceptInterpolatedIdent(e) ? this.finish(e) : null
			}, t.prototype._parsePropertyIdentifier = function(e) {
				void 0 === e && (e = !1);
				var t = /^[\w-]+/;
				if (!this.peekInterpolatedIdent() && !this.peekRegExp(this.token.type, t)) return null;
				var n = this.mark(),
					r = this.create(o.Identifier);
				r.isCustomProperty = this.acceptDelim("-") && this.acceptDelim("-");
				return (e ? r.isCustomProperty ? r.addChild(this._parseIdent()) : r.addChild(this._parseRegexp(t)) : r.isCustomProperty ?
					this._acceptInterpolatedIdent(r) : this._acceptInterpolatedIdent(r, t)) ? (e || this.hasWhitespace() || (this.acceptDelim(
					"+"), this.hasWhitespace() || this.acceptIdent("_")), this.finish(r)) : (this.restoreAtMark(n), null)
			}, t.prototype.peekInterpolatedIdent = function() {
				return this.peek(r.TokenType.Ident) || this.peekDelim("@") || this.peekDelim("$") || this.peekDelim("-")
			}, t.prototype._acceptInterpolatedIdent = function(e, t) {
				for (var n = this, i = !1, o = function() {
						var e = n.mark();
						return n.acceptDelim("-") && (n.hasWhitespace() || n.acceptDelim("-"), n.hasWhitespace()) ? (n.restoreAtMark(
							e), null) : n._parseInterpolation()
					}, s = t ? function() {
						return n.acceptRegexp(t)
					} : function() {
						return n.accept(r.TokenType.Ident)
					};
					(s() || e.addChild(this._parseInterpolation() || this.try(o))) && (i = !0, !this.hasWhitespace()););
				return i
			}, t.prototype._parseInterpolation = function() {
				var e = this.mark();
				if (this.peekDelim("@") || this.peekDelim("$")) {
					var t = this.createNode(o.NodeType.Interpolation);
					return this.consumeToken(), this.hasWhitespace() || !this.accept(r.TokenType.CurlyL) ? (this.restoreAtMark(e),
						null) : t.addChild(this._parseIdent()) ? this.accept(r.TokenType.CurlyR) ? this.finish(t) : this.finish(t, s.ParseError
						.RightCurlyExpected) : this.finish(t, s.ParseError.IdentifierExpected)
				}
				return null
			}, t.prototype._tryParseMixinDeclaration = function() {
				var e = this.mark(),
					t = this.create(o.MixinDeclaration);
				if (!t.setIdentifier(this._parseMixinDeclarationIdentifier()) || !this.accept(r.TokenType.ParenthesisL)) return this
					.restoreAtMark(e), null;
				if (t.getParameters().addChild(this._parseMixinParameter()))
					for (;
						(this.accept(r.TokenType.Comma) || this.accept(r.TokenType.SemiColon)) && !this.peek(r.TokenType.ParenthesisR);
					) t.getParameters().addChild(this._parseMixinParameter()) || this.markError(t, s.ParseError.IdentifierExpected,
						[], [r.TokenType.ParenthesisR]);
				return this.accept(r.TokenType.ParenthesisR) ? (t.setGuard(this._parseGuard()), this.peek(r.TokenType.CurlyL) ?
					this._parseBody(t, this._parseMixInBodyDeclaration.bind(this)) : (this.restoreAtMark(e), null)) : (this.restoreAtMark(
					e), null)
			}, t.prototype._parseMixInBodyDeclaration = function() {
				return this._parseFontFace() || this._parseRuleSetDeclaration()
			}, t.prototype._parseMixinDeclarationIdentifier = function() {
				var e;
				if (this.peekDelim("#") || this.peekDelim(".")) {
					if (e = this.create(o.Identifier), this.consumeToken(), this.hasWhitespace() || !e.addChild(this._parseIdent()))
						return null
				} else {
					if (!this.peek(r.TokenType.Hash)) return null;
					e = this.create(o.Identifier), this.consumeToken()
				}
				return e.referenceTypes = [o.ReferenceType.Mixin], this.finish(e)
			}, t.prototype._parsePseudo = function() {
				if (!this.peek(r.TokenType.Colon)) return null;
				var t = this.mark(),
					n = this.create(o.ExtendsReference);
				return this.consumeToken(), this.acceptIdent("extend") ? this._completeExtends(n) : (this.restoreAtMark(t), e.prototype
					._parsePseudo.call(this))
			}, t.prototype._parseExtend = function() {
				if (!this.peekDelim("&")) return null;
				var e = this.mark(),
					t = this.create(o.ExtendsReference);
				return this.consumeToken(), !this.hasWhitespace() && this.accept(r.TokenType.Colon) && this.acceptIdent("extend") ?
					this._completeExtends(t) : (this.restoreAtMark(e), null)
			}, t.prototype._completeExtends = function(e) {
				if (!this.accept(r.TokenType.ParenthesisL)) return this.finish(e, s.ParseError.LeftParenthesisExpected);
				var t = e.getSelectors();
				if (!t.addChild(this._parseSelector(!0))) return this.finish(e, s.ParseError.SelectorExpected);
				for (; this.accept(r.TokenType.Comma);)
					if (!t.addChild(this._parseSelector(!0))) return this.finish(e, s.ParseError.SelectorExpected);
				return this.accept(r.TokenType.ParenthesisR) ? this.finish(e) : this.finish(e, s.ParseError.RightParenthesisExpected)
			}, t.prototype._parseDetachedRuleSetMixin = function() {
				if (!this.peek(r.TokenType.AtKeyword)) return null;
				var e = this.mark(),
					t = this.create(o.MixinReference);
				return !t.addChild(this._parseVariable(!0)) || !this.hasWhitespace() && this.accept(r.TokenType.ParenthesisL) ?
					this.accept(r.TokenType.ParenthesisR) ? this.finish(t) : this.finish(t, s.ParseError.RightParenthesisExpected) :
					(this.restoreAtMark(e), null)
			}, t.prototype._tryParseMixinReference = function(e) {
				void 0 === e && (e = !0);
				for (var t = this.mark(), n = this.create(o.MixinReference), i = this._parseMixinDeclarationIdentifier(); i;) {
					this.acceptDelim(">");
					var a = this._parseMixinDeclarationIdentifier();
					if (!a) break;
					n.getNamespaces().addChild(i), i = a
				}
				if (!n.setIdentifier(i)) return this.restoreAtMark(t), null;
				var l = !1;
				if (this.accept(r.TokenType.ParenthesisL)) {
					if (l = !0, n.getArguments().addChild(this._parseMixinArgument()))
						for (;
							(this.accept(r.TokenType.Comma) || this.accept(r.TokenType.SemiColon)) && !this.peek(r.TokenType.ParenthesisR);
						)
							if (!n.getArguments().addChild(this._parseMixinArgument())) return this.finish(n, s.ParseError.ExpressionExpected);
					if (!this.accept(r.TokenType.ParenthesisR)) return this.finish(n, s.ParseError.RightParenthesisExpected);
					i.referenceTypes = [o.ReferenceType.Mixin]
				} else i.referenceTypes = [o.ReferenceType.Mixin, o.ReferenceType.Rule];
				return this.peek(r.TokenType.BracketL) ? e || this._addLookupChildren(n) : n.addChild(this._parsePrio()), l ||
					this.peek(r.TokenType.SemiColon) || this.peek(r.TokenType.CurlyR) || this.peek(r.TokenType.EOF) ? this.finish(n) :
					(this.restoreAtMark(t), null)
			}, t.prototype._parseMixinArgument = function() {
				var e = this.create(o.FunctionArgument),
					t = this.mark(),
					n = this._parseVariable();
				return n && (this.accept(r.TokenType.Colon) ? e.setIdentifier(n) : this.restoreAtMark(t)), e.setValue(this._parseDetachedRuleSet() ||
					this._parseExpr(!0)) ? this.finish(e) : (this.restoreAtMark(t), null)
			}, t.prototype._parseMixinParameter = function() {
				var e = this.create(o.FunctionParameter);
				if (this.peekKeyword("@rest")) {
					var t = this.create(o.Node);
					return this.consumeToken(), this.accept(n.Ellipsis) ? (e.setIdentifier(this.finish(t)), this.finish(e)) : this.finish(
						e, s.ParseError.DotExpected, [], [r.TokenType.Comma, r.TokenType.ParenthesisR])
				}
				if (this.peek(n.Ellipsis)) {
					var i = this.create(o.Node);
					return this.consumeToken(), e.setIdentifier(this.finish(i)), this.finish(e)
				}
				var a = !1;
				return e.setIdentifier(this._parseVariable()) && (this.accept(r.TokenType.Colon), a = !0), e.setDefaultValue(
					this._parseDetachedRuleSet() || this._parseExpr(!0)) || a ? this.finish(e) : null
			}, t.prototype._parseGuard = function() {
				if (!this.peekIdent("when")) return null;
				var e = this.create(o.LessGuard);
				if (this.consumeToken(), e.isNegated = this.acceptIdent("not"), !e.getConditions().addChild(this._parseGuardCondition()))
					return this.finish(e, s.ParseError.ConditionExpected);
				for (; this.acceptIdent("and") || this.accept(r.TokenType.Comma);)
					if (!e.getConditions().addChild(this._parseGuardCondition())) return this.finish(e, s.ParseError.ConditionExpected);
				return this.finish(e)
			}, t.prototype._parseGuardCondition = function() {
				if (!this.peek(r.TokenType.ParenthesisL)) return null;
				var e = this.create(o.GuardCondition);
				return this.consumeToken(), e.addChild(this._parseExpr()), this.accept(r.TokenType.ParenthesisR) ? this.finish(e) :
					this.finish(e, s.ParseError.RightParenthesisExpected)
			}, t.prototype._parseFunction = function() {
				var e = this.mark(),
					t = this.create(o.Function);
				if (!t.setIdentifier(this._parseFunctionIdentifier())) return null;
				if (this.hasWhitespace() || !this.accept(r.TokenType.ParenthesisL)) return this.restoreAtMark(e), null;
				if (t.getArguments().addChild(this._parseMixinArgument()))
					for (;
						(this.accept(r.TokenType.Comma) || this.accept(r.TokenType.SemiColon)) && !this.peek(r.TokenType.ParenthesisR);
					)
						if (!t.getArguments().addChild(this._parseMixinArgument())) return this.finish(t, s.ParseError.ExpressionExpected);
				return this.accept(r.TokenType.ParenthesisR) ? this.finish(t) : this.finish(t, s.ParseError.RightParenthesisExpected)
			}, t.prototype._parseFunctionIdentifier = function() {
				if (this.peekDelim("%")) {
					var t = this.create(o.Identifier);
					return t.referenceTypes = [o.ReferenceType.Function], this.consumeToken(), this.finish(t)
				}
				return e.prototype._parseFunctionIdentifier.call(this)
			}, t.prototype._parseURLArgument = function() {
				var t = this.mark(),
					n = e.prototype._parseURLArgument.call(this);
				if (!n || !this.peek(r.TokenType.ParenthesisR)) {
					this.restoreAtMark(t);
					var i = this.create(o.Node);
					return i.addChild(this._parseBinaryExpr()), this.finish(i)
				}
				return n
			}, t
		}(i.Parser);
	t.LESSParser = a
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}();
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/lessCompletion", [
		"require", "exports", "./cssCompletion", "../cssLanguageTypes", "vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.LESSCompletion = void 0;
	var n = e("./cssCompletion"),
		r = e("../cssLanguageTypes"),
		i = e("vscode-nls").loadMessageBundle(),
		o = function(e) {
			function t(t, n) {
				return e.call(this, "@", t, n) || this
			}
			return __extends(t, e), t.prototype.createFunctionProposals = function(e, t, n, i) {
				for (var o = 0, s = e; o < s.length; o++) {
					var a = s[o],
						l = {
							label: a.name,
							detail: a.example,
							documentation: a.description,
							textEdit: r.TextEdit.replace(this.getCompletionRange(t), a.name + "($0)"),
							insertTextFormat: r.InsertTextFormat.Snippet,
							kind: r.CompletionItemKind.Function
						};
					n && (l.sortText = "z"), i.items.push(l)
				}
				return i
			}, t.prototype.getTermProposals = function(n, r, i) {
				var o = t.builtInProposals;
				return n && (o = o.filter((function(e) {
					return !e.type || !n.restrictions || -1 !== n.restrictions.indexOf(e.type)
				}))), this.createFunctionProposals(o, r, !0, i), e.prototype.getTermProposals.call(this, n, r, i)
			}, t.prototype.getColorProposals = function(n, r, i) {
				return this.createFunctionProposals(t.colorProposals, r, !1, i), e.prototype.getColorProposals.call(this, n, r,
					i)
			}, t.prototype.getCompletionsForDeclarationProperty = function(t, n) {
				return this.getCompletionsForSelector(null, !0, n), e.prototype.getCompletionsForDeclarationProperty.call(this,
					t, n)
			}, t.builtInProposals = [{
				name: "if",
				example: "if(condition, trueValue [, falseValue]);",
				description: i("less.builtin.if", "returns one of two values depending on a condition.")
			}, {
				name: "boolean",
				example: "boolean(condition);",
				description: i("less.builtin.boolean", '"store" a boolean test for later evaluation in a guard or if().')
			}, {
				name: "length",
				example: "length(@list);",
				description: i("less.builtin.length", "returns the number of elements in a value list")
			}, {
				name: "extract",
				example: "extract(@list, index);",
				description: i("less.builtin.extract", "returns a value at the specified position in the list")
			}, {
				name: "range",
				example: "range([start, ] end [, step]);",
				description: i("less.builtin.range", "generate a list spanning a range of values")
			}, {
				name: "each",
				example: "each(@list, ruleset);",
				description: i("less.builtin.each", "bind the evaluation of a ruleset to each member of a list.")
			}, {
				name: "escape",
				example: "escape(@string);",
				description: i("less.builtin.escape", "URL encodes a string")
			}, {
				name: "e",
				example: "e(@string);",
				description: i("less.builtin.e", "escape string content")
			}, {
				name: "replace",
				example: "replace(@string, @pattern, @replacement[, @flags]);",
				description: i("less.builtin.replace", "string replace")
			}, {
				name: "unit",
				example: "unit(@dimension, [@unit: '']);",
				description: i("less.builtin.unit", "remove or change the unit of a dimension")
			}, {
				name: "color",
				example: "color(@string);",
				description: i("less.builtin.color", "parses a string to a color"),
				type: "color"
			}, {
				name: "convert",
				example: "convert(@value, unit);",
				description: i("less.builtin.convert", "converts numbers from one type into another")
			}, {
				name: "data-uri",
				example: "data-uri([mimetype,] url);",
				description: i("less.builtin.data-uri", "inlines a resource and falls back to `url()`"),
				type: "url"
			}, {
				name: "abs",
				description: i("less.builtin.abs", "absolute value of a number"),
				example: "abs(number);"
			}, {
				name: "acos",
				description: i("less.builtin.acos", "arccosine - inverse of cosine function"),
				example: "acos(number);"
			}, {
				name: "asin",
				description: i("less.builtin.asin", "arcsine - inverse of sine function"),
				example: "asin(number);"
			}, {
				name: "ceil",
				example: "ceil(@number);",
				description: i("less.builtin.ceil", "rounds up to an integer")
			}, {
				name: "cos",
				description: i("less.builtin.cos", "cosine function"),
				example: "cos(number);"
			}, {
				name: "floor",
				description: i("less.builtin.floor", "rounds down to an integer"),
				example: "floor(@number);"
			}, {
				name: "percentage",
				description: i("less.builtin.percentage", "converts to a %, e.g. 0.5 > 50%"),
				example: "percentage(@number);",
				type: "percentage"
			}, {
				name: "round",
				description: i("less.builtin.round", "rounds a number to a number of places"),
				example: "round(number, [places: 0]);"
			}, {
				name: "sqrt",
				description: i("less.builtin.sqrt", "calculates square root of a number"),
				example: "sqrt(number);"
			}, {
				name: "sin",
				description: i("less.builtin.sin", "sine function"),
				example: "sin(number);"
			}, {
				name: "tan",
				description: i("less.builtin.tan", "tangent function"),
				example: "tan(number);"
			}, {
				name: "atan",
				description: i("less.builtin.atan", "arctangent - inverse of tangent function"),
				example: "atan(number);"
			}, {
				name: "pi",
				description: i("less.builtin.pi", "returns pi"),
				example: "pi();"
			}, {
				name: "pow",
				description: i("less.builtin.pow", "first argument raised to the power of the second argument"),
				example: "pow(@base, @exponent);"
			}, {
				name: "mod",
				description: i("less.builtin.mod", "first argument modulus second argument"),
				example: "mod(number, number);"
			}, {
				name: "min",
				description: i("less.builtin.min", "returns the lowest of one or more values"),
				example: "min(@x, @y);"
			}, {
				name: "max",
				description: i("less.builtin.max", "returns the lowest of one or more values"),
				example: "max(@x, @y);"
			}], t.colorProposals = [{
				name: "argb",
				example: "argb(@color);",
				description: i("less.builtin.argb", "creates a #AARRGGBB")
			}, {
				name: "hsl",
				example: "hsl(@hue, @saturation, @lightness);",
				description: i("less.builtin.hsl", "creates a color")
			}, {
				name: "hsla",
				example: "hsla(@hue, @saturation, @lightness, @alpha);",
				description: i("less.builtin.hsla", "creates a color")
			}, {
				name: "hsv",
				example: "hsv(@hue, @saturation, @value);",
				description: i("less.builtin.hsv", "creates a color")
			}, {
				name: "hsva",
				example: "hsva(@hue, @saturation, @value, @alpha);",
				description: i("less.builtin.hsva", "creates a color")
			}, {
				name: "hue",
				example: "hue(@color);",
				description: i("less.builtin.hue", "returns the `hue` channel of `@color` in the HSL space")
			}, {
				name: "saturation",
				example: "saturation(@color);",
				description: i("less.builtin.saturation", "returns the `saturation` channel of `@color` in the HSL space")
			}, {
				name: "lightness",
				example: "lightness(@color);",
				description: i("less.builtin.lightness", "returns the `lightness` channel of `@color` in the HSL space")
			}, {
				name: "hsvhue",
				example: "hsvhue(@color);",
				description: i("less.builtin.hsvhue", "returns the `hue` channel of `@color` in the HSV space")
			}, {
				name: "hsvsaturation",
				example: "hsvsaturation(@color);",
				description: i("less.builtin.hsvsaturation", "returns the `saturation` channel of `@color` in the HSV space")
			}, {
				name: "hsvvalue",
				example: "hsvvalue(@color);",
				description: i("less.builtin.hsvvalue", "returns the `value` channel of `@color` in the HSV space")
			}, {
				name: "red",
				example: "red(@color);",
				description: i("less.builtin.red", "returns the `red` channel of `@color`")
			}, {
				name: "green",
				example: "green(@color);",
				description: i("less.builtin.green", "returns the `green` channel of `@color`")
			}, {
				name: "blue",
				example: "blue(@color);",
				description: i("less.builtin.blue", "returns the `blue` channel of `@color`")
			}, {
				name: "alpha",
				example: "alpha(@color);",
				description: i("less.builtin.alpha", "returns the `alpha` channel of `@color`")
			}, {
				name: "luma",
				example: "luma(@color);",
				description: i("less.builtin.luma", "returns the `luma` value (perceptual brightness) of `@color`")
			}, {
				name: "saturate",
				example: "saturate(@color, 10%);",
				description: i("less.builtin.saturate", "return `@color` 10% points more saturated")
			}, {
				name: "desaturate",
				example: "desaturate(@color, 10%);",
				description: i("less.builtin.desaturate", "return `@color` 10% points less saturated")
			}, {
				name: "lighten",
				example: "lighten(@color, 10%);",
				description: i("less.builtin.lighten", "return `@color` 10% points lighter")
			}, {
				name: "darken",
				example: "darken(@color, 10%);",
				description: i("less.builtin.darken", "return `@color` 10% points darker")
			}, {
				name: "fadein",
				example: "fadein(@color, 10%);",
				description: i("less.builtin.fadein", "return `@color` 10% points less transparent")
			}, {
				name: "fadeout",
				example: "fadeout(@color, 10%);",
				description: i("less.builtin.fadeout", "return `@color` 10% points more transparent")
			}, {
				name: "fade",
				example: "fade(@color, 50%);",
				description: i("less.builtin.fade", "return `@color` with 50% transparency")
			}, {
				name: "spin",
				example: "spin(@color, 10);",
				description: i("less.builtin.spin", "return `@color` with a 10 degree larger in hue")
			}, {
				name: "mix",
				example: "mix(@color1, @color2, [@weight: 50%]);",
				description: i("less.builtin.mix", "return a mix of `@color1` and `@color2`")
			}, {
				name: "greyscale",
				example: "greyscale(@color);",
				description: i("less.builtin.greyscale", "returns a grey, 100% desaturated color")
			}, {
				name: "contrast",
				example: "contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]);",
				description: i("less.builtin.contrast",
					"return `@darkcolor` if `@color1 is> 43% luma` otherwise return `@lightcolor`, see notes")
			}, {
				name: "multiply",
				example: "multiply(@color1, @color2);"
			}, {
				name: "screen",
				example: "screen(@color1, @color2);"
			}, {
				name: "overlay",
				example: "overlay(@color1, @color2);"
			}, {
				name: "softlight",
				example: "softlight(@color1, @color2);"
			}, {
				name: "hardlight",
				example: "hardlight(@color1, @color2);"
			}, {
				name: "difference",
				example: "difference(@color1, @color2);"
			}, {
				name: "exclusion",
				example: "exclusion(@color1, @color2);"
			}, {
				name: "average",
				example: "average(@color1, @color2);"
			}, {
				name: "negation",
				example: "negation(@color1, @color2);"
			}], t
		}(n.CSSCompletion);
	t.LESSCompletion = o
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssFolding", [
		"require", "exports", "../parser/cssScanner", "../parser/scssScanner", "../parser/lessScanner"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.getFoldingRanges = void 0;
	var n = e("../parser/cssScanner"),
		r = e("../parser/scssScanner"),
		i = e("../parser/lessScanner");

	function o(e, t) {
		if (0 === e.length) return null;
		for (var n = e.length - 1; n >= 0; n--)
			if (e[n].type === t && e[n].isStart) return e.splice(n, 1)[0];
		return null
	}
	t.getFoldingRanges = function(e, t) {
		return function(e, t) {
			var n = t && t.rangeLimit || Number.MAX_VALUE,
				r = e.sort((function(e, t) {
					var n = e.startLine - t.startLine;
					return 0 === n && (n = e.endLine - t.endLine), n
				})),
				i = [],
				o = -1;
			return r.forEach((function(e) {
				e.startLine < o && o < e.endLine || (i.push(e), o = e.endLine)
			})), i.length < n ? i : i.slice(0, n)
		}(function(e) {
			function t(t) {
				return e.positionAt(t.offset).line
			}

			function s(t) {
				return e.positionAt(t.offset + t.len).line
			}

			function a() {
				switch (e.languageId) {
					case "scss":
						return new r.SCSSScanner;
					case "less":
						return new i.LESSScanner;
					default:
						return new n.Scanner
				}
			}

			function l(e, n) {
				var r = t(e),
					i = s(e);
				return r !== i ? {
					startLine: r,
					endLine: i,
					kind: n
				} : null
			}
			var c = [],
				d = [],
				p = a();
			p.ignoreComment = !1, p.setSource(e.getText());
			var h = p.scan(),
				u = null,
				m = function() {
					switch (h.type) {
						case n.TokenType.CurlyL:
						case r.InterpolationFunction:
							d.push({
								line: t(h),
								type: "brace",
								isStart: !0
							});
							break;
						case n.TokenType.CurlyR:
							if (0 !== d.length) {
								if (!(f = o(d, "brace"))) break;
								var i = s(h);
								"brace" === f.type && (u && s(u) !== i && i--, f.line !== i && c.push({
									startLine: f.line,
									endLine: i,
									kind: void 0
								}))
							}
							break;
						case n.TokenType.Comment:
							var a = function(e) {
									return "#region" === e ? {
										line: t(h),
										type: "comment",
										isStart: !0
									} : {
										line: s(h),
										type: "comment",
										isStart: !1
									}
								},
								m = function(t) {
									var n = t.text.match(/^\s*\/\*\s*(#region|#endregion)\b\s*(.*?)\s*\*\//);
									if (n) return a(n[1]);
									if ("scss" === e.languageId || "less" === e.languageId) {
										var r = t.text.match(/^\s*\/\/\s*(#region|#endregion)\b\s*(.*?)\s*/);
										if (r) return a(r[1])
									}
									return null
								}(h);
							if (m)
								if (m.isStart) d.push(m);
								else {
									var f;
									if (!(f = o(d, "comment"))) break;
									"comment" === f.type && f.line !== m.line && c.push({
										startLine: f.line,
										endLine: m.line,
										kind: "region"
									})
								}
							else {
								var g = l(h, "comment");
								g && c.push(g)
							}
					}
					u = h, h = p.scan()
				};
			for (; h.type !== n.TokenType.EOF;) m();
			return c
		}(e), t)
	}
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/data/webCustomData", ["require",
		"exports"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.cssData = void 0, t.cssData = {
		version: 1.1,
		properties: [{
			name: "additive-symbols",
			browsers: ["FF33"],
			syntax: "[ <integer> && <symbol> ]#",
			relevance: 50,
			description: "@counter-style descriptor. Specifies the symbols used by the marker-construction algorithm specified by the system descriptor. Needs to be specified if the counter system is 'additive'.",
			restrictions: ["integer", "string", "image", "identifier"]
		}, {
			name: "align-content",
			values: [{
				name: "center",
				description: "Lines are packed toward the center of the flex container."
			}, {
				name: "flex-end",
				description: "Lines are packed toward the end of the flex container."
			}, {
				name: "flex-start",
				description: "Lines are packed toward the start of the flex container."
			}, {
				name: "space-around",
				description: "Lines are evenly distributed in the flex container, with half-size spaces on either end."
			}, {
				name: "space-between",
				description: "Lines are evenly distributed in the flex container."
			}, {
				name: "stretch",
				description: "Lines stretch to take up the remaining space."
			}],
			syntax: "normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>",
			relevance: 60,
			description: "Aligns a flex container’s lines within the flex container when there is extra space in the cross-axis, similar to how 'justify-content' aligns individual items within the main-axis.",
			restrictions: ["enum"]
		}, {
			name: "align-items",
			values: [{
				name: "baseline",
				description: "If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment."
			}, {
				name: "center",
				description: "The flex item’s margin box is centered in the cross axis within the line."
			}, {
				name: "flex-end",
				description: "The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line."
			}, {
				name: "flex-start",
				description: "The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line."
			}, {
				name: "stretch",
				description: "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched."
			}],
			syntax: "normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]",
			relevance: 84,
			description: "Aligns flex items along the cross axis of the current line of the flex container.",
			restrictions: ["enum"]
		}, {
			name: "justify-items",
			values: [{
				name: "auto"
			}, {
				name: "normal"
			}, {
				name: "end"
			}, {
				name: "start"
			}, {
				name: "flex-end",
				description: '"Flex items are packed toward the end of the line."'
			}, {
				name: "flex-start",
				description: '"Flex items are packed toward the start of the line."'
			}, {
				name: "self-end",
				description: "The item is packed flush to the edge of the alignment container of the end side of the item, in the appropriate axis."
			}, {
				name: "self-start",
				description: "The item is packed flush to the edge of the alignment container of the start side of the item, in the appropriate axis.."
			}, {
				name: "center",
				description: "The items are packed flush to each other toward the center of the of the alignment container."
			}, {
				name: "left"
			}, {
				name: "right"
			}, {
				name: "baseline"
			}, {
				name: "first baseline"
			}, {
				name: "last baseline"
			}, {
				name: "stretch",
				description: "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched."
			}, {
				name: "save"
			}, {
				name: "unsave"
			}, {
				name: "legacy"
			}],
			syntax: "normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]",
			relevance: 51,
			description: "Defines the default justify-self for all items of the box, giving them the default way of justifying each box along the appropriate axis",
			restrictions: ["enum"]
		}, {
			name: "justify-self",
			values: [{
				name: "auto"
			}, {
				name: "normal"
			}, {
				name: "end"
			}, {
				name: "start"
			}, {
				name: "flex-end",
				description: '"Flex items are packed toward the end of the line."'
			}, {
				name: "flex-start",
				description: '"Flex items are packed toward the start of the line."'
			}, {
				name: "self-end",
				description: "The item is packed flush to the edge of the alignment container of the end side of the item, in the appropriate axis."
			}, {
				name: "self-start",
				description: "The item is packed flush to the edge of the alignment container of the start side of the item, in the appropriate axis.."
			}, {
				name: "center",
				description: "The items are packed flush to each other toward the center of the of the alignment container."
			}, {
				name: "left"
			}, {
				name: "right"
			}, {
				name: "baseline"
			}, {
				name: "first baseline"
			}, {
				name: "last baseline"
			}, {
				name: "stretch",
				description: "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched."
			}, {
				name: "save"
			}, {
				name: "unsave"
			}],
			syntax: "auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]",
			relevance: 52,
			description: "Defines the way of justifying a box inside its container along the appropriate axis.",
			restrictions: ["enum"]
		}, {
			name: "align-self",
			values: [{
				name: "auto",
				description: "Computes to the value of 'align-items' on the element’s parent, or 'stretch' if the element has no parent. On absolutely positioned elements, it computes to itself."
			}, {
				name: "baseline",
				description: "If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment."
			}, {
				name: "center",
				description: "The flex item’s margin box is centered in the cross axis within the line."
			}, {
				name: "flex-end",
				description: "The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line."
			}, {
				name: "flex-start",
				description: "The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line."
			}, {
				name: "stretch",
				description: "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched."
			}],
			syntax: "auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>",
			relevance: 71,
			description: "Allows the default alignment along the cross axis to be overridden for individual flex items.",
			restrictions: ["enum"]
		}, {
			name: "all",
			browsers: ["E79", "FF27", "S9.1", "C37", "O24"],
			values: [],
			syntax: "initial | inherit | unset | revert",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/all"
			}],
			description: "Shorthand that resets all properties except 'direction' and 'unicode-bidi'.",
			restrictions: ["enum"]
		}, {
			name: "alt",
			browsers: ["S9"],
			values: [],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/alt"
			}],
			description: "Provides alternative text for assistive technology to replace the generated content of a ::before or ::after element.",
			restrictions: ["string", "enum"]
		}, {
			name: "animation",
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}, {
				name: "none",
				description: "No animation is performed"
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			syntax: "<single-animation>#",
			relevance: 81,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation"
			}],
			description: "Shorthand property combines six of the animation properties into a single property.",
			restrictions: ["time", "timing-function", "enum", "identifier", "number"]
		}, {
			name: "animation-delay",
			syntax: "<time>#",
			relevance: 63,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-delay"
			}],
			description: "Defines when the animation will start.",
			restrictions: ["time"]
		}, {
			name: "animation-direction",
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			syntax: "<single-animation-direction>#",
			relevance: 56,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-direction"
			}],
			description: "Defines whether or not the animation should play in reverse on alternate cycles.",
			restrictions: ["enum"]
		}, {
			name: "animation-duration",
			syntax: "<time>#",
			relevance: 67,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-duration"
			}],
			description: "Defines the length of time that an animation takes to complete one cycle.",
			restrictions: ["time"]
		}, {
			name: "animation-fill-mode",
			values: [{
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "none",
				description: "There is no change to the property value between the time the animation is applied and the time the animation begins playing or after the animation completes."
			}],
			syntax: "<single-animation-fill-mode>#",
			relevance: 63,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode"
			}],
			description: "Defines what values are applied by the animation outside the time it is executing.",
			restrictions: ["enum"]
		}, {
			name: "animation-iteration-count",
			values: [{
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}],
			syntax: "<single-animation-iteration-count>#",
			relevance: 60,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count"
			}],
			description: "Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.",
			restrictions: ["number", "enum"]
		}, {
			name: "animation-name",
			values: [{
				name: "none",
				description: "No animation is performed"
			}],
			syntax: "[ none | <keyframes-name> ]#",
			relevance: 67,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-name"
			}],
			description: "Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.",
			restrictions: ["identifier", "enum"]
		}, {
			name: "animation-play-state",
			values: [{
				name: "paused",
				description: "A running animation will be paused."
			}, {
				name: "running",
				description: "Resume playback of a paused animation."
			}],
			syntax: "<single-animation-play-state>#",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-play-state"
			}],
			description: "Defines whether the animation is running or paused.",
			restrictions: ["enum"]
		}, {
			name: "animation-timing-function",
			syntax: "<easing-function>#",
			relevance: 69,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/animation-timing-function"
			}],
			description: "Describes how the animation will progress over one cycle of its duration.",
			restrictions: ["timing-function"]
		}, {
			name: "backface-visibility",
			values: [{
				name: "hidden",
				description: "Back side is hidden."
			}, {
				name: "visible",
				description: "Back side is visible."
			}],
			syntax: "visible | hidden",
			relevance: 59,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/backface-visibility"
			}],
			description: "Determines whether or not the 'back' side of a transformed element is visible when facing the viewer. With an identity transform, the front side of an element faces the viewer.",
			restrictions: ["enum"]
		}, {
			name: "background",
			values: [{
				name: "fixed",
				description: "The background is fixed with regard to the viewport. In paged media where there is no viewport, a 'fixed' background is fixed with respect to the page box and therefore replicated on every page."
			}, {
				name: "local",
				description: "The background is fixed with regard to the element's contents: if the element has a scrolling mechanism, the background scrolls with the element's contents."
			}, {
				name: "none",
				description: "A value of 'none' counts as an image layer but draws nothing."
			}, {
				name: "scroll",
				description: "The background is fixed with regard to the element itself and does not scroll with its contents. (It is effectively attached to the element's border.)"
			}],
			syntax: "[ <bg-layer> , ]* <final-bg-layer>",
			relevance: 93,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background"
			}],
			description: "Shorthand property for setting most background properties at the same place in the style sheet.",
			restrictions: ["enum", "image", "color", "position", "length", "repeat", "percentage", "box"]
		}, {
			name: "background-attachment",
			values: [{
				name: "fixed",
				description: "The background is fixed with regard to the viewport. In paged media where there is no viewport, a 'fixed' background is fixed with respect to the page box and therefore replicated on every page."
			}, {
				name: "local",
				description: "The background is fixed with regard to the element’s contents: if the element has a scrolling mechanism, the background scrolls with the element’s contents."
			}, {
				name: "scroll",
				description: "The background is fixed with regard to the element itself and does not scroll with its contents. (It is effectively attached to the element’s border.)"
			}],
			syntax: "<attachment>#",
			relevance: 54,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-attachment"
			}],
			description: "Specifies whether the background images are fixed with regard to the viewport ('fixed') or scroll along with the element ('scroll') or its contents ('local').",
			restrictions: ["enum"]
		}, {
			name: "background-blend-mode",
			browsers: ["E79", "FF30", "S8", "C35", "O22"],
			values: [{
				name: "normal",
				description: "Default attribute which specifies no blending"
			}, {
				name: "multiply",
				description: "The source color is multiplied by the destination color and replaces the destination."
			}, {
				name: "screen",
				description: "Multiplies the complements of the backdrop and source color values, then complements the result."
			}, {
				name: "overlay",
				description: "Multiplies or screens the colors, depending on the backdrop color value."
			}, {
				name: "darken",
				description: "Selects the darker of the backdrop and source colors."
			}, {
				name: "lighten",
				description: "Selects the lighter of the backdrop and source colors."
			}, {
				name: "color-dodge",
				description: "Brightens the backdrop color to reflect the source color."
			}, {
				name: "color-burn",
				description: "Darkens the backdrop color to reflect the source color."
			}, {
				name: "hard-light",
				description: "Multiplies or screens the colors, depending on the source color value."
			}, {
				name: "soft-light",
				description: "Darkens or lightens the colors, depending on the source color value."
			}, {
				name: "difference",
				description: "Subtracts the darker of the two constituent colors from the lighter color.."
			}, {
				name: "exclusion",
				description: "Produces an effect similar to that of the Difference mode but lower in contrast."
			}, {
				name: "hue",
				browsers: ["E79", "FF30", "S8", "C35", "O22"],
				description: "Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color."
			}, {
				name: "saturation",
				browsers: ["E79", "FF30", "S8", "C35", "O22"],
				description: "Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color."
			}, {
				name: "color",
				browsers: ["E79", "FF30", "S8", "C35", "O22"],
				description: "Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color."
			}, {
				name: "luminosity",
				browsers: ["E79", "FF30", "S8", "C35", "O22"],
				description: "Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color."
			}],
			syntax: "<blend-mode>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-blend-mode"
			}],
			description: "Defines the blending mode of each background layer.",
			restrictions: ["enum"]
		}, {
			name: "background-clip",
			syntax: "<box>#",
			relevance: 68,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-clip"
			}],
			description: "Determines the background painting area.",
			restrictions: ["box"]
		}, {
			name: "background-color",
			syntax: "<color>",
			relevance: 94,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-color"
			}],
			description: "Sets the background color of an element.",
			restrictions: ["color"]
		}, {
			name: "background-image",
			values: [{
				name: "none",
				description: "Counts as an image layer but draws nothing."
			}],
			syntax: "<bg-image>#",
			relevance: 89,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-image"
			}],
			description: "Sets the background image(s) of an element.",
			restrictions: ["image", "enum"]
		}, {
			name: "background-origin",
			syntax: "<box>#",
			relevance: 54,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-origin"
			}],
			description: "For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).",
			restrictions: ["box"]
		}, {
			name: "background-position",
			syntax: "<bg-position>#",
			relevance: 88,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-position"
			}],
			description: "Specifies the initial position of the background image(s) (after any resizing) within their corresponding background positioning area.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "background-position-x",
			values: [{
				name: "center",
				description: "Equivalent to '50%' ('left 50%') for the horizontal position if the horizontal position is not otherwise specified, or '50%' ('top 50%') for the vertical position if it is."
			}, {
				name: "left",
				description: "Equivalent to '0%' for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset."
			}, {
				name: "right",
				description: "Equivalent to '100%' for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset."
			}],
			status: "experimental",
			syntax: "[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#",
			relevance: 54,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-position-x"
			}],
			description: "If background images have been specified, this property specifies their initial position (after any resizing) within their corresponding background positioning area.",
			restrictions: ["length", "percentage"]
		}, {
			name: "background-position-y",
			values: [{
				name: "bottom",
				description: "Equivalent to '100%' for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset."
			}, {
				name: "center",
				description: "Equivalent to '50%' ('left 50%') for the horizontal position if the horizontal position is not otherwise specified, or '50%' ('top 50%') for the vertical position if it is."
			}, {
				name: "top",
				description: "Equivalent to '0%' for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset."
			}],
			status: "experimental",
			syntax: "[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-position-y"
			}],
			description: "If background images have been specified, this property specifies their initial position (after any resizing) within their corresponding background positioning area.",
			restrictions: ["length", "percentage"]
		}, {
			name: "background-repeat",
			values: [],
			syntax: "<repeat-style>#",
			relevance: 86,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-repeat"
			}],
			description: "Specifies how background images are tiled after they have been sized and positioned.",
			restrictions: ["repeat"]
		}, {
			name: "background-size",
			values: [{
				name: "auto",
				description: "Resolved by using the image’s intrinsic ratio and the size of the other dimension, or failing that, using the image’s intrinsic size, or failing that, treating it as 100%."
			}, {
				name: "contain",
				description: "Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area."
			}, {
				name: "cover",
				description: "Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area."
			}],
			syntax: "<bg-size>#",
			relevance: 86,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/background-size"
			}],
			description: "Specifies the size of the background images.",
			restrictions: ["length", "percentage"]
		}, {
			name: "behavior",
			browsers: ["IE6"],
			relevance: 50,
			description: "IE only. Used to extend behaviors of the browser.",
			restrictions: ["url"]
		}, {
			name: "block-size",
			browsers: ["E79", "FF41", "S12.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "Depends on the values of other properties."
			}],
			syntax: "<'width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/block-size"
			}],
			description: "Logical 'width'. Mapping depends on the element’s 'writing-mode'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "border",
			syntax: "<line-width> || <line-style> || <color>",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border"
			}],
			description: "Shorthand property for setting border width, style, and color.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-block-end",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'> || <'border-top-style'> || <color>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end"
			}],
			description: "Logical 'border-bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-block-start",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'> || <'border-top-style'> || <color>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start"
			}],
			description: "Logical 'border-top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-block-end-color",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-color'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-color"
			}],
			description: "Logical 'border-bottom-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["color"]
		}, {
			name: "border-block-start-color",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-color'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-color"
			}],
			description: "Logical 'border-top-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["color"]
		}, {
			name: "border-block-end-style",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-style'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-style"
			}],
			description: "Logical 'border-bottom-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["line-style"]
		}, {
			name: "border-block-start-style",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-style'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-style"
			}],
			description: "Logical 'border-top-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["line-style"]
		}, {
			name: "border-block-end-width",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-width"
			}],
			description: "Logical 'border-bottom-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-block-start-width",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-width"
			}],
			description: "Logical 'border-top-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-bottom",
			syntax: "<line-width> || <line-style> || <color>",
			relevance: 89,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom"
			}],
			description: "Shorthand property for setting border width, style and color.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-bottom-color",
			syntax: "<'border-top-color'>",
			relevance: 72,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-color"
			}],
			description: "Sets the color of the bottom border.",
			restrictions: ["color"]
		}, {
			name: "border-bottom-left-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 75,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius"
			}],
			description: "Defines the radii of the bottom left outer border edge.",
			restrictions: ["length", "percentage"]
		}, {
			name: "border-bottom-right-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 75,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius"
			}],
			description: "Defines the radii of the bottom right outer border edge.",
			restrictions: ["length", "percentage"]
		}, {
			name: "border-bottom-style",
			syntax: "<line-style>",
			relevance: 59,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-style"
			}],
			description: "Sets the style of the bottom border.",
			restrictions: ["line-style"]
		}, {
			name: "border-bottom-width",
			syntax: "<line-width>",
			relevance: 62,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-width"
			}],
			description: "Sets the thickness of the bottom border.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-collapse",
			values: [{
				name: "collapse",
				description: "Selects the collapsing borders model."
			}, {
				name: "separate",
				description: "Selects the separated borders border model."
			}],
			syntax: "collapse | separate",
			relevance: 76,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-collapse"
			}],
			description: "Selects a table's border model.",
			restrictions: ["enum"]
		}, {
			name: "border-color",
			values: [],
			syntax: "<color>{1,4}",
			relevance: 87,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-color"
			}],
			description: "The color of the border around all four edges of an element.",
			restrictions: ["color"]
		}, {
			name: "border-image",
			values: [{
				name: "auto",
				description: "If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead."
			}, {
				name: "fill",
				description: "Causes the middle part of the border-image to be preserved."
			}, {
				name: "none",
				description: "Use the border styles."
			}, {
				name: "repeat",
				description: "The image is tiled (repeated) to fill the area."
			}, {
				name: "round",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does."
			}, {
				name: "space",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles."
			}, {
				name: "stretch",
				description: "The image is stretched to fill the area."
			}, {
				name: "url()"
			}],
			syntax: "<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-image"
			}],
			description: "Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.",
			restrictions: ["length", "percentage", "number", "url", "enum"]
		}, {
			name: "border-image-outset",
			syntax: "[ <length> | <number> ]{1,4}",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-image-outset"
			}],
			description: "The values specify the amount by which the border image area extends beyond the border box on the top, right, bottom, and left sides respectively. If the fourth value is absent, it is the same as the second. If the third one is also absent, it is the same as the first. If the second one is also absent, it is the same as the first. Numbers represent multiples of the corresponding border-width.",
			restrictions: ["length", "number"]
		}, {
			name: "border-image-repeat",
			values: [{
				name: "repeat",
				description: "The image is tiled (repeated) to fill the area."
			}, {
				name: "round",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does."
			}, {
				name: "space",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles."
			}, {
				name: "stretch",
				description: "The image is stretched to fill the area."
			}],
			syntax: "[ stretch | repeat | round | space ]{1,2}",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-image-repeat"
			}],
			description: "Specifies how the images for the sides and the middle part of the border image are scaled and tiled. If the second keyword is absent, it is assumed to be the same as the first.",
			restrictions: ["enum"]
		}, {
			name: "border-image-slice",
			values: [{
				name: "fill",
				description: "Causes the middle part of the border-image to be preserved."
			}],
			syntax: "<number-percentage>{1,4} && fill?",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-image-slice"
			}],
			description: "Specifies inward offsets from the top, right, bottom, and left edges of the image, dividing it into nine regions: four corners, four edges and a middle.",
			restrictions: ["number", "percentage"]
		}, {
			name: "border-image-source",
			values: [{
				name: "none",
				description: "Use the border styles."
			}],
			syntax: "none | <image>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-image-source"
			}],
			description: "Specifies an image to use instead of the border styles given by the 'border-style' properties and as an additional background layer for the element. If the value is 'none' or if the image cannot be displayed, the border styles will be used.",
			restrictions: ["image"]
		}, {
			name: "border-image-width",
			values: [{
				name: "auto",
				description: "The border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead."
			}],
			syntax: "[ <length-percentage> | <number> | auto ]{1,4}",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-image-width"
			}],
			description: "The four values of 'border-image-width' specify offsets that are used to divide the border image area into nine parts. They represent inward distances from the top, right, bottom, and left sides of the area, respectively.",
			restrictions: ["length", "percentage", "number"]
		}, {
			name: "border-inline-end",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'> || <'border-top-style'> || <color>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end"
			}],
			description: "Logical 'border-right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-inline-start",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'> || <'border-top-style'> || <color>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start"
			}],
			description: "Logical 'border-left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-inline-end-color",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-color'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color"
			}],
			description: "Logical 'border-right-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["color"]
		}, {
			name: "border-inline-start-color",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-color'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color"
			}],
			description: "Logical 'border-left-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["color"]
		}, {
			name: "border-inline-end-style",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-style'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style"
			}],
			description: "Logical 'border-right-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["line-style"]
		}, {
			name: "border-inline-start-style",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-style'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style"
			}],
			description: "Logical 'border-left-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["line-style"]
		}, {
			name: "border-inline-end-width",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width"
			}],
			description: "Logical 'border-right-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-inline-start-width",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'border-top-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width"
			}],
			description: "Logical 'border-left-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-left",
			syntax: "<line-width> || <line-style> || <color>",
			relevance: 83,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-left"
			}],
			description: "Shorthand property for setting border width, style and color",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-left-color",
			syntax: "<color>",
			relevance: 65,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-left-color"
			}],
			description: "Sets the color of the left border.",
			restrictions: ["color"]
		}, {
			name: "border-left-style",
			syntax: "<line-style>",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-left-style"
			}],
			description: "Sets the style of the left border.",
			restrictions: ["line-style"]
		}, {
			name: "border-left-width",
			syntax: "<line-width>",
			relevance: 58,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-left-width"
			}],
			description: "Sets the thickness of the left border.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-radius",
			syntax: "<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-radius"
			}],
			description: "Defines the radii of the outer border edge.",
			restrictions: ["length", "percentage"]
		}, {
			name: "border-right",
			syntax: "<line-width> || <line-style> || <color>",
			relevance: 81,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-right"
			}],
			description: "Shorthand property for setting border width, style and color",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-right-color",
			syntax: "<color>",
			relevance: 64,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-right-color"
			}],
			description: "Sets the color of the right border.",
			restrictions: ["color"]
		}, {
			name: "border-right-style",
			syntax: "<line-style>",
			relevance: 54,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-right-style"
			}],
			description: "Sets the style of the right border.",
			restrictions: ["line-style"]
		}, {
			name: "border-right-width",
			syntax: "<line-width>",
			relevance: 60,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-right-width"
			}],
			description: "Sets the thickness of the right border.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-spacing",
			syntax: "<length> <length>?",
			relevance: 68,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-spacing"
			}],
			description: "The lengths specify the distance that separates adjoining cell borders. If one length is specified, it gives both the horizontal and vertical spacing. If two are specified, the first gives the horizontal spacing and the second the vertical spacing. Lengths may not be negative.",
			restrictions: ["length"]
		}, {
			name: "border-style",
			values: [],
			syntax: "<line-style>{1,4}",
			relevance: 81,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-style"
			}],
			description: "The style of the border around edges of an element.",
			restrictions: ["line-style"]
		}, {
			name: "border-top",
			syntax: "<line-width> || <line-style> || <color>",
			relevance: 88,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-top"
			}],
			description: "Shorthand property for setting border width, style and color",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "border-top-color",
			syntax: "<color>",
			relevance: 72,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-top-color"
			}],
			description: "Sets the color of the top border.",
			restrictions: ["color"]
		}, {
			name: "border-top-left-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 75,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius"
			}],
			description: "Defines the radii of the top left outer border edge.",
			restrictions: ["length", "percentage"]
		}, {
			name: "border-top-right-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 74,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius"
			}],
			description: "Defines the radii of the top right outer border edge.",
			restrictions: ["length", "percentage"]
		}, {
			name: "border-top-style",
			syntax: "<line-style>",
			relevance: 59,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-top-style"
			}],
			description: "Sets the style of the top border.",
			restrictions: ["line-style"]
		}, {
			name: "border-top-width",
			syntax: "<line-width>",
			relevance: 62,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-top-width"
			}],
			description: "Sets the thickness of the top border.",
			restrictions: ["length", "line-width"]
		}, {
			name: "border-width",
			values: [],
			syntax: "<line-width>{1,4}",
			relevance: 82,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-width"
			}],
			description: "Shorthand that sets the four 'border-*-width' properties. If it has four values, they set top, right, bottom and left in that order. If left is missing, it is the same as right; if bottom is missing, it is the same as top; if right is missing, it is the same as top.",
			restrictions: ["length", "line-width"]
		}, {
			name: "bottom",
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 90,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/bottom"
			}],
			description: "Specifies how far an absolutely positioned box's bottom margin edge is offset above the bottom edge of the box's 'containing block'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "box-decoration-break",
			browsers: ["E79", "FF32", "S6.1", "C22", "O15"],
			values: [{
				name: "clone",
				description: "Each box is independently wrapped with the border and padding."
			}, {
				name: "slice",
				description: "The effect is as though the element were rendered with no breaks present, and then sliced by the breaks afterward."
			}],
			syntax: "slice | clone",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-decoration-break"
			}],
			description: "Specifies whether individual boxes are treated as broken pieces of one continuous box, or whether each box is individually wrapped with the border and padding.",
			restrictions: ["enum"]
		}, {
			name: "box-shadow",
			values: [{
				name: "inset",
				description: "Changes the drop shadow from an outer shadow (one that shadows the box onto the canvas, as if it were lifted above the canvas) to an inner shadow (one that shadows the canvas onto the box, as if the box were cut out of the canvas and shifted behind it)."
			}, {
				name: "none",
				description: "No shadow."
			}],
			syntax: "none | <shadow>#",
			relevance: 90,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-shadow"
			}],
			description: "Attaches one or more drop-shadows to the box. The property is a comma-separated list of shadows, each specified by 2-4 length values, an optional color, and an optional 'inset' keyword. Omitted lengths are 0; omitted colors are a user agent chosen color.",
			restrictions: ["length", "color", "enum"]
		}, {
			name: "box-sizing",
			values: [{
				name: "border-box",
				description: "The specified width and height (and respective min/max properties) on this element determine the border box of the element."
			}, {
				name: "content-box",
				description: "Behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element."
			}],
			syntax: "content-box | border-box",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-sizing"
			}],
			description: "Specifies the behavior of the 'width' and 'height' properties.",
			restrictions: ["enum"]
		}, {
			name: "break-after",
			values: [{
				name: "always",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page/column break before/after the principal box."
			}, {
				name: "avoid",
				description: "Avoid a break before/after the principal box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break before/after the principal box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break before/after the principal box."
			}, {
				name: "column",
				description: "Always force a column break before/after the principal box."
			}, {
				name: "left",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a left page."
			}, {
				name: "page",
				description: "Always force a page break before/after the principal box."
			}, {
				name: "right",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a right page."
			}],
			syntax: "auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region",
			relevance: 50,
			description: "Describes the page/column/region break behavior after the generated box.",
			restrictions: ["enum"]
		}, {
			name: "break-before",
			values: [{
				name: "always",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page/column break before/after the principal box."
			}, {
				name: "avoid",
				description: "Avoid a break before/after the principal box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break before/after the principal box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break before/after the principal box."
			}, {
				name: "column",
				description: "Always force a column break before/after the principal box."
			}, {
				name: "left",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a left page."
			}, {
				name: "page",
				description: "Always force a page break before/after the principal box."
			}, {
				name: "right",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a right page."
			}],
			syntax: "auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region",
			relevance: 50,
			description: "Describes the page/column/region break behavior before the generated box.",
			restrictions: ["enum"]
		}, {
			name: "break-inside",
			values: [{
				name: "auto",
				description: "Impose no additional breaking constraints within the box."
			}, {
				name: "avoid",
				description: "Avoid breaks within the box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break within the box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break within the box."
			}],
			syntax: "auto | avoid | avoid-page | avoid-column | avoid-region",
			relevance: 51,
			description: "Describes the page/column/region break behavior inside the principal box.",
			restrictions: ["enum"]
		}, {
			name: "caption-side",
			values: [{
				name: "bottom",
				description: "Positions the caption box below the table box."
			}, {
				name: "top",
				description: "Positions the caption box above the table box."
			}],
			syntax: "top | bottom | block-start | block-end | inline-start | inline-end",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/caption-side"
			}],
			description: "Specifies the position of the caption box with respect to the table box.",
			restrictions: ["enum"]
		}, {
			name: "caret-color",
			browsers: ["E79", "FF53", "S11.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The user agent selects an appropriate color for the caret. This is generally currentcolor, but the user agent may choose a different color to ensure good visibility and contrast with the surrounding content, taking into account the value of currentcolor, the background, shadows, and other factors."
			}],
			syntax: "auto | <color>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/caret-color"
			}],
			description: "Controls the color of the text insertion indicator.",
			restrictions: ["color", "enum"]
		}, {
			name: "clear",
			values: [{
				name: "both",
				description: "The clearance of the generated box is set to the amount necessary to place the top border edge below the bottom outer edge of any right-floating and left-floating boxes that resulted from elements earlier in the source document."
			}, {
				name: "left",
				description: "The clearance of the generated box is set to the amount necessary to place the top border edge below the bottom outer edge of any left-floating boxes that resulted from elements earlier in the source document."
			}, {
				name: "none",
				description: "No constraint on the box's position with respect to floats."
			}, {
				name: "right",
				description: "The clearance of the generated box is set to the amount necessary to place the top border edge below the bottom outer edge of any right-floating boxes that resulted from elements earlier in the source document."
			}],
			syntax: "none | left | right | both | inline-start | inline-end",
			relevance: 85,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/clear"
			}],
			description: "Indicates which sides of an element's box(es) may not be adjacent to an earlier floating box. The 'clear' property does not consider floats inside the element itself or in other block formatting contexts.",
			restrictions: ["enum"]
		}, {
			name: "clip",
			values: [{
				name: "auto",
				description: "The element does not clip."
			}, {
				name: "rect()",
				description: "Specifies offsets from the edges of the border box."
			}],
			syntax: "<shape> | auto",
			relevance: 74,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/clip"
			}],
			description: "Deprecated. Use the 'clip-path' property when support allows. Defines the visible portion of an element’s box.",
			restrictions: ["enum"]
		}, {
			name: "clip-path",
			values: [{
				name: "none",
				description: "No clipping path gets created."
			}, {
				name: "url()",
				description: "References a <clipPath> element to create a clipping path."
			}],
			syntax: "<clip-source> | [ <basic-shape> || <geometry-box> ] | none",
			relevance: 56,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/clip-path"
			}],
			description: "Specifies a clipping path where everything inside the path is visible and everything outside is clipped out.",
			restrictions: ["url", "shape", "geometry-box", "enum"]
		}, {
			name: "clip-rule",
			browsers: ["E", "C5", "FF3", "IE10", "O9", "S6"],
			values: [{
				name: "evenodd",
				description: "Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and counting the number of path segments from the given shape that the ray crosses."
			}, {
				name: "nonzero",
				description: "Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and then examining the places where a segment of the shape crosses the ray."
			}],
			relevance: 50,
			description: "Indicates the algorithm which is to be used to determine what parts of the canvas are included inside the shape.",
			restrictions: ["enum"]
		}, {
			name: "color",
			syntax: "<color>",
			relevance: 95,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/color"
			}],
			description: "Sets the color of an element's text",
			restrictions: ["color"]
		}, {
			name: "color-interpolation-filters",
			browsers: ["E", "C5", "FF3", "IE10", "O9", "S6"],
			values: [{
				name: "auto",
				description: "Color operations are not required to occur in a particular color space."
			}, {
				name: "linearRGB",
				description: "Color operations should occur in the linearized RGB color space."
			}, {
				name: "sRGB",
				description: "Color operations should occur in the sRGB color space."
			}],
			relevance: 50,
			description: "Specifies the color space for imaging operations performed via filter effects.",
			restrictions: ["enum"]
		}, {
			name: "column-count",
			values: [{
				name: "auto",
				description: "Determines the number of columns by the 'column-width' property and the element width."
			}],
			syntax: "<integer> | auto",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-count"
			}],
			description: "Describes the optimal number of columns into which the content of the element will be flowed.",
			restrictions: ["integer", "enum"]
		}, {
			name: "column-fill",
			values: [{
				name: "auto",
				description: "Fills columns sequentially."
			}, {
				name: "balance",
				description: "Balance content equally between columns, if possible."
			}],
			syntax: "auto | balance | balance-all",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-fill"
			}],
			description: "In continuous media, this property will only be consulted if the length of columns has been constrained. Otherwise, columns will automatically be balanced.",
			restrictions: ["enum"]
		}, {
			name: "column-gap",
			values: [{
				name: "normal",
				description: "User agent specific and typically equivalent to 1em."
			}],
			syntax: "normal | <length-percentage>",
			relevance: 53,
			description: "Sets the gap between columns. If there is a column rule between columns, it will appear in the middle of the gap.",
			restrictions: ["length", "enum"]
		}, {
			name: "column-rule",
			syntax: "<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-rule"
			}],
			description: "Shorthand for setting 'column-rule-width', 'column-rule-style', and 'column-rule-color' at the same place in the style sheet. Omitted values are set to their initial values.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "column-rule-color",
			syntax: "<color>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-color"
			}],
			description: "Sets the color of the column rule",
			restrictions: ["color"]
		}, {
			name: "column-rule-style",
			syntax: "<'border-style'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-style"
			}],
			description: "Sets the style of the rule between columns of an element.",
			restrictions: ["line-style"]
		}, {
			name: "column-rule-width",
			syntax: "<'border-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-width"
			}],
			description: "Sets the width of the rule between columns. Negative values are not allowed.",
			restrictions: ["length", "line-width"]
		}, {
			name: "columns",
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}],
			syntax: "<'column-width'> || <'column-count'>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/columns"
			}],
			description: "A shorthand property which sets both 'column-width' and 'column-count'.",
			restrictions: ["length", "integer", "enum"]
		}, {
			name: "column-span",
			values: [{
				name: "all",
				description: "The element spans across all columns. Content in the normal flow that appears before the element is automatically balanced across all columns before the element appear."
			}, {
				name: "none",
				description: "The element does not span multiple columns."
			}],
			syntax: "none | all",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-span"
			}],
			description: "Describes the page/column break behavior after the generated box.",
			restrictions: ["enum"]
		}, {
			name: "column-width",
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}],
			syntax: "<length> | auto",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/column-width"
			}],
			description: "Describes the width of columns in multicol elements.",
			restrictions: ["length", "enum"]
		}, {
			name: "contain",
			browsers: ["E79", "FF69", "C52", "O40"],
			values: [{
				name: "none",
				description: "Indicates that the property has no effect."
			}, {
				name: "strict",
				description: "Turns on all forms of containment for the element."
			}, {
				name: "content",
				description: "All containment rules except size are applied to the element."
			}, {
				name: "size",
				description: "For properties that can have effects on more than just an element and its descendants, those effects don't escape the containing element."
			}, {
				name: "layout",
				description: "Turns on layout containment for the element."
			}, {
				name: "style",
				description: "Turns on style containment for the element."
			}, {
				name: "paint",
				description: "Turns on paint containment for the element."
			}],
			syntax: "none | strict | content | [ size || layout || style || paint ]",
			relevance: 55,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/contain"
			}],
			description: "Indicates that an element and its contents are, as much as possible, independent of the rest of the document tree.",
			restrictions: ["enum"]
		}, {
			name: "content",
			values: [{
				name: "attr()",
				description: "The attr(n) function returns as a string the value of attribute n for the subject of the selector."
			}, {
				name: "counter(name)",
				description: "Counters are denoted by identifiers (see the 'counter-increment' and 'counter-reset' properties)."
			}, {
				name: "icon",
				description: "The (pseudo-)element is replaced in its entirety by the resource referenced by its 'icon' property, and treated as a replaced element."
			}, {
				name: "none",
				description: "On elements, this inhibits the children of the element from being rendered as children of this element, as if the element was empty. On pseudo-elements it causes the pseudo-element to have no content."
			}, {
				name: "normal",
				description: "See http://www.w3.org/TR/css3-content/#content for computation rules."
			}, {
				name: "url()"
			}],
			syntax: "normal | none | [ <content-replacement> | <content-list> ] [/ <string> ]?",
			relevance: 90,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/content"
			}],
			description: "Determines which page-based occurrence of a given element is applied to a counter or string value.",
			restrictions: ["string", "url"]
		}, {
			name: "counter-increment",
			values: [{
				name: "none",
				description: "This element does not alter the value of any counters."
			}],
			syntax: "[ <custom-ident> <integer>? ]+ | none",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/counter-increment"
			}],
			description: "Manipulate the value of existing counters.",
			restrictions: ["identifier", "integer"]
		}, {
			name: "counter-reset",
			values: [{
				name: "none",
				description: "The counter is not modified."
			}],
			syntax: "[ <custom-ident> <integer>? ]+ | none",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/counter-reset"
			}],
			description: "Property accepts one or more names of counters (identifiers), each one optionally followed by an integer. The integer gives the value that the counter is set to on each occurrence of the element.",
			restrictions: ["identifier", "integer"]
		}, {
			name: "cursor",
			values: [{
				name: "alias",
				description: "Indicates an alias of/shortcut to something is to be created. Often rendered as an arrow with a small curved arrow next to it."
			}, {
				name: "all-scroll",
				description: "Indicates that the something can be scrolled in any direction. Often rendered as arrows pointing up, down, left, and right with a dot in the middle."
			}, {
				name: "auto",
				description: "The UA determines the cursor to display based on the current context."
			}, {
				name: "cell",
				description: "Indicates that a cell or set of cells may be selected. Often rendered as a thick plus-sign with a dot in the middle."
			}, {
				name: "col-resize",
				description: "Indicates that the item/column can be resized horizontally. Often rendered as arrows pointing left and right with a vertical bar separating them."
			}, {
				name: "context-menu",
				description: "A context menu is available for the object under the cursor. Often rendered as an arrow with a small menu-like graphic next to it."
			}, {
				name: "copy",
				description: "Indicates something is to be copied. Often rendered as an arrow with a small plus sign next to it."
			}, {
				name: "crosshair",
				description: "A simple crosshair (e.g., short line segments resembling a '+' sign). Often used to indicate a two dimensional bitmap selection mode."
			}, {
				name: "default",
				description: "The platform-dependent default cursor. Often rendered as an arrow."
			}, {
				name: "e-resize",
				description: "Indicates that east edge is to be moved."
			}, {
				name: "ew-resize",
				description: "Indicates a bidirectional east-west resize cursor."
			}, {
				name: "grab",
				description: "Indicates that something can be grabbed."
			}, {
				name: "grabbing",
				description: "Indicates that something is being grabbed."
			}, {
				name: "help",
				description: "Help is available for the object under the cursor. Often rendered as a question mark or a balloon."
			}, {
				name: "move",
				description: "Indicates something is to be moved."
			}, {
				name: "-moz-grab",
				description: "Indicates that something can be grabbed."
			}, {
				name: "-moz-grabbing",
				description: "Indicates that something is being grabbed."
			}, {
				name: "-moz-zoom-in",
				description: "Indicates that something can be zoomed (magnified) in."
			}, {
				name: "-moz-zoom-out",
				description: "Indicates that something can be zoomed (magnified) out."
			}, {
				name: "ne-resize",
				description: "Indicates that movement starts from north-east corner."
			}, {
				name: "nesw-resize",
				description: "Indicates a bidirectional north-east/south-west cursor."
			}, {
				name: "no-drop",
				description: "Indicates that the dragged item cannot be dropped at the current cursor location. Often rendered as a hand or pointer with a small circle with a line through it."
			}, {
				name: "none",
				description: "No cursor is rendered for the element."
			}, {
				name: "not-allowed",
				description: "Indicates that the requested action will not be carried out. Often rendered as a circle with a line through it."
			}, {
				name: "n-resize",
				description: "Indicates that north edge is to be moved."
			}, {
				name: "ns-resize",
				description: "Indicates a bidirectional north-south cursor."
			}, {
				name: "nw-resize",
				description: "Indicates that movement starts from north-west corner."
			}, {
				name: "nwse-resize",
				description: "Indicates a bidirectional north-west/south-east cursor."
			}, {
				name: "pointer",
				description: "The cursor is a pointer that indicates a link."
			}, {
				name: "progress",
				description: "A progress indicator. The program is performing some processing, but is different from 'wait' in that the user may still interact with the program. Often rendered as a spinning beach ball, or an arrow with a watch or hourglass."
			}, {
				name: "row-resize",
				description: "Indicates that the item/row can be resized vertically. Often rendered as arrows pointing up and down with a horizontal bar separating them."
			}, {
				name: "se-resize",
				description: "Indicates that movement starts from south-east corner."
			}, {
				name: "s-resize",
				description: "Indicates that south edge is to be moved."
			}, {
				name: "sw-resize",
				description: "Indicates that movement starts from south-west corner."
			}, {
				name: "text",
				description: "Indicates text that may be selected. Often rendered as a vertical I-beam."
			}, {
				name: "vertical-text",
				description: "Indicates vertical-text that may be selected. Often rendered as a horizontal I-beam."
			}, {
				name: "wait",
				description: "Indicates that the program is busy and the user should wait. Often rendered as a watch or hourglass."
			}, {
				name: "-webkit-grab",
				description: "Indicates that something can be grabbed."
			}, {
				name: "-webkit-grabbing",
				description: "Indicates that something is being grabbed."
			}, {
				name: "-webkit-zoom-in",
				description: "Indicates that something can be zoomed (magnified) in."
			}, {
				name: "-webkit-zoom-out",
				description: "Indicates that something can be zoomed (magnified) out."
			}, {
				name: "w-resize",
				description: "Indicates that west edge is to be moved."
			}, {
				name: "zoom-in",
				description: "Indicates that something can be zoomed (magnified) in."
			}, {
				name: "zoom-out",
				description: "Indicates that something can be zoomed (magnified) out."
			}],
			syntax: "[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/cursor"
			}],
			description: "Allows control over cursor appearance in an element",
			restrictions: ["url", "number", "enum"]
		}, {
			name: "direction",
			values: [{
				name: "ltr",
				description: "Left-to-right direction."
			}, {
				name: "rtl",
				description: "Right-to-left direction."
			}],
			syntax: "ltr | rtl",
			relevance: 69,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/direction"
			}],
			description: "Specifies the inline base direction or directionality of any bidi paragraph, embedding, isolate, or override established by the box. Note: for HTML content use the 'dir' attribute and 'bdo' element rather than this property.",
			restrictions: ["enum"]
		}, {
			name: "display",
			values: [{
				name: "block",
				description: "The element generates a block-level box"
			}, {
				name: "contents",
				description: "The element itself does not generate any boxes, but its children and pseudo-elements still generate boxes as normal."
			}, {
				name: "flex",
				description: "The element generates a principal flex container box and establishes a flex formatting context."
			}, {
				name: "flexbox",
				description: "The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'."
			}, {
				name: "flow-root",
				description: "The element generates a block container box, and lays out its contents using flow layout."
			}, {
				name: "grid",
				description: "The element generates a principal grid container box, and establishes a grid formatting context."
			}, {
				name: "inline",
				description: "The element generates an inline-level box."
			}, {
				name: "inline-block",
				description: "A block box, which itself is flowed as a single inline box, similar to a replaced element. The inside of an inline-block is formatted as a block box, and the box itself is formatted as an inline box."
			}, {
				name: "inline-flex",
				description: "Inline-level flex container."
			}, {
				name: "inline-flexbox",
				description: "Inline-level flex container. Standardized as 'inline-flex'"
			}, {
				name: "inline-table",
				description: "Inline-level table wrapper box containing table box."
			}, {
				name: "list-item",
				description: "One or more block boxes and one marker box."
			}, {
				name: "-moz-box",
				description: "The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'."
			}, {
				name: "-moz-deck"
			}, {
				name: "-moz-grid"
			}, {
				name: "-moz-grid-group"
			}, {
				name: "-moz-grid-line"
			}, {
				name: "-moz-groupbox"
			}, {
				name: "-moz-inline-box",
				description: "Inline-level flex container. Standardized as 'inline-flex'"
			}, {
				name: "-moz-inline-grid"
			}, {
				name: "-moz-inline-stack"
			}, {
				name: "-moz-marker"
			}, {
				name: "-moz-popup"
			}, {
				name: "-moz-stack"
			}, {
				name: "-ms-flexbox",
				description: "The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'."
			}, {
				name: "-ms-grid",
				description: "The element generates a principal grid container box, and establishes a grid formatting context."
			}, {
				name: "-ms-inline-flexbox",
				description: "Inline-level flex container. Standardized as 'inline-flex'"
			}, {
				name: "-ms-inline-grid",
				description: "Inline-level grid container."
			}, {
				name: "none",
				description: "The element and its descendants generates no boxes."
			}, {
				name: "ruby",
				description: "The element generates a principal ruby container box, and establishes a ruby formatting context."
			}, {
				name: "ruby-base"
			}, {
				name: "ruby-base-container"
			}, {
				name: "ruby-text"
			}, {
				name: "ruby-text-container"
			}, {
				name: "run-in",
				description: "The element generates a run-in box. Run-in elements act like inlines or blocks, depending on the surrounding elements."
			}, {
				name: "table",
				description: "The element generates a principal table wrapper box containing an additionally-generated table box, and establishes a table formatting context."
			}, {
				name: "table-caption"
			}, {
				name: "table-cell"
			}, {
				name: "table-column"
			}, {
				name: "table-column-group"
			}, {
				name: "table-footer-group"
			}, {
				name: "table-header-group"
			}, {
				name: "table-row"
			}, {
				name: "table-row-group"
			}, {
				name: "-webkit-box",
				description: "The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'."
			}, {
				name: "-webkit-flex",
				description: "The element lays out its contents using flow layout (block-and-inline layout)."
			}, {
				name: "-webkit-inline-box",
				description: "Inline-level flex container. Standardized as 'inline-flex'"
			}, {
				name: "-webkit-inline-flex",
				description: "Inline-level flex container."
			}],
			syntax: "[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/display"
			}],
			description: "In combination with 'float' and 'position', determines the type of box or boxes that are generated for an element.",
			restrictions: ["enum"]
		}, {
			name: "empty-cells",
			values: [{
				name: "hide",
				description: "No borders or backgrounds are drawn around/behind empty cells."
			}, {
				name: "-moz-show-background"
			}, {
				name: "show",
				description: "Borders and backgrounds are drawn around/behind empty cells (like normal cells)."
			}],
			syntax: "show | hide",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/empty-cells"
			}],
			description: "In the separated borders model, this property controls the rendering of borders and backgrounds around cells that have no visible content.",
			restrictions: ["enum"]
		}, {
			name: "enable-background",
			values: [{
				name: "accumulate",
				description: "If the ancestor container element has a property of new, then all graphics elements within the current container are rendered both on the parent's background image and onto the target."
			}, {
				name: "new",
				description: "Create a new background image canvas. All children of the current container element can access the background, and they will be rendered onto both the parent's background image canvas in addition to the target device."
			}],
			relevance: 50,
			description: "Deprecated. Use 'isolation' property instead when support allows. Specifies how the accumulation of the background image is managed.",
			restrictions: ["integer", "length", "percentage", "enum"]
		}, {
			name: "fallback",
			browsers: ["FF33"],
			syntax: "<counter-style-name>",
			relevance: 50,
			description: "@counter-style descriptor. Specifies a fallback counter style to be used when the current counter style can’t create a representation for a given counter value.",
			restrictions: ["identifier"]
		}, {
			name: "fill",
			values: [{
				name: "url()",
				description: "A URL reference to a paint server element, which is an element that defines a paint server: ‘hatch’, ‘linearGradient’, ‘mesh’, ‘pattern’, ‘radialGradient’ and ‘solidcolor’."
			}, {
				name: "none",
				description: "No paint is applied in this layer."
			}],
			relevance: 76,
			description: "Paints the interior of the given graphical element.",
			restrictions: ["color", "enum", "url"]
		}, {
			name: "fill-opacity",
			relevance: 52,
			description: "Specifies the opacity of the painting operation used to paint the interior the current object.",
			restrictions: ["number(0-1)"]
		}, {
			name: "fill-rule",
			values: [{
				name: "evenodd",
				description: "Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and counting the number of path segments from the given shape that the ray crosses."
			}, {
				name: "nonzero",
				description: "Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and then examining the places where a segment of the shape crosses the ray."
			}],
			relevance: 50,
			description: "Indicates the algorithm (or winding rule) which is to be used to determine what parts of the canvas are included inside the shape.",
			restrictions: ["enum"]
		}, {
			name: "filter",
			browsers: ["E12", "FF35", "S9.1", "C53", "O40"],
			values: [{
				name: "none",
				description: "No filter effects are applied."
			}, {
				name: "blur()",
				description: "Applies a Gaussian blur to the input image."
			}, {
				name: "brightness()",
				description: "Applies a linear multiplier to input image, making it appear more or less bright."
			}, {
				name: "contrast()",
				description: "Adjusts the contrast of the input."
			}, {
				name: "drop-shadow()",
				description: "Applies a drop shadow effect to the input image."
			}, {
				name: "grayscale()",
				description: "Converts the input image to grayscale."
			}, {
				name: "hue-rotate()",
				description: "Applies a hue rotation on the input image. "
			}, {
				name: "invert()",
				description: "Inverts the samples in the input image."
			}, {
				name: "opacity()",
				description: "Applies transparency to the samples in the input image."
			}, {
				name: "saturate()",
				description: "Saturates the input image."
			}, {
				name: "sepia()",
				description: "Converts the input image to sepia."
			}, {
				name: "url()",
				browsers: ["E12", "FF35", "S9.1", "C53", "O40"],
				description: "A filter reference to a <filter> element."
			}],
			syntax: "none | <filter-function-list>",
			relevance: 65,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/filter"
			}],
			description: "Processes an element’s rendering before it is displayed in the document, by applying one or more filter effects.",
			restrictions: ["enum", "url"]
		}, {
			name: "flex",
			values: [{
				name: "auto",
				description: "Retrieves the value of the main size property as the used 'flex-basis'."
			}, {
				name: "content",
				description: "Indicates automatic sizing, based on the flex item’s content."
			}, {
				name: "none",
				description: "Expands to '0 0 auto'."
			}],
			syntax: "none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]",
			relevance: 79,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex"
			}],
			description: "Specifies the components of a flexible length: the flex grow factor and flex shrink factor, and the flex basis.",
			restrictions: ["length", "number", "percentage"]
		}, {
			name: "flex-basis",
			values: [{
				name: "auto",
				description: "Retrieves the value of the main size property as the used 'flex-basis'."
			}, {
				name: "content",
				description: "Indicates automatic sizing, based on the flex item’s content."
			}],
			syntax: "content | <'width'>",
			relevance: 64,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex-basis"
			}],
			description: "Sets the flex basis.",
			restrictions: ["length", "number", "percentage"]
		}, {
			name: "flex-direction",
			values: [{
				name: "column",
				description: "The flex container’s main axis has the same orientation as the block axis of the current writing mode."
			}, {
				name: "column-reverse",
				description: "Same as 'column', except the main-start and main-end directions are swapped."
			}, {
				name: "row",
				description: "The flex container’s main axis has the same orientation as the inline axis of the current writing mode."
			}, {
				name: "row-reverse",
				description: "Same as 'row', except the main-start and main-end directions are swapped."
			}],
			syntax: "row | row-reverse | column | column-reverse",
			relevance: 81,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex-direction"
			}],
			description: "Specifies how flex items are placed in the flex container, by setting the direction of the flex container’s main axis.",
			restrictions: ["enum"]
		}, {
			name: "flex-flow",
			values: [{
				name: "column",
				description: "The flex container’s main axis has the same orientation as the block axis of the current writing mode."
			}, {
				name: "column-reverse",
				description: "Same as 'column', except the main-start and main-end directions are swapped."
			}, {
				name: "nowrap",
				description: "The flex container is single-line."
			}, {
				name: "row",
				description: "The flex container’s main axis has the same orientation as the inline axis of the current writing mode."
			}, {
				name: "row-reverse",
				description: "Same as 'row', except the main-start and main-end directions are swapped."
			}, {
				name: "wrap",
				description: "The flexbox is multi-line."
			}, {
				name: "wrap-reverse",
				description: "Same as 'wrap', except the cross-start and cross-end directions are swapped."
			}],
			syntax: "<'flex-direction'> || <'flex-wrap'>",
			relevance: 60,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex-flow"
			}],
			description: "Specifies how flexbox items are placed in the flexbox.",
			restrictions: ["enum"]
		}, {
			name: "flex-grow",
			syntax: "<number>",
			relevance: 74,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex-grow"
			}],
			description: "Sets the flex grow factor. Negative numbers are invalid.",
			restrictions: ["number"]
		}, {
			name: "flex-shrink",
			syntax: "<number>",
			relevance: 72,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex-shrink"
			}],
			description: "Sets the flex shrink factor. Negative numbers are invalid.",
			restrictions: ["number"]
		}, {
			name: "flex-wrap",
			values: [{
				name: "nowrap",
				description: "The flex container is single-line."
			}, {
				name: "wrap",
				description: "The flexbox is multi-line."
			}, {
				name: "wrap-reverse",
				description: "Same as 'wrap', except the cross-start and cross-end directions are swapped."
			}],
			syntax: "nowrap | wrap | wrap-reverse",
			relevance: 77,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/flex-wrap"
			}],
			description: "Controls whether the flex container is single-line or multi-line, and the direction of the cross-axis, which determines the direction new lines are stacked in.",
			restrictions: ["enum"]
		}, {
			name: "float",
			values: [{
				name: "inline-end",
				description: "A keyword indicating that the element must float on the end side of its containing block. That is the right side with ltr scripts, and the left side with rtl scripts."
			}, {
				name: "inline-start",
				description: "A keyword indicating that the element must float on the start side of its containing block. That is the left side with ltr scripts, and the right side with rtl scripts."
			}, {
				name: "left",
				description: "The element generates a block box that is floated to the left. Content flows on the right side of the box, starting at the top (subject to the 'clear' property)."
			}, {
				name: "none",
				description: "The box is not floated."
			}, {
				name: "right",
				description: "Similar to 'left', except the box is floated to the right, and content flows on the left side of the box, starting at the top."
			}],
			syntax: "left | right | none | inline-start | inline-end",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/float"
			}],
			description: "Specifies how a box should be floated. It may be set for any element, but only applies to elements that generate boxes that are not absolutely positioned.",
			restrictions: ["enum"]
		}, {
			name: "flood-color",
			browsers: ["E", "C5", "FF3", "IE10", "O9", "S6"],
			relevance: 50,
			description: "Indicates what color to use to flood the current filter primitive subregion.",
			restrictions: ["color"]
		}, {
			name: "flood-opacity",
			browsers: ["E", "C5", "FF3", "IE10", "O9", "S6"],
			relevance: 50,
			description: "Indicates what opacity to use to flood the current filter primitive subregion.",
			restrictions: ["number(0-1)", "percentage"]
		}, {
			name: "font",
			values: [{
				name: "100",
				description: "Thin"
			}, {
				name: "200",
				description: "Extra Light (Ultra Light)"
			}, {
				name: "300",
				description: "Light"
			}, {
				name: "400",
				description: "Normal"
			}, {
				name: "500",
				description: "Medium"
			}, {
				name: "600",
				description: "Semi Bold (Demi Bold)"
			}, {
				name: "700",
				description: "Bold"
			}, {
				name: "800",
				description: "Extra Bold (Ultra Bold)"
			}, {
				name: "900",
				description: "Black (Heavy)"
			}, {
				name: "bold",
				description: "Same as 700"
			}, {
				name: "bolder",
				description: "Specifies the weight of the face bolder than the inherited value."
			}, {
				name: "caption",
				description: "The font used for captioned controls (e.g., buttons, drop-downs, etc.)."
			}, {
				name: "icon",
				description: "The font used to label icons."
			}, {
				name: "italic",
				description: "Selects a font that is labeled 'italic', or, if that is not available, one labeled 'oblique'."
			}, {
				name: "large"
			}, {
				name: "larger"
			}, {
				name: "lighter",
				description: "Specifies the weight of the face lighter than the inherited value."
			}, {
				name: "medium"
			}, {
				name: "menu",
				description: "The font used in menus (e.g., dropdown menus and menu lists)."
			}, {
				name: "message-box",
				description: "The font used in dialog boxes."
			}, {
				name: "normal",
				description: "Specifies a face that is not labeled as a small-caps font."
			}, {
				name: "oblique",
				description: "Selects a font that is labeled 'oblique'."
			}, {
				name: "small"
			}, {
				name: "small-caps",
				description: "Specifies a font that is labeled as a small-caps font. If a genuine small-caps font is not available, user agents should simulate a small-caps font."
			}, {
				name: "small-caption",
				description: "The font used for labeling small controls."
			}, {
				name: "smaller"
			}, {
				name: "status-bar",
				description: "The font used in window status bars."
			}, {
				name: "x-large"
			}, {
				name: "x-small"
			}, {
				name: "xx-large"
			}, {
				name: "xx-small"
			}],
			syntax: "[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar",
			relevance: 84,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font"
			}],
			description: "Shorthand property for setting 'font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', and 'font-family', at the same place in the style sheet. The syntax of this property is based on a traditional typographical shorthand notation to set multiple properties related to fonts.",
			restrictions: ["font"]
		}, {
			name: "font-family",
			values: [{
				name: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
			}, {
				name: "Arial, Helvetica, sans-serif"
			}, {
				name: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
			}, {
				name: "'Courier New', Courier, monospace"
			}, {
				name: "cursive"
			}, {
				name: "fantasy"
			}, {
				name: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
			}, {
				name: "Georgia, 'Times New Roman', Times, serif"
			}, {
				name: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
			}, {
				name: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
			}, {
				name: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
			}, {
				name: "monospace"
			}, {
				name: "sans-serif"
			}, {
				name: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
			}, {
				name: "serif"
			}, {
				name: "'Times New Roman', Times, serif"
			}, {
				name: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
			}, {
				name: "Verdana, Geneva, Tahoma, sans-serif"
			}],
			syntax: "<family-name>",
			relevance: 93,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-family"
			}],
			description: "Specifies a prioritized list of font family names or generic family names. A user agent iterates through the list of family names until it matches an available font that contains a glyph for the character to be rendered.",
			restrictions: ["font"]
		}, {
			name: "font-feature-settings",
			values: [{
				name: '"aalt"',
				description: "Access All Alternates."
			}, {
				name: '"abvf"',
				description: "Above-base Forms. Required in Khmer script."
			}, {
				name: '"abvm"',
				description: "Above-base Mark Positioning. Required in Indic scripts."
			}, {
				name: '"abvs"',
				description: "Above-base Substitutions. Required in Indic scripts."
			}, {
				name: '"afrc"',
				description: "Alternative Fractions."
			}, {
				name: '"akhn"',
				description: "Akhand. Required in most Indic scripts."
			}, {
				name: '"blwf"',
				description: "Below-base Form. Required in a number of Indic scripts."
			}, {
				name: '"blwm"',
				description: "Below-base Mark Positioning. Required in Indic scripts."
			}, {
				name: '"blws"',
				description: "Below-base Substitutions. Required in Indic scripts."
			}, {
				name: '"calt"',
				description: "Contextual Alternates."
			}, {
				name: '"case"',
				description: "Case-Sensitive Forms. Applies only to European scripts; particularly prominent in Spanish-language setting."
			}, {
				name: '"ccmp"',
				description: "Glyph Composition/Decomposition."
			}, {
				name: '"cfar"',
				description: "Conjunct Form After Ro. Required in Khmer scripts."
			}, {
				name: '"cjct"',
				description: "Conjunct Forms. Required in Indic scripts that show similarity to Devanagari."
			}, {
				name: '"clig"',
				description: "Contextual Ligatures."
			}, {
				name: '"cpct"',
				description: "Centered CJK Punctuation. Used primarily in Chinese fonts."
			}, {
				name: '"cpsp"',
				description: "Capital Spacing. Should not be used in connecting scripts (e.g. most Arabic)."
			}, {
				name: '"cswh"',
				description: "Contextual Swash."
			}, {
				name: '"curs"',
				description: "Cursive Positioning. Can be used in any cursive script."
			}, {
				name: '"c2pc"',
				description: "Petite Capitals From Capitals. Applies only to bicameral scripts."
			}, {
				name: '"c2sc"',
				description: "Small Capitals From Capitals. Applies only to bicameral scripts."
			}, {
				name: '"dist"',
				description: "Distances. Required in Indic scripts."
			}, {
				name: '"dlig"',
				description: "Discretionary ligatures."
			}, {
				name: '"dnom"',
				description: "Denominators."
			}, {
				name: '"dtls"',
				description: "Dotless Forms. Applied to math formula layout."
			}, {
				name: '"expt"',
				description: "Expert Forms. Applies only to Japanese."
			}, {
				name: '"falt"',
				description: "Final Glyph on Line Alternates. Can be used in any cursive script."
			}, {
				name: '"fin2"',
				description: "Terminal Form #2. Used only with the Syriac script."
			}, {
				name: '"fin3"',
				description: "Terminal Form #3. Used only with the Syriac script."
			}, {
				name: '"fina"',
				description: "Terminal Forms. Can be used in any alphabetic script."
			}, {
				name: '"flac"',
				description: "Flattened ascent forms. Applied to math formula layout."
			}, {
				name: '"frac"',
				description: "Fractions."
			}, {
				name: '"fwid"',
				description: "Full Widths. Applies to any script which can use monospaced forms."
			}, {
				name: '"half"',
				description: "Half Forms. Required in Indic scripts that show similarity to Devanagari."
			}, {
				name: '"haln"',
				description: "Halant Forms. Required in Indic scripts."
			}, {
				name: '"halt"',
				description: "Alternate Half Widths. Used only in CJKV fonts."
			}, {
				name: '"hist"',
				description: "Historical Forms."
			}, {
				name: '"hkna"',
				description: "Horizontal Kana Alternates. Applies only to fonts that support kana (hiragana and katakana)."
			}, {
				name: '"hlig"',
				description: "Historical Ligatures."
			}, {
				name: '"hngl"',
				description: "Hangul. Korean only."
			}, {
				name: '"hojo"',
				description: "Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms). Used only with Kanji script."
			}, {
				name: '"hwid"',
				description: "Half Widths. Generally used only in CJKV fonts."
			}, {
				name: '"init"',
				description: "Initial Forms. Can be used in any alphabetic script."
			}, {
				name: '"isol"',
				description: "Isolated Forms. Can be used in any cursive script."
			}, {
				name: '"ital"',
				description: "Italics. Applies mostly to Latin; note that many non-Latin fonts contain Latin as well."
			}, {
				name: '"jalt"',
				description: "Justification Alternates. Can be used in any cursive script."
			}, {
				name: '"jp78"',
				description: "JIS78 Forms. Applies only to Japanese."
			}, {
				name: '"jp83"',
				description: "JIS83 Forms. Applies only to Japanese."
			}, {
				name: '"jp90"',
				description: "JIS90 Forms. Applies only to Japanese."
			}, {
				name: '"jp04"',
				description: "JIS2004 Forms. Applies only to Japanese."
			}, {
				name: '"kern"',
				description: "Kerning."
			}, {
				name: '"lfbd"',
				description: "Left Bounds."
			}, {
				name: '"liga"',
				description: "Standard Ligatures."
			}, {
				name: '"ljmo"',
				description: "Leading Jamo Forms. Required for Hangul script when Ancient Hangul writing system is supported."
			}, {
				name: '"lnum"',
				description: "Lining Figures."
			}, {
				name: '"locl"',
				description: "Localized Forms."
			}, {
				name: '"ltra"',
				description: "Left-to-right glyph alternates."
			}, {
				name: '"ltrm"',
				description: "Left-to-right mirrored forms."
			}, {
				name: '"mark"',
				description: "Mark Positioning."
			}, {
				name: '"med2"',
				description: "Medial Form #2. Used only with the Syriac script."
			}, {
				name: '"medi"',
				description: "Medial Forms."
			}, {
				name: '"mgrk"',
				description: "Mathematical Greek."
			}, {
				name: '"mkmk"',
				description: "Mark to Mark Positioning."
			}, {
				name: '"nalt"',
				description: "Alternate Annotation Forms."
			}, {
				name: '"nlck"',
				description: "NLC Kanji Forms. Used only with Kanji script."
			}, {
				name: '"nukt"',
				description: "Nukta Forms. Required in Indic scripts.."
			}, {
				name: '"numr"',
				description: "Numerators."
			}, {
				name: '"onum"',
				description: "Oldstyle Figures."
			}, {
				name: '"opbd"',
				description: "Optical Bounds."
			}, {
				name: '"ordn"',
				description: "Ordinals. Applies mostly to Latin script."
			}, {
				name: '"ornm"',
				description: "Ornaments."
			}, {
				name: '"palt"',
				description: "Proportional Alternate Widths. Used mostly in CJKV fonts."
			}, {
				name: '"pcap"',
				description: "Petite Capitals."
			}, {
				name: '"pkna"',
				description: "Proportional Kana. Generally used only in Japanese fonts."
			}, {
				name: '"pnum"',
				description: "Proportional Figures."
			}, {
				name: '"pref"',
				description: "Pre-base Forms. Required in Khmer and Myanmar (Burmese) scripts and southern Indic scripts that may display a pre-base form of Ra."
			}, {
				name: '"pres"',
				description: "Pre-base Substitutions. Required in Indic scripts."
			}, {
				name: '"pstf"',
				description: "Post-base Forms. Required in scripts of south and southeast Asia that have post-base forms for consonants eg: Gurmukhi, Malayalam, Khmer."
			}, {
				name: '"psts"',
				description: "Post-base Substitutions."
			}, {
				name: '"pwid"',
				description: "Proportional Widths."
			}, {
				name: '"qwid"',
				description: "Quarter Widths. Generally used only in CJKV fonts."
			}, {
				name: '"rand"',
				description: "Randomize."
			}, {
				name: '"rclt"',
				description: "Required Contextual Alternates. May apply to any script, but is especially important for many styles of Arabic."
			}, {
				name: '"rlig"',
				description: "Required Ligatures. Applies to Arabic and Syriac. May apply to some other scripts."
			}, {
				name: '"rkrf"',
				description: "Rakar Forms. Required in Devanagari and Gujarati scripts."
			}, {
				name: '"rphf"',
				description: "Reph Form. Required in Indic scripts. E.g. Devanagari, Kannada."
			}, {
				name: '"rtbd"',
				description: "Right Bounds."
			}, {
				name: '"rtla"',
				description: "Right-to-left alternates."
			}, {
				name: '"rtlm"',
				description: "Right-to-left mirrored forms."
			}, {
				name: '"ruby"',
				description: "Ruby Notation Forms. Applies only to Japanese."
			}, {
				name: '"salt"',
				description: "Stylistic Alternates."
			}, {
				name: '"sinf"',
				description: "Scientific Inferiors."
			}, {
				name: '"size"',
				description: "Optical size."
			}, {
				name: '"smcp"',
				description: "Small Capitals. Applies only to bicameral scripts."
			}, {
				name: '"smpl"',
				description: "Simplified Forms. Applies only to Chinese and Japanese."
			}, {
				name: '"ssty"',
				description: "Math script style alternates."
			}, {
				name: '"stch"',
				description: "Stretching Glyph Decomposition."
			}, {
				name: '"subs"',
				description: "Subscript."
			}, {
				name: '"sups"',
				description: "Superscript."
			}, {
				name: '"swsh"',
				description: "Swash. Does not apply to ideographic scripts."
			}, {
				name: '"titl"',
				description: "Titling."
			}, {
				name: '"tjmo"',
				description: "Trailing Jamo Forms. Required for Hangul script when Ancient Hangul writing system is supported."
			}, {
				name: '"tnam"',
				description: "Traditional Name Forms. Applies only to Japanese."
			}, {
				name: '"tnum"',
				description: "Tabular Figures."
			}, {
				name: '"trad"',
				description: "Traditional Forms. Applies only to Chinese and Japanese."
			}, {
				name: '"twid"',
				description: "Third Widths. Generally used only in CJKV fonts."
			}, {
				name: '"unic"',
				description: "Unicase."
			}, {
				name: '"valt"',
				description: "Alternate Vertical Metrics. Applies only to scripts with vertical writing modes."
			}, {
				name: '"vatu"',
				description: "Vattu Variants. Used for Indic scripts. E.g. Devanagari."
			}, {
				name: '"vert"',
				description: "Vertical Alternates. Applies only to scripts with vertical writing modes."
			}, {
				name: '"vhal"',
				description: "Alternate Vertical Half Metrics. Used only in CJKV fonts."
			}, {
				name: '"vjmo"',
				description: "Vowel Jamo Forms. Required for Hangul script when Ancient Hangul writing system is supported."
			}, {
				name: '"vkna"',
				description: "Vertical Kana Alternates. Applies only to fonts that support kana (hiragana and katakana)."
			}, {
				name: '"vkrn"',
				description: "Vertical Kerning."
			}, {
				name: '"vpal"',
				description: "Proportional Alternate Vertical Metrics. Used mostly in CJKV fonts."
			}, {
				name: '"vrt2"',
				description: "Vertical Alternates and Rotation. Applies only to scripts with vertical writing modes."
			}, {
				name: '"zero"',
				description: "Slashed Zero."
			}, {
				name: "normal",
				description: "No change in glyph substitution or positioning occurs."
			}, {
				name: "off",
				description: "Disable feature."
			}, {
				name: "on",
				description: "Enable feature."
			}],
			syntax: "normal | <feature-tag-value>#",
			relevance: 56,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-feature-settings"
			}],
			description: "Provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case.",
			restrictions: ["string", "integer"]
		}, {
			name: "font-kerning",
			browsers: ["E79", "FF32", "S9", "C33", "O20"],
			values: [{
				name: "auto",
				description: "Specifies that kerning is applied at the discretion of the user agent."
			}, {
				name: "none",
				description: "Specifies that kerning is not applied."
			}, {
				name: "normal",
				description: "Specifies that kerning is applied."
			}],
			syntax: "auto | normal | none",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-kerning"
			}],
			description: "Kerning is the contextual adjustment of inter-glyph spacing. This property controls metric kerning, kerning that utilizes adjustment data contained in the font.",
			restrictions: ["enum"]
		}, {
			name: "font-language-override",
			browsers: ["FF34"],
			values: [{
				name: "normal",
				description: "Implies that when rendering with OpenType fonts the language of the document is used to infer the OpenType language system, used to select language specific features when rendering."
			}],
			syntax: "normal | <string>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-language-override"
			}],
			description: "The value of 'normal' implies that when rendering with OpenType fonts the language of the document is used to infer the OpenType language system, used to select language specific features when rendering.",
			restrictions: ["string"]
		}, {
			name: "font-size",
			values: [{
				name: "large"
			}, {
				name: "larger"
			}, {
				name: "medium"
			}, {
				name: "small"
			}, {
				name: "smaller"
			}, {
				name: "x-large"
			}, {
				name: "x-small"
			}, {
				name: "xx-large"
			}, {
				name: "xx-small"
			}],
			syntax: "<absolute-size> | <relative-size> | <length-percentage>",
			relevance: 94,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-size"
			}],
			description: "Indicates the desired height of glyphs from the font. For scalable fonts, the font-size is a scale factor applied to the EM unit of the font. (Note that certain glyphs may bleed outside their EM box.) For non-scalable fonts, the font-size is converted into absolute units and matched against the declared font-size of the font, using the same absolute coordinate space for both of the matched values.",
			restrictions: ["length", "percentage"]
		}, {
			name: "font-size-adjust",
			browsers: ["E79", "FF40", "C43", "O30"],
			values: [{
				name: "none",
				description: "Do not preserve the font’s x-height."
			}],
			syntax: "none | <number>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-size-adjust"
			}],
			description: "Preserves the readability of text when font fallback occurs by adjusting the font-size so that the x-height is the same regardless of the font used.",
			restrictions: ["number"]
		}, {
			name: "font-stretch",
			values: [{
				name: "condensed"
			}, {
				name: "expanded"
			}, {
				name: "extra-condensed"
			}, {
				name: "extra-expanded"
			}, {
				name: "narrower",
				description: "Indicates a narrower value relative to the width of the parent element."
			}, {
				name: "normal"
			}, {
				name: "semi-condensed"
			}, {
				name: "semi-expanded"
			}, {
				name: "ultra-condensed"
			}, {
				name: "ultra-expanded"
			}, {
				name: "wider",
				description: "Indicates a wider value relative to the width of the parent element."
			}],
			syntax: "<font-stretch-absolute>{1,2}",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-stretch"
			}],
			description: "Selects a normal, condensed, or expanded face from a font family.",
			restrictions: ["enum"]
		}, {
			name: "font-style",
			values: [{
				name: "italic",
				description: "Selects a font that is labeled as an 'italic' face, or an 'oblique' face if one is not"
			}, {
				name: "normal",
				description: "Selects a face that is classified as 'normal'."
			}, {
				name: "oblique",
				description: "Selects a font that is labeled as an 'oblique' face, or an 'italic' face if one is not."
			}],
			syntax: "normal | italic | oblique <angle>{0,2}",
			relevance: 84,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-style"
			}],
			description: "Allows italic or oblique faces to be selected. Italic forms are generally cursive in nature while oblique faces are typically sloped versions of the regular face.",
			restrictions: ["enum"]
		}, {
			name: "font-synthesis",
			browsers: ["FF34", "S9"],
			values: [{
				name: "none",
				description: "Disallow all synthetic faces."
			}, {
				name: "style",
				description: "Allow synthetic italic faces."
			}, {
				name: "weight",
				description: "Allow synthetic bold faces."
			}],
			syntax: "none | [ weight || style ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-synthesis"
			}],
			description: "Controls whether user agents are allowed to synthesize bold or oblique font faces when a font family lacks bold or italic faces.",
			restrictions: ["enum"]
		}, {
			name: "font-variant",
			values: [{
				name: "normal",
				description: "Specifies a face that is not labeled as a small-caps font."
			}, {
				name: "small-caps",
				description: "Specifies a font that is labeled as a small-caps font. If a genuine small-caps font is not available, user agents should simulate a small-caps font."
			}],
			syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name>#) || character-variant(<feature-value-name>#) || swash(<feature-value-name>) || ornaments(<feature-value-name>) || annotation(<feature-value-name>) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
			relevance: 64,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant"
			}],
			description: "Specifies variant representations of the font",
			restrictions: ["enum"]
		}, {
			name: "font-variant-alternates",
			browsers: ["FF34", "S9.1"],
			values: [{
				name: "annotation()",
				description: "Enables display of alternate annotation forms."
			}, {
				name: "character-variant()",
				description: "Enables display of specific character variants."
			}, {
				name: "historical-forms",
				description: "Enables display of historical forms."
			}, {
				name: "normal",
				description: "None of the features are enabled."
			}, {
				name: "ornaments()",
				description: "Enables replacement of default glyphs with ornaments, if provided in the font."
			}, {
				name: "styleset()",
				description: "Enables display with stylistic sets."
			}, {
				name: "stylistic()",
				description: "Enables display of stylistic alternates."
			}, {
				name: "swash()",
				description: "Enables display of swash glyphs."
			}],
			syntax: "normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates"
			}],
			description: "For any given character, fonts can provide a variety of alternate glyphs in addition to the default glyph for that character. This property provides control over the selection of these alternate glyphs.",
			restrictions: ["enum"]
		}, {
			name: "font-variant-caps",
			browsers: ["E79", "FF34", "S9.1", "C52", "O39"],
			values: [{
				name: "all-petite-caps",
				description: "Enables display of petite capitals for both upper and lowercase letters."
			}, {
				name: "all-small-caps",
				description: "Enables display of small capitals for both upper and lowercase letters."
			}, {
				name: "normal",
				description: "None of the features are enabled."
			}, {
				name: "petite-caps",
				description: "Enables display of petite capitals."
			}, {
				name: "small-caps",
				description: "Enables display of small capitals. Small-caps glyphs typically use the form of uppercase letters but are reduced to the size of lowercase letters."
			}, {
				name: "titling-caps",
				description: "Enables display of titling capitals."
			}, {
				name: "unicase",
				description: "Enables display of mixture of small capitals for uppercase letters with normal lowercase letters."
			}],
			syntax: "normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-caps"
			}],
			description: "Specifies control over capitalized forms.",
			restrictions: ["enum"]
		}, {
			name: "font-variant-east-asian",
			browsers: ["E79", "FF34", "S9.1", "C63", "O50"],
			values: [{
				name: "full-width",
				description: "Enables rendering of full-width variants."
			}, {
				name: "jis04",
				description: "Enables rendering of JIS04 forms."
			}, {
				name: "jis78",
				description: "Enables rendering of JIS78 forms."
			}, {
				name: "jis83",
				description: "Enables rendering of JIS83 forms."
			}, {
				name: "jis90",
				description: "Enables rendering of JIS90 forms."
			}, {
				name: "normal",
				description: "None of the features are enabled."
			}, {
				name: "proportional-width",
				description: "Enables rendering of proportionally-spaced variants."
			}, {
				name: "ruby",
				description: "Enables display of ruby variant glyphs."
			}, {
				name: "simplified",
				description: "Enables rendering of simplified forms."
			}, {
				name: "traditional",
				description: "Enables rendering of traditional forms."
			}],
			syntax: "normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian"
			}],
			description: "Allows control of glyph substitute and positioning in East Asian text.",
			restrictions: ["enum"]
		}, {
			name: "font-variant-ligatures",
			browsers: ["E79", "FF34", "S9.1", "C34", "O21"],
			values: [{
				name: "additional-ligatures",
				description: "Enables display of additional ligatures."
			}, {
				name: "common-ligatures",
				description: "Enables display of common ligatures."
			}, {
				name: "contextual",
				browsers: ["E79", "FF34", "S9.1", "C34", "O21"],
				description: "Enables display of contextual alternates."
			}, {
				name: "discretionary-ligatures",
				description: "Enables display of discretionary ligatures."
			}, {
				name: "historical-ligatures",
				description: "Enables display of historical ligatures."
			}, {
				name: "no-additional-ligatures",
				description: "Disables display of additional ligatures."
			}, {
				name: "no-common-ligatures",
				description: "Disables display of common ligatures."
			}, {
				name: "no-contextual",
				browsers: ["E79", "FF34", "S9.1", "C34", "O21"],
				description: "Disables display of contextual alternates."
			}, {
				name: "no-discretionary-ligatures",
				description: "Disables display of discretionary ligatures."
			}, {
				name: "no-historical-ligatures",
				description: "Disables display of historical ligatures."
			}, {
				name: "none",
				browsers: ["E79", "FF34", "S9.1", "C34", "O21"],
				description: "Disables all ligatures."
			}, {
				name: "normal",
				description: "Implies that the defaults set by the font are used."
			}],
			syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures"
			}],
			description: "Specifies control over which ligatures are enabled or disabled. A value of ‘normal’ implies that the defaults set by the font are used.",
			restrictions: ["enum"]
		}, {
			name: "font-variant-numeric",
			browsers: ["E79", "FF34", "S9.1", "C52", "O39"],
			values: [{
				name: "diagonal-fractions",
				description: "Enables display of lining diagonal fractions."
			}, {
				name: "lining-nums",
				description: "Enables display of lining numerals."
			}, {
				name: "normal",
				description: "None of the features are enabled."
			}, {
				name: "oldstyle-nums",
				description: "Enables display of old-style numerals."
			}, {
				name: "ordinal",
				description: "Enables display of letter forms used with ordinal numbers."
			}, {
				name: "proportional-nums",
				description: "Enables display of proportional numerals."
			}, {
				name: "slashed-zero",
				description: "Enables display of slashed zeros."
			}, {
				name: "stacked-fractions",
				description: "Enables display of lining stacked fractions."
			}, {
				name: "tabular-nums",
				description: "Enables display of tabular numerals."
			}],
			syntax: "normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric"
			}],
			description: "Specifies control over numerical forms.",
			restrictions: ["enum"]
		}, {
			name: "font-variant-position",
			browsers: ["FF34", "S9.1"],
			values: [{
				name: "normal",
				description: "None of the features are enabled."
			}, {
				name: "sub",
				description: "Enables display of subscript variants (OpenType feature: subs)."
			}, {
				name: "super",
				description: "Enables display of superscript variants (OpenType feature: sups)."
			}],
			syntax: "normal | sub | super",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-position"
			}],
			description: "Specifies the vertical position",
			restrictions: ["enum"]
		}, {
			name: "font-weight",
			values: [{
				name: "100",
				description: "Thin"
			}, {
				name: "200",
				description: "Extra Light (Ultra Light)"
			}, {
				name: "300",
				description: "Light"
			}, {
				name: "400",
				description: "Normal"
			}, {
				name: "500",
				description: "Medium"
			}, {
				name: "600",
				description: "Semi Bold (Demi Bold)"
			}, {
				name: "700",
				description: "Bold"
			}, {
				name: "800",
				description: "Extra Bold (Ultra Bold)"
			}, {
				name: "900",
				description: "Black (Heavy)"
			}, {
				name: "bold",
				description: "Same as 700"
			}, {
				name: "bolder",
				description: "Specifies the weight of the face bolder than the inherited value."
			}, {
				name: "lighter",
				description: "Specifies the weight of the face lighter than the inherited value."
			}, {
				name: "normal",
				description: "Same as 400"
			}],
			syntax: "<font-weight-absolute>{1,2}",
			relevance: 93,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-weight"
			}],
			description: "Specifies weight of glyphs in the font, their degree of blackness or stroke thickness.",
			restrictions: ["enum"]
		}, {
			name: "glyph-orientation-horizontal",
			relevance: 50,
			description: "Controls glyph orientation when the inline-progression-direction is horizontal.",
			restrictions: ["angle", "number"]
		}, {
			name: "glyph-orientation-vertical",
			values: [{
				name: "auto",
				description: "Sets the orientation based on the fullwidth or non-fullwidth characters and the most common orientation."
			}],
			relevance: 50,
			description: "Controls glyph orientation when the inline-progression-direction is vertical.",
			restrictions: ["angle", "number", "enum"]
		}, {
			name: "grid-area",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line> [ / <grid-line> ]{0,3}",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-area"
			}],
			description: "Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement. Shorthand for 'grid-row-start', 'grid-column-start', 'grid-row-end', and 'grid-column-end'.",
			restrictions: ["identifier", "integer"]
		}, {
			name: "grid",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			syntax: "<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid"
			}],
			description: "The grid CSS property is a shorthand property that sets all of the explicit grid properties ('grid-template-rows', 'grid-template-columns', and 'grid-template-areas'), and all the implicit grid properties ('grid-auto-rows', 'grid-auto-columns', and 'grid-auto-flow'), in a single declaration.",
			restrictions: ["identifier", "length", "percentage", "string", "enum"]
		}, {
			name: "grid-auto-columns",
			values: [{
				name: "min-content",
				description: "Represents the largest min-content contribution of the grid items occupying the grid track."
			}, {
				name: "max-content",
				description: "Represents the largest max-content contribution of the grid items occupying the grid track."
			}, {
				name: "auto",
				description: "As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track."
			}, {
				name: "minmax()",
				description: "Defines a size range greater than or equal to min and less than or equal to max."
			}],
			syntax: "<track-size>+",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns"
			}],
			description: "Specifies the size of implicitly created columns.",
			restrictions: ["length", "percentage"]
		}, {
			name: "grid-auto-flow",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "row",
				description: "The auto-placement algorithm places items by filling each row in turn, adding new rows as necessary."
			}, {
				name: "column",
				description: "The auto-placement algorithm places items by filling each column in turn, adding new columns as necessary."
			}, {
				name: "dense",
				description: "If specified, the auto-placement algorithm uses a “dense” packing algorithm, which attempts to fill in holes earlier in the grid if smaller items come up later."
			}],
			syntax: "[ row | column ] || dense",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow"
			}],
			description: "Controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.",
			restrictions: ["enum"]
		}, {
			name: "grid-auto-rows",
			values: [{
				name: "min-content",
				description: "Represents the largest min-content contribution of the grid items occupying the grid track."
			}, {
				name: "max-content",
				description: "Represents the largest max-content contribution of the grid items occupying the grid track."
			}, {
				name: "auto",
				description: "As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track."
			}, {
				name: "minmax()",
				description: "Defines a size range greater than or equal to min and less than or equal to max."
			}],
			syntax: "<track-size>+",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows"
			}],
			description: "Specifies the size of implicitly created rows.",
			restrictions: ["length", "percentage"]
		}, {
			name: "grid-column",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line> [ / <grid-line> ]?",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-column"
			}],
			description: "Shorthand for 'grid-column-start' and 'grid-column-end'.",
			restrictions: ["identifier", "integer", "enum"]
		}, {
			name: "grid-column-end",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-column-end"
			}],
			description: "Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.",
			restrictions: ["identifier", "integer", "enum"]
		}, {
			name: "grid-column-gap",
			browsers: ["FF52", "C57", "S10.1", "O44"],
			status: "obsolete",
			syntax: "<length-percentage>",
			relevance: 2,
			description: "Specifies the gutters between grid columns. Replaced by 'column-gap' property.",
			restrictions: ["length"]
		}, {
			name: "grid-column-start",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-column-start"
			}],
			description: "Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.",
			restrictions: ["identifier", "integer", "enum"]
		}, {
			name: "grid-gap",
			browsers: ["FF52", "C57", "S10.1", "O44"],
			status: "obsolete",
			syntax: "<'grid-row-gap'> <'grid-column-gap'>?",
			relevance: 2,
			description: "Shorthand that specifies the gutters between grid columns and grid rows in one declaration. Replaced by 'gap' property.",
			restrictions: ["length"]
		}, {
			name: "grid-row",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line> [ / <grid-line> ]?",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-row"
			}],
			description: "Shorthand for 'grid-row-start' and 'grid-row-end'.",
			restrictions: ["identifier", "integer", "enum"]
		}, {
			name: "grid-row-end",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-row-end"
			}],
			description: "Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.",
			restrictions: ["identifier", "integer", "enum"]
		}, {
			name: "grid-row-gap",
			browsers: ["FF52", "C57", "S10.1", "O44"],
			status: "obsolete",
			syntax: "<length-percentage>",
			relevance: 1,
			description: "Specifies the gutters between grid rows. Replaced by 'row-gap' property.",
			restrictions: ["length"]
		}, {
			name: "grid-row-start",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one."
			}, {
				name: "span",
				description: "Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge."
			}],
			syntax: "<grid-line>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-row-start"
			}],
			description: "Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.",
			restrictions: ["identifier", "integer", "enum"]
		}, {
			name: "grid-template",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "none",
				description: "Sets all three properties to their initial values."
			}, {
				name: "min-content",
				description: "Represents the largest min-content contribution of the grid items occupying the grid track."
			}, {
				name: "max-content",
				description: "Represents the largest max-content contribution of the grid items occupying the grid track."
			}, {
				name: "auto",
				description: "As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track."
			}, {
				name: "subgrid",
				description: "Sets 'grid-template-rows' and 'grid-template-columns' to 'subgrid', and 'grid-template-areas' to its initial value."
			}, {
				name: "minmax()",
				description: "Defines a size range greater than or equal to min and less than or equal to max."
			}, {
				name: "repeat()",
				description: "Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form."
			}],
			syntax: "none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-template"
			}],
			description: "Shorthand for setting grid-template-columns, grid-template-rows, and grid-template-areas in a single declaration.",
			restrictions: ["identifier", "length", "percentage", "string", "enum"]
		}, {
			name: "grid-template-areas",
			browsers: ["E16", "FF52", "S10.1", "C57", "O44"],
			values: [{
				name: "none",
				description: "The grid container doesn’t define any named grid areas."
			}],
			syntax: "none | <string>+",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas"
			}],
			description: "Specifies named grid areas, which are not associated with any particular grid item, but can be referenced from the grid-placement properties.",
			restrictions: ["string"]
		}, {
			name: "grid-template-columns",
			values: [{
				name: "none",
				description: "There is no explicit grid; any rows/columns will be implicitly generated."
			}, {
				name: "min-content",
				description: "Represents the largest min-content contribution of the grid items occupying the grid track."
			}, {
				name: "max-content",
				description: "Represents the largest max-content contribution of the grid items occupying the grid track."
			}, {
				name: "auto",
				description: "As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track."
			}, {
				name: "subgrid",
				description: "Indicates that the grid will align to its parent grid in that axis."
			}, {
				name: "minmax()",
				description: "Defines a size range greater than or equal to min and less than or equal to max."
			}, {
				name: "repeat()",
				description: "Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form."
			}],
			syntax: "none | <track-list> | <auto-track-list> | subgrid <line-name-list>?",
			relevance: 57,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-columns"
			}],
			description: "specifies, as a space-separated track list, the line names and track sizing functions of the grid.",
			restrictions: ["identifier", "length", "percentage", "enum"]
		}, {
			name: "grid-template-rows",
			values: [{
				name: "none",
				description: "There is no explicit grid; any rows/columns will be implicitly generated."
			}, {
				name: "min-content",
				description: "Represents the largest min-content contribution of the grid items occupying the grid track."
			}, {
				name: "max-content",
				description: "Represents the largest max-content contribution of the grid items occupying the grid track."
			}, {
				name: "auto",
				description: "As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track."
			}, {
				name: "subgrid",
				description: "Indicates that the grid will align to its parent grid in that axis."
			}, {
				name: "minmax()",
				description: "Defines a size range greater than or equal to min and less than or equal to max."
			}, {
				name: "repeat()",
				description: "Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form."
			}],
			syntax: "none | <track-list> | <auto-track-list> | subgrid <line-name-list>?",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-rows"
			}],
			description: "specifies, as a space-separated track list, the line names and track sizing functions of the grid.",
			restrictions: ["identifier", "length", "percentage", "string", "enum"]
		}, {
			name: "height",
			values: [{
				name: "auto",
				description: "The height depends on the values of other properties."
			}, {
				name: "fit-content",
				description: "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode."
			}, {
				name: "max-content",
				description: "Use the max-content inline size or max-content block size, as appropriate to the writing mode."
			}, {
				name: "min-content",
				description: "Use the min-content inline size or min-content block size, as appropriate to the writing mode."
			}],
			syntax: "<viewport-length>{1,2}",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/height"
			}],
			description: "Specifies the height of the content area, padding area or border area (depending on 'box-sizing') of certain boxes.",
			restrictions: ["length", "percentage"]
		}, {
			name: "hyphens",
			values: [{
				name: "auto",
				description: "Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word."
			}, {
				name: "manual",
				description: "Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities"
			}, {
				name: "none",
				description: "Words are not broken at line breaks, even if characters inside the word suggest line break points."
			}],
			syntax: "none | manual | auto",
			relevance: 54,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/hyphens"
			}],
			description: "Controls whether hyphenation is allowed to create more break opportunities within a line of text.",
			restrictions: ["enum"]
		}, {
			name: "image-orientation",
			browsers: ["E81", "FF26", "S13.1", "C81", "O67"],
			values: [{
				name: "flip",
				description: "After rotating by the precededing angle, the image is flipped horizontally. Defaults to 0deg if the angle is ommitted."
			}, {
				name: "from-image",
				description: "If the image has an orientation specified in its metadata, such as EXIF, this value computes to the angle that the metadata specifies is necessary to correctly orient the image."
			}],
			syntax: "from-image | <angle> | [ <angle>? flip ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/image-orientation"
			}],
			description: "Specifies an orthogonal rotation to be applied to an image before it is laid out.",
			restrictions: ["angle"]
		}, {
			name: "image-rendering",
			browsers: ["E79", "FF3.6", "S6", "C13", "O15"],
			values: [{
				name: "auto",
				description: "The image should be scaled with an algorithm that maximizes the appearance of the image."
			}, {
				name: "crisp-edges",
				description: "The image must be scaled with an algorithm that preserves contrast and edges in the image, and which does not smooth colors or introduce blur to the image in the process."
			}, {
				name: "-moz-crisp-edges",
				browsers: ["E79", "FF3.6", "S6", "C13", "O15"]
			}, {
				name: "optimizeQuality",
				description: "Deprecated."
			}, {
				name: "optimizeSpeed",
				description: "Deprecated."
			}, {
				name: "pixelated",
				description: "When scaling the image up, the 'nearest neighbor' or similar algorithm must be used, so that the image appears to be simply composed of very large pixels."
			}],
			syntax: "auto | crisp-edges | pixelated",
			relevance: 56,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/image-rendering"
			}],
			description: "Provides a hint to the user-agent about what aspects of an image are most important to preserve when the image is scaled, to aid the user-agent in the choice of an appropriate scaling algorithm.",
			restrictions: ["enum"]
		}, {
			name: "ime-mode",
			browsers: ["E12", "FF3", "IE5"],
			values: [{
				name: "active",
				description: "The input method editor is initially active; text entry is performed using it unless the user specifically dismisses it."
			}, {
				name: "auto",
				description: "No change is made to the current input method editor state. This is the default."
			}, {
				name: "disabled",
				description: "The input method editor is disabled and may not be activated by the user."
			}, {
				name: "inactive",
				description: "The input method editor is initially inactive, but the user may activate it if they wish."
			}, {
				name: "normal",
				description: "The IME state should be normal; this value can be used in a user style sheet to override the page setting."
			}],
			status: "obsolete",
			syntax: "auto | normal | active | inactive | disabled",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/ime-mode"
			}],
			description: "Controls the state of the input method editor for text fields.",
			restrictions: ["enum"]
		}, {
			name: "inline-size",
			browsers: ["E79", "FF41", "S12.1", "C57", "O44"],
			values: [{
				name: "auto",
				description: "Depends on the values of other properties."
			}],
			syntax: "<'width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inline-size"
			}],
			description: "Logical 'height'. Mapping depends on the element’s 'writing-mode'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "isolation",
			browsers: ["E79", "FF36", "S8", "C41", "O30"],
			values: [{
				name: "auto",
				description: "Elements are not isolated unless an operation is applied that causes the creation of a stacking context."
			}, {
				name: "isolate",
				description: "In CSS will turn the element into a stacking context."
			}],
			syntax: "auto | isolate",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/isolation"
			}],
			description: "In CSS setting to 'isolate' will turn the element into a stacking context. In SVG, it defines whether an element is isolated or not.",
			restrictions: ["enum"]
		}, {
			name: "justify-content",
			values: [{
				name: "center",
				description: "Flex items are packed toward the center of the line."
			}, {
				name: "start",
				description: "The items are packed flush to each other toward the start edge of the alignment container in the main axis."
			}, {
				name: "end",
				description: "The items are packed flush to each other toward the end edge of the alignment container in the main axis."
			}, {
				name: "left",
				description: "The items are packed flush to each other toward the left edge of the alignment container in the main axis."
			}, {
				name: "right",
				description: "The items are packed flush to each other toward the right edge of the alignment container in the main axis."
			}, {
				name: "safe",
				description: "If the size of the item overflows the alignment container, the item is instead aligned as if the alignment mode were start."
			}, {
				name: "unsafe",
				description: "Regardless of the relative sizes of the item and alignment container, the given alignment value is honored."
			}, {
				name: "stretch",
				description: "If the combined size of the alignment subjects is less than the size of the alignment container, any auto-sized alignment subjects have their size increased equally (not proportionally), while still respecting the constraints imposed by max-height/max-width (or equivalent functionality), so that the combined size exactly fills the alignment container."
			}, {
				name: "space-evenly",
				description: "The items are evenly distributed within the alignment container along the main axis."
			}, {
				name: "flex-end",
				description: "Flex items are packed toward the end of the line."
			}, {
				name: "flex-start",
				description: "Flex items are packed toward the start of the line."
			}, {
				name: "space-around",
				description: "Flex items are evenly distributed in the line, with half-size spaces on either end."
			}, {
				name: "space-between",
				description: "Flex items are evenly distributed in the line."
			}, {
				name: "baseline",
				description: "Specifies participation in first-baseline alignment."
			}, {
				name: "first baseline",
				description: "Specifies participation in first-baseline alignment."
			}, {
				name: "last baseline",
				description: "Specifies participation in last-baseline alignment."
			}],
			syntax: "normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]",
			relevance: 84,
			description: "Aligns flex items along the main axis of the current line of the flex container.",
			restrictions: ["enum"]
		}, {
			name: "kerning",
			values: [{
				name: "auto",
				description: "Indicates that the user agent should adjust inter-glyph spacing based on kerning tables that are included in the font that will be used."
			}],
			relevance: 50,
			description: "Indicates whether the user agent should adjust inter-glyph spacing based on kerning tables that are included in the relevant font or instead disable auto-kerning and set inter-character spacing to a specific length.",
			restrictions: ["length", "enum"]
		}, {
			name: "left",
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 95,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/left"
			}],
			description: "Specifies how far an absolutely positioned box's left margin edge is offset to the right of the left edge of the box's 'containing block'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "letter-spacing",
			values: [{
				name: "normal",
				description: "The spacing is the normal spacing for the current font. It is typically zero-length."
			}],
			syntax: "normal | <length>",
			relevance: 81,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/letter-spacing"
			}],
			description: "Specifies the minimum, maximum, and optimal spacing between grapheme clusters.",
			restrictions: ["length"]
		}, {
			name: "lighting-color",
			browsers: ["E", "C5", "FF3", "IE10", "O9", "S6"],
			relevance: 50,
			description: "Defines the color of the light source for filter primitives 'feDiffuseLighting' and 'feSpecularLighting'.",
			restrictions: ["color"]
		}, {
			name: "line-break",
			values: [{
				name: "auto",
				description: "The UA determines the set of line-breaking restrictions to use for CJK scripts, and it may vary the restrictions based on the length of the line; e.g., use a less restrictive set of line-break rules for short lines."
			}, {
				name: "loose",
				description: "Breaks text using the least restrictive set of line-breaking rules. Typically used for short lines, such as in newspapers."
			}, {
				name: "normal",
				description: "Breaks text using the most common set of line-breaking rules."
			}, {
				name: "strict",
				description: "Breaks CJK scripts using a more restrictive set of line-breaking rules than 'normal'."
			}],
			syntax: "auto | loose | normal | strict | anywhere",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/line-break"
			}],
			description: "Specifies what set of line breaking restrictions are in effect within the element.",
			restrictions: ["enum"]
		}, {
			name: "line-height",
			values: [{
				name: "normal",
				description: "Tells user agents to set the computed value to a 'reasonable' value based on the font size of the element."
			}],
			syntax: "normal | <number> | <length> | <percentage>",
			relevance: 93,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/line-height"
			}],
			description: "Determines the block-progression dimension of the text content area of an inline box.",
			restrictions: ["number", "length", "percentage"]
		}, {
			name: "list-style",
			values: [{
				name: "armenian"
			}, {
				name: "circle",
				description: "A hollow circle."
			}, {
				name: "decimal"
			}, {
				name: "decimal-leading-zero"
			}, {
				name: "disc",
				description: "A filled circle."
			}, {
				name: "georgian"
			}, {
				name: "inside",
				description: "The marker box is outside the principal block box, as described in the section on the ::marker pseudo-element below."
			}, {
				name: "lower-alpha"
			}, {
				name: "lower-greek"
			}, {
				name: "lower-latin"
			}, {
				name: "lower-roman"
			}, {
				name: "none"
			}, {
				name: "outside",
				description: "The ::marker pseudo-element is an inline element placed immediately before all ::before pseudo-elements in the principal block box, after which the element's content flows."
			}, {
				name: "square",
				description: "A filled square."
			}, {
				name: "symbols()",
				description: "Allows a counter style to be defined inline."
			}, {
				name: "upper-alpha"
			}, {
				name: "upper-latin"
			}, {
				name: "upper-roman"
			}, {
				name: "url()"
			}],
			syntax: "<'list-style-type'> || <'list-style-position'> || <'list-style-image'>",
			relevance: 85,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/list-style"
			}],
			description: "Shorthand for setting 'list-style-type', 'list-style-position' and 'list-style-image'",
			restrictions: ["image", "enum", "url"]
		}, {
			name: "list-style-image",
			values: [{
				name: "none",
				description: "The default contents of the of the list item’s marker are given by 'list-style-type' instead."
			}],
			syntax: "<image> | none",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/list-style-image"
			}],
			description: "Sets the image that will be used as the list item marker. When the image is available, it will replace the marker set with the 'list-style-type' marker.",
			restrictions: ["image"]
		}, {
			name: "list-style-position",
			values: [{
				name: "inside",
				description: "The marker box is outside the principal block box, as described in the section on the ::marker pseudo-element below."
			}, {
				name: "outside",
				description: "The ::marker pseudo-element is an inline element placed immediately before all ::before pseudo-elements in the principal block box, after which the element's content flows."
			}],
			syntax: "inside | outside",
			relevance: 55,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/list-style-position"
			}],
			description: "Specifies the position of the '::marker' pseudo-element's box in the list item.",
			restrictions: ["enum"]
		}, {
			name: "list-style-type",
			values: [{
				name: "armenian",
				description: "Traditional uppercase Armenian numbering."
			}, {
				name: "circle",
				description: "A hollow circle."
			}, {
				name: "decimal",
				description: "Western decimal numbers."
			}, {
				name: "decimal-leading-zero",
				description: "Decimal numbers padded by initial zeros."
			}, {
				name: "disc",
				description: "A filled circle."
			}, {
				name: "georgian",
				description: "Traditional Georgian numbering."
			}, {
				name: "lower-alpha",
				description: "Lowercase ASCII letters."
			}, {
				name: "lower-greek",
				description: "Lowercase classical Greek."
			}, {
				name: "lower-latin",
				description: "Lowercase ASCII letters."
			}, {
				name: "lower-roman",
				description: "Lowercase ASCII Roman numerals."
			}, {
				name: "none",
				description: "No marker"
			}, {
				name: "square",
				description: "A filled square."
			}, {
				name: "symbols()",
				description: "Allows a counter style to be defined inline."
			}, {
				name: "upper-alpha",
				description: "Uppercase ASCII letters."
			}, {
				name: "upper-latin",
				description: "Uppercase ASCII letters."
			}, {
				name: "upper-roman",
				description: "Uppercase ASCII Roman numerals."
			}],
			syntax: "<counter-style> | <string> | none",
			relevance: 75,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/list-style-type"
			}],
			description: "Used to construct the default contents of a list item’s marker",
			restrictions: ["enum", "string"]
		}, {
			name: "margin",
			values: [{
				name: "auto"
			}],
			syntax: "[ <length> | <percentage> | auto ]{1,4}",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin"
			}],
			description: "Shorthand property to set values the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits.",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-block-end",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			values: [{
				name: "auto"
			}],
			syntax: "<'margin-left'>",
			relevance: 54,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-block-end"
			}],
			description: "Logical 'margin-bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-block-start",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			values: [{
				name: "auto"
			}],
			syntax: "<'margin-left'>",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-block-start"
			}],
			description: "Logical 'margin-top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-bottom",
			values: [{
				name: "auto"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-bottom"
			}],
			description: "Shorthand property to set values the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-inline-end",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			values: [{
				name: "auto"
			}],
			syntax: "<'margin-left'>",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline-end"
			}],
			description: "Logical 'margin-right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-inline-start",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			values: [{
				name: "auto"
			}],
			syntax: "<'margin-left'>",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline-start"
			}],
			description: "Logical 'margin-left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-left",
			values: [{
				name: "auto"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-left"
			}],
			description: "Shorthand property to set values the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-right",
			values: [{
				name: "auto"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 91,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-right"
			}],
			description: "Shorthand property to set values the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			restrictions: ["length", "percentage"]
		}, {
			name: "margin-top",
			values: [{
				name: "auto"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 95,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-top"
			}],
			description: "Shorthand property to set values the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			restrictions: ["length", "percentage"]
		}, {
			name: "marker",
			values: [{
				name: "none",
				description: "Indicates that no marker symbol will be drawn at the given vertex or vertices."
			}, {
				name: "url()",
				description: "Indicates that the <marker> element referenced will be used."
			}],
			relevance: 50,
			description: "Specifies the marker symbol that shall be used for all points on the sets the value for all vertices on the given ‘path’ element or basic shape.",
			restrictions: ["url"]
		}, {
			name: "marker-end",
			values: [{
				name: "none",
				description: "Indicates that no marker symbol will be drawn at the given vertex or vertices."
			}, {
				name: "url()",
				description: "Indicates that the <marker> element referenced will be used."
			}],
			relevance: 50,
			description: "Specifies the marker that will be drawn at the last vertices of the given markable element.",
			restrictions: ["url"]
		}, {
			name: "marker-mid",
			values: [{
				name: "none",
				description: "Indicates that no marker symbol will be drawn at the given vertex or vertices."
			}, {
				name: "url()",
				description: "Indicates that the <marker> element referenced will be used."
			}],
			relevance: 50,
			description: "Specifies the marker that will be drawn at all vertices except the first and last.",
			restrictions: ["url"]
		}, {
			name: "marker-start",
			values: [{
				name: "none",
				description: "Indicates that no marker symbol will be drawn at the given vertex or vertices."
			}, {
				name: "url()",
				description: "Indicates that the <marker> element referenced will be used."
			}],
			relevance: 50,
			description: "Specifies the marker that will be drawn at the first vertices of the given markable element.",
			restrictions: ["url"]
		}, {
			name: "mask-image",
			browsers: ["E16", "FF53", "S4", "C1", "O15"],
			values: [{
				name: "none",
				description: "Counts as a transparent black image layer."
			}, {
				name: "url()",
				description: "Reference to a <mask element or to a CSS image."
			}],
			syntax: "<mask-reference>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-image"
			}],
			description: "Sets the mask layer image of an element.",
			restrictions: ["url", "image", "enum"]
		}, {
			name: "mask-mode",
			browsers: ["FF53"],
			values: [{
				name: "alpha",
				description: "Alpha values of the mask layer image should be used as the mask values."
			}, {
				name: "auto",
				description: "Use alpha values if 'mask-image' is an image, luminance if a <mask> element or a CSS image."
			}, {
				name: "luminance",
				description: "Luminance values of the mask layer image should be used as the mask values."
			}],
			syntax: "<masking-mode>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-mode"
			}],
			description: "Indicates whether the mask layer image is treated as luminance mask or alpha mask.",
			restrictions: ["url", "image", "enum"]
		}, {
			name: "mask-origin",
			browsers: ["E79", "FF53", "S4", "C1", "O15"],
			syntax: "<geometry-box>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-origin"
			}],
			description: "Specifies the mask positioning area.",
			restrictions: ["geometry-box", "enum"]
		}, {
			name: "mask-position",
			browsers: ["E18", "FF53", "S3.2", "C1", "O15"],
			syntax: "<position>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-position"
			}],
			description: "Specifies how mask layer images are positioned.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "mask-repeat",
			browsers: ["E18", "FF53", "S3.2", "C1", "O15"],
			syntax: "<repeat-style>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-repeat"
			}],
			description: "Specifies how mask layer images are tiled after they have been sized and positioned.",
			restrictions: ["repeat"]
		}, {
			name: "mask-size",
			browsers: ["E18", "FF53", "S4", "C4", "O15"],
			values: [{
				name: "auto",
				description: "Resolved by using the image’s intrinsic ratio and the size of the other dimension, or failing that, using the image’s intrinsic size, or failing that, treating it as 100%."
			}, {
				name: "contain",
				description: "Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area."
			}, {
				name: "cover",
				description: "Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area."
			}],
			syntax: "<bg-size>#",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-size"
			}],
			description: "Specifies the size of the mask layer images.",
			restrictions: ["length", "percentage", "enum"]
		}, {
			name: "mask-type",
			browsers: ["E79", "FF35", "S6.1", "C24", "O15"],
			values: [{
				name: "alpha",
				description: "Indicates that the alpha values of the mask should be used."
			}, {
				name: "luminance",
				description: "Indicates that the luminance values of the mask should be used."
			}],
			syntax: "luminance | alpha",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-type"
			}],
			description: "Defines whether the content of the <mask> element is treated as as luminance mask or alpha mask.",
			restrictions: ["enum"]
		}, {
			name: "max-block-size",
			browsers: ["E79", "FF41", "S12.1", "C57", "O44"],
			values: [{
				name: "none",
				description: "No limit on the width of the box."
			}],
			syntax: "<'max-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/max-block-size"
			}],
			description: "Logical 'max-width'. Mapping depends on the element’s 'writing-mode'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "max-height",
			values: [{
				name: "none",
				description: "No limit on the height of the box."
			}, {
				name: "fit-content",
				description: "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode."
			}, {
				name: "max-content",
				description: "Use the max-content inline size or max-content block size, as appropriate to the writing mode."
			}, {
				name: "min-content",
				description: "Use the min-content inline size or min-content block size, as appropriate to the writing mode."
			}],
			syntax: "<viewport-length>",
			relevance: 86,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/max-height"
			}],
			description: "Allows authors to constrain content height to a certain range.",
			restrictions: ["length", "percentage"]
		}, {
			name: "max-inline-size",
			browsers: ["E79", "FF41", "S12.1", "C57", "O44"],
			values: [{
				name: "none",
				description: "No limit on the height of the box."
			}],
			syntax: "<'max-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/max-inline-size"
			}],
			description: "Logical 'max-height'. Mapping depends on the element’s 'writing-mode'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "max-width",
			values: [{
				name: "none",
				description: "No limit on the width of the box."
			}, {
				name: "fit-content",
				description: "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode."
			}, {
				name: "max-content",
				description: "Use the max-content inline size or max-content block size, as appropriate to the writing mode."
			}, {
				name: "min-content",
				description: "Use the min-content inline size or min-content block size, as appropriate to the writing mode."
			}],
			syntax: "<viewport-length>",
			relevance: 91,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/max-width"
			}],
			description: "Allows authors to constrain content width to a certain range.",
			restrictions: ["length", "percentage"]
		}, {
			name: "min-block-size",
			browsers: ["E79", "FF41", "S12.1", "C57", "O44"],
			syntax: "<'min-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/min-block-size"
			}],
			description: "Logical 'min-width'. Mapping depends on the element’s 'writing-mode'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "min-height",
			values: [{
				name: "auto"
			}, {
				name: "fit-content",
				description: "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode."
			}, {
				name: "max-content",
				description: "Use the max-content inline size or max-content block size, as appropriate to the writing mode."
			}, {
				name: "min-content",
				description: "Use the min-content inline size or min-content block size, as appropriate to the writing mode."
			}],
			syntax: "<viewport-length>",
			relevance: 89,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/min-height"
			}],
			description: "Allows authors to constrain content height to a certain range.",
			restrictions: ["length", "percentage"]
		}, {
			name: "min-inline-size",
			browsers: ["E79", "FF41", "S12.1", "C57", "O44"],
			syntax: "<'min-width'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/min-inline-size"
			}],
			description: "Logical 'min-height'. Mapping depends on the element’s 'writing-mode'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "min-width",
			values: [{
				name: "auto"
			}, {
				name: "fit-content",
				description: "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode."
			}, {
				name: "max-content",
				description: "Use the max-content inline size or max-content block size, as appropriate to the writing mode."
			}, {
				name: "min-content",
				description: "Use the min-content inline size or min-content block size, as appropriate to the writing mode."
			}],
			syntax: "<viewport-length>",
			relevance: 88,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/min-width"
			}],
			description: "Allows authors to constrain content width to a certain range.",
			restrictions: ["length", "percentage"]
		}, {
			name: "mix-blend-mode",
			browsers: ["E79", "FF32", "S8", "C41", "O28"],
			values: [{
				name: "normal",
				description: "Default attribute which specifies no blending"
			}, {
				name: "multiply",
				description: "The source color is multiplied by the destination color and replaces the destination."
			}, {
				name: "screen",
				description: "Multiplies the complements of the backdrop and source color values, then complements the result."
			}, {
				name: "overlay",
				description: "Multiplies or screens the colors, depending on the backdrop color value."
			}, {
				name: "darken",
				description: "Selects the darker of the backdrop and source colors."
			}, {
				name: "lighten",
				description: "Selects the lighter of the backdrop and source colors."
			}, {
				name: "color-dodge",
				description: "Brightens the backdrop color to reflect the source color."
			}, {
				name: "color-burn",
				description: "Darkens the backdrop color to reflect the source color."
			}, {
				name: "hard-light",
				description: "Multiplies or screens the colors, depending on the source color value."
			}, {
				name: "soft-light",
				description: "Darkens or lightens the colors, depending on the source color value."
			}, {
				name: "difference",
				description: "Subtracts the darker of the two constituent colors from the lighter color.."
			}, {
				name: "exclusion",
				description: "Produces an effect similar to that of the Difference mode but lower in contrast."
			}, {
				name: "hue",
				browsers: ["E79", "FF32", "S8", "C41", "O28"],
				description: "Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color."
			}, {
				name: "saturation",
				browsers: ["E79", "FF32", "S8", "C41", "O28"],
				description: "Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color."
			}, {
				name: "color",
				browsers: ["E79", "FF32", "S8", "C41", "O28"],
				description: "Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color."
			}, {
				name: "luminosity",
				browsers: ["E79", "FF32", "S8", "C41", "O28"],
				description: "Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color."
			}],
			syntax: "<blend-mode>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode"
			}],
			description: "Defines the formula that must be used to mix the colors with the backdrop.",
			restrictions: ["enum"]
		}, {
			name: "motion",
			browsers: ["C46", "O33"],
			values: [{
				name: "none",
				description: "No motion path gets created."
			}, {
				name: "path()",
				description: "Defines an SVG path as a string, with optional 'fill-rule' as the first argument."
			}, {
				name: "auto",
				description: "Indicates that the object is rotated by the angle of the direction of the motion path."
			}, {
				name: "reverse",
				description: "Indicates that the object is rotated by the angle of the direction of the motion path plus 180 degrees."
			}],
			relevance: 50,
			description: "Shorthand property for setting 'motion-path', 'motion-offset' and 'motion-rotation'.",
			restrictions: ["url", "length", "percentage", "angle", "shape", "geometry-box", "enum"]
		}, {
			name: "motion-offset",
			browsers: ["C46", "O33"],
			relevance: 50,
			description: "A distance that describes the position along the specified motion path.",
			restrictions: ["length", "percentage"]
		}, {
			name: "motion-path",
			browsers: ["C46", "O33"],
			values: [{
				name: "none",
				description: "No motion path gets created."
			}, {
				name: "path()",
				description: "Defines an SVG path as a string, with optional 'fill-rule' as the first argument."
			}],
			relevance: 50,
			description: "Specifies the motion path the element gets positioned at.",
			restrictions: ["url", "shape", "geometry-box", "enum"]
		}, {
			name: "motion-rotation",
			browsers: ["C46", "O33"],
			values: [{
				name: "auto",
				description: "Indicates that the object is rotated by the angle of the direction of the motion path."
			}, {
				name: "reverse",
				description: "Indicates that the object is rotated by the angle of the direction of the motion path plus 180 degrees."
			}],
			relevance: 50,
			description: "Defines the direction of the element while positioning along the motion path.",
			restrictions: ["angle"]
		}, {
			name: "-moz-animation",
			browsers: ["FF9"],
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}, {
				name: "none",
				description: "No animation is performed"
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			relevance: 50,
			description: "Shorthand property combines six of the animation properties into a single property.",
			restrictions: ["time", "enum", "timing-function", "identifier", "number"]
		}, {
			name: "-moz-animation-delay",
			browsers: ["FF9"],
			relevance: 50,
			description: "Defines when the animation will start.",
			restrictions: ["time"]
		}, {
			name: "-moz-animation-direction",
			browsers: ["FF9"],
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			relevance: 50,
			description: "Defines whether or not the animation should play in reverse on alternate cycles.",
			restrictions: ["enum"]
		}, {
			name: "-moz-animation-duration",
			browsers: ["FF9"],
			relevance: 50,
			description: "Defines the length of time that an animation takes to complete one cycle.",
			restrictions: ["time"]
		}, {
			name: "-moz-animation-iteration-count",
			browsers: ["FF9"],
			values: [{
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}],
			relevance: 50,
			description: "Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.",
			restrictions: ["number", "enum"]
		}, {
			name: "-moz-animation-name",
			browsers: ["FF9"],
			values: [{
				name: "none",
				description: "No animation is performed"
			}],
			relevance: 50,
			description: "Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.",
			restrictions: ["identifier", "enum"]
		}, {
			name: "-moz-animation-play-state",
			browsers: ["FF9"],
			values: [{
				name: "paused",
				description: "A running animation will be paused."
			}, {
				name: "running",
				description: "Resume playback of a paused animation."
			}],
			relevance: 50,
			description: "Defines whether the animation is running or paused.",
			restrictions: ["enum"]
		}, {
			name: "-moz-animation-timing-function",
			browsers: ["FF9"],
			relevance: 50,
			description: "Describes how the animation will progress over one cycle of its duration. See the 'transition-timing-function'.",
			restrictions: ["timing-function"]
		}, {
			name: "-moz-appearance",
			browsers: ["FF1"],
			values: [{
				name: "button"
			}, {
				name: "button-arrow-down"
			}, {
				name: "button-arrow-next"
			}, {
				name: "button-arrow-previous"
			}, {
				name: "button-arrow-up"
			}, {
				name: "button-bevel"
			}, {
				name: "checkbox"
			}, {
				name: "checkbox-container"
			}, {
				name: "checkbox-label"
			}, {
				name: "dialog"
			}, {
				name: "groupbox"
			}, {
				name: "listbox"
			}, {
				name: "menuarrow"
			}, {
				name: "menuimage"
			}, {
				name: "menuitem"
			}, {
				name: "menuitemtext"
			}, {
				name: "menulist"
			}, {
				name: "menulist-button"
			}, {
				name: "menulist-text"
			}, {
				name: "menulist-textfield"
			}, {
				name: "menupopup"
			}, {
				name: "menuradio"
			}, {
				name: "menuseparator"
			}, {
				name: "-moz-mac-unified-toolbar"
			}, {
				name: "-moz-win-borderless-glass"
			}, {
				name: "-moz-win-browsertabbar-toolbox"
			}, {
				name: "-moz-win-communications-toolbox"
			}, {
				name: "-moz-win-glass"
			}, {
				name: "-moz-win-media-toolbox"
			}, {
				name: "none"
			}, {
				name: "progressbar"
			}, {
				name: "progresschunk"
			}, {
				name: "radio"
			}, {
				name: "radio-container"
			}, {
				name: "radio-label"
			}, {
				name: "radiomenuitem"
			}, {
				name: "resizer"
			}, {
				name: "resizerpanel"
			}, {
				name: "scrollbarbutton-down"
			}, {
				name: "scrollbarbutton-left"
			}, {
				name: "scrollbarbutton-right"
			}, {
				name: "scrollbarbutton-up"
			}, {
				name: "scrollbar-small"
			}, {
				name: "scrollbartrack-horizontal"
			}, {
				name: "scrollbartrack-vertical"
			}, {
				name: "separator"
			}, {
				name: "spinner"
			}, {
				name: "spinner-downbutton"
			}, {
				name: "spinner-textfield"
			}, {
				name: "spinner-upbutton"
			}, {
				name: "statusbar"
			}, {
				name: "statusbarpanel"
			}, {
				name: "tab"
			}, {
				name: "tabpanels"
			}, {
				name: "tab-scroll-arrow-back"
			}, {
				name: "tab-scroll-arrow-forward"
			}, {
				name: "textfield"
			}, {
				name: "textfield-multiline"
			}, {
				name: "toolbar"
			}, {
				name: "toolbox"
			}, {
				name: "tooltip"
			}, {
				name: "treeheadercell"
			}, {
				name: "treeheadersortarrow"
			}, {
				name: "treeitem"
			}, {
				name: "treetwistyopen"
			}, {
				name: "treeview"
			}, {
				name: "treewisty"
			}, {
				name: "window"
			}],
			status: "nonstandard",
			syntax: "none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized",
			relevance: 0,
			description: "Used in Gecko (Firefox) to display an element using a platform-native styling based on the operating system's theme.",
			restrictions: ["enum"]
		}, {
			name: "-moz-backface-visibility",
			browsers: ["FF10"],
			values: [{
				name: "hidden"
			}, {
				name: "visible"
			}],
			relevance: 50,
			description: "Determines whether or not the 'back' side of a transformed element is visible when facing the viewer. With an identity transform, the front side of an element faces the viewer.",
			restrictions: ["enum"]
		}, {
			name: "-moz-background-clip",
			browsers: ["FF1-3.6"],
			values: [{
				name: "padding"
			}],
			relevance: 50,
			description: "Determines the background painting area.",
			restrictions: ["box", "enum"]
		}, {
			name: "-moz-background-inline-policy",
			browsers: ["FF1"],
			values: [{
				name: "bounding-box"
			}, {
				name: "continuous"
			}, {
				name: "each-box"
			}],
			relevance: 50,
			description: "In Gecko-based applications like Firefox, the -moz-background-inline-policy CSS property specifies how the background image of an inline element is determined when the content of the inline element wraps onto multiple lines. The choice of position has significant effects on repetition.",
			restrictions: ["enum"]
		}, {
			name: "-moz-background-origin",
			browsers: ["FF1"],
			relevance: 50,
			description: "For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).",
			restrictions: ["box"]
		}, {
			name: "-moz-border-bottom-colors",
			browsers: ["FF1"],
			status: "nonstandard",
			syntax: "<color>+ | none",
			relevance: 0,
			description: "Sets a list of colors for the bottom border.",
			restrictions: ["color"]
		}, {
			name: "-moz-border-image",
			browsers: ["FF3.6"],
			values: [{
				name: "auto",
				description: "If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead."
			}, {
				name: "fill",
				description: "Causes the middle part of the border-image to be preserved."
			}, {
				name: "none"
			}, {
				name: "repeat",
				description: "The image is tiled (repeated) to fill the area."
			}, {
				name: "round",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does."
			}, {
				name: "space",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles."
			}, {
				name: "stretch",
				description: "The image is stretched to fill the area."
			}, {
				name: "url()"
			}],
			relevance: 50,
			description: "Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.",
			restrictions: ["length", "percentage", "number", "url", "enum"]
		}, {
			name: "-moz-border-left-colors",
			browsers: ["FF1"],
			status: "nonstandard",
			syntax: "<color>+ | none",
			relevance: 0,
			description: "Sets a list of colors for the bottom border.",
			restrictions: ["color"]
		}, {
			name: "-moz-border-right-colors",
			browsers: ["FF1"],
			status: "nonstandard",
			syntax: "<color>+ | none",
			relevance: 0,
			description: "Sets a list of colors for the bottom border.",
			restrictions: ["color"]
		}, {
			name: "-moz-border-top-colors",
			browsers: ["FF1"],
			status: "nonstandard",
			syntax: "<color>+ | none",
			relevance: 0,
			description: "Ske Firefox, -moz-border-bottom-colors sets a list of colors for the bottom border.",
			restrictions: ["color"]
		}, {
			name: "-moz-box-align",
			browsers: ["FF1"],
			values: [{
				name: "baseline",
				description: "If this box orientation is inline-axis or horizontal, all children are placed with their baselines aligned, and extra space placed before or after as necessary. For block flows, the baseline of the first non-empty line box located within the element is used. For tables, the baseline of the first cell is used."
			}, {
				name: "center",
				description: "Any extra space is divided evenly, with half placed above the child and the other half placed after the child."
			}, {
				name: "end",
				description: "For normal direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element. For reverse direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element."
			}, {
				name: "start",
				description: "For normal direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element. For reverse direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element."
			}, {
				name: "stretch",
				description: "The height of each child is adjusted to that of the containing block."
			}],
			relevance: 50,
			description: "Specifies how a XUL box aligns its contents across (perpendicular to) the direction of its layout. The effect of this is only visible if there is extra space in the box.",
			restrictions: ["enum"]
		}, {
			name: "-moz-box-direction",
			browsers: ["FF1"],
			values: [{
				name: "normal",
				description: "A box with a computed value of horizontal for box-orient displays its children from left to right. A box with a computed value of vertical displays its children from top to bottom."
			}, {
				name: "reverse",
				description: "A box with a computed value of horizontal for box-orient displays its children from right to left. A box with a computed value of vertical displays its children from bottom to top."
			}],
			relevance: 50,
			description: "Specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).",
			restrictions: ["enum"]
		}, {
			name: "-moz-box-flex",
			browsers: ["FF1"],
			relevance: 50,
			description: "Specifies how a box grows to fill the box that contains it, in the direction of the containing box's layout.",
			restrictions: ["number"]
		}, {
			name: "-moz-box-flexgroup",
			browsers: ["FF1"],
			relevance: 50,
			description: "Flexible elements can be assigned to flex groups using the 'box-flex-group' property.",
			restrictions: ["integer"]
		}, {
			name: "-moz-box-ordinal-group",
			browsers: ["FF1"],
			relevance: 50,
			description: "Indicates the ordinal group the element belongs to. Elements with a lower ordinal group are displayed before those with a higher ordinal group.",
			restrictions: ["integer"]
		}, {
			name: "-moz-box-orient",
			browsers: ["FF1"],
			values: [{
				name: "block-axis",
				description: "Elements are oriented along the box's axis."
			}, {
				name: "horizontal",
				description: "The box displays its children from left to right in a horizontal line."
			}, {
				name: "inline-axis",
				description: "Elements are oriented vertically."
			}, {
				name: "vertical",
				description: "The box displays its children from stacked from top to bottom vertically."
			}],
			relevance: 50,
			description: "In Mozilla applications, -moz-box-orient specifies whether a box lays out its contents horizontally or vertically.",
			restrictions: ["enum"]
		}, {
			name: "-moz-box-pack",
			browsers: ["FF1"],
			values: [{
				name: "center",
				description: "The extra space is divided evenly, with half placed before the first child and the other half placed after the last child."
			}, {
				name: "end",
				description: "For normal direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child. For reverse direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child."
			}, {
				name: "justify",
				description: "The space is divided evenly in-between each child, with none of the extra space placed before the first child or after the last child. If there is only one child, treat the pack value as if it were start."
			}, {
				name: "start",
				description: "For normal direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child. For reverse direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child."
			}],
			relevance: 50,
			description: "Specifies how a box packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.",
			restrictions: ["enum"]
		}, {
			name: "-moz-box-sizing",
			browsers: ["FF1"],
			values: [{
				name: "border-box",
				description: "The specified width and height (and respective min/max properties) on this element determine the border box of the element."
			}, {
				name: "content-box",
				description: "Behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element."
			}, {
				name: "padding-box",
				description: "The specified width and height (and respective min/max properties) on this element determine the padding box of the element."
			}],
			relevance: 50,
			description: "Box Model addition in CSS3.",
			restrictions: ["enum"]
		}, {
			name: "-moz-column-count",
			browsers: ["FF3.5"],
			values: [{
				name: "auto",
				description: "Determines the number of columns by the 'column-width' property and the element width."
			}],
			relevance: 50,
			description: "Describes the optimal number of columns into which the content of the element will be flowed.",
			restrictions: ["integer"]
		}, {
			name: "-moz-column-gap",
			browsers: ["FF3.5"],
			values: [{
				name: "normal",
				description: "User agent specific and typically equivalent to 1em."
			}],
			relevance: 50,
			description: "Sets the gap between columns. If there is a column rule between columns, it will appear in the middle of the gap.",
			restrictions: ["length"]
		}, {
			name: "-moz-column-rule",
			browsers: ["FF3.5"],
			relevance: 50,
			description: "Shorthand for setting 'column-rule-width', 'column-rule-style', and 'column-rule-color' at the same place in the style sheet. Omitted values are set to their initial values.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "-moz-column-rule-color",
			browsers: ["FF3.5"],
			relevance: 50,
			description: "Sets the color of the column rule",
			restrictions: ["color"]
		}, {
			name: "-moz-column-rule-style",
			browsers: ["FF3.5"],
			relevance: 50,
			description: "Sets the style of the rule between columns of an element.",
			restrictions: ["line-style"]
		}, {
			name: "-moz-column-rule-width",
			browsers: ["FF3.5"],
			relevance: 50,
			description: "Sets the width of the rule between columns. Negative values are not allowed.",
			restrictions: ["length", "line-width"]
		}, {
			name: "-moz-columns",
			browsers: ["FF9"],
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}],
			relevance: 50,
			description: "A shorthand property which sets both 'column-width' and 'column-count'.",
			restrictions: ["length", "integer"]
		}, {
			name: "-moz-column-width",
			browsers: ["FF3.5"],
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}],
			relevance: 50,
			description: "This property describes the width of columns in multicol elements.",
			restrictions: ["length"]
		}, {
			name: "-moz-font-feature-settings",
			browsers: ["FF4"],
			values: [{
				name: '"c2cs"'
			}, {
				name: '"dlig"'
			}, {
				name: '"kern"'
			}, {
				name: '"liga"'
			}, {
				name: '"lnum"'
			}, {
				name: '"onum"'
			}, {
				name: '"smcp"'
			}, {
				name: '"swsh"'
			}, {
				name: '"tnum"'
			}, {
				name: "normal",
				description: "No change in glyph substitution or positioning occurs."
			}, {
				name: "off",
				browsers: ["FF4"]
			}, {
				name: "on",
				browsers: ["FF4"]
			}],
			relevance: 50,
			description: "Provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case.",
			restrictions: ["string", "integer"]
		}, {
			name: "-moz-hyphens",
			browsers: ["FF9"],
			values: [{
				name: "auto",
				description: "Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word."
			}, {
				name: "manual",
				description: "Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities"
			}, {
				name: "none",
				description: "Words are not broken at line breaks, even if characters inside the word suggest line break points."
			}],
			relevance: 50,
			description: "Controls whether hyphenation is allowed to create more break opportunities within a line of text.",
			restrictions: ["enum"]
		}, {
			name: "-moz-perspective",
			browsers: ["FF10"],
			values: [{
				name: "none",
				description: "No perspective transform is applied."
			}],
			relevance: 50,
			description: "Applies the same transform as the perspective(<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.",
			restrictions: ["length"]
		}, {
			name: "-moz-perspective-origin",
			browsers: ["FF10"],
			relevance: 50,
			description: "Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.",
			restrictions: ["position", "percentage", "length"]
		}, {
			name: "-moz-text-align-last",
			browsers: ["FF12"],
			values: [{
				name: "auto"
			}, {
				name: "center",
				description: "The inline contents are centered within the line box."
			}, {
				name: "justify",
				description: "The text is justified according to the method specified by the 'text-justify' property."
			}, {
				name: "left",
				description: "The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text."
			}, {
				name: "right",
				description: "The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text."
			}],
			relevance: 50,
			description: "Describes how the last line of a block or a line right before a forced line break is aligned when 'text-align' is set to 'justify'.",
			restrictions: ["enum"]
		}, {
			name: "-moz-text-decoration-color",
			browsers: ["FF6"],
			relevance: 50,
			description: "Specifies the color of text decoration (underlines overlines, and line-throughs) set on the element with text-decoration-line.",
			restrictions: ["color"]
		}, {
			name: "-moz-text-decoration-line",
			browsers: ["FF6"],
			values: [{
				name: "line-through",
				description: "Each line of text has a line through the middle."
			}, {
				name: "none",
				description: "Neither produces nor inhibits text decoration."
			}, {
				name: "overline",
				description: "Each line of text has a line above it."
			}, {
				name: "underline",
				description: "Each line of text is underlined."
			}],
			relevance: 50,
			description: "Specifies what line decorations, if any, are added to the element.",
			restrictions: ["enum"]
		}, {
			name: "-moz-text-decoration-style",
			browsers: ["FF6"],
			values: [{
				name: "dashed",
				description: "Produces a dashed line style."
			}, {
				name: "dotted",
				description: "Produces a dotted line."
			}, {
				name: "double",
				description: "Produces a double line."
			}, {
				name: "none",
				description: "Produces no line."
			}, {
				name: "solid",
				description: "Produces a solid line."
			}, {
				name: "wavy",
				description: "Produces a wavy line."
			}],
			relevance: 50,
			description: "Specifies the line style for underline, line-through and overline text decoration.",
			restrictions: ["enum"]
		}, {
			name: "-moz-text-size-adjust",
			browsers: ["FF"],
			values: [{
				name: "auto",
				description: "Renderers must use the default size adjustment when displaying on a small device."
			}, {
				name: "none",
				description: "Renderers must not do size adjustment when displaying on a small device."
			}],
			relevance: 50,
			description: "Specifies a size adjustment for displaying text content in mobile browsers.",
			restrictions: ["enum", "percentage"]
		}, {
			name: "-moz-transform",
			browsers: ["FF3.5"],
			values: [{
				name: "matrix()",
				description: "Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f]"
			}, {
				name: "matrix3d()",
				description: "Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order."
			}, {
				name: "none"
			}, {
				name: "perspective",
				description: "Specifies a perspective projection matrix."
			}, {
				name: "rotate()",
				description: "Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property."
			}, {
				name: "rotate3d()",
				description: "Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters."
			}, {
				name: "rotateX('angle')",
				description: "Specifies a clockwise rotation by the given angle about the X axis."
			}, {
				name: "rotateY('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Y axis."
			}, {
				name: "rotateZ('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Z axis."
			}, {
				name: "scale()",
				description: "Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first."
			}, {
				name: "scale3d()",
				description: "Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters."
			}, {
				name: "scaleX()",
				description: "Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter."
			}, {
				name: "scaleY()",
				description: "Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter."
			}, {
				name: "scaleZ()",
				description: "Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter."
			}, {
				name: "skew()",
				description: "Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis)."
			}, {
				name: "skewX()",
				description: "Specifies a skew transformation along the X axis by the given angle."
			}, {
				name: "skewY()",
				description: "Specifies a skew transformation along the Y axis by the given angle."
			}, {
				name: "translate()",
				description: "Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter."
			}, {
				name: "translate3d()",
				description: "Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively."
			}, {
				name: "translateX()",
				description: "Specifies a translation by the given amount in the X direction."
			}, {
				name: "translateY()",
				description: "Specifies a translation by the given amount in the Y direction."
			}, {
				name: "translateZ()",
				description: "Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0."
			}],
			relevance: 50,
			description: "A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.",
			restrictions: ["enum"]
		}, {
			name: "-moz-transform-origin",
			browsers: ["FF3.5"],
			relevance: 50,
			description: "Establishes the origin of transformation for an element.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "-moz-transition",
			browsers: ["FF4"],
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			relevance: 50,
			description: "Shorthand property combines four of the transition properties into a single property.",
			restrictions: ["time", "property", "timing-function", "enum"]
		}, {
			name: "-moz-transition-delay",
			browsers: ["FF4"],
			relevance: 50,
			description: "Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.",
			restrictions: ["time"]
		}, {
			name: "-moz-transition-duration",
			browsers: ["FF4"],
			relevance: 50,
			description: "Specifies how long the transition from the old value to the new value should take.",
			restrictions: ["time"]
		}, {
			name: "-moz-transition-property",
			browsers: ["FF4"],
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			relevance: 50,
			description: "Specifies the name of the CSS property to which the transition is applied.",
			restrictions: ["property"]
		}, {
			name: "-moz-transition-timing-function",
			browsers: ["FF4"],
			relevance: 50,
			description: "Describes how the intermediate values used during a transition will be calculated.",
			restrictions: ["timing-function"]
		}, {
			name: "-moz-user-focus",
			browsers: ["FF1"],
			values: [{
				name: "ignore"
			}, {
				name: "normal"
			}],
			status: "nonstandard",
			syntax: "ignore | normal | select-after | select-before | select-menu | select-same | select-all | none",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-focus"
			}],
			description: "Used to indicate whether the element can have focus."
		}, {
			name: "-moz-user-select",
			browsers: ["FF1.5"],
			values: [{
				name: "all"
			}, {
				name: "element"
			}, {
				name: "elements"
			}, {
				name: "-moz-all"
			}, {
				name: "-moz-none"
			}, {
				name: "none"
			}, {
				name: "text"
			}, {
				name: "toggle"
			}],
			relevance: 50,
			description: "Controls the appearance of selection.",
			restrictions: ["enum"]
		}, {
			name: "-ms-accelerator",
			browsers: ["E", "IE10"],
			values: [{
				name: "false",
				description: "The element does not contain an accelerator key sequence."
			}, {
				name: "true",
				description: "The element contains an accelerator key sequence."
			}],
			status: "nonstandard",
			syntax: "false | true",
			relevance: 0,
			description: "IE only. Has the ability to turn off its system underlines for accelerator keys until the ALT key is pressed",
			restrictions: ["enum"]
		}, {
			name: "-ms-behavior",
			browsers: ["IE8"],
			relevance: 50,
			description: "IE only. Used to extend behaviors of the browser",
			restrictions: ["url"]
		}, {
			name: "-ms-block-progression",
			browsers: ["IE8"],
			values: [{
				name: "bt",
				description: "Bottom-to-top block flow. Layout is horizontal."
			}, {
				name: "lr",
				description: "Left-to-right direction. The flow orientation is vertical."
			}, {
				name: "rl",
				description: "Right-to-left direction. The flow orientation is vertical."
			}, {
				name: "tb",
				description: "Top-to-bottom direction. The flow orientation is horizontal."
			}],
			status: "nonstandard",
			syntax: "tb | rl | bt | lr",
			relevance: 0,
			description: "Sets the block-progression value and the flow orientation",
			restrictions: ["enum"]
		}, {
			name: "-ms-content-zoom-chaining",
			browsers: ["E", "IE10"],
			values: [{
				name: "chained",
				description: "The nearest zoomable parent element begins zooming when the user hits a zoom limit during a manipulation. No bounce effect is shown."
			}, {
				name: "none",
				description: "A bounce effect is shown when the user hits a zoom limit during a manipulation."
			}],
			status: "nonstandard",
			syntax: "none | chained",
			relevance: 0,
			description: "Specifies the zoom behavior that occurs when a user hits the zoom limit during a manipulation."
		}, {
			name: "-ms-content-zooming",
			browsers: ["E", "IE10"],
			values: [{
				name: "none",
				description: "The element is not zoomable."
			}, {
				name: "zoom",
				description: "The element is zoomable."
			}],
			status: "nonstandard",
			syntax: "none | zoom",
			relevance: 0,
			description: "Specifies whether zooming is enabled.",
			restrictions: ["enum"]
		}, {
			name: "-ms-content-zoom-limit",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
			relevance: 0,
			description: "Shorthand property for the -ms-content-zoom-limit-min and -ms-content-zoom-limit-max properties.",
			restrictions: ["percentage"]
		}, {
			name: "-ms-content-zoom-limit-max",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<percentage>",
			relevance: 0,
			description: "Specifies the maximum zoom factor.",
			restrictions: ["percentage"]
		}, {
			name: "-ms-content-zoom-limit-min",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<percentage>",
			relevance: 0,
			description: "Specifies the minimum zoom factor.",
			restrictions: ["percentage"]
		}, {
			name: "-ms-content-zoom-snap",
			browsers: ["E", "IE10"],
			values: [{
				name: "mandatory",
				description: "Indicates that the motion of the content after the contact is picked up is always adjusted so that it lands on a snap-point."
			}, {
				name: "none",
				description: "Indicates that zooming is unaffected by any defined snap-points."
			}, {
				name: "proximity",
				description: 'Indicates that the motion of the content after the contact is picked up may be adjusted if the content would normally stop "close enough" to a snap-point.'
			}, {
				name: "snapInterval(100%, 100%)",
				description: "Specifies where the snap-points will be placed."
			}, {
				name: "snapList()",
				description: "Specifies the position of individual snap-points as a comma-separated list of zoom factors."
			}],
			status: "nonstandard",
			syntax: "<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>",
			relevance: 0,
			description: "Shorthand property for the -ms-content-zoom-snap-type and -ms-content-zoom-snap-points properties."
		}, {
			name: "-ms-content-zoom-snap-points",
			browsers: ["E", "IE10"],
			values: [{
				name: "snapInterval(100%, 100%)",
				description: "Specifies where the snap-points will be placed."
			}, {
				name: "snapList()",
				description: "Specifies the position of individual snap-points as a comma-separated list of zoom factors."
			}],
			status: "nonstandard",
			syntax: "snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )",
			relevance: 0,
			description: "Defines where zoom snap-points are located."
		}, {
			name: "-ms-content-zoom-snap-type",
			browsers: ["E", "IE10"],
			values: [{
				name: "mandatory",
				description: "Indicates that the motion of the content after the contact is picked up is always adjusted so that it lands on a snap-point."
			}, {
				name: "none",
				description: "Indicates that zooming is unaffected by any defined snap-points."
			}, {
				name: "proximity",
				description: 'Indicates that the motion of the content after the contact is picked up may be adjusted if the content would normally stop "close enough" to a snap-point.'
			}],
			status: "nonstandard",
			syntax: "none | proximity | mandatory",
			relevance: 0,
			description: "Specifies how zooming is affected by defined snap-points.",
			restrictions: ["enum"]
		}, {
			name: "-ms-filter",
			browsers: ["IE8-9"],
			status: "nonstandard",
			syntax: "<string>",
			relevance: 0,
			description: "IE only. Used to produce visual effects.",
			restrictions: ["string"]
		}, {
			name: "-ms-flex",
			browsers: ["IE10"],
			values: [{
				name: "auto",
				description: "Retrieves the value of the main size property as the used 'flex-basis'."
			}, {
				name: "none",
				description: "Expands to '0 0 auto'."
			}],
			relevance: 50,
			description: "specifies the parameters of a flexible length: the positive and negative flexibility, and the preferred size.",
			restrictions: ["length", "number", "percentage"]
		}, {
			name: "-ms-flex-align",
			browsers: ["IE10"],
			values: [{
				name: "baseline",
				description: "If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment."
			}, {
				name: "center",
				description: "The flex item’s margin box is centered in the cross axis within the line."
			}, {
				name: "end",
				description: "The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line."
			}, {
				name: "start",
				description: "The cross-start margin edge of the flexbox item is placed flush with the cross-start edge of the line."
			}, {
				name: "stretch",
				description: "If the cross size property of the flexbox item is anything other than 'auto', this value is identical to 'start'."
			}],
			relevance: 50,
			description: "Aligns flex items along the cross axis of the current line of the flex container.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flex-direction",
			browsers: ["IE10"],
			values: [{
				name: "column",
				description: "The flex container’s main axis has the same orientation as the block axis of the current writing mode."
			}, {
				name: "column-reverse",
				description: "Same as 'column', except the main-start and main-end directions are swapped."
			}, {
				name: "row",
				description: "The flex container’s main axis has the same orientation as the inline axis of the current writing mode."
			}, {
				name: "row-reverse",
				description: "Same as 'row', except the main-start and main-end directions are swapped."
			}],
			relevance: 50,
			description: "Specifies how flex items are placed in the flex container, by setting the direction of the flex container’s main axis.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flex-flow",
			browsers: ["IE10"],
			values: [{
				name: "column",
				description: "The flex container’s main axis has the same orientation as the block axis of the current writing mode."
			}, {
				name: "column-reverse",
				description: "Same as 'column', except the main-start and main-end directions are swapped."
			}, {
				name: "nowrap",
				description: "The flex container is single-line."
			}, {
				name: "row",
				description: "The flex container’s main axis has the same orientation as the inline axis of the current writing mode."
			}, {
				name: "wrap",
				description: "The flexbox is multi-line."
			}, {
				name: "wrap-reverse",
				description: "Same as 'wrap', except the cross-start and cross-end directions are swapped."
			}],
			relevance: 50,
			description: "Specifies how flexbox items are placed in the flexbox.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flex-item-align",
			browsers: ["IE10"],
			values: [{
				name: "auto",
				description: "Computes to the value of 'align-items' on the element’s parent, or 'stretch' if the element has no parent. On absolutely positioned elements, it computes to itself."
			}, {
				name: "baseline",
				description: "If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment."
			}, {
				name: "center",
				description: "The flex item’s margin box is centered in the cross axis within the line."
			}, {
				name: "end",
				description: "The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line."
			}, {
				name: "start",
				description: "The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line."
			}, {
				name: "stretch",
				description: "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched."
			}],
			relevance: 50,
			description: "Allows the default alignment along the cross axis to be overridden for individual flex items.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flex-line-pack",
			browsers: ["IE10"],
			values: [{
				name: "center",
				description: "Lines are packed toward the center of the flex container."
			}, {
				name: "distribute",
				description: "Lines are evenly distributed in the flex container, with half-size spaces on either end."
			}, {
				name: "end",
				description: "Lines are packed toward the end of the flex container."
			}, {
				name: "justify",
				description: "Lines are evenly distributed in the flex container."
			}, {
				name: "start",
				description: "Lines are packed toward the start of the flex container."
			}, {
				name: "stretch",
				description: "Lines stretch to take up the remaining space."
			}],
			relevance: 50,
			description: "Aligns a flex container’s lines within the flex container when there is extra space in the cross-axis, similar to how 'justify-content' aligns individual items within the main-axis.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flex-order",
			browsers: ["IE10"],
			relevance: 50,
			description: "Controls the order in which children of a flex container appear within the flex container, by assigning them to ordinal groups.",
			restrictions: ["integer"]
		}, {
			name: "-ms-flex-pack",
			browsers: ["IE10"],
			values: [{
				name: "center",
				description: "Flex items are packed toward the center of the line."
			}, {
				name: "distribute",
				description: "Flex items are evenly distributed in the line, with half-size spaces on either end."
			}, {
				name: "end",
				description: "Flex items are packed toward the end of the line."
			}, {
				name: "justify",
				description: "Flex items are evenly distributed in the line."
			}, {
				name: "start",
				description: "Flex items are packed toward the start of the line."
			}],
			relevance: 50,
			description: "Aligns flex items along the main axis of the current line of the flex container.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flex-wrap",
			browsers: ["IE10"],
			values: [{
				name: "nowrap",
				description: "The flex container is single-line."
			}, {
				name: "wrap",
				description: "The flexbox is multi-line."
			}, {
				name: "wrap-reverse",
				description: "Same as 'wrap', except the cross-start and cross-end directions are swapped."
			}],
			relevance: 50,
			description: "Controls whether the flex container is single-line or multi-line, and the direction of the cross-axis, which determines the direction new lines are stacked in.",
			restrictions: ["enum"]
		}, {
			name: "-ms-flow-from",
			browsers: ["E", "IE10"],
			values: [{
				name: "none",
				description: "The block container is not a CSS Region."
			}],
			status: "nonstandard",
			syntax: "[ none | <custom-ident> ]#",
			relevance: 0,
			description: "Makes a block container a region and associates it with a named flow.",
			restrictions: ["identifier"]
		}, {
			name: "-ms-flow-into",
			browsers: ["E", "IE10"],
			values: [{
				name: "none",
				description: "The element is not moved to a named flow and normal CSS processing takes place."
			}],
			status: "nonstandard",
			syntax: "[ none | <custom-ident> ]#",
			relevance: 0,
			description: "Places an element or its contents into a named flow.",
			restrictions: ["identifier"]
		}, {
			name: "-ms-grid-column",
			browsers: ["E12", "IE10"],
			values: [{
				name: "auto"
			}, {
				name: "end"
			}, {
				name: "start"
			}],
			relevance: 50,
			description: "Used to place grid items and explicitly defined grid cells in the Grid.",
			restrictions: ["integer", "string", "enum"]
		}, {
			name: "-ms-grid-column-align",
			browsers: ["E12", "IE10"],
			values: [{
				name: "center",
				description: "Places the center of the Grid Item's margin box at the center of the Grid Item's column."
			}, {
				name: "end",
				description: "Aligns the end edge of the Grid Item's margin box to the end edge of the Grid Item's column."
			}, {
				name: "start",
				description: "Aligns the starting edge of the Grid Item's margin box to the starting edge of the Grid Item's column."
			}, {
				name: "stretch",
				description: "Ensures that the Grid Item's margin box is equal to the size of the Grid Item's column."
			}],
			relevance: 50,
			description: "Aligns the columns in a grid.",
			restrictions: ["enum"]
		}, {
			name: "-ms-grid-columns",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "none | <track-list> | <auto-track-list>",
			relevance: 0,
			description: "Lays out the columns of the grid."
		}, {
			name: "-ms-grid-column-span",
			browsers: ["E12", "IE10"],
			relevance: 50,
			description: "Specifies the number of columns to span.",
			restrictions: ["integer"]
		}, {
			name: "-ms-grid-layer",
			browsers: ["E", "IE10"],
			relevance: 50,
			description: "Grid-layer is similar in concept to z-index, but avoids overloading the meaning of the z-index property, which is applicable only to positioned elements.",
			restrictions: ["integer"]
		}, {
			name: "-ms-grid-row",
			browsers: ["E12", "IE10"],
			values: [{
				name: "auto"
			}, {
				name: "end"
			}, {
				name: "start"
			}],
			relevance: 50,
			description: "grid-row is used to place grid items and explicitly defined grid cells in the Grid.",
			restrictions: ["integer", "string", "enum"]
		}, {
			name: "-ms-grid-row-align",
			browsers: ["E12", "IE10"],
			values: [{
				name: "center",
				description: "Places the center of the Grid Item's margin box at the center of the Grid Item's row."
			}, {
				name: "end",
				description: "Aligns the end edge of the Grid Item's margin box to the end edge of the Grid Item's row."
			}, {
				name: "start",
				description: "Aligns the starting edge of the Grid Item's margin box to the starting edge of the Grid Item's row."
			}, {
				name: "stretch",
				description: "Ensures that the Grid Item's margin box is equal to the size of the Grid Item's row."
			}],
			relevance: 50,
			description: "Aligns the rows in a grid.",
			restrictions: ["enum"]
		}, {
			name: "-ms-grid-rows",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "none | <track-list> | <auto-track-list>",
			relevance: 0,
			description: "Lays out the columns of the grid."
		}, {
			name: "-ms-grid-row-span",
			browsers: ["E12", "IE10"],
			relevance: 50,
			description: "Specifies the number of rows to span.",
			restrictions: ["integer"]
		}, {
			name: "-ms-high-contrast-adjust",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "Properties will be adjusted as applicable."
			}, {
				name: "none",
				description: "No adjustments will be applied."
			}],
			status: "nonstandard",
			syntax: "auto | none",
			relevance: 0,
			description: "Specifies if properties should be adjusted in high contrast mode.",
			restrictions: ["enum"]
		}, {
			name: "-ms-hyphenate-limit-chars",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "The user agent chooses a value that adapts to the current layout."
			}],
			status: "nonstandard",
			syntax: "auto | <integer>{1,3}",
			relevance: 0,
			description: "Specifies the minimum number of characters in a hyphenated word.",
			restrictions: ["integer"]
		}, {
			name: "-ms-hyphenate-limit-lines",
			browsers: ["E", "IE10"],
			values: [{
				name: "no-limit",
				description: "There is no limit."
			}],
			status: "nonstandard",
			syntax: "no-limit | <integer>",
			relevance: 0,
			description: "Indicates the maximum number of successive hyphenated lines in an element.",
			restrictions: ["integer"]
		}, {
			name: "-ms-hyphenate-limit-zone",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<percentage> | <length>",
			relevance: 0,
			description: "Specifies the maximum amount of unfilled space (before justification) that may be left in the line box before hyphenation is triggered to pull part of a word from the next line back up into the current line.",
			restrictions: ["percentage", "length"]
		}, {
			name: "-ms-hyphens",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word."
			}, {
				name: "manual",
				description: "Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities"
			}, {
				name: "none",
				description: "Words are not broken at line breaks, even if characters inside the word suggest line break points."
			}],
			relevance: 50,
			description: "Controls whether hyphenation is allowed to create more break opportunities within a line of text.",
			restrictions: ["enum"]
		}, {
			name: "-ms-ime-mode",
			browsers: ["IE10"],
			values: [{
				name: "active",
				description: "The input method editor is initially active; text entry is performed using it unless the user specifically dismisses it."
			}, {
				name: "auto",
				description: "No change is made to the current input method editor state. This is the default."
			}, {
				name: "disabled",
				description: "The input method editor is disabled and may not be activated by the user."
			}, {
				name: "inactive",
				description: "The input method editor is initially inactive, but the user may activate it if they wish."
			}, {
				name: "normal",
				description: "The IME state should be normal; this value can be used in a user style sheet to override the page setting."
			}],
			relevance: 50,
			description: "Controls the state of the input method editor for text fields.",
			restrictions: ["enum"]
		}, {
			name: "-ms-interpolation-mode",
			browsers: ["IE7"],
			values: [{
				name: "bicubic"
			}, {
				name: "nearest-neighbor"
			}],
			relevance: 50,
			description: "Gets or sets the interpolation (resampling) method used to stretch images.",
			restrictions: ["enum"]
		}, {
			name: "-ms-layout-grid",
			browsers: ["E", "IE10"],
			values: [{
				name: "char",
				description: "Any of the range of character values available to the -ms-layout-grid-char property."
			}, {
				name: "line",
				description: "Any of the range of line values available to the -ms-layout-grid-line property."
			}, {
				name: "mode",
				description: "Any of the range of mode values available to the -ms-layout-grid-mode property."
			}, {
				name: "type",
				description: "Any of the range of type values available to the -ms-layout-grid-type property."
			}],
			relevance: 50,
			description: "Sets or retrieves the composite document grid properties that specify the layout of text characters."
		}, {
			name: "-ms-layout-grid-char",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "Largest character in the font of the element is used to set the character grid."
			}, {
				name: "none",
				description: "Default. No character grid is set."
			}],
			relevance: 50,
			description: "Sets or retrieves the size of the character grid used for rendering the text content of an element.",
			restrictions: ["enum", "length", "percentage"]
		}, {
			name: "-ms-layout-grid-line",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "Largest character in the font of the element is used to set the character grid."
			}, {
				name: "none",
				description: "Default. No grid line is set."
			}],
			relevance: 50,
			description: "Sets or retrieves the gridline value used for rendering the text content of an element.",
			restrictions: ["length"]
		}, {
			name: "-ms-layout-grid-mode",
			browsers: ["E", "IE10"],
			values: [{
				name: "both",
				description: "Default. Both the char and line grid modes are enabled. This setting is necessary to fully enable the layout grid on an element."
			}, {
				name: "char",
				description: "Only a character grid is used. This is recommended for use with block-level elements, such as a blockquote, where the line grid is intended to be disabled."
			}, {
				name: "line",
				description: "Only a line grid is used. This is recommended for use with inline elements, such as a span, to disable the horizontal grid on runs of text that act as a single entity in the grid layout."
			}, {
				name: "none",
				description: "No grid is used."
			}],
			relevance: 50,
			description: "Gets or sets whether the text layout grid uses two dimensions.",
			restrictions: ["enum"]
		}, {
			name: "-ms-layout-grid-type",
			browsers: ["E", "IE10"],
			values: [{
				name: "fixed",
				description: "Grid used for monospaced layout. All noncursive characters are treated as equal; every character is centered within a single grid space by default."
			}, {
				name: "loose",
				description: "Default. Grid used for Japanese and Korean characters."
			}, {
				name: "strict",
				description: "Grid used for Chinese, as well as Japanese (Genko) and Korean characters. Only the ideographs, kanas, and wide characters are snapped to the grid."
			}],
			relevance: 50,
			description: "Sets or retrieves the type of grid used for rendering the text content of an element.",
			restrictions: ["enum"]
		}, {
			name: "-ms-line-break",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "The UA determines the set of line-breaking restrictions to use for CJK scripts, and it may vary the restrictions based on the length of the line; e.g., use a less restrictive set of line-break rules for short lines."
			}, {
				name: "keep-all",
				description: "Sequences of CJK characters can no longer break on implied break points. This option should only be used where the presence of word separator characters still creates line-breaking opportunities, as in Korean."
			}, {
				name: "newspaper",
				description: "Breaks CJK scripts using the least restrictive set of line-breaking rules. Typically used for short lines, such as in newspapers."
			}, {
				name: "normal",
				description: "Breaks CJK scripts using a normal set of line-breaking rules."
			}, {
				name: "strict",
				description: "Breaks CJK scripts using a more restrictive set of line-breaking rules than 'normal'."
			}],
			relevance: 50,
			description: "Specifies what set of line breaking restrictions are in effect within the element.",
			restrictions: ["enum"]
		}, {
			name: "-ms-overflow-style",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "No preference, UA should use the first scrolling method in the list that it supports."
			}, {
				name: "-ms-autohiding-scrollbar",
				description: "Indicates the element displays auto-hiding scrollbars during mouse interactions and panning indicators during touch and keyboard interactions."
			}, {
				name: "none",
				description: "Indicates the element does not display scrollbars or panning indicators, even when its content overflows."
			}, {
				name: "scrollbar",
				description: 'Scrollbars are typically narrow strips inserted on one or two edges of an element and which often have arrows to click on and a "thumb" to drag up and down (or left and right) to move the contents of the element.'
			}],
			status: "nonstandard",
			syntax: "auto | none | scrollbar | -ms-autohiding-scrollbar",
			relevance: 0,
			description: "Specify whether content is clipped when it overflows the element's content area.",
			restrictions: ["enum"]
		}, {
			name: "-ms-perspective",
			browsers: ["IE10"],
			values: [{
				name: "none",
				description: "No perspective transform is applied."
			}],
			relevance: 50,
			description: "Applies the same transform as the perspective(<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.",
			restrictions: ["length"]
		}, {
			name: "-ms-perspective-origin",
			browsers: ["IE10"],
			relevance: 50,
			description: "Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.",
			restrictions: ["position", "percentage", "length"]
		}, {
			name: "-ms-perspective-origin-x",
			browsers: ["IE10"],
			relevance: 50,
			description: "Establishes the origin for the perspective property. It effectively sets the X  position at which the viewer appears to be looking at the children of the element.",
			restrictions: ["position", "percentage", "length"]
		}, {
			name: "-ms-perspective-origin-y",
			browsers: ["IE10"],
			relevance: 50,
			description: "Establishes the origin for the perspective property. It effectively sets the Y position at which the viewer appears to be looking at the children of the element.",
			restrictions: ["position", "percentage", "length"]
		}, {
			name: "-ms-progress-appearance",
			browsers: ["IE10"],
			values: [{
				name: "bar"
			}, {
				name: "ring"
			}],
			relevance: 50,
			description: "Gets or sets a value that specifies whether a progress control displays as a bar or a ring.",
			restrictions: ["enum"]
		}, {
			name: "-ms-scrollbar-3dlight-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-arrow-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the arrow elements of a scroll arrow.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-base-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the main elements of a scroll bar, which include the scroll box, track, and scroll arrows.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-darkshadow-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the gutter of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-face-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-highlight-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-shadow-color",
			browsers: ["IE8"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "Determines the color of the bottom and right edges of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "-ms-scrollbar-track-color",
			browsers: ["IE5"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-track-color"
			}],
			description: "Determines the color of the track element of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "-ms-scroll-chaining",
			browsers: ["E", "IE10"],
			values: [{
				name: "chained"
			}, {
				name: "none"
			}],
			status: "nonstandard",
			syntax: "chained | none",
			relevance: 0,
			description: "Gets or sets a value that indicates the scrolling behavior that occurs when a user hits the content boundary during a manipulation.",
			restrictions: ["enum", "length"]
		}, {
			name: "-ms-scroll-limit",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto"
			}],
			status: "nonstandard",
			syntax: "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
			relevance: 0,
			description: "Gets or sets a shorthand value that sets values for the -ms-scroll-limit-x-min, -ms-scroll-limit-y-min, -ms-scroll-limit-x-max, and -ms-scroll-limit-y-max properties.",
			restrictions: ["length"]
		}, {
			name: "-ms-scroll-limit-x-max",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto"
			}],
			status: "nonstandard",
			syntax: "auto | <length>",
			relevance: 0,
			description: "Gets or sets a value that specifies the maximum value for the scrollLeft property.",
			restrictions: ["length"]
		}, {
			name: "-ms-scroll-limit-x-min",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<length>",
			relevance: 0,
			description: "Gets or sets a value that specifies the minimum value for the scrollLeft property.",
			restrictions: ["length"]
		}, {
			name: "-ms-scroll-limit-y-max",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto"
			}],
			status: "nonstandard",
			syntax: "auto | <length>",
			relevance: 0,
			description: "Gets or sets a value that specifies the maximum value for the scrollTop property.",
			restrictions: ["length"]
		}, {
			name: "-ms-scroll-limit-y-min",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<length>",
			relevance: 0,
			description: "Gets or sets a value that specifies the minimum value for the scrollTop property.",
			restrictions: ["length"]
		}, {
			name: "-ms-scroll-rails",
			browsers: ["E", "IE10"],
			values: [{
				name: "none"
			}, {
				name: "railed"
			}],
			status: "nonstandard",
			syntax: "none | railed",
			relevance: 0,
			description: "Gets or sets a value that indicates whether or not small motions perpendicular to the primary axis of motion will result in either changes to both the scrollTop and scrollLeft properties or a change to the primary axis (for instance, either the scrollTop or scrollLeft properties will change, but not both).",
			restrictions: ["enum", "length"]
		}, {
			name: "-ms-scroll-snap-points-x",
			browsers: ["E", "IE10"],
			values: [{
				name: "snapInterval(100%, 100%)"
			}, {
				name: "snapList()"
			}],
			status: "nonstandard",
			syntax: "snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )",
			relevance: 0,
			description: "Gets or sets a value that defines where snap-points will be located along the x-axis.",
			restrictions: ["enum"]
		}, {
			name: "-ms-scroll-snap-points-y",
			browsers: ["E", "IE10"],
			values: [{
				name: "snapInterval(100%, 100%)"
			}, {
				name: "snapList()"
			}],
			status: "nonstandard",
			syntax: "snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )",
			relevance: 0,
			description: "Gets or sets a value that defines where snap-points will be located along the y-axis.",
			restrictions: ["enum"]
		}, {
			name: "-ms-scroll-snap-type",
			browsers: ["E", "IE10"],
			values: [{
				name: "none",
				description: "The visual viewport of this scroll container must ignore snap points, if any, when scrolled."
			}, {
				name: "mandatory",
				description: "The visual viewport of this scroll container is guaranteed to rest on a snap point when there are no active scrolling operations."
			}, {
				name: "proximity",
				description: "The visual viewport of this scroll container may come to rest on a snap point at the termination of a scroll at the discretion of the UA given the parameters of the scroll."
			}],
			status: "nonstandard",
			syntax: "none | proximity | mandatory",
			relevance: 0,
			description: "Gets or sets a value that defines what type of snap-point should be used for the current element. There are two type of snap-points, with the primary difference being whether or not the user is guaranteed to always stop on a snap-point.",
			restrictions: ["enum"]
		}, {
			name: "-ms-scroll-snap-x",
			browsers: ["E", "IE10"],
			values: [{
				name: "mandatory"
			}, {
				name: "none"
			}, {
				name: "proximity"
			}, {
				name: "snapInterval(100%, 100%)"
			}, {
				name: "snapList()"
			}],
			status: "nonstandard",
			syntax: "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
			relevance: 0,
			description: "Gets or sets a shorthand value that sets values for the -ms-scroll-snap-type and -ms-scroll-snap-points-x properties.",
			restrictions: ["enum"]
		}, {
			name: "-ms-scroll-snap-y",
			browsers: ["E", "IE10"],
			values: [{
				name: "mandatory"
			}, {
				name: "none"
			}, {
				name: "proximity"
			}, {
				name: "snapInterval(100%, 100%)"
			}, {
				name: "snapList()"
			}],
			status: "nonstandard",
			syntax: "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
			relevance: 0,
			description: "Gets or sets a shorthand value that sets values for the -ms-scroll-snap-type and -ms-scroll-snap-points-y properties.",
			restrictions: ["enum"]
		}, {
			name: "-ms-scroll-translation",
			browsers: ["E", "IE10"],
			values: [{
				name: "none"
			}, {
				name: "vertical-to-horizontal"
			}],
			status: "nonstandard",
			syntax: "none | vertical-to-horizontal",
			relevance: 0,
			description: "Gets or sets a value that specifies whether vertical-to-horizontal scroll wheel translation occurs on the specified element.",
			restrictions: ["enum"]
		}, {
			name: "-ms-text-align-last",
			browsers: ["E", "IE8"],
			values: [{
				name: "auto"
			}, {
				name: "center",
				description: "The inline contents are centered within the line box."
			}, {
				name: "justify",
				description: "The text is justified according to the method specified by the 'text-justify' property."
			}, {
				name: "left",
				description: "The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text."
			}, {
				name: "right",
				description: "The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text."
			}],
			relevance: 50,
			description: "Describes how the last line of a block or a line right before a forced line break is aligned when 'text-align' is set to 'justify'.",
			restrictions: ["enum"]
		}, {
			name: "-ms-text-autospace",
			browsers: ["E", "IE8"],
			values: [{
				name: "ideograph-alpha",
				description: "Creates 1/4em extra spacing between runs of ideographic letters and non-ideographic letters, such as Latin-based, Cyrillic, Greek, Arabic or Hebrew."
			}, {
				name: "ideograph-numeric",
				description: "Creates 1/4em extra spacing between runs of ideographic letters and numeric glyphs."
			}, {
				name: "ideograph-parenthesis",
				description: "Creates extra spacing between normal (non wide) parenthesis and ideographs."
			}, {
				name: "ideograph-space",
				description: "Extends the width of the space character while surrounded by ideographs."
			}, {
				name: "none",
				description: "No extra space is created."
			}, {
				name: "punctuation",
				description: "Creates extra non-breaking spacing around punctuation as required by language-specific typographic conventions."
			}],
			status: "nonstandard",
			syntax: "none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space",
			relevance: 0,
			description: "Determines whether or not a full-width punctuation mark character should be trimmed if it appears at the beginning of a line, so that its 'ink' lines up with the first glyph in the line above and below.",
			restrictions: ["enum"]
		}, {
			name: "-ms-text-combine-horizontal",
			browsers: ["E", "IE11"],
			values: [{
				name: "all",
				description: "Attempt to typeset horizontally all consecutive characters within the box such that they take up the space of a single character within the vertical line box."
			}, {
				name: "digits",
				description: "Attempt to typeset horizontally each maximal sequence of consecutive ASCII digits (U+0030–U+0039) that has as many or fewer characters than the specified integer such that it takes up the space of a single character within the vertical line box."
			}, {
				name: "none",
				description: "No special processing."
			}],
			relevance: 50,
			description: "This property specifies the combination of multiple characters into the space of a single character.",
			restrictions: ["enum", "integer"]
		}, {
			name: "-ms-text-justify",
			browsers: ["E", "IE8"],
			values: [{
				name: "auto",
				description: "The UA determines the justification algorithm to follow, based on a balance between performance and adequate presentation quality."
			}, {
				name: "distribute",
				description: "Justification primarily changes spacing both at word separators and at grapheme cluster boundaries in all scripts except those in the connected and cursive groups. This value is sometimes used in e.g. Japanese, often with the 'text-align-last' property."
			}, {
				name: "inter-cluster",
				description: "Justification primarily changes spacing at word separators and at grapheme cluster boundaries in clustered scripts. This value is typically used for Southeast Asian scripts such as Thai."
			}, {
				name: "inter-ideograph",
				description: "Justification primarily changes spacing at word separators and at inter-graphemic boundaries in scripts that use no word spaces. This value is typically used for CJK languages."
			}, {
				name: "inter-word",
				description: "Justification primarily changes spacing at word separators. This value is typically used for languages that separate words using spaces, like English or (sometimes) Korean."
			}, {
				name: "kashida",
				description: "Justification primarily stretches Arabic and related scripts through the use of kashida or other calligraphic elongation."
			}],
			relevance: 50,
			description: "Selects the justification algorithm used when 'text-align' is set to 'justify'. The property applies to block containers, but the UA may (but is not required to) also support it on inline elements.",
			restrictions: ["enum"]
		}, {
			name: "-ms-text-kashida-space",
			browsers: ["E", "IE10"],
			relevance: 50,
			description: "Sets or retrieves the ratio of kashida expansion to white space expansion when justifying lines of text in the object.",
			restrictions: ["percentage"]
		}, {
			name: "-ms-text-overflow",
			browsers: ["IE10"],
			values: [{
				name: "clip",
				description: "Clip inline content that overflows. Characters may be only partially rendered."
			}, {
				name: "ellipsis",
				description: "Render an ellipsis character (U+2026) to represent clipped inline content."
			}],
			relevance: 50,
			description: "Text can overflow for example when it is prevented from wrapping",
			restrictions: ["enum"]
		}, {
			name: "-ms-text-size-adjust",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "Renderers must use the default size adjustment when displaying on a small device."
			}, {
				name: "none",
				description: "Renderers must not do size adjustment when displaying on a small device."
			}],
			relevance: 50,
			description: "Specifies a size adjustment for displaying text content in mobile browsers.",
			restrictions: ["enum", "percentage"]
		}, {
			name: "-ms-text-underline-position",
			browsers: ["E", "IE10"],
			values: [{
				name: "alphabetic",
				description: "The underline is aligned with the alphabetic baseline. In this case the underline is likely to cross some descenders."
			}, {
				name: "auto",
				description: "The user agent may use any algorithm to determine the underline's position. In horizontal line layout, the underline should be aligned as for alphabetic. In vertical line layout, if the language is set to Japanese or Korean, the underline should be aligned as for over."
			}, {
				name: "over",
				description: "The underline is aligned with the 'top' (right in vertical writing) edge of the element's em-box. In this mode, an overline also switches sides."
			}, {
				name: "under",
				description: "The underline is aligned with the 'bottom' (left in vertical writing) edge of the element's em-box. In this case the underline usually does not cross the descenders. This is sometimes called 'accounting' underline."
			}],
			relevance: 50,
			description: "Sets the position of an underline specified on the same element: it does not affect underlines specified by ancestor elements.This property is typically used in vertical writing contexts such as in Japanese documents where it often desired to have the underline appear 'over' (to the right of) the affected run of text",
			restrictions: ["enum"]
		}, {
			name: "-ms-touch-action",
			browsers: ["IE10"],
			values: [{
				name: "auto",
				description: "The element is a passive element, with several exceptions."
			}, {
				name: "double-tap-zoom",
				description: "The element will zoom on double-tap."
			}, {
				name: "manipulation",
				description: "The element is a manipulation-causing element."
			}, {
				name: "none",
				description: "The element is a manipulation-blocking element."
			}, {
				name: "pan-x",
				description: "The element permits touch-driven panning on the horizontal axis. The touch pan is performed on the nearest ancestor with horizontally scrollable content."
			}, {
				name: "pan-y",
				description: "The element permits touch-driven panning on the vertical axis. The touch pan is performed on the nearest ancestor with vertically scrollable content."
			}, {
				name: "pinch-zoom",
				description: "The element permits pinch-zooming. The pinch-zoom is performed on the nearest ancestor with zoomable content."
			}],
			relevance: 50,
			description: "Gets or sets a value that indicates whether and how a given region can be manipulated by the user.",
			restrictions: ["enum"]
		}, {
			name: "-ms-touch-select",
			browsers: ["E", "IE10"],
			values: [{
				name: "grippers",
				description: "Grippers are always on."
			}, {
				name: "none",
				description: "Grippers are always off."
			}],
			status: "nonstandard",
			syntax: "grippers | none",
			relevance: 0,
			description: "Gets or sets a value that toggles the 'gripper' visual elements that enable touch text selection.",
			restrictions: ["enum"]
		}, {
			name: "-ms-transform",
			browsers: ["IE9-9"],
			values: [{
				name: "matrix()",
				description: "Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f]"
			}, {
				name: "matrix3d()",
				description: "Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order."
			}, {
				name: "none"
			}, {
				name: "rotate()",
				description: "Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property."
			}, {
				name: "rotate3d()",
				description: "Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters."
			}, {
				name: "rotateX('angle')",
				description: "Specifies a clockwise rotation by the given angle about the X axis."
			}, {
				name: "rotateY('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Y axis."
			}, {
				name: "rotateZ('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Z axis."
			}, {
				name: "scale()",
				description: "Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first."
			}, {
				name: "scale3d()",
				description: "Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters."
			}, {
				name: "scaleX()",
				description: "Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter."
			}, {
				name: "scaleY()",
				description: "Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter."
			}, {
				name: "scaleZ()",
				description: "Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter."
			}, {
				name: "skew()",
				description: "Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis)."
			}, {
				name: "skewX()",
				description: "Specifies a skew transformation along the X axis by the given angle."
			}, {
				name: "skewY()",
				description: "Specifies a skew transformation along the Y axis by the given angle."
			}, {
				name: "translate()",
				description: "Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter."
			}, {
				name: "translate3d()",
				description: "Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively."
			}, {
				name: "translateX()",
				description: "Specifies a translation by the given amount in the X direction."
			}, {
				name: "translateY()",
				description: "Specifies a translation by the given amount in the Y direction."
			}, {
				name: "translateZ()",
				description: "Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0."
			}],
			relevance: 50,
			description: "A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.",
			restrictions: ["enum"]
		}, {
			name: "-ms-transform-origin",
			browsers: ["IE9-9"],
			relevance: 50,
			description: "Establishes the origin of transformation for an element.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "-ms-transform-origin-x",
			browsers: ["IE10"],
			relevance: 50,
			description: "The x coordinate of the origin for transforms applied to an element with respect to its border box.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-ms-transform-origin-y",
			browsers: ["IE10"],
			relevance: 50,
			description: "The y coordinate of the origin for transforms applied to an element with respect to its border box.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-ms-transform-origin-z",
			browsers: ["IE10"],
			relevance: 50,
			description: "The z coordinate of the origin for transforms applied to an element with respect to its border box.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-ms-user-select",
			browsers: ["E", "IE10"],
			values: [{
				name: "element"
			}, {
				name: "none"
			}, {
				name: "text"
			}],
			status: "nonstandard",
			syntax: "none | element | text",
			relevance: 0,
			description: "Controls the appearance of selection.",
			restrictions: ["enum"]
		}, {
			name: "-ms-word-break",
			browsers: ["IE8"],
			values: [{
				name: "break-all",
				description: "Lines may break between any two grapheme clusters for non-CJK scripts."
			}, {
				name: "keep-all",
				description: "Block characters can no longer create implied break points."
			}, {
				name: "normal",
				description: "Breaks non-CJK scripts according to their own rules."
			}],
			relevance: 50,
			description: "Specifies line break opportunities for non-CJK scripts.",
			restrictions: ["enum"]
		}, {
			name: "-ms-word-wrap",
			browsers: ["IE8"],
			values: [{
				name: "break-word",
				description: "An unbreakable 'word' may be broken at an arbitrary point if there are no otherwise-acceptable break points in the line."
			}, {
				name: "normal",
				description: "Lines may break only at allowed break points."
			}],
			relevance: 50,
			description: "Specifies whether the UA may break within a word to prevent overflow when an otherwise-unbreakable string is too long to fit.",
			restrictions: ["enum"]
		}, {
			name: "-ms-wrap-flow",
			browsers: ["E", "IE10"],
			values: [{
				name: "auto",
				description: "For floats an exclusion is created, for all other elements an exclusion is not created."
			}, {
				name: "both",
				description: "Inline flow content can flow on all sides of the exclusion."
			}, {
				name: "clear",
				description: "Inline flow content can only wrap on top and bottom of the exclusion and must leave the areas to the start and end edges of the exclusion box empty."
			}, {
				name: "end",
				description: "Inline flow content can wrap on the end side of the exclusion area but must leave the area to the start edge of the exclusion area empty."
			}, {
				name: "maximum",
				description: "Inline flow content can wrap on the side of the exclusion with the largest available space for the given line, and must leave the other side of the exclusion empty."
			}, {
				name: "minimum",
				description: "Inline flow content can flow around the edge of the exclusion with the smallest available space within the flow content’s containing block, and must leave the other edge of the exclusion empty."
			}, {
				name: "start",
				description: "Inline flow content can wrap on the start edge of the exclusion area but must leave the area to end edge of the exclusion area empty."
			}],
			status: "nonstandard",
			syntax: "auto | both | start | end | maximum | clear",
			relevance: 0,
			description: "An element becomes an exclusion when its 'wrap-flow' property has a computed value other than 'auto'.",
			restrictions: ["enum"]
		}, {
			name: "-ms-wrap-margin",
			browsers: ["E", "IE10"],
			status: "nonstandard",
			syntax: "<length>",
			relevance: 0,
			description: "Gets or sets a value that is used to offset the inner wrap shape from other shapes.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-ms-wrap-through",
			browsers: ["E", "IE10"],
			values: [{
				name: "none",
				description: "The exclusion element does not inherit its parent node's wrapping context. Its descendants are only subject to exclusion shapes defined inside the element."
			}, {
				name: "wrap",
				description: "The exclusion element inherits its parent node's wrapping context. Its descendant inline content wraps around exclusions defined outside the element."
			}],
			status: "nonstandard",
			syntax: "wrap | none",
			relevance: 0,
			description: "Specifies if an element inherits its parent wrapping context. In other words if it is subject to the exclusions defined outside the element.",
			restrictions: ["enum"]
		}, {
			name: "-ms-writing-mode",
			browsers: ["IE8"],
			values: [{
				name: "bt-lr"
			}, {
				name: "bt-rl"
			}, {
				name: "lr-bt"
			}, {
				name: "lr-tb"
			}, {
				name: "rl-bt"
			}, {
				name: "rl-tb"
			}, {
				name: "tb-lr"
			}, {
				name: "tb-rl"
			}],
			relevance: 50,
			description: "Shorthand property for both 'direction' and 'block-progression'.",
			restrictions: ["enum"]
		}, {
			name: "-ms-zoom",
			browsers: ["IE8"],
			values: [{
				name: "normal"
			}],
			relevance: 50,
			description: "Sets or retrieves the magnification scale of the object.",
			restrictions: ["enum", "integer", "number", "percentage"]
		}, {
			name: "-ms-zoom-animation",
			browsers: ["IE10"],
			values: [{
				name: "default"
			}, {
				name: "none"
			}],
			relevance: 50,
			description: "Gets or sets a value that indicates whether an animation is used when zooming.",
			restrictions: ["enum"]
		}, {
			name: "nav-down",
			browsers: ["O9.5"],
			values: [{
				name: "auto",
				description: "The user agent automatically determines which element to navigate the focus to in response to directional navigational input."
			}, {
				name: "current",
				description: "Indicates that the user agent should target the frame that the element is in."
			}, {
				name: "root",
				description: "Indicates that the user agent should target the full window."
			}],
			relevance: 50,
			description: "Provides an way to control directional focus navigation.",
			restrictions: ["enum", "identifier", "string"]
		}, {
			name: "nav-index",
			browsers: ["O9.5"],
			values: [{
				name: "auto",
				description: "The element's sequential navigation order is assigned automatically by the user agent."
			}],
			relevance: 50,
			description: "Provides an input-method-neutral way of specifying the sequential navigation order (also known as 'tabbing order').",
			restrictions: ["number"]
		}, {
			name: "nav-left",
			browsers: ["O9.5"],
			values: [{
				name: "auto",
				description: "The user agent automatically determines which element to navigate the focus to in response to directional navigational input."
			}, {
				name: "current",
				description: "Indicates that the user agent should target the frame that the element is in."
			}, {
				name: "root",
				description: "Indicates that the user agent should target the full window."
			}],
			relevance: 50,
			description: "Provides an way to control directional focus navigation.",
			restrictions: ["enum", "identifier", "string"]
		}, {
			name: "nav-right",
			browsers: ["O9.5"],
			values: [{
				name: "auto",
				description: "The user agent automatically determines which element to navigate the focus to in response to directional navigational input."
			}, {
				name: "current",
				description: "Indicates that the user agent should target the frame that the element is in."
			}, {
				name: "root",
				description: "Indicates that the user agent should target the full window."
			}],
			relevance: 50,
			description: "Provides an way to control directional focus navigation.",
			restrictions: ["enum", "identifier", "string"]
		}, {
			name: "nav-up",
			browsers: ["O9.5"],
			values: [{
				name: "auto",
				description: "The user agent automatically determines which element to navigate the focus to in response to directional navigational input."
			}, {
				name: "current",
				description: "Indicates that the user agent should target the frame that the element is in."
			}, {
				name: "root",
				description: "Indicates that the user agent should target the full window."
			}],
			relevance: 50,
			description: "Provides an way to control directional focus navigation.",
			restrictions: ["enum", "identifier", "string"]
		}, {
			name: "negative",
			browsers: ["FF33"],
			syntax: "<symbol> <symbol>?",
			relevance: 50,
			description: "@counter-style descriptor. Defines how to alter the representation when the counter value is negative.",
			restrictions: ["image", "identifier", "string"]
		}, {
			name: "-o-animation",
			browsers: ["O12"],
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}, {
				name: "none",
				description: "No animation is performed"
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			relevance: 50,
			description: "Shorthand property combines six of the animation properties into a single property.",
			restrictions: ["time", "enum", "timing-function", "identifier", "number"]
		}, {
			name: "-o-animation-delay",
			browsers: ["O12"],
			relevance: 50,
			description: "Defines when the animation will start.",
			restrictions: ["time"]
		}, {
			name: "-o-animation-direction",
			browsers: ["O12"],
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			relevance: 50,
			description: "Defines whether or not the animation should play in reverse on alternate cycles.",
			restrictions: ["enum"]
		}, {
			name: "-o-animation-duration",
			browsers: ["O12"],
			relevance: 50,
			description: "Defines the length of time that an animation takes to complete one cycle.",
			restrictions: ["time"]
		}, {
			name: "-o-animation-fill-mode",
			browsers: ["O12"],
			values: [{
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "none",
				description: "There is no change to the property value between the time the animation is applied and the time the animation begins playing or after the animation completes."
			}],
			relevance: 50,
			description: "Defines what values are applied by the animation outside the time it is executing.",
			restrictions: ["enum"]
		}, {
			name: "-o-animation-iteration-count",
			browsers: ["O12"],
			values: [{
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}],
			relevance: 50,
			description: "Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.",
			restrictions: ["number", "enum"]
		}, {
			name: "-o-animation-name",
			browsers: ["O12"],
			values: [{
				name: "none",
				description: "No animation is performed"
			}],
			relevance: 50,
			description: "Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.",
			restrictions: ["identifier", "enum"]
		}, {
			name: "-o-animation-play-state",
			browsers: ["O12"],
			values: [{
				name: "paused",
				description: "A running animation will be paused."
			}, {
				name: "running",
				description: "Resume playback of a paused animation."
			}],
			relevance: 50,
			description: "Defines whether the animation is running or paused.",
			restrictions: ["enum"]
		}, {
			name: "-o-animation-timing-function",
			browsers: ["O12"],
			relevance: 50,
			description: "Describes how the animation will progress over one cycle of its duration. See the 'transition-timing-function'.",
			restrictions: ["timing-function"]
		}, {
			name: "object-fit",
			browsers: ["E79", "FF36", "S10", "C32", "O19"],
			values: [{
				name: "contain",
				description: "The replaced content is sized to maintain its aspect ratio while fitting within the element’s content box: its concrete object size is resolved as a contain constraint against the element's used width and height."
			}, {
				name: "cover",
				description: "The replaced content is sized to maintain its aspect ratio while filling the element's entire content box: its concrete object size is resolved as a cover constraint against the element’s used width and height."
			}, {
				name: "fill",
				description: "The replaced content is sized to fill the element’s content box: the object's concrete object size is the element's used width and height."
			}, {
				name: "none",
				description: "The replaced content is not resized to fit inside the element's content box"
			}, {
				name: "scale-down",
				description: "Size the content as if ‘none’ or ‘contain’ were specified, whichever would result in a smaller concrete object size."
			}],
			syntax: "fill | contain | cover | none | scale-down",
			relevance: 67,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/object-fit"
			}],
			description: "Specifies how the contents of a replaced element should be scaled relative to the box established by its used height and width.",
			restrictions: ["enum"]
		}, {
			name: "object-position",
			browsers: ["E79", "FF36", "S10", "C32", "O19"],
			syntax: "<position>",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/object-position"
			}],
			description: "Determines the alignment of the replaced element inside its box.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "-o-border-image",
			browsers: ["O11.6"],
			values: [{
				name: "auto",
				description: "If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead."
			}, {
				name: "fill",
				description: "Causes the middle part of the border-image to be preserved."
			}, {
				name: "none"
			}, {
				name: "repeat",
				description: "The image is tiled (repeated) to fill the area."
			}, {
				name: "round",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does."
			}, {
				name: "space",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles."
			}, {
				name: "stretch",
				description: "The image is stretched to fill the area."
			}],
			relevance: 50,
			description: "Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.",
			restrictions: ["length", "percentage", "number", "image", "enum"]
		}, {
			name: "-o-object-fit",
			browsers: ["O10.6"],
			values: [{
				name: "contain",
				description: "The replaced content is sized to maintain its aspect ratio while fitting within the element’s content box: its concrete object size is resolved as a contain constraint against the element's used width and height."
			}, {
				name: "cover",
				description: "The replaced content is sized to maintain its aspect ratio while filling the element's entire content box: its concrete object size is resolved as a cover constraint against the element’s used width and height."
			}, {
				name: "fill",
				description: "The replaced content is sized to fill the element’s content box: the object's concrete object size is the element's used width and height."
			}, {
				name: "none",
				description: "The replaced content is not resized to fit inside the element's content box"
			}, {
				name: "scale-down",
				description: "Size the content as if ‘none’ or ‘contain’ were specified, whichever would result in a smaller concrete object size."
			}],
			relevance: 50,
			description: "Specifies how the contents of a replaced element should be scaled relative to the box established by its used height and width.",
			restrictions: ["enum"]
		}, {
			name: "-o-object-position",
			browsers: ["O10.6"],
			relevance: 50,
			description: "Determines the alignment of the replaced element inside its box.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "opacity",
			syntax: "<alpha-value>",
			relevance: 93,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/opacity"
			}],
			description: "Opacity of an element's text, where 1 is opaque and 0 is entirely transparent.",
			restrictions: ["number(0-1)"]
		}, {
			name: "order",
			syntax: "<integer>",
			relevance: 63,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/order"
			}],
			description: "Controls the order in which children of a flex container appear within the flex container, by assigning them to ordinal groups.",
			restrictions: ["integer"]
		}, {
			name: "orphans",
			browsers: ["E12", "S1.3", "C25", "IE8", "O9.2"],
			syntax: "<integer>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/orphans"
			}],
			description: "Specifies the minimum number of line boxes in a block container that must be left in a fragment before a fragmentation break.",
			restrictions: ["integer"]
		}, {
			name: "-o-table-baseline",
			browsers: ["O9.6"],
			relevance: 50,
			description: "Determines which row of a inline-table should be used as baseline of inline-table.",
			restrictions: ["integer"]
		}, {
			name: "-o-tab-size",
			browsers: ["O10.6"],
			relevance: 50,
			description: "This property determines the width of the tab character (U+0009), in space characters (U+0020), when rendered.",
			restrictions: ["integer", "length"]
		}, {
			name: "-o-text-overflow",
			browsers: ["O10"],
			values: [{
				name: "clip",
				description: "Clip inline content that overflows. Characters may be only partially rendered."
			}, {
				name: "ellipsis",
				description: "Render an ellipsis character (U+2026) to represent clipped inline content."
			}],
			relevance: 50,
			description: "Text can overflow for example when it is prevented from wrapping",
			restrictions: ["enum"]
		}, {
			name: "-o-transform",
			browsers: ["O10.5"],
			values: [{
				name: "matrix()",
				description: "Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f]"
			}, {
				name: "matrix3d()",
				description: "Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order."
			}, {
				name: "none"
			}, {
				name: "rotate()",
				description: "Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property."
			}, {
				name: "rotate3d()",
				description: "Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters."
			}, {
				name: "rotateX('angle')",
				description: "Specifies a clockwise rotation by the given angle about the X axis."
			}, {
				name: "rotateY('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Y axis."
			}, {
				name: "rotateZ('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Z axis."
			}, {
				name: "scale()",
				description: "Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first."
			}, {
				name: "scale3d()",
				description: "Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters."
			}, {
				name: "scaleX()",
				description: "Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter."
			}, {
				name: "scaleY()",
				description: "Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter."
			}, {
				name: "scaleZ()",
				description: "Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter."
			}, {
				name: "skew()",
				description: "Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis)."
			}, {
				name: "skewX()",
				description: "Specifies a skew transformation along the X axis by the given angle."
			}, {
				name: "skewY()",
				description: "Specifies a skew transformation along the Y axis by the given angle."
			}, {
				name: "translate()",
				description: "Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter."
			}, {
				name: "translate3d()",
				description: "Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively."
			}, {
				name: "translateX()",
				description: "Specifies a translation by the given amount in the X direction."
			}, {
				name: "translateY()",
				description: "Specifies a translation by the given amount in the Y direction."
			}, {
				name: "translateZ()",
				description: "Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0."
			}],
			relevance: 50,
			description: "A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.",
			restrictions: ["enum"]
		}, {
			name: "-o-transform-origin",
			browsers: ["O10.5"],
			relevance: 50,
			description: "Establishes the origin of transformation for an element.",
			restrictions: ["positon", "length", "percentage"]
		}, {
			name: "-o-transition",
			browsers: ["O11.5"],
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			relevance: 50,
			description: "Shorthand property combines four of the transition properties into a single property.",
			restrictions: ["time", "property", "timing-function", "enum"]
		}, {
			name: "-o-transition-delay",
			browsers: ["O11.5"],
			relevance: 50,
			description: "Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.",
			restrictions: ["time"]
		}, {
			name: "-o-transition-duration",
			browsers: ["O11.5"],
			relevance: 50,
			description: "Specifies how long the transition from the old value to the new value should take.",
			restrictions: ["time"]
		}, {
			name: "-o-transition-property",
			browsers: ["O11.5"],
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			relevance: 50,
			description: "Specifies the name of the CSS property to which the transition is applied.",
			restrictions: ["property"]
		}, {
			name: "-o-transition-timing-function",
			browsers: ["O11.5"],
			relevance: 50,
			description: "Describes how the intermediate values used during a transition will be calculated.",
			restrictions: ["timing-function"]
		}, {
			name: "offset-block-end",
			browsers: ["FF41"],
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well."
			}],
			relevance: 50,
			description: "Logical 'bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "offset-block-start",
			browsers: ["FF41"],
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well."
			}],
			relevance: 50,
			description: "Logical 'top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "offset-inline-end",
			browsers: ["FF41"],
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well."
			}],
			relevance: 50,
			description: "Logical 'right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "offset-inline-start",
			browsers: ["FF41"],
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well."
			}],
			relevance: 50,
			description: "Logical 'left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "outline",
			values: [{
				name: "auto",
				description: "Permits the user agent to render a custom outline style, typically the default platform style."
			}, {
				name: "invert",
				description: "Performs a color inversion on the pixels on the screen."
			}],
			syntax: "[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]",
			relevance: 88,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/outline"
			}],
			description: "Shorthand property for 'outline-style', 'outline-width', and 'outline-color'.",
			restrictions: ["length", "line-width", "line-style", "color", "enum"]
		}, {
			name: "outline-color",
			values: [{
				name: "invert",
				description: "Performs a color inversion on the pixels on the screen."
			}],
			syntax: "<color> | invert",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/outline-color"
			}],
			description: "The color of the outline.",
			restrictions: ["enum", "color"]
		}, {
			name: "outline-offset",
			browsers: ["E15", "FF1.5", "S1.2", "C1", "O9.5"],
			syntax: "<length>",
			relevance: 65,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/outline-offset"
			}],
			description: "Offset the outline and draw it beyond the border edge.",
			restrictions: ["length"]
		}, {
			name: "outline-style",
			values: [{
				name: "auto",
				description: "Permits the user agent to render a custom outline style, typically the default platform style."
			}],
			syntax: "auto | <'border-style'>",
			relevance: 61,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/outline-style"
			}],
			description: "Style of the outline.",
			restrictions: ["line-style", "enum"]
		}, {
			name: "outline-width",
			syntax: "<line-width>",
			relevance: 62,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/outline-width"
			}],
			description: "Width of the outline.",
			restrictions: ["length", "line-width"]
		}, {
			name: "overflow",
			values: [{
				name: "auto",
				description: "The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes."
			}, {
				name: "hidden",
				description: "Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region."
			}, {
				name: "-moz-hidden-unscrollable",
				description: "Same as the standardized 'clip', except doesn’t establish a block formatting context."
			}, {
				name: "scroll",
				description: "Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped."
			}, {
				name: "visible",
				description: "Content is not clipped, i.e., it may be rendered outside the content box."
			}],
			syntax: "[ visible | hidden | clip | scroll | auto ]{1,2}",
			relevance: 93,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow"
			}],
			description: "Shorthand for setting 'overflow-x' and 'overflow-y'.",
			restrictions: ["enum"]
		}, {
			name: "overflow-wrap",
			values: [{
				name: "break-word",
				description: "An otherwise unbreakable sequence of characters may be broken at an arbitrary point if there are no otherwise-acceptable break points in the line."
			}, {
				name: "normal",
				description: "Lines may break only at allowed break points."
			}],
			syntax: "normal | break-word | anywhere",
			relevance: 65,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-wrap"
			}],
			description: "Specifies whether the UA may break within a word to prevent overflow when an otherwise-unbreakable string is too long to fit within the line box.",
			restrictions: ["enum"]
		}, {
			name: "overflow-x",
			values: [{
				name: "auto",
				description: "The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes."
			}, {
				name: "hidden",
				description: "Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region."
			}, {
				name: "scroll",
				description: "Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped."
			}, {
				name: "visible",
				description: "Content is not clipped, i.e., it may be rendered outside the content box."
			}],
			syntax: "visible | hidden | clip | scroll | auto",
			relevance: 81,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-x"
			}],
			description: "Specifies the handling of overflow in the horizontal direction.",
			restrictions: ["enum"]
		}, {
			name: "overflow-y",
			values: [{
				name: "auto",
				description: "The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes."
			}, {
				name: "hidden",
				description: "Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region."
			}, {
				name: "scroll",
				description: "Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped."
			}, {
				name: "visible",
				description: "Content is not clipped, i.e., it may be rendered outside the content box."
			}],
			syntax: "visible | hidden | clip | scroll | auto",
			relevance: 82,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-y"
			}],
			description: "Specifies the handling of overflow in the vertical direction.",
			restrictions: ["enum"]
		}, {
			name: "pad",
			browsers: ["FF33"],
			syntax: "<integer> && <symbol>",
			relevance: 50,
			description: "@counter-style descriptor. Specifies a “fixed-width” counter style, where representations shorter than the pad value are padded with a particular <symbol>",
			restrictions: ["integer", "image", "string", "identifier"]
		}, {
			name: "padding",
			values: [],
			syntax: "[ <length> | <percentage> ]{1,4}",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding"
			}],
			description: "Shorthand property to set values the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-bottom",
			syntax: "<length> | <percentage>",
			relevance: 89,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-bottom"
			}],
			description: "Shorthand property to set values the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-block-end",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'padding-left'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-block-end"
			}],
			description: "Logical 'padding-bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-block-start",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'padding-left'>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-block-start"
			}],
			description: "Logical 'padding-top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-inline-end",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'padding-left'>",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline-end"
			}],
			description: "Logical 'padding-right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-inline-start",
			browsers: ["E79", "FF41", "S12.1", "C69", "O56"],
			syntax: "<'padding-left'>",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline-start"
			}],
			description: "Logical 'padding-left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-left",
			syntax: "<length> | <percentage>",
			relevance: 91,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-left"
			}],
			description: "Shorthand property to set values the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-right",
			syntax: "<length> | <percentage>",
			relevance: 90,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-right"
			}],
			description: "Shorthand property to set values the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			restrictions: ["length", "percentage"]
		}, {
			name: "padding-top",
			syntax: "<length> | <percentage>",
			relevance: 90,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-top"
			}],
			description: "Shorthand property to set values the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			restrictions: ["length", "percentage"]
		}, {
			name: "page-break-after",
			values: [{
				name: "always",
				description: "Always force a page break after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page break after generated box."
			}, {
				name: "avoid",
				description: "Avoid a page break after the generated box."
			}, {
				name: "left",
				description: "Force one or two page breaks after the generated box so that the next page is formatted as a left page."
			}, {
				name: "right",
				description: "Force one or two page breaks after the generated box so that the next page is formatted as a right page."
			}],
			syntax: "auto | always | avoid | left | right | recto | verso",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/page-break-after"
			}],
			description: "Defines rules for page breaks after an element.",
			restrictions: ["enum"]
		}, {
			name: "page-break-before",
			values: [{
				name: "always",
				description: "Always force a page break before the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page break before the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page break before the generated box."
			}, {
				name: "left",
				description: "Force one or two page breaks before the generated box so that the next page is formatted as a left page."
			}, {
				name: "right",
				description: "Force one or two page breaks before the generated box so that the next page is formatted as a right page."
			}],
			syntax: "auto | always | avoid | left | right | recto | verso",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/page-break-before"
			}],
			description: "Defines rules for page breaks before an element.",
			restrictions: ["enum"]
		}, {
			name: "page-break-inside",
			values: [{
				name: "auto",
				description: "Neither force nor forbid a page break inside the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page break inside the generated box."
			}],
			syntax: "auto | avoid",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/page-break-inside"
			}],
			description: "Defines rules for page breaks inside an element.",
			restrictions: ["enum"]
		}, {
			name: "paint-order",
			browsers: ["E17", "FF60", "S8", "C35", "O22"],
			values: [{
				name: "fill"
			}, {
				name: "markers"
			}, {
				name: "normal",
				description: "The element is painted with the standard order of painting operations: the 'fill' is painted first, then its 'stroke' and finally its markers."
			}, {
				name: "stroke"
			}],
			syntax: "normal | [ fill || stroke || markers ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/paint-order"
			}],
			description: "Controls the order that the three paint operations that shapes and text are rendered with: their fill, their stroke and any markers they might have.",
			restrictions: ["enum"]
		}, {
			name: "perspective",
			values: [{
				name: "none",
				description: "No perspective transform is applied."
			}],
			syntax: "none | <length>",
			relevance: 56,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/perspective"
			}],
			description: "Applies the same transform as the perspective(<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.",
			restrictions: ["length", "enum"]
		}, {
			name: "perspective-origin",
			syntax: "<position>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/perspective-origin"
			}],
			description: "Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.",
			restrictions: ["position", "percentage", "length"]
		}, {
			name: "pointer-events",
			values: [{
				name: "all",
				description: "The given element can be the target element for pointer events whenever the pointer is over either the interior or the perimeter of the element."
			}, {
				name: "fill",
				description: "The given element can be the target element for pointer events whenever the pointer is over the interior of the element."
			}, {
				name: "none",
				description: "The given element does not receive pointer events."
			}, {
				name: "painted",
				description: 'The given element can be the target element for pointer events when the pointer is over a "painted" area. '
			}, {
				name: "stroke",
				description: "The given element can be the target element for pointer events whenever the pointer is over the perimeter of the element."
			}, {
				name: "visible",
				description: "The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and the pointer is over either the interior or the perimete of the element."
			}, {
				name: "visibleFill",
				description: "The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and when the pointer is over the interior of the element."
			}, {
				name: "visiblePainted",
				description: "The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and when the pointer is over a ‘painted’ area."
			}, {
				name: "visibleStroke",
				description: "The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and when the pointer is over the perimeter of the element."
			}],
			syntax: "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
			relevance: 82,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/pointer-events"
			}],
			description: "Specifies under what circumstances a given element can be the target element for a pointer event.",
			restrictions: ["enum"]
		}, {
			name: "position",
			values: [{
				name: "absolute",
				description: "The box's position (and possibly size) is specified with the 'top', 'right', 'bottom', and 'left' properties. These properties specify offsets with respect to the box's 'containing block'."
			}, {
				name: "fixed",
				description: "The box's position is calculated according to the 'absolute' model, but in addition, the box is fixed with respect to some reference. As with the 'absolute' model, the box's margins do not collapse with any other margins."
			}, {
				name: "-ms-page",
				description: "The box's position is calculated according to the 'absolute' model."
			}, {
				name: "relative",
				description: "The box's position is calculated according to the normal flow (this is called the position in normal flow). Then the box is offset relative to its normal position."
			}, {
				name: "static",
				description: "The box is a normal box, laid out according to the normal flow. The 'top', 'right', 'bottom', and 'left' properties do not apply."
			}, {
				name: "sticky",
				description: "The box's position is calculated according to the normal flow. Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes."
			}, {
				name: "-webkit-sticky",
				description: "The box's position is calculated according to the normal flow. Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes."
			}],
			syntax: "static | relative | absolute | sticky | fixed",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/position"
			}],
			description: "The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.",
			restrictions: ["enum"]
		}, {
			name: "prefix",
			browsers: ["FF33"],
			syntax: "<symbol>",
			relevance: 50,
			description: "@counter-style descriptor. Specifies a <symbol> that is prepended to the marker representation.",
			restrictions: ["image", "string", "identifier"]
		}, {
			name: "quotes",
			values: [{
				name: "none",
				description: "The 'open-quote' and 'close-quote' values of the 'content' property produce no quotations marks, as if they were 'no-open-quote' and 'no-close-quote' respectively."
			}],
			syntax: "none | auto | [ <string> <string> ]+",
			relevance: 53,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/quotes"
			}],
			description: "Specifies quotation marks for any number of embedded quotations.",
			restrictions: ["string"]
		}, {
			name: "range",
			browsers: ["FF33"],
			values: [{
				name: "auto",
				description: "The range depends on the counter system."
			}, {
				name: "infinite",
				description: "If used as the first value in a range, it represents negative infinity; if used as the second value, it represents positive infinity."
			}],
			syntax: "[ [ <integer> | infinite ]{2} ]# | auto",
			relevance: 50,
			description: "@counter-style descriptor. Defines the ranges over which the counter style is defined.",
			restrictions: ["integer", "enum"]
		}, {
			name: "resize",
			browsers: ["E79", "FF4", "S3", "C1", "O12.1"],
			values: [{
				name: "both",
				description: "The UA presents a bidirectional resizing mechanism to allow the user to adjust both the height and the width of the element."
			}, {
				name: "horizontal",
				description: "The UA presents a unidirectional horizontal resizing mechanism to allow the user to adjust only the width of the element."
			}, {
				name: "none",
				description: "The UA does not present a resizing mechanism on the element, and the user is given no direct manipulation mechanism to resize the element."
			}, {
				name: "vertical",
				description: "The UA presents a unidirectional vertical resizing mechanism to allow the user to adjust only the height of the element."
			}],
			syntax: "none | both | horizontal | vertical | block | inline",
			relevance: 60,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/resize"
			}],
			description: "Specifies whether or not an element is resizable by the user, and if so, along which axis/axes.",
			restrictions: ["enum"]
		}, {
			name: "right",
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 91,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/right"
			}],
			description: "Specifies how far an absolutely positioned box's right margin edge is offset to the left of the right edge of the box's 'containing block'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "ruby-align",
			browsers: ["FF38"],
			values: [{
				name: "auto",
				browsers: ["FF38"],
				description: "The user agent determines how the ruby contents are aligned. This is the initial value."
			}, {
				name: "center",
				description: "The ruby content is centered within its box."
			}, {
				name: "distribute-letter",
				browsers: ["FF38"],
				description: "If the width of the ruby text is smaller than that of the base, then the ruby text contents are evenly distributed across the width of the base, with the first and last ruby text glyphs lining up with the corresponding first and last base glyphs. If the width of the ruby text is at least the width of the base, then the letters of the base are evenly distributed across the width of the ruby text."
			}, {
				name: "distribute-space",
				browsers: ["FF38"],
				description: "If the width of the ruby text is smaller than that of the base, then the ruby text contents are evenly distributed across the width of the base, with a certain amount of white space preceding the first and following the last character in the ruby text. That amount of white space is normally equal to half the amount of inter-character space of the ruby text."
			}, {
				name: "left",
				description: "The ruby text content is aligned with the start edge of the base."
			}, {
				name: "line-edge",
				browsers: ["FF38"],
				description: "If the ruby text is not adjacent to a line edge, it is aligned as in 'auto'. If it is adjacent to a line edge, then it is still aligned as in auto, but the side of the ruby text that touches the end of the line is lined up with the corresponding edge of the base."
			}, {
				name: "right",
				browsers: ["FF38"],
				description: "The ruby text content is aligned with the end edge of the base."
			}, {
				name: "start",
				browsers: ["FF38"],
				description: "The ruby text content is aligned with the start edge of the base."
			}, {
				name: "space-between",
				browsers: ["FF38"],
				description: "The ruby content expands as defined for normal text justification (as defined by 'text-justify'),"
			}, {
				name: "space-around",
				browsers: ["FF38"],
				description: "As for 'space-between' except that there exists an extra justification opportunities whose space is distributed half before and half after the ruby content."
			}],
			status: "experimental",
			syntax: "start | center | space-between | space-around",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/ruby-align"
			}],
			description: "Specifies how text is distributed within the various ruby boxes when their contents do not exactly fill their respective boxes.",
			restrictions: ["enum"]
		}, {
			name: "ruby-overhang",
			browsers: ["FF10", "IE5"],
			values: [{
				name: "auto",
				description: "The ruby text can overhang text adjacent to the base on either side. This is the initial value."
			}, {
				name: "end",
				description: "The ruby text can overhang the text that follows it."
			}, {
				name: "none",
				description: "The ruby text cannot overhang any text adjacent to its base, only its own base."
			}, {
				name: "start",
				description: "The ruby text can overhang the text that precedes it."
			}],
			relevance: 50,
			description: "Determines whether, and on which side, ruby text is allowed to partially overhang any adjacent text in addition to its own base, when the ruby text is wider than the ruby base.",
			restrictions: ["enum"]
		}, {
			name: "ruby-position",
			browsers: ["E84", "FF38", "S6.1", "C84", "O70"],
			values: [{
				name: "after",
				description: "The ruby text appears after the base. This is a relatively rare setting used in ideographic East Asian writing systems, most easily found in educational text."
			}, {
				name: "before",
				description: "The ruby text appears before the base. This is the most common setting used in ideographic East Asian writing systems."
			}, {
				name: "inline"
			}, {
				name: "right",
				description: "The ruby text appears on the right of the base. Unlike 'before' and 'after', this value is not relative to the text flow direction."
			}],
			status: "experimental",
			syntax: "[ alternate || [ over | under ] ] | inter-character",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/ruby-position"
			}],
			description: "Used by the parent of elements with display: ruby-text to control the position of the ruby text with respect to its base.",
			restrictions: ["enum"]
		}, {
			name: "ruby-span",
			browsers: ["FF10"],
			values: [{
				name: "attr(x)",
				description: "The value of attribute 'x' is a string value. The string value is evaluated as a <number> to determine the number of ruby base elements to be spanned by the annotation element."
			}, {
				name: "none",
				description: "No spanning. The computed value is '1'."
			}],
			relevance: 50,
			description: "Determines whether, and on which side, ruby text is allowed to partially overhang any adjacent text in addition to its own base, when the ruby text is wider than the ruby base.",
			restrictions: ["enum"]
		}, {
			name: "scrollbar-3dlight-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-3dlight-color"
			}],
			description: "Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-arrow-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-arrow-color"
			}],
			description: "Determines the color of the arrow elements of a scroll arrow.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-base-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-base-color"
			}],
			description: "Determines the color of the main elements of a scroll bar, which include the scroll box, track, and scroll arrows.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-darkshadow-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-darkshadow-color"
			}],
			description: "Determines the color of the gutter of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-face-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-face-color"
			}],
			description: "Determines the color of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-highlight-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-highlight-color"
			}],
			description: "Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-shadow-color",
			browsers: ["IE5"],
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-shadow-color"
			}],
			description: "Determines the color of the bottom and right edges of the scroll box and scroll arrows of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "scrollbar-track-color",
			browsers: ["IE6"],
			relevance: 50,
			description: "Determines the color of the track element of a scroll bar.",
			restrictions: ["color"]
		}, {
			name: "scroll-behavior",
			browsers: ["E79", "FF36", "S14", "C61", "O48"],
			values: [{
				name: "auto",
				description: "Scrolls in an instant fashion."
			}, {
				name: "smooth",
				description: "Scrolls in a smooth fashion using a user-agent-defined timing function and time period."
			}],
			syntax: "auto | smooth",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-behavior"
			}],
			description: "Specifies the scrolling behavior for a scrolling box, when scrolling happens due to navigation or CSSOM scrolling APIs.",
			restrictions: ["enum"]
		}, {
			name: "scroll-snap-coordinate",
			browsers: ["FF39"],
			values: [{
				name: "none",
				description: "Specifies that this element does not contribute a snap point."
			}],
			status: "obsolete",
			syntax: "none | <position>#",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate"
			}],
			description: "Defines the x and y coordinate within the element which will align with the nearest ancestor scroll container’s snap-destination for the respective axis.",
			restrictions: ["position", "length", "percentage", "enum"]
		}, {
			name: "scroll-snap-destination",
			browsers: ["FF39"],
			status: "obsolete",
			syntax: "<position>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination"
			}],
			description: "Define the x and y coordinate within the scroll container’s visual viewport which element snap points will align with.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "scroll-snap-points-x",
			browsers: ["FF39", "S9"],
			values: [{
				name: "none",
				description: "No snap points are defined by this scroll container."
			}, {
				name: "repeat()",
				description: "Defines an interval at which snap points are defined, starting from the container’s relevant start edge."
			}],
			status: "obsolete",
			syntax: "none | repeat( <length-percentage> )",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x"
			}],
			description: "Defines the positioning of snap points along the x axis of the scroll container it is applied to.",
			restrictions: ["enum"]
		}, {
			name: "scroll-snap-points-y",
			browsers: ["FF39", "S9"],
			values: [{
				name: "none",
				description: "No snap points are defined by this scroll container."
			}, {
				name: "repeat()",
				description: "Defines an interval at which snap points are defined, starting from the container’s relevant start edge."
			}],
			status: "obsolete",
			syntax: "none | repeat( <length-percentage> )",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y"
			}],
			description: "Defines the positioning of snap points along the y axis of the scroll container it is applied to.",
			restrictions: ["enum"]
		}, {
			name: "scroll-snap-type",
			values: [{
				name: "none",
				description: "The visual viewport of this scroll container must ignore snap points, if any, when scrolled."
			}, {
				name: "mandatory",
				description: "The visual viewport of this scroll container is guaranteed to rest on a snap point when there are no active scrolling operations."
			}, {
				name: "proximity",
				description: "The visual viewport of this scroll container may come to rest on a snap point at the termination of a scroll at the discretion of the UA given the parameters of the scroll."
			}],
			syntax: "none | [ x | y | block | inline | both ] [ mandatory | proximity ]?",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type"
			}],
			description: "Defines how strictly snap points are enforced on the scroll container.",
			restrictions: ["enum"]
		}, {
			name: "shape-image-threshold",
			browsers: ["E79", "FF62", "S10.1", "C37", "O24"],
			syntax: "<alpha-value>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold"
			}],
			description: "Defines the alpha channel threshold used to extract the shape using an image. A value of 0.5 means that the shape will enclose all the pixels that are more than 50% opaque.",
			restrictions: ["number"]
		}, {
			name: "shape-margin",
			browsers: ["E79", "FF62", "S10.1", "C37", "O24"],
			syntax: "<length-percentage>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/shape-margin"
			}],
			description: "Adds a margin to a 'shape-outside'. This defines a new shape that is the smallest contour that includes all the points that are the 'shape-margin' distance outward in the perpendicular direction from a point on the underlying shape.",
			restrictions: ["url", "length", "percentage"]
		}, {
			name: "shape-outside",
			browsers: ["E79", "FF62", "S10.1", "C37", "O24"],
			values: [{
				name: "margin-box",
				description: "The background is painted within (clipped to) the margin box."
			}, {
				name: "none",
				description: "The float area is unaffected."
			}],
			syntax: "none | [ <shape-box> || <basic-shape> ] | <image>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/shape-outside"
			}],
			description: "Specifies an orthogonal rotation to be applied to an image before it is laid out.",
			restrictions: ["image", "box", "shape", "enum"]
		}, {
			name: "shape-rendering",
			values: [{
				name: "auto",
				description: "Suppresses aural rendering."
			}, {
				name: "crispEdges",
				description: "Emphasize the contrast between clean edges of artwork over rendering speed and geometric precision."
			}, {
				name: "geometricPrecision",
				description: "Emphasize geometric precision over speed and crisp edges."
			}, {
				name: "optimizeSpeed",
				description: "Emphasize rendering speed over geometric precision and crisp edges."
			}],
			relevance: 50,
			description: "Provides hints about what tradeoffs to make as it renders vector graphics elements such as <path> elements and basic shapes such as circles and rectangles.",
			restrictions: ["enum"]
		}, {
			name: "size",
			browsers: ["C", "O8"],
			syntax: "<length>{1,2} | auto | [ <page-size> || [ portrait | landscape ] ]",
			relevance: 52,
			description: "The size CSS at-rule descriptor, used with the @page at-rule, defines the size and orientation of the box which is used to represent a page. Most of the time, this size corresponds to the target size of the printed page if applicable.",
			restrictions: ["length"]
		}, {
			name: "src",
			values: [{
				name: "url()",
				description: "Reference font by URL"
			}, {
				name: "format()",
				description: "Optional hint describing the format of the font resource."
			}, {
				name: "local()",
				description: "Format-specific string that identifies a locally available copy of a given font."
			}],
			syntax: "[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#",
			relevance: 64,
			description: "@font-face descriptor. Specifies the resource containing font data. It is required, whether the font is downloadable or locally installed.",
			restrictions: ["enum", "url", "identifier"]
		}, {
			name: "stop-color",
			relevance: 51,
			description: "Indicates what color to use at that gradient stop.",
			restrictions: ["color"]
		}, {
			name: "stop-opacity",
			relevance: 50,
			description: "Defines the opacity of a given gradient stop.",
			restrictions: ["number(0-1)"]
		}, {
			name: "stroke",
			values: [{
				name: "url()",
				description: "A URL reference to a paint server element, which is an element that defines a paint server: ‘hatch’, ‘linearGradient’, ‘mesh’, ‘pattern’, ‘radialGradient’ and ‘solidcolor’."
			}, {
				name: "none",
				description: "No paint is applied in this layer."
			}],
			relevance: 64,
			description: "Paints along the outline of the given graphical element.",
			restrictions: ["color", "enum", "url"]
		}, {
			name: "stroke-dasharray",
			values: [{
				name: "none",
				description: "Indicates that no dashing is used."
			}],
			relevance: 58,
			description: "Controls the pattern of dashes and gaps used to stroke paths.",
			restrictions: ["length", "percentage", "number", "enum"]
		}, {
			name: "stroke-dashoffset",
			relevance: 58,
			description: "Specifies the distance into the dash pattern to start the dash.",
			restrictions: ["percentage", "length"]
		}, {
			name: "stroke-linecap",
			values: [{
				name: "butt",
				description: "Indicates that the stroke for each subpath does not extend beyond its two endpoints."
			}, {
				name: "round",
				description: "Indicates that at each end of each subpath, the shape representing the stroke will be extended by a half circle with a radius equal to the stroke width."
			}, {
				name: "square",
				description: "Indicates that at the end of each subpath, the shape representing the stroke will be extended by a rectangle with the same width as the stroke width and whose length is half of the stroke width."
			}],
			relevance: 53,
			description: "Specifies the shape to be used at the end of open subpaths when they are stroked.",
			restrictions: ["enum"]
		}, {
			name: "stroke-linejoin",
			values: [{
				name: "bevel",
				description: "Indicates that a bevelled corner is to be used to join path segments."
			}, {
				name: "miter",
				description: "Indicates that a sharp corner is to be used to join path segments."
			}, {
				name: "round",
				description: "Indicates that a round corner is to be used to join path segments."
			}],
			relevance: 50,
			description: "Specifies the shape to be used at the corners of paths or basic shapes when they are stroked.",
			restrictions: ["enum"]
		}, {
			name: "stroke-miterlimit",
			relevance: 50,
			description: "When two line segments meet at a sharp angle and miter joins have been specified for 'stroke-linejoin', it is possible for the miter to extend far beyond the thickness of the line stroking the path.",
			restrictions: ["number"]
		}, {
			name: "stroke-opacity",
			relevance: 52,
			description: "Specifies the opacity of the painting operation used to stroke the current object.",
			restrictions: ["number(0-1)"]
		}, {
			name: "stroke-width",
			relevance: 61,
			description: "Specifies the width of the stroke on the current object.",
			restrictions: ["percentage", "length"]
		}, {
			name: "suffix",
			browsers: ["FF33"],
			syntax: "<symbol>",
			relevance: 50,
			description: "@counter-style descriptor. Specifies a <symbol> that is appended to the marker representation.",
			restrictions: ["image", "string", "identifier"]
		}, {
			name: "system",
			browsers: ["FF33"],
			values: [{
				name: "additive",
				description: "Represents “sign-value” numbering systems, which, rather than using reusing digits in different positions to change their value, define additional digits with much larger values, so that the value of the number can be obtained by adding all the digits together."
			}, {
				name: "alphabetic",
				description: 'Interprets the list of counter symbols as digits to an alphabetic numbering system, similar to the default lower-alpha counter style, which wraps from "a", "b", "c", to "aa", "ab", "ac".'
			}, {
				name: "cyclic",
				description: "Cycles repeatedly through its provided symbols, looping back to the beginning when it reaches the end of the list."
			}, {
				name: "extends",
				description: "Use the algorithm of another counter style, but alter other aspects."
			}, {
				name: "fixed",
				description: "Runs through its list of counter symbols once, then falls back."
			}, {
				name: "numeric",
				description: "interprets the list of counter symbols as digits to a \"place-value\" numbering system, similar to the default 'decimal' counter style."
			}, {
				name: "symbolic",
				description: "Cycles repeatedly through its provided symbols, doubling, tripling, etc. the symbols on each successive pass through the list."
			}],
			syntax: "cyclic | numeric | alphabetic | symbolic | additive | [ fixed <integer>? ] | [ extends <counter-style-name> ]",
			relevance: 50,
			description: "@counter-style descriptor. Specifies which algorithm will be used to construct the counter’s representation based on the counter value.",
			restrictions: ["enum", "integer"]
		}, {
			name: "symbols",
			browsers: ["FF33"],
			syntax: "<symbol>+",
			relevance: 50,
			description: "@counter-style descriptor. Specifies the symbols used by the marker-construction algorithm specified by the system descriptor.",
			restrictions: ["image", "string", "identifier"]
		}, {
			name: "table-layout",
			values: [{
				name: "auto",
				description: "Use any automatic table layout algorithm."
			}, {
				name: "fixed",
				description: "Use the fixed table layout algorithm."
			}],
			syntax: "auto | fixed",
			relevance: 60,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/table-layout"
			}],
			description: "Controls the algorithm used to lay out the table cells, rows, and columns.",
			restrictions: ["enum"]
		}, {
			name: "tab-size",
			browsers: ["E79", "FF4", "S6.1", "C21", "O15"],
			syntax: "<integer> | <length>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/tab-size"
			}],
			description: "Determines the width of the tab character (U+0009), in space characters (U+0020), when rendered.",
			restrictions: ["integer", "length"]
		}, {
			name: "text-align",
			values: [{
				name: "center",
				description: "The inline contents are centered within the line box."
			}, {
				name: "end",
				description: "The inline contents are aligned to the end edge of the line box."
			}, {
				name: "justify",
				description: "The text is justified according to the method specified by the 'text-justify' property."
			}, {
				name: "left",
				description: "The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text."
			}, {
				name: "right",
				description: "The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text."
			}, {
				name: "start",
				description: "The inline contents are aligned to the start edge of the line box."
			}],
			syntax: "start | end | left | right | center | justify | match-parent",
			relevance: 94,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-align"
			}],
			description: "Describes how inline contents of a block are horizontally aligned if the contents do not completely fill the line box.",
			restrictions: ["string"]
		}, {
			name: "text-align-last",
			browsers: ["E12", "FF49", "C47", "IE5.5", "O34"],
			values: [{
				name: "auto",
				description: "Content on the affected line is aligned per 'text-align' unless 'text-align' is set to 'justify', in which case it is 'start-aligned'."
			}, {
				name: "center",
				description: "The inline contents are centered within the line box."
			}, {
				name: "justify",
				description: "The text is justified according to the method specified by the 'text-justify' property."
			}, {
				name: "left",
				description: "The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text."
			}, {
				name: "right",
				description: "The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text."
			}],
			syntax: "auto | start | end | left | right | center | justify",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-align-last"
			}],
			description: "Describes how the last line of a block or a line right before a forced line break is aligned when 'text-align' is set to 'justify'.",
			restrictions: ["enum"]
		}, {
			name: "text-anchor",
			values: [{
				name: "end",
				description: "The rendered characters are aligned such that the end of the resulting rendered text is at the initial current text position."
			}, {
				name: "middle",
				description: "The rendered characters are aligned such that the geometric middle of the resulting rendered text is at the initial current text position."
			}, {
				name: "start",
				description: "The rendered characters are aligned such that the start of the resulting rendered text is at the initial current text position."
			}],
			relevance: 50,
			description: "Used to align (start-, middle- or end-alignment) a string of text relative to a given point.",
			restrictions: ["enum"]
		}, {
			name: "text-decoration",
			values: [{
				name: "dashed",
				description: "Produces a dashed line style."
			}, {
				name: "dotted",
				description: "Produces a dotted line."
			}, {
				name: "double",
				description: "Produces a double line."
			}, {
				name: "line-through",
				description: "Each line of text has a line through the middle."
			}, {
				name: "none",
				description: "Produces no line."
			}, {
				name: "overline",
				description: "Each line of text has a line above it."
			}, {
				name: "solid",
				description: "Produces a solid line."
			}, {
				name: "underline",
				description: "Each line of text is underlined."
			}, {
				name: "wavy",
				description: "Produces a wavy line."
			}],
			syntax: "<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration"
			}],
			description: "Decorations applied to font used for an element's text.",
			restrictions: ["enum", "color"]
		}, {
			name: "text-decoration-color",
			browsers: ["E79", "FF36", "S12.1", "C57", "O44"],
			syntax: "<color>",
			relevance: 52,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-color"
			}],
			description: "Specifies the color of text decoration (underlines overlines, and line-throughs) set on the element with text-decoration-line.",
			restrictions: ["color"]
		}, {
			name: "text-decoration-line",
			browsers: ["E79", "FF36", "S12.1", "C57", "O44"],
			values: [{
				name: "line-through",
				description: "Each line of text has a line through the middle."
			}, {
				name: "none",
				description: "Neither produces nor inhibits text decoration."
			}, {
				name: "overline",
				description: "Each line of text has a line above it."
			}, {
				name: "underline",
				description: "Each line of text is underlined."
			}],
			syntax: "none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-line"
			}],
			description: "Specifies what line decorations, if any, are added to the element.",
			restrictions: ["enum"]
		}, {
			name: "text-decoration-style",
			browsers: ["E79", "FF36", "S12.1", "C57", "O44"],
			values: [{
				name: "dashed",
				description: "Produces a dashed line style."
			}, {
				name: "dotted",
				description: "Produces a dotted line."
			}, {
				name: "double",
				description: "Produces a double line."
			}, {
				name: "none",
				description: "Produces no line."
			}, {
				name: "solid",
				description: "Produces a solid line."
			}, {
				name: "wavy",
				description: "Produces a wavy line."
			}],
			syntax: "solid | double | dotted | dashed | wavy",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-style"
			}],
			description: "Specifies the line style for underline, line-through and overline text decoration.",
			restrictions: ["enum"]
		}, {
			name: "text-indent",
			values: [],
			syntax: "<length-percentage> && hanging? && each-line?",
			relevance: 69,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-indent"
			}],
			description: "Specifies the indentation applied to lines of inline content in a block. The indentation only affects the first line of inline content in the block unless the 'hanging' keyword is specified, in which case it affects all lines except the first.",
			restrictions: ["percentage", "length"]
		}, {
			name: "text-justify",
			browsers: ["E12", "FF55", "C32", "IE11", "O19"],
			values: [{
				name: "auto",
				description: "The UA determines the justification algorithm to follow, based on a balance between performance and adequate presentation quality."
			}, {
				name: "distribute",
				description: "Justification primarily changes spacing both at word separators and at grapheme cluster boundaries in all scripts except those in the connected and cursive groups. This value is sometimes used in e.g. Japanese, often with the 'text-align-last' property."
			}, {
				name: "distribute-all-lines"
			}, {
				name: "inter-cluster",
				description: "Justification primarily changes spacing at word separators and at grapheme cluster boundaries in clustered scripts. This value is typically used for Southeast Asian scripts such as Thai."
			}, {
				name: "inter-ideograph",
				description: "Justification primarily changes spacing at word separators and at inter-graphemic boundaries in scripts that use no word spaces. This value is typically used for CJK languages."
			}, {
				name: "inter-word",
				description: "Justification primarily changes spacing at word separators. This value is typically used for languages that separate words using spaces, like English or (sometimes) Korean."
			}, {
				name: "kashida",
				description: "Justification primarily stretches Arabic and related scripts through the use of kashida or other calligraphic elongation."
			}, {
				name: "newspaper"
			}],
			syntax: "auto | inter-character | inter-word | none",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-justify"
			}],
			description: "Selects the justification algorithm used when 'text-align' is set to 'justify'. The property applies to block containers, but the UA may (but is not required to) also support it on inline elements.",
			restrictions: ["enum"]
		}, {
			name: "text-orientation",
			browsers: ["E79", "FF41", "S14", "C48", "O15"],
			values: [{
				name: "sideways",
				browsers: ["E79", "FF41", "S14", "C48", "O15"],
				description: "This value is equivalent to 'sideways-right' in 'vertical-rl' writing mode and equivalent to 'sideways-left' in 'vertical-lr' writing mode."
			}, {
				name: "sideways-right",
				browsers: ["E79", "FF41", "S14", "C48", "O15"],
				description: "In vertical writing modes, this causes text to be set as if in a horizontal layout, but rotated 90° clockwise."
			}, {
				name: "upright",
				description: "In vertical writing modes, characters from horizontal-only scripts are rendered upright, i.e. in their standard horizontal orientation."
			}],
			syntax: "mixed | upright | sideways",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-orientation"
			}],
			description: "Specifies the orientation of text within a line.",
			restrictions: ["enum"]
		}, {
			name: "text-overflow",
			values: [{
				name: "clip",
				description: "Clip inline content that overflows. Characters may be only partially rendered."
			}, {
				name: "ellipsis",
				description: "Render an ellipsis character (U+2026) to represent clipped inline content."
			}],
			syntax: "[ clip | ellipsis | <string> ]{1,2}",
			relevance: 82,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-overflow"
			}],
			description: "Text can overflow for example when it is prevented from wrapping.",
			restrictions: ["enum", "string"]
		}, {
			name: "text-rendering",
			browsers: ["E79", "FF1", "S5", "C4", "O15"],
			values: [{
				name: "auto"
			}, {
				name: "geometricPrecision",
				description: "Indicates that the user agent shall emphasize geometric precision over legibility and rendering speed."
			}, {
				name: "optimizeLegibility",
				description: "Indicates that the user agent shall emphasize legibility over rendering speed and geometric precision."
			}, {
				name: "optimizeSpeed",
				description: "Indicates that the user agent shall emphasize rendering speed over legibility and geometric precision."
			}],
			syntax: "auto | optimizeSpeed | optimizeLegibility | geometricPrecision",
			relevance: 68,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-rendering"
			}],
			description: "The creator of SVG content might want to provide a hint to the implementation about what tradeoffs to make as it renders text. The ‘text-rendering’ property provides these hints.",
			restrictions: ["enum"]
		}, {
			name: "text-shadow",
			values: [{
				name: "none",
				description: "No shadow."
			}],
			syntax: "none | <shadow-t>#",
			relevance: 75,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-shadow"
			}],
			description: "Enables shadow effects to be applied to the text of the element.",
			restrictions: ["length", "color"]
		}, {
			name: "text-transform",
			values: [{
				name: "capitalize",
				description: "Puts the first typographic letter unit of each word in titlecase."
			}, {
				name: "lowercase",
				description: "Puts all letters in lowercase."
			}, {
				name: "none",
				description: "No effects."
			}, {
				name: "uppercase",
				description: "Puts all letters in uppercase."
			}],
			syntax: "none | capitalize | uppercase | lowercase | full-width | full-size-kana",
			relevance: 86,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-transform"
			}],
			description: "Controls capitalization effects of an element’s text.",
			restrictions: ["enum"]
		}, {
			name: "text-underline-position",
			values: [{
				name: "above"
			}, {
				name: "auto",
				description: "The user agent may use any algorithm to determine the underline’s position. In horizontal line layout, the underline should be aligned as for alphabetic. In vertical line layout, if the language is set to Japanese or Korean, the underline should be aligned as for over."
			}, {
				name: "below",
				description: "The underline is aligned with the under edge of the element’s content box."
			}],
			syntax: "auto | from-font | [ under || [ left | right ] ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-underline-position"
			}],
			description: "Sets the position of an underline specified on the same element: it does not affect underlines specified by ancestor elements. This property is typically used in vertical writing contexts such as in Japanese documents where it often desired to have the underline appear 'over' (to the right of) the affected run of text",
			restrictions: ["enum"]
		}, {
			name: "top",
			values: [{
				name: "auto",
				description: "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well"
			}],
			syntax: "<length> | <percentage> | auto",
			relevance: 95,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/top"
			}],
			description: "Specifies how far an absolutely positioned box's top margin edge is offset below the top edge of the box's 'containing block'.",
			restrictions: ["length", "percentage"]
		}, {
			name: "touch-action",
			values: [{
				name: "auto",
				description: "The user agent may determine any permitted touch behaviors for touches that begin on the element."
			}, {
				name: "cross-slide-x"
			}, {
				name: "cross-slide-y"
			}, {
				name: "double-tap-zoom"
			}, {
				name: "manipulation",
				description: "The user agent may consider touches that begin on the element only for the purposes of scrolling and continuous zooming."
			}, {
				name: "none",
				description: "Touches that begin on the element must not trigger default touch behaviors."
			}, {
				name: "pan-x",
				description: "The user agent may consider touches that begin on the element only for the purposes of horizontally scrolling the element’s nearest ancestor with horizontally scrollable content."
			}, {
				name: "pan-y",
				description: "The user agent may consider touches that begin on the element only for the purposes of vertically scrolling the element’s nearest ancestor with vertically scrollable content."
			}, {
				name: "pinch-zoom"
			}],
			syntax: "auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation",
			relevance: 67,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/touch-action"
			}],
			description: "Determines whether touch input may trigger default behavior supplied by user agent.",
			restrictions: ["enum"]
		}, {
			name: "transform",
			values: [{
				name: "matrix()",
				description: "Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f]"
			}, {
				name: "matrix3d()",
				description: "Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order."
			}, {
				name: "none"
			}, {
				name: "perspective()",
				description: "Specifies a perspective projection matrix."
			}, {
				name: "rotate()",
				description: "Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property."
			}, {
				name: "rotate3d()",
				description: "Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters."
			}, {
				name: "rotateX('angle')",
				description: "Specifies a clockwise rotation by the given angle about the X axis."
			}, {
				name: "rotateY('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Y axis."
			}, {
				name: "rotateZ('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Z axis."
			}, {
				name: "scale()",
				description: "Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first."
			}, {
				name: "scale3d()",
				description: "Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters."
			}, {
				name: "scaleX()",
				description: "Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter."
			}, {
				name: "scaleY()",
				description: "Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter."
			}, {
				name: "scaleZ()",
				description: "Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter."
			}, {
				name: "skew()",
				description: "Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis)."
			}, {
				name: "skewX()",
				description: "Specifies a skew transformation along the X axis by the given angle."
			}, {
				name: "skewY()",
				description: "Specifies a skew transformation along the Y axis by the given angle."
			}, {
				name: "translate()",
				description: "Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter."
			}, {
				name: "translate3d()",
				description: "Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively."
			}, {
				name: "translateX()",
				description: "Specifies a translation by the given amount in the X direction."
			}, {
				name: "translateY()",
				description: "Specifies a translation by the given amount in the Y direction."
			}, {
				name: "translateZ()",
				description: "Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0."
			}],
			syntax: "none | <transform-list>",
			relevance: 90,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transform"
			}],
			description: "A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.",
			restrictions: ["enum"]
		}, {
			name: "transform-origin",
			syntax: "[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?",
			relevance: 77,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transform-origin"
			}],
			description: "Establishes the origin of transformation for an element.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "transform-style",
			browsers: ["E12", "FF16", "S9", "C36", "O23"],
			values: [{
				name: "flat",
				description: "All children of this element are rendered flattened into the 2D plane of the element."
			}, {
				name: "preserve-3d",
				browsers: ["E12", "FF16", "S9", "C36", "O23"],
				description: "Flattening is not performed, so children maintain their position in 3D space."
			}],
			syntax: "flat | preserve-3d",
			relevance: 55,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transform-style"
			}],
			description: "Defines how nested elements are rendered in 3D space.",
			restrictions: ["enum"]
		}, {
			name: "transition",
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			syntax: "<single-transition>#",
			relevance: 88,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transition"
			}],
			description: "Shorthand property combines four of the transition properties into a single property.",
			restrictions: ["time", "property", "timing-function", "enum"]
		}, {
			name: "transition-delay",
			syntax: "<time>#",
			relevance: 63,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transition-delay"
			}],
			description: "Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.",
			restrictions: ["time"]
		}, {
			name: "transition-duration",
			syntax: "<time>#",
			relevance: 63,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transition-duration"
			}],
			description: "Specifies how long the transition from the old value to the new value should take.",
			restrictions: ["time"]
		}, {
			name: "transition-property",
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			syntax: "none | <single-transition-property>#",
			relevance: 65,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transition-property"
			}],
			description: "Specifies the name of the CSS property to which the transition is applied.",
			restrictions: ["property"]
		}, {
			name: "transition-timing-function",
			syntax: "<easing-function>#",
			relevance: 64,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transition-timing-function"
			}],
			description: "Describes how the intermediate values used during a transition will be calculated.",
			restrictions: ["timing-function"]
		}, {
			name: "unicode-bidi",
			values: [{
				name: "bidi-override",
				description: "Inside the element, reordering is strictly in sequence according to the 'direction' property; the implicit part of the bidirectional algorithm is ignored."
			}, {
				name: "embed",
				description: "If the element is inline-level, this value opens an additional level of embedding with respect to the bidirectional algorithm. The direction of this embedding level is given by the 'direction' property."
			}, {
				name: "isolate",
				description: "The contents of the element are considered to be inside a separate, independent paragraph."
			}, {
				name: "isolate-override",
				description: "This combines the isolation behavior of 'isolate' with the directional override behavior of 'bidi-override'"
			}, {
				name: "normal",
				description: "The element does not open an additional level of embedding with respect to the bidirectional algorithm. For inline-level elements, implicit reordering works across element boundaries."
			}, {
				name: "plaintext",
				description: "For the purposes of the Unicode bidirectional algorithm, the base directionality of each bidi paragraph for which the element forms the containing block is determined not by the element's computed 'direction'."
			}],
			syntax: "normal | embed | isolate | bidi-override | isolate-override | plaintext",
			relevance: 57,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/unicode-bidi"
			}],
			description: "The level of embedding with respect to the bidirectional algorithm.",
			restrictions: ["enum"]
		}, {
			name: "unicode-range",
			values: [{
				name: "U+26",
				description: "Ampersand."
			}, {
				name: "U+20-24F, U+2B0-2FF, U+370-4FF, U+1E00-1EFF, U+2000-20CF, U+2100-23FF, U+2500-26FF, U+E000-F8FF, U+FB00–FB4F",
				description: "WGL4 character set (Pan-European)."
			}, {
				name: "U+20-17F, U+2B0-2FF, U+2000-206F, U+20A0-20CF, U+2100-21FF, U+2600-26FF",
				description: "The Multilingual European Subset No. 1. Latin. Covers ~44 languages."
			}, {
				name: "U+20-2FF, U+370-4FF, U+1E00-20CF, U+2100-23FF, U+2500-26FF, U+FB00-FB4F, U+FFF0-FFFD",
				description: "The Multilingual European Subset No. 2. Latin, Greek, and Cyrillic. Covers ~128 language."
			}, {
				name: "U+20-4FF, U+530-58F, U+10D0-10FF, U+1E00-23FF, U+2440-245F, U+2500-26FF, U+FB00-FB4F, U+FE20-FE2F, U+FFF0-FFFD",
				description: "The Multilingual European Subset No. 3. Covers all characters belonging to European scripts."
			}, {
				name: "U+00-7F",
				description: "Basic Latin (ASCII)."
			}, {
				name: "U+80-FF",
				description: "Latin-1 Supplement. Accented characters for Western European languages, common punctuation characters, multiplication and division signs."
			}, {
				name: "U+100-17F",
				description: "Latin Extended-A. Accented characters for for Czech, Dutch, Polish, and Turkish."
			}, {
				name: "U+180-24F",
				description: "Latin Extended-B. Croatian, Slovenian, Romanian, Non-European and historic latin, Khoisan, Pinyin, Livonian, Sinology."
			}, {
				name: "U+1E00-1EFF",
				description: "Latin Extended Additional. Vietnamese, German captial sharp s, Medievalist, Latin general use."
			}, {
				name: "U+250-2AF",
				description: "International Phonetic Alphabet Extensions."
			}, {
				name: "U+370-3FF",
				description: "Greek and Coptic."
			}, {
				name: "U+1F00-1FFF",
				description: "Greek Extended. Accented characters for polytonic Greek."
			}, {
				name: "U+400-4FF",
				description: "Cyrillic."
			}, {
				name: "U+500-52F",
				description: "Cyrillic Supplement. Extra letters for Komi, Khanty, Chukchi, Mordvin, Kurdish, Aleut, Chuvash, Abkhaz, Azerbaijani, and Orok."
			}, {
				name: "U+00-52F, U+1E00-1FFF, U+2200–22FF",
				description: "Latin, Greek, Cyrillic, some punctuation and symbols."
			}, {
				name: "U+530–58F",
				description: "Armenian."
			}, {
				name: "U+590–5FF",
				description: "Hebrew."
			}, {
				name: "U+600–6FF",
				description: "Arabic."
			}, {
				name: "U+750–77F",
				description: "Arabic Supplement. Additional letters for African languages, Khowar, Torwali, Burushaski, and early Persian."
			}, {
				name: "U+8A0–8FF",
				description: "Arabic Extended-A. Additional letters for African languages, European and Central Asian languages, Rohingya, Tamazight, Arwi, and Koranic annotation signs."
			}, {
				name: "U+700–74F",
				description: "Syriac."
			}, {
				name: "U+900–97F",
				description: "Devanagari."
			}, {
				name: "U+980–9FF",
				description: "Bengali."
			}, {
				name: "U+A00–A7F",
				description: "Gurmukhi."
			}, {
				name: "U+A80–AFF",
				description: "Gujarati."
			}, {
				name: "U+B00–B7F",
				description: "Oriya."
			}, {
				name: "U+B80–BFF",
				description: "Tamil."
			}, {
				name: "U+C00–C7F",
				description: "Telugu."
			}, {
				name: "U+C80–CFF",
				description: "Kannada."
			}, {
				name: "U+D00–D7F",
				description: "Malayalam."
			}, {
				name: "U+D80–DFF",
				description: "Sinhala."
			}, {
				name: "U+118A0–118FF",
				description: "Warang Citi."
			}, {
				name: "U+E00–E7F",
				description: "Thai."
			}, {
				name: "U+1A20–1AAF",
				description: "Tai Tham."
			}, {
				name: "U+AA80–AADF",
				description: "Tai Viet."
			}, {
				name: "U+E80–EFF",
				description: "Lao."
			}, {
				name: "U+F00–FFF",
				description: "Tibetan."
			}, {
				name: "U+1000–109F",
				description: "Myanmar (Burmese)."
			}, {
				name: "U+10A0–10FF",
				description: "Georgian."
			}, {
				name: "U+1200–137F",
				description: "Ethiopic."
			}, {
				name: "U+1380–139F",
				description: "Ethiopic Supplement. Extra Syllables for Sebatbeit, and Tonal marks"
			}, {
				name: "U+2D80–2DDF",
				description: "Ethiopic Extended. Extra Syllables for Me'en, Blin, and Sebatbeit."
			}, {
				name: "U+AB00–AB2F",
				description: "Ethiopic Extended-A. Extra characters for Gamo-Gofa-Dawro, Basketo, and Gumuz."
			}, {
				name: "U+1780–17FF",
				description: "Khmer."
			}, {
				name: "U+1800–18AF",
				description: "Mongolian."
			}, {
				name: "U+1B80–1BBF",
				description: "Sundanese."
			}, {
				name: "U+1CC0–1CCF",
				description: "Sundanese Supplement. Punctuation."
			}, {
				name: "U+4E00–9FD5",
				description: "CJK (Chinese, Japanese, Korean) Unified Ideographs. Most common ideographs for modern Chinese and Japanese."
			}, {
				name: "U+3400–4DB5",
				description: "CJK Unified Ideographs Extension A. Rare ideographs."
			}, {
				name: "U+2F00–2FDF",
				description: "Kangxi Radicals."
			}, {
				name: "U+2E80–2EFF",
				description: "CJK Radicals Supplement. Alternative forms of Kangxi Radicals."
			}, {
				name: "U+1100–11FF",
				description: "Hangul Jamo."
			}, {
				name: "U+AC00–D7AF",
				description: "Hangul Syllables."
			}, {
				name: "U+3040–309F",
				description: "Hiragana."
			}, {
				name: "U+30A0–30FF",
				description: "Katakana."
			}, {
				name: "U+A5, U+4E00-9FFF, U+30??, U+FF00-FF9F",
				description: "Japanese Kanji, Hiragana and Katakana characters plus Yen/Yuan symbol."
			}, {
				name: "U+A4D0–A4FF",
				description: "Lisu."
			}, {
				name: "U+A000–A48F",
				description: "Yi Syllables."
			}, {
				name: "U+A490–A4CF",
				description: "Yi Radicals."
			}, {
				name: "U+2000-206F",
				description: "General Punctuation."
			}, {
				name: "U+3000–303F",
				description: "CJK Symbols and Punctuation."
			}, {
				name: "U+2070–209F",
				description: "Superscripts and Subscripts."
			}, {
				name: "U+20A0–20CF",
				description: "Currency Symbols."
			}, {
				name: "U+2100–214F",
				description: "Letterlike Symbols."
			}, {
				name: "U+2150–218F",
				description: "Number Forms."
			}, {
				name: "U+2190–21FF",
				description: "Arrows."
			}, {
				name: "U+2200–22FF",
				description: "Mathematical Operators."
			}, {
				name: "U+2300–23FF",
				description: "Miscellaneous Technical."
			}, {
				name: "U+E000-F8FF",
				description: "Private Use Area."
			}, {
				name: "U+FB00–FB4F",
				description: "Alphabetic Presentation Forms. Ligatures for latin, Armenian, and Hebrew."
			}, {
				name: "U+FB50–FDFF",
				description: "Arabic Presentation Forms-A. Contextual forms / ligatures for Persian, Urdu, Sindhi, Central Asian languages, etc, Arabic pedagogical symbols, word ligatures."
			}, {
				name: "U+1F600–1F64F",
				description: "Emoji: Emoticons."
			}, {
				name: "U+2600–26FF",
				description: "Emoji: Miscellaneous Symbols."
			}, {
				name: "U+1F300–1F5FF",
				description: "Emoji: Miscellaneous Symbols and Pictographs."
			}, {
				name: "U+1F900–1F9FF",
				description: "Emoji: Supplemental Symbols and Pictographs."
			}, {
				name: "U+1F680–1F6FF",
				description: "Emoji: Transport and Map Symbols."
			}],
			syntax: "<unicode-range>#",
			relevance: 57,
			description: "@font-face descriptor. Defines the set of Unicode codepoints that may be supported by the font face for which it is declared.",
			restrictions: ["unicode-range"]
		}, {
			name: "user-select",
			values: [{
				name: "all",
				description: "The content of the element must be selected atomically"
			}, {
				name: "auto"
			}, {
				name: "contain",
				description: "UAs must not allow a selection which is started in this element to be extended outside of this element."
			}, {
				name: "none",
				description: "The UA must not allow selections to be started in this element."
			}, {
				name: "text",
				description: "The element imposes no constraint on the selection."
			}],
			syntax: "auto | text | none | contain | all",
			relevance: 76,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/user-select"
			}],
			description: "Controls the appearance of selection.",
			restrictions: ["enum"]
		}, {
			name: "vertical-align",
			values: [{
				name: "auto",
				description: "Align the dominant baseline of the parent box with the equivalent, or heuristically reconstructed, baseline of the element inline box."
			}, {
				name: "baseline",
				description: "Align the 'alphabetic' baseline of the element with the 'alphabetic' baseline of the parent element."
			}, {
				name: "bottom",
				description: "Align the after edge of the extended inline box with the after-edge of the line box."
			}, {
				name: "middle",
				description: "Align the 'middle' baseline of the inline element with the middle baseline of the parent."
			}, {
				name: "sub",
				description: "Lower the baseline of the box to the proper position for subscripts of the parent's box. (This value has no effect on the font size of the element's text.)"
			}, {
				name: "super",
				description: "Raise the baseline of the box to the proper position for superscripts of the parent's box. (This value has no effect on the font size of the element's text.)"
			}, {
				name: "text-bottom",
				description: "Align the bottom of the box with the after-edge of the parent element's font."
			}, {
				name: "text-top",
				description: "Align the top of the box with the before-edge of the parent element's font."
			}, {
				name: "top",
				description: "Align the before edge of the extended inline box with the before-edge of the line box."
			}, {
				name: "-webkit-baseline-middle"
			}],
			syntax: "baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/vertical-align"
			}],
			description: "Affects the vertical positioning of the inline boxes generated by an inline-level element inside a line box.",
			restrictions: ["percentage", "length"]
		}, {
			name: "visibility",
			values: [{
				name: "collapse",
				description: "Table-specific. If used on elements other than rows, row groups, columns, or column groups, 'collapse' has the same meaning as 'hidden'."
			}, {
				name: "hidden",
				description: "The generated box is invisible (fully transparent, nothing is drawn), but still affects layout."
			}, {
				name: "visible",
				description: "The generated box is visible."
			}],
			syntax: "visible | hidden | collapse",
			relevance: 88,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/visibility"
			}],
			description: "Specifies whether the boxes generated by an element are rendered. Invisible boxes still affect layout (set the ‘display’ property to ‘none’ to suppress box generation altogether).",
			restrictions: ["enum"]
		}, {
			name: "-webkit-animation",
			browsers: ["C", "S5"],
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}, {
				name: "none",
				description: "No animation is performed"
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			relevance: 50,
			description: "Shorthand property combines six of the animation properties into a single property.",
			restrictions: ["time", "enum", "timing-function", "identifier", "number"]
		}, {
			name: "-webkit-animation-delay",
			browsers: ["C", "S5"],
			relevance: 50,
			description: "Defines when the animation will start.",
			restrictions: ["time"]
		}, {
			name: "-webkit-animation-direction",
			browsers: ["C", "S5"],
			values: [{
				name: "alternate",
				description: "The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction."
			}, {
				name: "alternate-reverse",
				description: "The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction."
			}, {
				name: "normal",
				description: "Normal playback."
			}, {
				name: "reverse",
				description: "All iterations of the animation are played in the reverse direction from the way they were specified."
			}],
			relevance: 50,
			description: "Defines whether or not the animation should play in reverse on alternate cycles.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-animation-duration",
			browsers: ["C", "S5"],
			relevance: 50,
			description: "Defines the length of time that an animation takes to complete one cycle.",
			restrictions: ["time"]
		}, {
			name: "-webkit-animation-fill-mode",
			browsers: ["C", "S5"],
			values: [{
				name: "backwards",
				description: "The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'."
			}, {
				name: "both",
				description: "Both forwards and backwards fill modes are applied."
			}, {
				name: "forwards",
				description: "The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes."
			}, {
				name: "none",
				description: "There is no change to the property value between the time the animation is applied and the time the animation begins playing or after the animation completes."
			}],
			relevance: 50,
			description: "Defines what values are applied by the animation outside the time it is executing.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-animation-iteration-count",
			browsers: ["C", "S5"],
			values: [{
				name: "infinite",
				description: "Causes the animation to repeat forever."
			}],
			relevance: 50,
			description: "Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.",
			restrictions: ["number", "enum"]
		}, {
			name: "-webkit-animation-name",
			browsers: ["C", "S5"],
			values: [{
				name: "none",
				description: "No animation is performed"
			}],
			relevance: 50,
			description: "Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.",
			restrictions: ["identifier", "enum"]
		}, {
			name: "-webkit-animation-play-state",
			browsers: ["C", "S5"],
			values: [{
				name: "paused",
				description: "A running animation will be paused."
			}, {
				name: "running",
				description: "Resume playback of a paused animation."
			}],
			relevance: 50,
			description: "Defines whether the animation is running or paused.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-animation-timing-function",
			browsers: ["C", "S5"],
			relevance: 50,
			description: "Describes how the animation will progress over one cycle of its duration. See the 'transition-timing-function'.",
			restrictions: ["timing-function"]
		}, {
			name: "-webkit-appearance",
			browsers: ["C", "S3"],
			values: [{
				name: "button"
			}, {
				name: "button-bevel"
			}, {
				name: "caps-lock-indicator"
			}, {
				name: "caret"
			}, {
				name: "checkbox"
			}, {
				name: "default-button"
			}, {
				name: "listbox"
			}, {
				name: "listitem"
			}, {
				name: "media-fullscreen-button"
			}, {
				name: "media-mute-button"
			}, {
				name: "media-play-button"
			}, {
				name: "media-seek-back-button"
			}, {
				name: "media-seek-forward-button"
			}, {
				name: "media-slider"
			}, {
				name: "media-sliderthumb"
			}, {
				name: "menulist"
			}, {
				name: "menulist-button"
			}, {
				name: "menulist-text"
			}, {
				name: "menulist-textfield"
			}, {
				name: "none"
			}, {
				name: "push-button"
			}, {
				name: "radio"
			}, {
				name: "scrollbarbutton-down"
			}, {
				name: "scrollbarbutton-left"
			}, {
				name: "scrollbarbutton-right"
			}, {
				name: "scrollbarbutton-up"
			}, {
				name: "scrollbargripper-horizontal"
			}, {
				name: "scrollbargripper-vertical"
			}, {
				name: "scrollbarthumb-horizontal"
			}, {
				name: "scrollbarthumb-vertical"
			}, {
				name: "scrollbartrack-horizontal"
			}, {
				name: "scrollbartrack-vertical"
			}, {
				name: "searchfield"
			}, {
				name: "searchfield-cancel-button"
			}, {
				name: "searchfield-decoration"
			}, {
				name: "searchfield-results-button"
			}, {
				name: "searchfield-results-decoration"
			}, {
				name: "slider-horizontal"
			}, {
				name: "sliderthumb-horizontal"
			}, {
				name: "sliderthumb-vertical"
			}, {
				name: "slider-vertical"
			}, {
				name: "square-button"
			}, {
				name: "textarea"
			}, {
				name: "textfield"
			}],
			status: "nonstandard",
			syntax: "none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button",
			relevance: 0,
			description: "Changes the appearance of buttons and other controls to resemble native controls.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-backdrop-filter",
			browsers: ["S9"],
			values: [{
				name: "none",
				description: "No filter effects are applied."
			}, {
				name: "blur()",
				description: "Applies a Gaussian blur to the input image."
			}, {
				name: "brightness()",
				description: "Applies a linear multiplier to input image, making it appear more or less bright."
			}, {
				name: "contrast()",
				description: "Adjusts the contrast of the input."
			}, {
				name: "drop-shadow()",
				description: "Applies a drop shadow effect to the input image."
			}, {
				name: "grayscale()",
				description: "Converts the input image to grayscale."
			}, {
				name: "hue-rotate()",
				description: "Applies a hue rotation on the input image. "
			}, {
				name: "invert()",
				description: "Inverts the samples in the input image."
			}, {
				name: "opacity()",
				description: "Applies transparency to the samples in the input image."
			}, {
				name: "saturate()",
				description: "Saturates the input image."
			}, {
				name: "sepia()",
				description: "Converts the input image to sepia."
			}, {
				name: "url()",
				description: "A filter reference to a <filter> element."
			}],
			relevance: 50,
			description: "Applies a filter effect where the first filter in the list takes the element's background image as the input image.",
			restrictions: ["enum", "url"]
		}, {
			name: "-webkit-backface-visibility",
			browsers: ["C", "S5"],
			values: [{
				name: "hidden"
			}, {
				name: "visible"
			}],
			relevance: 50,
			description: "Determines whether or not the 'back' side of a transformed element is visible when facing the viewer. With an identity transform, the front side of an element faces the viewer.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-background-clip",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Determines the background painting area.",
			restrictions: ["box"]
		}, {
			name: "-webkit-background-composite",
			browsers: ["C", "S3"],
			values: [{
				name: "border"
			}, {
				name: "padding"
			}],
			relevance: 50,
			restrictions: ["enum"]
		}, {
			name: "-webkit-background-origin",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).",
			restrictions: ["box"]
		}, {
			name: "-webkit-border-image",
			browsers: ["C", "S5"],
			values: [{
				name: "auto",
				description: "If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead."
			}, {
				name: "fill",
				description: "Causes the middle part of the border-image to be preserved."
			}, {
				name: "none"
			}, {
				name: "repeat",
				description: "The image is tiled (repeated) to fill the area."
			}, {
				name: "round",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does."
			}, {
				name: "space",
				description: "The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles."
			}, {
				name: "stretch",
				description: "The image is stretched to fill the area."
			}, {
				name: "url()"
			}],
			relevance: 50,
			description: "Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.",
			restrictions: ["length", "percentage", "number", "url", "enum"]
		}, {
			name: "-webkit-box-align",
			browsers: ["C", "S3"],
			values: [{
				name: "baseline",
				description: "If this box orientation is inline-axis or horizontal, all children are placed with their baselines aligned, and extra space placed before or after as necessary. For block flows, the baseline of the first non-empty line box located within the element is used. For tables, the baseline of the first cell is used."
			}, {
				name: "center",
				description: "Any extra space is divided evenly, with half placed above the child and the other half placed after the child."
			}, {
				name: "end",
				description: "For normal direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element. For reverse direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element."
			}, {
				name: "start",
				description: "For normal direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element. For reverse direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element."
			}, {
				name: "stretch",
				description: "The height of each child is adjusted to that of the containing block."
			}],
			relevance: 50,
			description: "Specifies the alignment of nested elements within an outer flexible box element.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-box-direction",
			browsers: ["C", "S3"],
			values: [{
				name: "normal",
				description: "A box with a computed value of horizontal for box-orient displays its children from left to right. A box with a computed value of vertical displays its children from top to bottom."
			}, {
				name: "reverse",
				description: "A box with a computed value of horizontal for box-orient displays its children from right to left. A box with a computed value of vertical displays its children from bottom to top."
			}],
			relevance: 50,
			description: "In webkit applications, -webkit-box-direction specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).",
			restrictions: ["enum"]
		}, {
			name: "-webkit-box-flex",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Specifies an element's flexibility.",
			restrictions: ["number"]
		}, {
			name: "-webkit-box-flex-group",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Flexible elements can be assigned to flex groups using the 'box-flex-group' property.",
			restrictions: ["integer"]
		}, {
			name: "-webkit-box-ordinal-group",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Indicates the ordinal group the element belongs to. Elements with a lower ordinal group are displayed before those with a higher ordinal group.",
			restrictions: ["integer"]
		}, {
			name: "-webkit-box-orient",
			browsers: ["C", "S3"],
			values: [{
				name: "block-axis",
				description: "Elements are oriented along the box's axis."
			}, {
				name: "horizontal",
				description: "The box displays its children from left to right in a horizontal line."
			}, {
				name: "inline-axis",
				description: "Elements are oriented vertically."
			}, {
				name: "vertical",
				description: "The box displays its children from stacked from top to bottom vertically."
			}],
			relevance: 50,
			description: "In webkit applications, -webkit-box-orient specifies whether a box lays out its contents horizontally or vertically.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-box-pack",
			browsers: ["C", "S3"],
			values: [{
				name: "center",
				description: "The extra space is divided evenly, with half placed before the first child and the other half placed after the last child."
			}, {
				name: "end",
				description: "For normal direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child. For reverse direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child."
			}, {
				name: "justify",
				description: "The space is divided evenly in-between each child, with none of the extra space placed before the first child or after the last child. If there is only one child, treat the pack value as if it were start."
			}, {
				name: "start",
				description: "For normal direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child. For reverse direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child."
			}],
			relevance: 50,
			description: "Specifies alignment of child elements within the current element in the direction of orientation.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-box-reflect",
			browsers: ["E79", "S4", "C4", "O15"],
			values: [{
				name: "above",
				description: "The reflection appears above the border box."
			}, {
				name: "below",
				description: "The reflection appears below the border box."
			}, {
				name: "left",
				description: "The reflection appears to the left of the border box."
			}, {
				name: "right",
				description: "The reflection appears to the right of the border box."
			}],
			status: "nonstandard",
			syntax: "[ above | below | right | left ]? <length>? <image>?",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-box-reflect"
			}],
			description: "Defines a reflection of a border box."
		}, {
			name: "-webkit-box-sizing",
			browsers: ["C", "S3"],
			values: [{
				name: "border-box",
				description: "The specified width and height (and respective min/max properties) on this element determine the border box of the element."
			}, {
				name: "content-box",
				description: "Behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element."
			}],
			relevance: 50,
			description: "Box Model addition in CSS3.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-break-after",
			browsers: ["S7"],
			values: [{
				name: "always",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page/column break before/after the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page/column break before/after the generated box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break before/after the generated box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break before/after the generated box."
			}, {
				name: "avoid-region"
			}, {
				name: "column",
				description: "Always force a column break before/after the generated box."
			}, {
				name: "left",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a left page."
			}, {
				name: "page",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "region"
			}, {
				name: "right",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a right page."
			}],
			relevance: 50,
			description: "Describes the page/column break behavior before the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-break-before",
			browsers: ["S7"],
			values: [{
				name: "always",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page/column break before/after the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page/column break before/after the generated box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break before/after the generated box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break before/after the generated box."
			}, {
				name: "avoid-region"
			}, {
				name: "column",
				description: "Always force a column break before/after the generated box."
			}, {
				name: "left",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a left page."
			}, {
				name: "page",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "region"
			}, {
				name: "right",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a right page."
			}],
			relevance: 50,
			description: "Describes the page/column break behavior before the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-break-inside",
			browsers: ["S7"],
			values: [{
				name: "auto",
				description: "Neither force nor forbid a page/column break inside the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page/column break inside the generated box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break inside the generated box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break inside the generated box."
			}, {
				name: "avoid-region"
			}],
			relevance: 50,
			description: "Describes the page/column break behavior inside the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-column-break-after",
			browsers: ["C", "S3"],
			values: [{
				name: "always",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page/column break before/after the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page/column break before/after the generated box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break before/after the generated box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break before/after the generated box."
			}, {
				name: "avoid-region"
			}, {
				name: "column",
				description: "Always force a column break before/after the generated box."
			}, {
				name: "left",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a left page."
			}, {
				name: "page",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "region"
			}, {
				name: "right",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a right page."
			}],
			relevance: 50,
			description: "Describes the page/column break behavior before the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-column-break-before",
			browsers: ["C", "S3"],
			values: [{
				name: "always",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "auto",
				description: "Neither force nor forbid a page/column break before/after the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page/column break before/after the generated box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break before/after the generated box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break before/after the generated box."
			}, {
				name: "avoid-region"
			}, {
				name: "column",
				description: "Always force a column break before/after the generated box."
			}, {
				name: "left",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a left page."
			}, {
				name: "page",
				description: "Always force a page break before/after the generated box."
			}, {
				name: "region"
			}, {
				name: "right",
				description: "Force one or two page breaks before/after the generated box so that the next page is formatted as a right page."
			}],
			relevance: 50,
			description: "Describes the page/column break behavior before the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-column-break-inside",
			browsers: ["C", "S3"],
			values: [{
				name: "auto",
				description: "Neither force nor forbid a page/column break inside the generated box."
			}, {
				name: "avoid",
				description: "Avoid a page/column break inside the generated box."
			}, {
				name: "avoid-column",
				description: "Avoid a column break inside the generated box."
			}, {
				name: "avoid-page",
				description: "Avoid a page break inside the generated box."
			}, {
				name: "avoid-region"
			}],
			relevance: 50,
			description: "Describes the page/column break behavior inside the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-column-count",
			browsers: ["C", "S3"],
			values: [{
				name: "auto",
				description: "Determines the number of columns by the 'column-width' property and the element width."
			}],
			relevance: 50,
			description: "Describes the optimal number of columns into which the content of the element will be flowed.",
			restrictions: ["integer"]
		}, {
			name: "-webkit-column-gap",
			browsers: ["C", "S3"],
			values: [{
				name: "normal",
				description: "User agent specific and typically equivalent to 1em."
			}],
			relevance: 50,
			description: "Sets the gap between columns. If there is a column rule between columns, it will appear in the middle of the gap.",
			restrictions: ["length"]
		}, {
			name: "-webkit-column-rule",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "This property is a shorthand for setting 'column-rule-width', 'column-rule-style', and 'column-rule-color' at the same place in the style sheet. Omitted values are set to their initial values.",
			restrictions: ["length", "line-width", "line-style", "color"]
		}, {
			name: "-webkit-column-rule-color",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Sets the color of the column rule",
			restrictions: ["color"]
		}, {
			name: "-webkit-column-rule-style",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Sets the style of the rule between columns of an element.",
			restrictions: ["line-style"]
		}, {
			name: "-webkit-column-rule-width",
			browsers: ["C", "S3"],
			relevance: 50,
			description: "Sets the width of the rule between columns. Negative values are not allowed.",
			restrictions: ["length", "line-width"]
		}, {
			name: "-webkit-columns",
			browsers: ["C", "S3"],
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}],
			relevance: 50,
			description: "A shorthand property which sets both 'column-width' and 'column-count'.",
			restrictions: ["length", "integer"]
		}, {
			name: "-webkit-column-span",
			browsers: ["C", "S3"],
			values: [{
				name: "all",
				description: "The element spans across all columns. Content in the normal flow that appears before the element is automatically balanced across all columns before the element appear."
			}, {
				name: "none",
				description: "The element does not span multiple columns."
			}],
			relevance: 50,
			description: "Describes the page/column break behavior after the generated box.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-column-width",
			browsers: ["C", "S3"],
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}],
			relevance: 50,
			description: "This property describes the width of columns in multicol elements.",
			restrictions: ["length"]
		}, {
			name: "-webkit-filter",
			browsers: ["C18", "O15", "S6"],
			values: [{
				name: "none",
				description: "No filter effects are applied."
			}, {
				name: "blur()",
				description: "Applies a Gaussian blur to the input image."
			}, {
				name: "brightness()",
				description: "Applies a linear multiplier to input image, making it appear more or less bright."
			}, {
				name: "contrast()",
				description: "Adjusts the contrast of the input."
			}, {
				name: "drop-shadow()",
				description: "Applies a drop shadow effect to the input image."
			}, {
				name: "grayscale()",
				description: "Converts the input image to grayscale."
			}, {
				name: "hue-rotate()",
				description: "Applies a hue rotation on the input image. "
			}, {
				name: "invert()",
				description: "Inverts the samples in the input image."
			}, {
				name: "opacity()",
				description: "Applies transparency to the samples in the input image."
			}, {
				name: "saturate()",
				description: "Saturates the input image."
			}, {
				name: "sepia()",
				description: "Converts the input image to sepia."
			}, {
				name: "url()",
				description: "A filter reference to a <filter> element."
			}],
			relevance: 50,
			description: "Processes an element’s rendering before it is displayed in the document, by applying one or more filter effects.",
			restrictions: ["enum", "url"]
		}, {
			name: "-webkit-flow-from",
			browsers: ["S6.1"],
			values: [{
				name: "none",
				description: "The block container is not a CSS Region."
			}],
			relevance: 50,
			description: "Makes a block container a region and associates it with a named flow.",
			restrictions: ["identifier"]
		}, {
			name: "-webkit-flow-into",
			browsers: ["S6.1"],
			values: [{
				name: "none",
				description: "The element is not moved to a named flow and normal CSS processing takes place."
			}],
			relevance: 50,
			description: "Places an element or its contents into a named flow.",
			restrictions: ["identifier"]
		}, {
			name: "-webkit-font-feature-settings",
			browsers: ["C16"],
			values: [{
				name: '"c2cs"'
			}, {
				name: '"dlig"'
			}, {
				name: '"kern"'
			}, {
				name: '"liga"'
			}, {
				name: '"lnum"'
			}, {
				name: '"onum"'
			}, {
				name: '"smcp"'
			}, {
				name: '"swsh"'
			}, {
				name: '"tnum"'
			}, {
				name: "normal",
				description: "No change in glyph substitution or positioning occurs."
			}, {
				name: "off"
			}, {
				name: "on"
			}],
			relevance: 50,
			description: "This property provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case.",
			restrictions: ["string", "integer"]
		}, {
			name: "-webkit-hyphens",
			browsers: ["S5.1"],
			values: [{
				name: "auto",
				description: "Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word."
			}, {
				name: "manual",
				description: "Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities"
			}, {
				name: "none",
				description: "Words are not broken at line breaks, even if characters inside the word suggest line break points."
			}],
			relevance: 50,
			description: "Controls whether hyphenation is allowed to create more break opportunities within a line of text.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-line-break",
			browsers: ["C", "S3"],
			values: [{
				name: "after-white-space"
			}, {
				name: "normal"
			}],
			relevance: 50,
			description: "Specifies line-breaking rules for CJK (Chinese, Japanese, and Korean) text."
		}, {
			name: "-webkit-margin-bottom-collapse",
			browsers: ["C", "S3"],
			values: [{
				name: "collapse"
			}, {
				name: "discard"
			}, {
				name: "separate"
			}],
			relevance: 50,
			restrictions: ["enum"]
		}, {
			name: "-webkit-margin-collapse",
			browsers: ["C", "S3"],
			values: [{
				name: "collapse"
			}, {
				name: "discard"
			}, {
				name: "separate"
			}],
			relevance: 50,
			restrictions: ["enum"]
		}, {
			name: "-webkit-margin-start",
			browsers: ["C", "S3"],
			values: [{
				name: "auto"
			}],
			relevance: 50,
			restrictions: ["percentage", "length"]
		}, {
			name: "-webkit-margin-top-collapse",
			browsers: ["C", "S3"],
			values: [{
				name: "collapse"
			}, {
				name: "discard"
			}, {
				name: "separate"
			}],
			relevance: 50,
			restrictions: ["enum"]
		}, {
			name: "-webkit-mask-clip",
			browsers: ["C", "O15", "S4"],
			status: "nonstandard",
			syntax: "[ <box> | border | padding | content | text ]#",
			relevance: 0,
			description: "Determines the mask painting area, which determines the area that is affected by the mask.",
			restrictions: ["box"]
		}, {
			name: "-webkit-mask-image",
			browsers: ["C", "O15", "S4"],
			values: [{
				name: "none",
				description: "Counts as a transparent black image layer."
			}, {
				name: "url()",
				description: "Reference to a <mask element or to a CSS image."
			}],
			status: "nonstandard",
			syntax: "<mask-reference>#",
			relevance: 0,
			description: "Sets the mask layer image of an element.",
			restrictions: ["url", "image", "enum"]
		}, {
			name: "-webkit-mask-origin",
			browsers: ["C", "O15", "S4"],
			status: "nonstandard",
			syntax: "[ <box> | border | padding | content ]#",
			relevance: 0,
			description: "Specifies the mask positioning area.",
			restrictions: ["box"]
		}, {
			name: "-webkit-mask-repeat",
			browsers: ["C", "O15", "S4"],
			status: "nonstandard",
			syntax: "<repeat-style>#",
			relevance: 0,
			description: "Specifies how mask layer images are tiled after they have been sized and positioned.",
			restrictions: ["repeat"]
		}, {
			name: "-webkit-mask-size",
			browsers: ["C", "O15", "S4"],
			values: [{
				name: "auto",
				description: "Resolved by using the image’s intrinsic ratio and the size of the other dimension, or failing that, using the image’s intrinsic size, or failing that, treating it as 100%."
			}, {
				name: "contain",
				description: "Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area."
			}, {
				name: "cover",
				description: "Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area."
			}],
			status: "nonstandard",
			syntax: "<bg-size>#",
			relevance: 0,
			description: "Specifies the size of the mask layer images.",
			restrictions: ["length", "percentage", "enum"]
		}, {
			name: "-webkit-nbsp-mode",
			browsers: ["C", "S3"],
			values: [{
				name: "normal"
			}, {
				name: "space"
			}],
			relevance: 50,
			description: "Defines the behavior of nonbreaking spaces within text."
		}, {
			name: "-webkit-overflow-scrolling",
			browsers: ["C", "S5"],
			values: [{
				name: "auto"
			}, {
				name: "touch"
			}],
			status: "nonstandard",
			syntax: "auto | touch",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling"
			}],
			description: "Specifies whether to use native-style scrolling in an overflow:scroll element."
		}, {
			name: "-webkit-padding-start",
			browsers: ["C", "S3"],
			relevance: 50,
			restrictions: ["percentage", "length"]
		}, {
			name: "-webkit-perspective",
			browsers: ["C", "S4"],
			values: [{
				name: "none",
				description: "No perspective transform is applied."
			}],
			relevance: 50,
			description: "Applies the same transform as the perspective(<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.",
			restrictions: ["length"]
		}, {
			name: "-webkit-perspective-origin",
			browsers: ["C", "S4"],
			relevance: 50,
			description: "Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.",
			restrictions: ["position", "percentage", "length"]
		}, {
			name: "-webkit-region-fragment",
			browsers: ["S7"],
			values: [{
				name: "auto",
				description: "Content flows as it would in a regular content box."
			}, {
				name: "break",
				description: "If the content fits within the CSS Region, then this property has no effect."
			}],
			relevance: 50,
			description: "The 'region-fragment' property controls the behavior of the last region associated with a named flow.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-tap-highlight-color",
			browsers: ["E12", "C16", "O≤15"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color"
			}],
			restrictions: ["color"]
		}, {
			name: "-webkit-text-fill-color",
			browsers: ["E12", "FF49", "S3", "C1", "O15"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color"
			}],
			restrictions: ["color"]
		}, {
			name: "-webkit-text-size-adjust",
			browsers: ["E", "C", "S3"],
			values: [{
				name: "auto",
				description: "Renderers must use the default size adjustment when displaying on a small device."
			}, {
				name: "none",
				description: "Renderers must not do size adjustment when displaying on a small device."
			}],
			relevance: 50,
			description: "Specifies a size adjustment for displaying text content in mobile browsers.",
			restrictions: ["percentage"]
		}, {
			name: "-webkit-text-stroke",
			browsers: ["E15", "FF49", "S3", "C4", "O15"],
			status: "nonstandard",
			syntax: "<length> || <color>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke"
			}],
			restrictions: ["length", "line-width", "color", "percentage"]
		}, {
			name: "-webkit-text-stroke-color",
			browsers: ["E15", "FF49", "S3", "C1", "O15"],
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-color"
			}],
			restrictions: ["color"]
		}, {
			name: "-webkit-text-stroke-width",
			browsers: ["E15", "FF49", "S3", "C1", "O15"],
			status: "nonstandard",
			syntax: "<length>",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-width"
			}],
			restrictions: ["length", "line-width", "percentage"]
		}, {
			name: "-webkit-touch-callout",
			browsers: ["S3"],
			values: [{
				name: "none"
			}],
			status: "nonstandard",
			syntax: "default | none",
			relevance: 0,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout"
			}],
			restrictions: ["enum"]
		}, {
			name: "-webkit-transform",
			browsers: ["C", "O12", "S3.1"],
			values: [{
				name: "matrix()",
				description: "Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f]"
			}, {
				name: "matrix3d()",
				description: "Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order."
			}, {
				name: "none"
			}, {
				name: "perspective()",
				description: "Specifies a perspective projection matrix."
			}, {
				name: "rotate()",
				description: "Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property."
			}, {
				name: "rotate3d()",
				description: "Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters."
			}, {
				name: "rotateX('angle')",
				description: "Specifies a clockwise rotation by the given angle about the X axis."
			}, {
				name: "rotateY('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Y axis."
			}, {
				name: "rotateZ('angle')",
				description: "Specifies a clockwise rotation by the given angle about the Z axis."
			}, {
				name: "scale()",
				description: "Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first."
			}, {
				name: "scale3d()",
				description: "Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters."
			}, {
				name: "scaleX()",
				description: "Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter."
			}, {
				name: "scaleY()",
				description: "Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter."
			}, {
				name: "scaleZ()",
				description: "Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter."
			}, {
				name: "skew()",
				description: "Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis)."
			}, {
				name: "skewX()",
				description: "Specifies a skew transformation along the X axis by the given angle."
			}, {
				name: "skewY()",
				description: "Specifies a skew transformation along the Y axis by the given angle."
			}, {
				name: "translate()",
				description: "Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter."
			}, {
				name: "translate3d()",
				description: "Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively."
			}, {
				name: "translateX()",
				description: "Specifies a translation by the given amount in the X direction."
			}, {
				name: "translateY()",
				description: "Specifies a translation by the given amount in the Y direction."
			}, {
				name: "translateZ()",
				description: "Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0."
			}],
			relevance: 50,
			description: "A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-transform-origin",
			browsers: ["C", "O15", "S3.1"],
			relevance: 50,
			description: "Establishes the origin of transformation for an element.",
			restrictions: ["position", "length", "percentage"]
		}, {
			name: "-webkit-transform-origin-x",
			browsers: ["C", "S3.1"],
			relevance: 50,
			description: "The x coordinate of the origin for transforms applied to an element with respect to its border box.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-webkit-transform-origin-y",
			browsers: ["C", "S3.1"],
			relevance: 50,
			description: "The y coordinate of the origin for transforms applied to an element with respect to its border box.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-webkit-transform-origin-z",
			browsers: ["C", "S4"],
			relevance: 50,
			description: "The z coordinate of the origin for transforms applied to an element with respect to its border box.",
			restrictions: ["length", "percentage"]
		}, {
			name: "-webkit-transform-style",
			browsers: ["C", "S4"],
			values: [{
				name: "flat",
				description: "All children of this element are rendered flattened into the 2D plane of the element."
			}],
			relevance: 50,
			description: "Defines how nested elements are rendered in 3D space.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-transition",
			browsers: ["C", "O12", "S5"],
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			relevance: 50,
			description: "Shorthand property combines four of the transition properties into a single property.",
			restrictions: ["time", "property", "timing-function", "enum"]
		}, {
			name: "-webkit-transition-delay",
			browsers: ["C", "O12", "S5"],
			relevance: 50,
			description: "Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.",
			restrictions: ["time"]
		}, {
			name: "-webkit-transition-duration",
			browsers: ["C", "O12", "S5"],
			relevance: 50,
			description: "Specifies how long the transition from the old value to the new value should take.",
			restrictions: ["time"]
		}, {
			name: "-webkit-transition-property",
			browsers: ["C", "O12", "S5"],
			values: [{
				name: "all",
				description: "Every property that is able to undergo a transition will do so."
			}, {
				name: "none",
				description: "No property will transition."
			}],
			relevance: 50,
			description: "Specifies the name of the CSS property to which the transition is applied.",
			restrictions: ["property"]
		}, {
			name: "-webkit-transition-timing-function",
			browsers: ["C", "O12", "S5"],
			relevance: 50,
			description: "Describes how the intermediate values used during a transition will be calculated.",
			restrictions: ["timing-function"]
		}, {
			name: "-webkit-user-drag",
			browsers: ["S3"],
			values: [{
				name: "auto"
			}, {
				name: "element"
			}, {
				name: "none"
			}],
			relevance: 50,
			restrictions: ["enum"]
		}, {
			name: "-webkit-user-modify",
			browsers: ["C", "S3"],
			values: [{
				name: "read-only"
			}, {
				name: "read-write"
			}, {
				name: "read-write-plaintext-only"
			}],
			status: "nonstandard",
			syntax: "read-only | read-write | read-write-plaintext-only",
			relevance: 0,
			description: "Determines whether a user can edit the content of an element.",
			restrictions: ["enum"]
		}, {
			name: "-webkit-user-select",
			browsers: ["C", "S3"],
			values: [{
				name: "auto"
			}, {
				name: "none"
			}, {
				name: "text"
			}],
			relevance: 50,
			description: "Controls the appearance of selection.",
			restrictions: ["enum"]
		}, {
			name: "white-space",
			values: [{
				name: "normal",
				description: "Sets 'white-space-collapsing' to 'collapse' and 'text-wrap' to 'normal'."
			}, {
				name: "nowrap",
				description: "Sets 'white-space-collapsing' to 'collapse' and 'text-wrap' to 'none'."
			}, {
				name: "pre",
				description: "Sets 'white-space-collapsing' to 'preserve' and 'text-wrap' to 'none'."
			}, {
				name: "pre-line",
				description: "Sets 'white-space-collapsing' to 'preserve-breaks' and 'text-wrap' to 'normal'."
			}, {
				name: "pre-wrap",
				description: "Sets 'white-space-collapsing' to 'preserve' and 'text-wrap' to 'normal'."
			}],
			syntax: "normal | pre | nowrap | pre-wrap | pre-line | break-spaces",
			relevance: 89,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/white-space"
			}],
			description: "Shorthand property for the 'white-space-collapsing' and 'text-wrap' properties.",
			restrictions: ["enum"]
		}, {
			name: "widows",
			browsers: ["E12", "S1.3", "C25", "IE8", "O9.2"],
			syntax: "<integer>",
			relevance: 51,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/widows"
			}],
			description: "Specifies the minimum number of line boxes of a block container that must be left in a fragment after a break.",
			restrictions: ["integer"]
		}, {
			name: "width",
			values: [{
				name: "auto",
				description: "The width depends on the values of other properties."
			}, {
				name: "fit-content",
				description: "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode."
			}, {
				name: "max-content",
				description: "Use the max-content inline size or max-content block size, as appropriate to the writing mode."
			}, {
				name: "min-content",
				description: "Use the min-content inline size or min-content block size, as appropriate to the writing mode."
			}],
			syntax: "<viewport-length>{1,2}",
			relevance: 96,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/width"
			}],
			description: "Specifies the width of the content area, padding area or border area (depending on 'box-sizing') of certain boxes.",
			restrictions: ["length", "percentage"]
		}, {
			name: "will-change",
			browsers: ["E79", "FF36", "S9.1", "C36", "O24"],
			values: [{
				name: "auto",
				description: "Expresses no particular intent."
			}, {
				name: "contents",
				description: "Indicates that the author expects to animate or change something about the element’s contents in the near future."
			}, {
				name: "scroll-position",
				description: "Indicates that the author expects to animate or change the scroll position of the element in the near future."
			}],
			syntax: "auto | <animateable-feature>#",
			relevance: 64,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/will-change"
			}],
			description: "Provides a rendering hint to the user agent, stating what kinds of changes the author expects to perform on the element.",
			restrictions: ["enum", "identifier"]
		}, {
			name: "word-break",
			values: [{
				name: "break-all",
				description: "Lines may break between any two grapheme clusters for non-CJK scripts."
			}, {
				name: "keep-all",
				description: "Block characters can no longer create implied break points."
			}, {
				name: "normal",
				description: "Breaks non-CJK scripts according to their own rules."
			}],
			syntax: "normal | break-all | keep-all | break-word",
			relevance: 75,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/word-break"
			}],
			description: "Specifies line break opportunities for non-CJK scripts.",
			restrictions: ["enum"]
		}, {
			name: "word-spacing",
			values: [{
				name: "normal",
				description: "No additional spacing is applied. Computes to zero."
			}],
			syntax: "normal | <length-percentage>",
			relevance: 57,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/word-spacing"
			}],
			description: "Specifies additional spacing between “words”.",
			restrictions: ["length", "percentage"]
		}, {
			name: "word-wrap",
			values: [{
				name: "break-word",
				description: "An otherwise unbreakable sequence of characters may be broken at an arbitrary point if there are no otherwise-acceptable break points in the line."
			}, {
				name: "normal",
				description: "Lines may break only at allowed break points."
			}],
			syntax: "normal | break-word",
			relevance: 78,
			description: "Specifies whether the UA may break within a word to prevent overflow when an otherwise-unbreakable string is too long to fit.",
			restrictions: ["enum"]
		}, {
			name: "writing-mode",
			values: [{
				name: "horizontal-tb",
				description: "Top-to-bottom block flow direction. The writing mode is horizontal."
			}, {
				name: "sideways-lr",
				description: "Left-to-right block flow direction. The writing mode is vertical, while the typographic mode is horizontal."
			}, {
				name: "sideways-rl",
				description: "Right-to-left block flow direction. The writing mode is vertical, while the typographic mode is horizontal."
			}, {
				name: "vertical-lr",
				description: "Left-to-right block flow direction. The writing mode is vertical."
			}, {
				name: "vertical-rl",
				description: "Right-to-left block flow direction. The writing mode is vertical."
			}],
			syntax: "horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/writing-mode"
			}],
			description: "This is a shorthand property for both 'direction' and 'block-progression'.",
			restrictions: ["enum"]
		}, {
			name: "z-index",
			values: [{
				name: "auto",
				description: "The stack level of the generated box in the current stacking context is 0. The box does not establish a new stacking context unless it is the root element."
			}],
			syntax: "auto | <integer>",
			relevance: 92,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/z-index"
			}],
			description: "For a positioned box, the 'z-index' property specifies the stack level of the box in the current stacking context and whether the box establishes a local stacking context.",
			restrictions: ["integer"]
		}, {
			name: "zoom",
			browsers: ["E12", "S3.1", "C1", "IE5.5", "O15"],
			values: [{
				name: "normal"
			}],
			syntax: "auto | <number> | <percentage>",
			relevance: 68,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/zoom"
			}],
			description: "Non-standard. Specifies the magnification scale of the object. See 'transform: scale()' for a standards-based alternative.",
			restrictions: ["enum", "integer", "number", "percentage"]
		}, {
			name: "-ms-ime-align",
			status: "nonstandard",
			syntax: "auto | after",
			relevance: 0,
			description: "Aligns the Input Method Editor (IME) candidate window box relative to the element on which the IME composition is active."
		}, {
			name: "-moz-binding",
			status: "nonstandard",
			syntax: "<url> | none",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-binding"
			}],
			description: "The -moz-binding CSS property is used by Mozilla-based applications to attach an XBL binding to a DOM element."
		}, {
			name: "-moz-context-properties",
			status: "nonstandard",
			syntax: "none | [ fill | fill-opacity | stroke | stroke-opacity ]#",
			relevance: 0,
			browsers: ["FF55"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-context-properties"
			}],
			description: "If you reference an SVG image in a webpage (such as with the <img> element or as a background image), the SVG image can coordinate with the embedding element (its context) to have the image adopt property values set on the embedding element. To do this the embedding element needs to list the properties that are to be made available to the image by listing them as values of the -moz-context-properties property, and the image needs to opt in to using those properties by using values such as the context-fill value.\n\nThis feature is available since Firefox 55, but is only currently supported with SVG images loaded via chrome:// or resource:// URLs. To experiment with the feature in SVG on the Web it is necessary to set the svg.context-properties.content.enabled pref to true."
		}, {
			name: "-moz-float-edge",
			status: "nonstandard",
			syntax: "border-box | content-box | margin-box | padding-box",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge"
			}],
			description: "The non-standard -moz-float-edge CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness."
		}, {
			name: "-moz-force-broken-image-icon",
			status: "nonstandard",
			syntax: "<integer [0,1]>",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon"
			}],
			description: "The -moz-force-broken-image-icon extended CSS property can be used to force the broken image icon to be shown even when a broken image has an alt attribute."
		}, {
			name: "-moz-image-region",
			status: "nonstandard",
			syntax: "<shape> | auto",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-image-region"
			}],
			description: "For certain XUL elements and pseudo-elements that use an image from the list-style-image property, this property specifies a region of the image that is used in place of the whole image. This allows elements to use different pieces of the same image to improve performance."
		}, {
			name: "-moz-orient",
			status: "nonstandard",
			syntax: "inline | block | horizontal | vertical",
			relevance: 0,
			browsers: ["FF6"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-orient"
			}],
			description: "The -moz-orient CSS property specifies the orientation of the element to which it's applied."
		}, {
			name: "-moz-outline-radius",
			status: "nonstandard",
			syntax: "<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius"
			}],
			description: "In Mozilla applications like Firefox, the -moz-outline-radius CSS property can be used to give an element's outline rounded corners."
		}, {
			name: "-moz-outline-radius-bottomleft",
			status: "nonstandard",
			syntax: "<outline-radius>",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomleft"
			}],
			description: "In Mozilla applications, the -moz-outline-radius-bottomleft CSS property can be used to round the bottom-left corner of an element's outline."
		}, {
			name: "-moz-outline-radius-bottomright",
			status: "nonstandard",
			syntax: "<outline-radius>",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright"
			}],
			description: "In Mozilla applications, the -moz-outline-radius-bottomright CSS property can be used to round the bottom-right corner of an element's outline."
		}, {
			name: "-moz-outline-radius-topleft",
			status: "nonstandard",
			syntax: "<outline-radius>",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topleft"
			}],
			description: "In Mozilla applications, the -moz-outline-radius-topleft CSS property can be used to round the top-left corner of an element's outline."
		}, {
			name: "-moz-outline-radius-topright",
			status: "nonstandard",
			syntax: "<outline-radius>",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topright"
			}],
			description: "In Mozilla applications, the -moz-outline-radius-topright CSS property can be used to round the top-right corner of an element's outline."
		}, {
			name: "-moz-stack-sizing",
			status: "nonstandard",
			syntax: "ignore | stretch-to-fit",
			relevance: 0,
			description: "-moz-stack-sizing is an extended CSS property. Normally, a stack will change its size so that all of its child elements are completely visible. For example, moving a child of the stack far to the right will widen the stack so the child remains visible."
		}, {
			name: "-moz-text-blink",
			status: "nonstandard",
			syntax: "none | blink",
			relevance: 0,
			description: "The -moz-text-blink non-standard Mozilla CSS extension specifies the blink mode."
		}, {
			name: "-moz-user-input",
			status: "nonstandard",
			syntax: "auto | none | enabled | disabled",
			relevance: 0,
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-input"
			}],
			description: "In Mozilla applications, -moz-user-input determines if an element will accept user input."
		}, {
			name: "-moz-user-modify",
			status: "nonstandard",
			syntax: "read-only | read-write | write-only",
			relevance: 0,
			description: "The -moz-user-modify property has no effect. It was originally planned to determine whether or not the content of an element can be edited by a user."
		}, {
			name: "-moz-window-dragging",
			status: "nonstandard",
			syntax: "drag | no-drag",
			relevance: 0,
			description: "The -moz-window-dragging CSS property specifies whether a window is draggable or not. It only works in Chrome code, and only on Mac OS X."
		}, {
			name: "-moz-window-shadow",
			status: "nonstandard",
			syntax: "default | menu | tooltip | sheet | none",
			relevance: 0,
			description: "The -moz-window-shadow CSS property specifies whether a window will have a shadow. It only works on Mac OS X."
		}, {
			name: "-webkit-border-before",
			status: "nonstandard",
			syntax: "<'border-width'> || <'border-style'> || <color>",
			relevance: 0,
			browsers: ["E79", "S5.1", "C8", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before"
			}],
			description: "The -webkit-border-before CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet."
		}, {
			name: "-webkit-border-before-color",
			status: "nonstandard",
			syntax: "<color>",
			relevance: 0,
			description: "The -webkit-border-before-color CSS property sets the color of the individual logical block start border in a single place in the style sheet."
		}, {
			name: "-webkit-border-before-style",
			status: "nonstandard",
			syntax: "<'border-style'>",
			relevance: 0,
			description: "The -webkit-border-before-style CSS property sets the style of the individual logical block start border in a single place in the style sheet."
		}, {
			name: "-webkit-border-before-width",
			status: "nonstandard",
			syntax: "<'border-width'>",
			relevance: 0,
			description: "The -webkit-border-before-width CSS property sets the width of the individual logical block start border in a single place in the style sheet."
		}, {
			name: "-webkit-line-clamp",
			syntax: "none | <integer>",
			relevance: 50,
			browsers: ["E17", "FF68", "S5", "C6", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp"
			}],
			description: "The -webkit-line-clamp CSS property allows limiting of the contents of a block container to the specified number of lines."
		}, {
			name: "-webkit-mask",
			status: "nonstandard",
			syntax: "[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <box> | border | padding | content | text ] || [ <box> | border | padding | content ] ]#",
			relevance: 0,
			description: "The mask CSS property alters the visibility of an element by either partially or fully hiding it. This is accomplished by either masking or clipping the image at specific points."
		}, {
			name: "-webkit-mask-attachment",
			status: "nonstandard",
			syntax: "<attachment>#",
			relevance: 0,
			browsers: ["S4", "C1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment"
			}],
			description: "If a -webkit-mask-image is specified, -webkit-mask-attachment determines whether the mask image's position is fixed within the viewport, or scrolls along with its containing block."
		}, {
			name: "-webkit-mask-composite",
			status: "nonstandard",
			syntax: "<composite-style>#",
			relevance: 0,
			browsers: ["E18", "FF53", "S3.2", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite"
			}],
			description: "The -webkit-mask-composite property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the -webkit-mask-image property."
		}, {
			name: "-webkit-mask-position",
			status: "nonstandard",
			syntax: "<position>#",
			relevance: 0,
			description: "The mask-position CSS property sets the initial position, relative to the mask position layer defined by mask-origin, for each defined mask image."
		}, {
			name: "-webkit-mask-position-x",
			status: "nonstandard",
			syntax: "[ <length-percentage> | left | center | right ]#",
			relevance: 0,
			browsers: ["E18", "FF49", "S3.2", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x"
			}],
			description: "The -webkit-mask-position-x CSS property sets the initial horizontal position of a mask image."
		}, {
			name: "-webkit-mask-position-y",
			status: "nonstandard",
			syntax: "[ <length-percentage> | top | center | bottom ]#",
			relevance: 0,
			browsers: ["E18", "FF49", "S3.2", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y"
			}],
			description: "The -webkit-mask-position-y CSS property sets the initial vertical position of a mask image."
		}, {
			name: "-webkit-mask-repeat-x",
			status: "nonstandard",
			syntax: "repeat | no-repeat | space | round",
			relevance: 0,
			browsers: ["E18", "S5", "C3", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-x"
			}],
			description: "The -webkit-mask-repeat-x property specifies whether and how a mask image is repeated (tiled) horizontally."
		}, {
			name: "-webkit-mask-repeat-y",
			status: "nonstandard",
			syntax: "repeat | no-repeat | space | round",
			relevance: 0,
			browsers: ["E18", "S5", "C3", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-y"
			}],
			description: "The -webkit-mask-repeat-y property specifies whether and how a mask image is repeated (tiled) vertically."
		}, {
			name: "align-tracks",
			status: "experimental",
			syntax: "[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#",
			relevance: 50,
			browsers: ["FF77"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/align-tracks"
			}],
			description: "The align-tracks CSS property sets the alignment in the masonry axis for grid containers that have masonry in their block axis."
		}, {
			name: "appearance",
			status: "experimental",
			syntax: "none | auto | textfield | menulist-button | <compat-auto>",
			relevance: 60,
			browsers: ["E84", "FF80", "S3", "C84", "O70"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/appearance"
			}],
			description: "Changes the appearance of buttons and other controls to resemble native controls."
		}, {
			name: "aspect-ratio",
			status: "experimental",
			syntax: "auto | <ratio>",
			relevance: 51,
			browsers: ["E88", "FF89", "C88", "O74"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/aspect-ratio"
			}],
			description: "The aspect-ratio   CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions."
		}, {
			name: "azimuth",
			status: "obsolete",
			syntax: "<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards",
			relevance: 0,
			description: "In combination with elevation, the azimuth CSS property enables different audio sources to be positioned spatially for aural presentation. This is important in that it provides a natural way to tell several voices apart, as each can be positioned to originate at a different location on the sound stage. Stereo output produce a lateral sound stage, while binaural headphones and multi-speaker setups allow for a fully three-dimensional stage."
		}, {
			name: "backdrop-filter",
			syntax: "none | <filter-function-list>",
			relevance: 52,
			browsers: ["E17", "FF70", "S9", "C76", "O63"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/backdrop-filter"
			}],
			description: "The backdrop-filter CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything behind the element, to see the effect you must make the element or its background at least partially transparent."
		}, {
			name: "border-block",
			syntax: "<'border-top-width'> || <'border-top-style'> || <color>",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block"
			}],
			description: "The border-block CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet."
		}, {
			name: "border-block-color",
			syntax: "<'border-top-color'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-color"
			}],
			description: "The border-block-color CSS property defines the color of the logical block borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color and border-bottom-color, or border-right-color and border-left-color property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "border-block-style",
			syntax: "<'border-top-style'>",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-style"
			}],
			description: "The border-block-style CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-style and border-bottom-style, or border-left-style and border-right-style properties depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "border-block-width",
			syntax: "<'border-top-width'>",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-block-width"
			}],
			description: "The border-block-width CSS property defines the width of the logical block borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-width and border-bottom-width, or border-left-width, and border-right-width property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "border-end-end-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 50,
			browsers: ["E89", "FF66", "C89", "O75"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius"
			}],
			description: "The border-end-end-radius CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on on the element's writing-mode, direction, and text-orientation."
		}, {
			name: "border-end-start-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 50,
			browsers: ["E89", "FF66", "C89", "O75"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius"
			}],
			description: "The border-end-start-radius CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's writing-mode, direction, and text-orientation."
		}, {
			name: "border-inline",
			syntax: "<'border-top-width'> || <'border-top-style'> || <color>",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline"
			}],
			description: "The border-inline CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet."
		}, {
			name: "border-inline-color",
			syntax: "<'border-top-color'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-color"
			}],
			description: "The border-inline-color CSS property defines the color of the logical inline borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color and border-bottom-color, or border-right-color and border-left-color property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "border-inline-style",
			syntax: "<'border-top-style'>",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-style"
			}],
			description: "The border-inline-style CSS property defines the style of the logical inline borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-style and border-bottom-style, or border-left-style and border-right-style properties depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "border-inline-width",
			syntax: "<'border-top-width'>",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-width"
			}],
			description: "The border-inline-width CSS property defines the width of the logical inline borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-width and border-bottom-width, or border-left-width, and border-right-width property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "border-start-end-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 50,
			browsers: ["E89", "FF66", "C89", "O75"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius"
			}],
			description: "The border-start-end-radius CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's writing-mode, direction, and text-orientation."
		}, {
			name: "border-start-start-radius",
			syntax: "<length-percentage>{1,2}",
			relevance: 50,
			browsers: ["E89", "FF66", "C89", "O75"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius"
			}],
			description: "The border-start-start-radius CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on the element's writing-mode, direction, and text-orientation."
		}, {
			name: "box-align",
			status: "nonstandard",
			syntax: "start | center | end | baseline | stretch",
			relevance: 0,
			browsers: ["E12", "FF1", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-align"
			}],
			description: "The box-align CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box."
		}, {
			name: "box-direction",
			status: "nonstandard",
			syntax: "normal | reverse | inherit",
			relevance: 0,
			browsers: ["E12", "FF1", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-direction"
			}],
			description: "The box-direction CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge)."
		}, {
			name: "box-flex",
			status: "nonstandard",
			syntax: "<number>",
			relevance: 0,
			browsers: ["E12", "FF1", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-flex"
			}],
			description: "The -moz-box-flex and -webkit-box-flex CSS properties specify how a -moz-box or -webkit-box grows to fill the box that contains it, in the direction of the containing box's layout."
		}, {
			name: "box-flex-group",
			status: "nonstandard",
			syntax: "<integer>",
			relevance: 0,
			browsers: ["S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-flex-group"
			}],
			description: "The box-flex-group CSS property assigns the flexbox's child elements to a flex group."
		}, {
			name: "box-lines",
			status: "nonstandard",
			syntax: "single | multiple",
			relevance: 0,
			browsers: ["S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-lines"
			}],
			description: "The box-lines CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes)."
		}, {
			name: "box-ordinal-group",
			status: "nonstandard",
			syntax: "<integer>",
			relevance: 0,
			browsers: ["E12", "FF1", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group"
			}],
			description: "The box-ordinal-group CSS property assigns the flexbox's child elements to an ordinal group."
		}, {
			name: "box-orient",
			status: "nonstandard",
			syntax: "horizontal | vertical | inline-axis | block-axis | inherit",
			relevance: 0,
			browsers: ["E12", "FF1", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-orient"
			}],
			description: "The box-orient CSS property specifies whether an element lays out its contents horizontally or vertically."
		}, {
			name: "box-pack",
			status: "nonstandard",
			syntax: "start | center | end | justify",
			relevance: 0,
			browsers: ["E12", "FF1", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/box-pack"
			}],
			description: "The -moz-box-pack and -webkit-box-pack CSS properties specify how a -moz-box or -webkit-box packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box."
		}, {
			name: "color-adjust",
			syntax: "economy | exact",
			relevance: 50,
			browsers: ["E79", "FF48", "S6", "C49", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/color-adjust"
			}],
			description: "The color-adjust property is a non-standard CSS extension that can be used to force printing of background colors and images in browsers based on the WebKit engine."
		}, {
			name: "color-scheme",
			syntax: "normal | [ light | dark | <custom-ident> ]+",
			relevance: 50,
			browsers: ["E81", "S13", "C81", "O68"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/color-scheme"
			}],
			description: "The color-scheme CSS property allows an element to indicate which color schemes it can comfortably be rendered in."
		}, {
			name: "content-visibility",
			syntax: "visible | auto | hidden",
			relevance: 51,
			browsers: ["E85", "C85", "O71"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/content-visibility"
			}],
			description: "Controls whether or not an element renders its contents at all, along with forcing a strong set of containments, allowing user agents to potentially omit large swathes of layout and rendering work until it becomes needed."
		}, {
			name: "counter-set",
			syntax: "[ <custom-ident> <integer>? ]+ | none",
			relevance: 50,
			browsers: ["E85", "FF68", "C85", "O71"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/counter-set"
			}],
			description: "The counter-set CSS property sets a CSS counter to a given value. It manipulates the value of existing counters, and will only create new counters if there isn't already a counter of the given name on the element."
		}, {
			name: "font-optical-sizing",
			syntax: "auto | none",
			relevance: 50,
			browsers: ["E17", "FF62", "S11", "C79", "O66"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing"
			}],
			description: "The font-optical-sizing CSS property allows developers to control whether browsers render text with slightly differing visual representations to optimize viewing at different sizes, or not. This only works for fonts that have an optical size variation axis."
		}, {
			name: "font-variation-settings",
			syntax: "normal | [ <string> <number> ]#",
			relevance: 50,
			browsers: ["E17", "FF62", "S11", "C62", "O49"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-variation-settings"
			}],
			description: "The font-variation-settings CSS property provides low-level control over OpenType or TrueType font variations, by specifying the four letter axis names of the features you want to vary, along with their variation values."
		}, {
			name: "font-smooth",
			status: "nonstandard",
			syntax: "auto | never | always | <absolute-size> | <length>",
			relevance: 0,
			browsers: ["E79", "FF25", "S4", "C5", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/font-smooth"
			}],
			description: "The font-smooth CSS property controls the application of anti-aliasing when fonts are rendered."
		}, {
			name: "forced-color-adjust",
			status: "experimental",
			syntax: "auto | none",
			relevance: 51,
			browsers: ["E79", "C89", "IE10"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/forced-color-adjust"
			}],
			description: "Allows authors to opt certain elements out of forced colors mode. This then restores the control of those values to CSS"
		}, {
			name: "gap",
			syntax: "<'row-gap'> <'column-gap'>?",
			relevance: 50,
			browsers: ["E84", "FF63", "S14.1", "C84", "O70"],
			description: "The gap CSS property is a shorthand property for row-gap and column-gap specifying the gutters between grid rows and columns."
		}, {
			name: "hanging-punctuation",
			syntax: "none | [ first || [ force-end | allow-end ] || last ]",
			relevance: 50,
			browsers: ["S10"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation"
			}],
			description: "The hanging-punctuation CSS property specifies whether a punctuation mark should hang at the start or end of a line of text. Hanging punctuation may be placed outside the line box."
		}, {
			name: "image-resolution",
			status: "experimental",
			syntax: "[ from-image || <resolution> ] && snap?",
			relevance: 50,
			description: "The image-resolution property specifies the intrinsic resolution of all raster images used in or on the element. It affects both content images (e.g. replaced elements and generated content) and decorative images (such as background-image). The intrinsic resolution of an image is used to determine the image’s intrinsic dimensions."
		}, {
			name: "initial-letter",
			status: "experimental",
			syntax: "normal | [ <number> <integer>? ]",
			relevance: 50,
			browsers: ["S9"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/initial-letter"
			}],
			description: "The initial-letter CSS property specifies styling for dropped, raised, and sunken initial letters."
		}, {
			name: "initial-letter-align",
			status: "experimental",
			syntax: "[ auto | alphabetic | hanging | ideographic ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/initial-letter-align"
			}],
			description: "The initial-letter-align CSS property specifies the alignment of initial letters within a paragraph."
		}, {
			name: "inset",
			syntax: "<'top'>{1,4}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset"
			}],
			description: "The inset CSS property defines the logical block and inline start and end offsets of an element, which map to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "inset-block",
			syntax: "<'top'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF63", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset-block"
			}],
			description: "The inset-block CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "inset-block-end",
			syntax: "<'top'>",
			relevance: 50,
			browsers: ["E79", "FF63", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset-block-end"
			}],
			description: "The inset-block-end CSS property defines the logical block end offset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "inset-block-start",
			syntax: "<'top'>",
			relevance: 50,
			browsers: ["E79", "FF63", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset-block-start"
			}],
			description: "The inset-block-start CSS property defines the logical block start offset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "inset-inline",
			syntax: "<'top'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF63", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline"
			}],
			description: "The inset-inline CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "inset-inline-end",
			syntax: "<'top'>",
			relevance: 50,
			browsers: ["E79", "FF63", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline-end"
			}],
			description: "The inset-inline-end CSS property defines the logical inline end inset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "inset-inline-start",
			syntax: "<'top'>",
			relevance: 50,
			browsers: ["E79", "FF63", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline-start"
			}],
			description: "The inset-inline-start CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation."
		}, {
			name: "justify-tracks",
			status: "experimental",
			syntax: "[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#",
			relevance: 50,
			browsers: ["FF77"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/justify-tracks"
			}],
			description: "The justify-tracks CSS property sets the alignment in the masonry axis for grid containers that have masonry in their inline axis"
		}, {
			name: "line-clamp",
			status: "experimental",
			syntax: "none | <integer>",
			relevance: 50,
			description: "The line-clamp property allows limiting the contents of a block container to the specified number of lines; remaining content is fragmented away and neither rendered nor measured. Optionally, it also allows inserting content into the last line box to indicate the continuity of truncated/interrupted content."
		}, {
			name: "line-height-step",
			status: "experimental",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "C60", "O47"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/line-height-step"
			}],
			description: "The line-height-step CSS property defines the step units for line box heights. When the step unit is positive, line box heights are rounded up to the closest multiple of the unit. Negative values are invalid."
		}, {
			name: "margin-block",
			syntax: "<'margin-left'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-block"
			}],
			description: "The margin-block CSS property defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation."
		}, {
			name: "margin-inline",
			syntax: "<'margin-left'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline"
			}],
			description: "The margin-inline CSS property defines the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation."
		}, {
			name: "margin-trim",
			status: "experimental",
			syntax: "none | in-flow | all",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/margin-trim"
			}],
			description: "The margin-trim property allows the container to trim the margins of its children where they adjoin the container’s edges."
		}, {
			name: "mask",
			syntax: "<mask-layer>#",
			relevance: 50,
			browsers: ["E12", "FF2", "S3.2", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask"
			}],
			description: "The mask CSS property alters the visibility of an element by either partially or fully hiding it. This is accomplished by either masking or clipping the image at specific points."
		}, {
			name: "mask-border",
			syntax: "<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>",
			relevance: 50,
			browsers: ["E79", "S3.1", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-border"
			}],
			description: "The mask-border CSS property lets you create a mask along the edge of an element's border.\n\nThis property is a shorthand for mask-border-source, mask-border-slice, mask-border-width, mask-border-outset, mask-border-repeat, and mask-border-mode. As with all shorthand properties, any omitted sub-values will be set to their initial value."
		}, {
			name: "mask-border-mode",
			syntax: "luminance | alpha",
			relevance: 50,
			description: "The mask-border-mode CSS property specifies the blending mode used in a mask border."
		}, {
			name: "mask-border-outset",
			syntax: "[ <length> | <number> ]{1,4}",
			relevance: 50,
			browsers: ["E79", "S3.1", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-outset"
			}],
			description: "The mask-border-outset CSS property specifies the distance by which an element's mask border is set out from its border box."
		}, {
			name: "mask-border-repeat",
			syntax: "[ stretch | repeat | round | space ]{1,2}",
			relevance: 50,
			browsers: ["E79", "S3.1", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-repeat"
			}],
			description: "The mask-border-repeat CSS property defines how the edge regions of a source image are adjusted to fit the dimensions of an element's mask border."
		}, {
			name: "mask-border-slice",
			syntax: "<number-percentage>{1,4} fill?",
			relevance: 50,
			browsers: ["E79", "S3.1", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-slice"
			}],
			description: "The mask-border-slice CSS property divides the image specified by mask-border-source into regions. These regions are used to form the components of an element's mask border."
		}, {
			name: "mask-border-source",
			syntax: "none | <image>",
			relevance: 50,
			browsers: ["E79", "S3.1", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-source"
			}],
			description: "The mask-border-source CSS property specifies the source image used to create an element's mask border.\n\nThe mask-border-slice property is used to divide the source image into regions, which are then dynamically applied to the final mask border."
		}, {
			name: "mask-border-width",
			syntax: "[ <length-percentage> | <number> | auto ]{1,4}",
			relevance: 50,
			browsers: ["E79", "S3.1", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-width"
			}],
			description: "The mask-border-width CSS property specifies the width of an element's mask border."
		}, {
			name: "mask-clip",
			syntax: "[ <geometry-box> | no-clip ]#",
			relevance: 50,
			browsers: ["E79", "FF53", "S4", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-clip"
			}],
			description: "The mask-clip CSS property determines the area, which is affected by a mask. The painted content of an element must be restricted to this area."
		}, {
			name: "mask-composite",
			syntax: "<compositing-operator>#",
			relevance: 50,
			browsers: ["E18", "FF53"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/mask-composite"
			}],
			description: "The mask-composite CSS property represents a compositing operation used on the current mask layer with the mask layers below it."
		}, {
			name: "masonry-auto-flow",
			status: "experimental",
			syntax: "[ pack | next ] || [ definite-first | ordered ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/masonry-auto-flow"
			}],
			description: "The masonry-auto-flow CSS property modifies how items are placed when using masonry in CSS Grid Layout."
		}, {
			name: "math-style",
			syntax: "normal | compact",
			relevance: 50,
			browsers: ["FF83", "S14.1", "C83"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/math-style"
			}],
			description: "The math-style property indicates whether MathML equations should render with normal or compact height."
		}, {
			name: "max-lines",
			status: "experimental",
			syntax: "none | <integer>",
			relevance: 50,
			description: "The max-liens property forces a break after a set number of lines"
		}, {
			name: "offset",
			syntax: "[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?",
			relevance: 50,
			browsers: ["E79", "FF72", "C55", "O42"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/offset"
			}],
			description: "The offset CSS property is a shorthand property for animating an element along a defined path."
		}, {
			name: "offset-anchor",
			syntax: "auto | <position>",
			relevance: 50,
			browsers: ["E79", "FF72", "C79"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/offset-anchor"
			}],
			description: "Defines an anchor point of the box positioned along the path. The anchor point specifies the point of the box which is to be considered as the point that is moved along the path."
		}, {
			name: "offset-distance",
			syntax: "<length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF72", "C55", "O42"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/offset-distance"
			}],
			description: "The offset-distance CSS property specifies a position along an offset-path."
		}, {
			name: "offset-path",
			syntax: "none | ray( [ <angle> && <size> && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]",
			relevance: 50,
			browsers: ["E79", "FF72", "C55", "O45"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/offset-path"
			}],
			description: 'The offset-path CSS property specifies the offset path where the element gets positioned. The exact element’s position on the offset path is determined by the offset-distance property. An offset path is either a specified path with one or multiple sub-paths or the geometry of a not-styled basic shape. Each shape or path must define an initial position for the computed value of "0" for offset-distance and an initial direction which specifies the rotation of the object to the initial position.\n\nIn this specification, a direction (or rotation) of 0 degrees is equivalent to the direction of the positive x-axis in the object’s local coordinate system. In other words, a rotation of 0 degree points to the right side of the UA if the object and its ancestors have no transformation applied.'
		}, {
			name: "offset-position",
			status: "experimental",
			syntax: "auto | <position>",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/offset-position"
			}],
			description: "Specifies the initial position of the offset path. If position is specified with static, offset-position would be ignored."
		}, {
			name: "offset-rotate",
			syntax: "[ auto | reverse ] || <angle>",
			relevance: 50,
			browsers: ["E79", "FF72", "C56", "O43"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/offset-rotate"
			}],
			description: "The offset-rotate CSS property defines the direction of the element while positioning along the offset path."
		}, {
			name: "overflow-anchor",
			syntax: "auto | none",
			relevance: 52,
			browsers: ["E79", "FF66", "C56", "O43"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-anchor"
			}],
			description: "The overflow-anchor CSS property provides a way to opt out browser scroll anchoring behavior which adjusts scroll position to minimize content shifts."
		}, {
			name: "overflow-block",
			syntax: "visible | hidden | clip | scroll | auto",
			relevance: 50,
			browsers: ["FF69"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-block"
			}],
			description: "The overflow-block CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the block axis."
		}, {
			name: "overflow-clip-box",
			status: "nonstandard",
			syntax: "padding-box | content-box",
			relevance: 0,
			browsers: ["FF29"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Mozilla/Gecko/Chrome/CSS/overflow-clip-box"
			}],
			description: "The overflow-clip-box CSS property specifies relative to which box the clipping happens when there is an overflow. It is short hand for the overflow-clip-box-inline and overflow-clip-box-block properties."
		}, {
			name: "overflow-clip-margin",
			syntax: "<visual-box> || <length [0,∞]>",
			relevance: 50,
			browsers: ["E90", "C90"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-clip-margin"
			}],
			description: "The overflow-clip-margin CSS property determines how far outside its bounds an element with overflow: clip may be painted before being clipped."
		}, {
			name: "overflow-inline",
			syntax: "visible | hidden | clip | scroll | auto",
			relevance: 50,
			browsers: ["FF69"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overflow-inline"
			}],
			description: "The overflow-inline CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the inline axis."
		}, {
			name: "overscroll-behavior",
			syntax: "[ contain | none | auto ]{1,2}",
			relevance: 50,
			browsers: ["E18", "FF59", "C63", "O50"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior"
			}],
			description: "The overscroll-behavior CSS property is shorthand for the overscroll-behavior-x and overscroll-behavior-y properties, which allow you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached."
		}, {
			name: "overscroll-behavior-block",
			syntax: "contain | none | auto",
			relevance: 50,
			browsers: ["E79", "FF73", "C77", "O64"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-block"
			}],
			description: "The overscroll-behavior-block CSS property sets the browser's behavior when the block direction boundary of a scrolling area is reached."
		}, {
			name: "overscroll-behavior-inline",
			syntax: "contain | none | auto",
			relevance: 50,
			browsers: ["E79", "FF73", "C77", "O64"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-inline"
			}],
			description: "The overscroll-behavior-inline CSS property sets the browser's behavior when the inline direction boundary of a scrolling area is reached."
		}, {
			name: "overscroll-behavior-x",
			syntax: "contain | none | auto",
			relevance: 50,
			browsers: ["E18", "FF59", "C63", "O50"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x"
			}],
			description: "The overscroll-behavior-x CSS property is allows you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached — in the x axis direction."
		}, {
			name: "overscroll-behavior-y",
			syntax: "contain | none | auto",
			relevance: 50,
			browsers: ["E18", "FF59", "C63", "O50"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y"
			}],
			description: "The overscroll-behavior-y CSS property is allows you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached — in the y axis direction."
		}, {
			name: "padding-block",
			syntax: "<'padding-left'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-block"
			}],
			description: "The padding-block CSS property defines the logical block start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation."
		}, {
			name: "padding-inline",
			syntax: "<'padding-left'>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF66", "S14.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline"
			}],
			description: "The padding-inline CSS property defines the logical inline start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation."
		}, {
			name: "place-content",
			syntax: "<'align-content'> <'justify-content'>?",
			relevance: 50,
			browsers: ["E79", "FF53", "S9", "C59", "O46"],
			description: "The place-content CSS shorthand property sets both the align-content and justify-content properties."
		}, {
			name: "place-items",
			syntax: "<'align-items'> <'justify-items'>?",
			relevance: 50,
			browsers: ["E79", "FF45", "S11", "C59", "O46"],
			description: "The CSS place-items shorthand property sets both the align-items and justify-items properties. The first value is the align-items property value, the second the justify-items one. If the second value is not present, the first value is also used for it."
		}, {
			name: "place-self",
			syntax: "<'align-self'> <'justify-self'>?",
			relevance: 50,
			browsers: ["E79", "FF45", "S11", "C59", "O46"],
			description: "The place-self CSS property is a shorthand property sets both the align-self and justify-self properties. The first value is the align-self property value, the second the justify-self one. If the second value is not present, the first value is also used for it."
		}, {
			name: "rotate",
			syntax: "none | <angle> | [ x | y | z | <number>{3} ] && <angle>",
			relevance: 50,
			browsers: ["FF72", "S14.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/rotate"
			}],
			description: "The rotate CSS property allows you to specify rotation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value."
		}, {
			name: "row-gap",
			syntax: "normal | <length-percentage>",
			relevance: 50,
			browsers: ["E84", "FF63", "S14.1", "C84", "O70"],
			description: "The row-gap CSS property specifies the gutter between grid rows."
		}, {
			name: "ruby-merge",
			status: "experimental",
			syntax: "separate | collapse | auto",
			relevance: 50,
			description: "This property controls how ruby annotation boxes should be rendered when there are more than one in a ruby container box: whether each pair should be kept separate, the annotations should be collapsed and rendered as a group, or the separation should be determined based on the space available."
		}, {
			name: "scale",
			syntax: "none | <number>{1,3}",
			relevance: 50,
			browsers: ["FF72", "S14.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scale"
			}],
			description: "The scale CSS property allows you to specify scale transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value."
		}, {
			name: "scrollbar-color",
			syntax: "auto | dark | light | <color>{2}",
			relevance: 50,
			browsers: ["FF64"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-color"
			}],
			description: "The scrollbar-color CSS property sets the color of the scrollbar track and thumb."
		}, {
			name: "scrollbar-gutter",
			syntax: "auto | [ stable | always ] && both? && force?",
			relevance: 50,
			browsers: ["C88"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-gutter"
			}],
			description: "The scrollbar-gutter CSS property allows authors to reserve space for the scrollbar, preventing unwanted layout changes as the content grows while also avoiding unnecessary visuals when scrolling isn't needed."
		}, {
			name: "scrollbar-width",
			syntax: "auto | thin | none",
			relevance: 50,
			browsers: ["FF64"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-width"
			}],
			description: "The scrollbar-width property allows the author to set the maximum thickness of an element’s scrollbars when they are shown. "
		}, {
			name: "scroll-margin",
			syntax: "<length>{1,4}",
			relevance: 50,
			browsers: ["E79", "FF90", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin"
			}],
			description: "The scroll-margin property is a shorthand property which sets all of the scroll-margin longhands, assigning values much like the margin property does for the margin-* longhands."
		}, {
			name: "scroll-margin-block",
			syntax: "<length>{1,2}",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block"
			}],
			description: "The scroll-margin-block property is a shorthand property which sets the scroll-margin longhands in the block dimension."
		}, {
			name: "scroll-margin-block-start",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start"
			}],
			description: "The scroll-margin-block-start property defines the margin of the scroll snap area at the start of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-block-end",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end"
			}],
			description: "The scroll-margin-block-end property defines the margin of the scroll snap area at the end of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-bottom",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom"
			}],
			description: "The scroll-margin-bottom property defines the bottom margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-inline",
			syntax: "<length>{1,2}",
			relevance: 50,
			browsers: ["FF68", "S14.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline"
			}],
			description: "The scroll-margin-inline property is a shorthand property which sets the scroll-margin longhands in the inline dimension."
		}, {
			name: "scroll-margin-inline-start",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start"
			}],
			description: "The scroll-margin-inline-start property defines the margin of the scroll snap area at the start of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-inline-end",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end"
			}],
			description: "The scroll-margin-inline-end property defines the margin of the scroll snap area at the end of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-left",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left"
			}],
			description: "The scroll-margin-left property defines the left margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-right",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right"
			}],
			description: "The scroll-margin-right property defines the right margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-margin-top",
			syntax: "<length>",
			relevance: 50,
			browsers: ["E79", "FF68", "S14.1", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top"
			}],
			description: "The scroll-margin-top property defines the top margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets."
		}, {
			name: "scroll-padding",
			syntax: "[ auto | <length-percentage> ]{1,4}",
			relevance: 50,
			browsers: ["E79", "FF68", "S11", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding"
			}],
			description: "The scroll-padding property is a shorthand property which sets all of the scroll-padding longhands, assigning values much like the padding property does for the padding-* longhands."
		}, {
			name: "scroll-padding-block",
			syntax: "[ auto | <length-percentage> ]{1,2}",
			relevance: 50,
			browsers: ["E79", "FF68", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block"
			}],
			description: "The scroll-padding-block property is a shorthand property which sets the scroll-padding longhands for the block dimension."
		}, {
			name: "scroll-padding-block-start",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start"
			}],
			description: "The scroll-padding-block-start property defines offsets for the start edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-block-end",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end"
			}],
			description: "The scroll-padding-block-end property defines offsets for the end edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-bottom",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "S11", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom"
			}],
			description: "The scroll-padding-bottom property defines offsets for the bottom of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-inline",
			syntax: "[ auto | <length-percentage> ]{1,2}",
			relevance: 50,
			browsers: ["E79", "FF68", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline"
			}],
			description: "The scroll-padding-inline property is a shorthand property which sets the scroll-padding longhands for the inline dimension."
		}, {
			name: "scroll-padding-inline-start",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start"
			}],
			description: "The scroll-padding-inline-start property defines offsets for the start edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-inline-end",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end"
			}],
			description: "The scroll-padding-inline-end property defines offsets for the end edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-left",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "S11", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left"
			}],
			description: "The scroll-padding-left property defines offsets for the left of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-right",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "S11", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right"
			}],
			description: "The scroll-padding-right property defines offsets for the right of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-padding-top",
			syntax: "auto | <length-percentage>",
			relevance: 50,
			browsers: ["E79", "FF68", "S11", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top"
			}],
			description: "The scroll-padding-top property defines offsets for the top of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport."
		}, {
			name: "scroll-snap-align",
			syntax: "[ none | start | end | center ]{1,2}",
			relevance: 51,
			browsers: ["E79", "FF68", "S11", "C69", "O56"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align"
			}],
			description: "The scroll-snap-align property specifies the box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value."
		}, {
			name: "scroll-snap-stop",
			syntax: "normal | always",
			relevance: 50,
			browsers: ["E79", "C75", "O62"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop"
			}],
			description: 'The scroll-snap-stop CSS property defines whether the scroll container is allowed to "pass over" possible snap positions.'
		}, {
			name: "scroll-snap-type-x",
			status: "obsolete",
			syntax: "none | mandatory | proximity",
			relevance: 0,
			browsers: ["FF39", "S9"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x"
			}],
			description: "The scroll-snap-type-x CSS property defines how strictly snap points are enforced on the horizontal axis of the scroll container in case there is one.\n\nSpecifying any precise animations or physics used to enforce those snap points is not covered by this property but instead left up to the user agent."
		}, {
			name: "scroll-snap-type-y",
			status: "obsolete",
			syntax: "none | mandatory | proximity",
			relevance: 0,
			browsers: ["FF39"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y"
			}],
			description: "The scroll-snap-type-y CSS property defines how strictly snap points are enforced on the vertical axis of the scroll container in case there is one.\n\nSpecifying any precise animations or physics used to enforce those snap points is not covered by this property but instead left up to the user agent."
		}, {
			name: "text-combine-upright",
			syntax: "none | all | [ digits <integer>? ]",
			relevance: 50,
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-combine-upright"
			}],
			description: "The text-combine-upright CSS property specifies the combination of multiple characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.\n\nThis is used to produce an effect that is known as tate-chū-yoko (縦中横) in Japanese, or as 直書橫向 in Chinese."
		}, {
			name: "text-decoration-skip",
			status: "experimental",
			syntax: "none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]",
			relevance: 52,
			browsers: ["S12.1", "C57", "O44"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip"
			}],
			description: "The text-decoration-skip CSS property specifies what parts of the element’s content any text decoration affecting the element must skip over. It controls all text decoration lines drawn by the element and also any text decoration lines drawn by its ancestors."
		}, {
			name: "text-decoration-skip-ink",
			syntax: "auto | all | none",
			relevance: 50,
			browsers: ["E79", "FF70", "C64", "O50"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink"
			}],
			description: "The text-decoration-skip-ink CSS property specifies how overlines and underlines are drawn when they pass over glyph ascenders and descenders."
		}, {
			name: "text-decoration-thickness",
			syntax: "auto | from-font | <length> | <percentage> ",
			relevance: 50,
			browsers: ["E89", "FF70", "S12.1", "C89", "O75"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness"
			}],
			description: "The text-decoration-thickness CSS property sets the thickness, or width, of the decoration line that is used on text in an element, such as a line-through, underline, or overline."
		}, {
			name: "text-emphasis",
			syntax: "<'text-emphasis-style'> || <'text-emphasis-color'>",
			relevance: 50,
			browsers: ["E79", "FF46", "S6.1", "C25", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis"
			}],
			description: "The text-emphasis CSS property is a shorthand property for setting text-emphasis-style and text-emphasis-color in one declaration. This property will apply the specified emphasis mark to each character of the element's text, except separator characters, like spaces,  and control characters."
		}, {
			name: "text-emphasis-color",
			syntax: "<color>",
			relevance: 50,
			browsers: ["E79", "FF46", "S6.1", "C25", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color"
			}],
			description: "The text-emphasis-color CSS property defines the color used to draw emphasis marks on text being rendered in the HTML document. This value can also be set and reset using the text-emphasis shorthand."
		}, {
			name: "text-emphasis-position",
			syntax: "[ over | under ] && [ right | left ]",
			relevance: 50,
			browsers: ["E79", "FF46", "S6.1", "C25", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position"
			}],
			description: "The text-emphasis-position CSS property describes where emphasis marks are drawn at. The effect of emphasis marks on the line height is the same as for ruby text: if there isn't enough place, the line height is increased."
		}, {
			name: "text-emphasis-style",
			syntax: "none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>",
			relevance: 50,
			browsers: ["E79", "FF46", "S6.1", "C25", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style"
			}],
			description: "The text-emphasis-style CSS property defines the type of emphasis used. It can also be set, and reset, using the text-emphasis shorthand."
		}, {
			name: "text-size-adjust",
			status: "experimental",
			syntax: "none | auto | <percentage>",
			relevance: 57,
			browsers: ["E79", "C54", "O41"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-size-adjust"
			}],
			description: "The text-size-adjust CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property."
		}, {
			name: "text-underline-offset",
			syntax: "auto | <length> | <percentage> ",
			relevance: 50,
			browsers: ["E87", "FF70", "S12.1", "C87", "O73"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/text-underline-offset"
			}],
			description: "The text-underline-offset CSS property sets the offset distance of an underline text decoration line (applied using text-decoration) from its original position."
		}, {
			name: "transform-box",
			syntax: "content-box | border-box | fill-box | stroke-box | view-box",
			relevance: 50,
			browsers: ["E79", "FF55", "S11", "C64", "O51"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/transform-box"
			}],
			description: "The transform-box CSS property defines the layout box to which the transform and transform-origin properties relate."
		}, {
			name: "translate",
			syntax: "none | <length-percentage> [ <length-percentage> <length>? ]?",
			relevance: 50,
			browsers: ["FF72", "S14.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/translate"
			}],
			description: "The translate CSS property allows you to specify translation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value."
		}, {
			name: "speak-as",
			syntax: "auto | bullets | numbers | words | spell-out | <counter-style-name>",
			relevance: 50,
			description: "The speak-as descriptor specifies how a counter symbol constructed with a given @counter-style will be represented in the spoken form. For example, an author can specify a counter symbol to be either spoken as its numerical value or just represented with an audio cue."
		}, {
			name: "font-display",
			status: "experimental",
			syntax: "[ auto | block | swap | fallback | optional ]",
			relevance: 57,
			description: "The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use."
		}, {
			name: "bleed",
			syntax: "auto | <length>",
			relevance: 50,
			description: "The bleed CSS at-rule descriptor, used with the @page at-rule, specifies the extent of the page bleed area outside the page box. This property only has effect if crop marks are enabled using the marks property."
		}, {
			name: "marks",
			syntax: "none | [ crop || cross ]",
			relevance: 50,
			description: "The marks CSS at-rule descriptor, used with the @page at-rule, adds crop and/or cross marks to the presentation of the document. Crop marks indicate where the page should be cut. Cross marks are used to align sheets."
		}, {
			name: "syntax",
			status: "experimental",
			syntax: "<string>",
			relevance: 50,
			description: "Specifies the syntax of the custom property registration represented by the @property rule, controlling how the property’s value is parsed at computed value time."
		}, {
			name: "inherits",
			status: "experimental",
			syntax: "true | false",
			relevance: 50,
			description: "Specifies the inherit flag of the custom property registration represented by the @property rule, controlling whether or not the property inherits by default."
		}, {
			name: "initial-value",
			status: "experimental",
			syntax: "<string>",
			relevance: 50,
			description: "Specifies the initial value of the custom property registration represented by the @property rule, controlling the property’s initial value."
		}, {
			name: "max-zoom",
			syntax: "auto | <number> | <percentage>",
			relevance: 50,
			description: "The max-zoom CSS descriptor sets the maximum zoom factor of a document defined by the @viewport at-rule. The browser will not zoom in any further than this, whether automatically or at the user's request.\n\nA zoom factor of 1.0 or 100% corresponds to no zooming. Larger values are zoomed in. Smaller values are zoomed out."
		}, {
			name: "min-zoom",
			syntax: "auto | <number> | <percentage>",
			relevance: 50,
			description: "The min-zoom CSS descriptor sets the minimum zoom factor of a document defined by the @viewport at-rule. The browser will not zoom out any further than this, whether automatically or at the user's request.\n\nA zoom factor of 1.0 or 100% corresponds to no zooming. Larger values are zoomed in. Smaller values are zoomed out."
		}, {
			name: "orientation",
			syntax: "auto | portrait | landscape",
			relevance: 50,
			description: "The orientation CSS @media media feature can be used to apply styles based on the orientation of the viewport (or the page box, for paged media)."
		}, {
			name: "user-zoom",
			syntax: "zoom | fixed",
			relevance: 50,
			description: "The user-zoom CSS descriptor controls whether or not the user can change the zoom factor of a document defined by @viewport."
		}, {
			name: "viewport-fit",
			syntax: "auto | contain | cover",
			relevance: 50,
			description: "The border-block-style CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation."
		}],
		atDirectives: [{
			name: "@charset",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@charset"
			}],
			description: "Defines character set of the document."
		}, {
			name: "@counter-style",
			browsers: ["FF33", "C91"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@counter-style"
			}],
			description: "Defines a custom counter style."
		}, {
			name: "@font-face",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@font-face"
			}],
			description: "Allows for linking to fonts that are automatically activated when needed. This permits authors to work around the limitation of 'web-safe' fonts, allowing for consistent rendering independent of the fonts available in a given user's environment."
		}, {
			name: "@font-feature-values",
			browsers: ["FF34", "S9.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@font-feature-values"
			}],
			description: "Defines named values for the indices used to select alternate glyphs for a given font family."
		}, {
			name: "@import",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@import"
			}],
			description: "Includes content of another file."
		}, {
			name: "@keyframes",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@keyframes"
			}],
			description: "Defines set of animation key frames."
		}, {
			name: "@media",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@media"
			}],
			description: "Defines a stylesheet for a particular media type."
		}, {
			name: "@-moz-document",
			browsers: ["FF1.8"],
			description: "Gecko-specific at-rule that restricts the style rules contained within it based on the URL of the document."
		}, {
			name: "@-moz-keyframes",
			browsers: ["FF5"],
			description: "Defines set of animation key frames."
		}, {
			name: "@-ms-viewport",
			browsers: ["E", "IE10"],
			description: "Specifies the size, zoom factor, and orientation of the viewport."
		}, {
			name: "@namespace",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@namespace"
			}],
			description: "Declares a prefix and associates it with a namespace name."
		}, {
			name: "@-o-keyframes",
			browsers: ["O12"],
			description: "Defines set of animation key frames."
		}, {
			name: "@-o-viewport",
			browsers: ["O11"],
			description: "Specifies the size, zoom factor, and orientation of the viewport."
		}, {
			name: "@page",
			browsers: ["E12", "FF19", "C2", "IE8", "O6"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@page"
			}],
			description: "Directive defines various page parameters."
		}, {
			name: "@supports",
			browsers: ["E12", "FF22", "S9", "C28", "O12.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/@supports"
			}],
			description: "A conditional group rule whose condition tests whether the user agent supports CSS property:value pairs."
		}, {
			name: "@-webkit-keyframes",
			browsers: ["C", "S4"],
			description: "Defines set of animation key frames."
		}],
		pseudoClasses: [{
			name: ":active",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:active"
			}],
			description: "Applies while an element is being activated by the user. For example, between the times the user presses the mouse button and releases it."
		}, {
			name: ":any-link",
			browsers: ["E79", "FF50", "S9", "C65", "O52"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:any-link"
			}],
			description: "Represents an element that acts as the source anchor of a hyperlink. Applies to both visited and unvisited links."
		}, {
			name: ":checked",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:checked"
			}],
			description: "Radio and checkbox elements can be toggled by the user. Some menu items are 'checked' when the user selects them. When such elements are toggled 'on' the :checked pseudo-class applies."
		}, {
			name: ":corner-present",
			browsers: ["C", "S5"],
			description: "Non-standard. Indicates whether or not a scrollbar corner is present."
		}, {
			name: ":decrement",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to buttons and track pieces. Indicates whether or not the button or track piece will decrement the view’s position when used."
		}, {
			name: ":default",
			browsers: ["E79", "FF4", "S5", "C10", "O10"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:default"
			}],
			description: "Applies to the one or more UI elements that are the default among a set of similar elements. Typically applies to context menu items, buttons, and select lists/menus."
		}, {
			name: ":disabled",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:disabled"
			}],
			description: "Represents user interface elements that are in a disabled state; such elements have a corresponding enabled state."
		}, {
			name: ":double-button",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to buttons and track pieces. Applies when both buttons are displayed together at the same end of the scrollbar."
		}, {
			name: ":empty",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:empty"
			}],
			description: "Represents an element that has no children at all."
		}, {
			name: ":enabled",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:enabled"
			}],
			description: "Represents user interface elements that are in an enabled state; such elements have a corresponding disabled state."
		}, {
			name: ":end",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to buttons and track pieces. Indicates whether the object is placed after the thumb."
		}, {
			name: ":first",
			browsers: ["E12", "S6", "C18", "IE8", "O9.2"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:first"
			}],
			description: "When printing double-sided documents, the page boxes on left and right pages may be different. This can be expressed through CSS pseudo-classes defined in the  page context."
		}, {
			name: ":first-child",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:first-child"
			}],
			description: "Same as :nth-child(1). Represents an element that is the first child of some other element."
		}, {
			name: ":first-of-type",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:first-of-type"
			}],
			description: "Same as :nth-of-type(1). Represents an element that is the first sibling of its type in the list of children of its parent element."
		}, {
			name: ":focus",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:focus"
			}],
			description: "Applies while an element has the focus (accepts keyboard or mouse events, or other forms of input)."
		}, {
			name: ":fullscreen",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:fullscreen"
			}],
			description: "Matches any element that has its fullscreen flag set."
		}, {
			name: ":future",
			browsers: ["S6.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:future"
			}],
			description: "Represents any element that is defined to occur entirely after a :current element."
		}, {
			name: ":horizontal",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to any scrollbar pieces that have a horizontal orientation."
		}, {
			name: ":host",
			browsers: ["E79", "FF63", "S10", "C54", "O41"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:host"
			}],
			description: "When evaluated in the context of a shadow tree, matches the shadow tree’s host element."
		}, {
			name: ":host()",
			browsers: ["C35", "O22"],
			description: "When evaluated in the context of a shadow tree, it matches the shadow tree’s host element if the host element, in its normal context, matches the selector argument."
		}, {
			name: ":host-context()",
			browsers: ["C35", "O22"],
			description: "Tests whether there is an ancestor, outside the shadow tree, which matches a particular selector."
		}, {
			name: ":hover",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:hover"
			}],
			description: "Applies while the user designates an element with a pointing device, but does not necessarily activate it. For example, a visual user agent could apply this pseudo-class when the cursor (mouse pointer) hovers over a box generated by the element."
		}, {
			name: ":increment",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to buttons and track pieces. Indicates whether or not the button or track piece will increment the view’s position when used."
		}, {
			name: ":indeterminate",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:indeterminate"
			}],
			description: "Applies to UI elements whose value is in an indeterminate state."
		}, {
			name: ":in-range",
			browsers: ["E13", "FF29", "S5.1", "C10", "O11"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:in-range"
			}],
			description: "Used in conjunction with the min and max attributes, whether on a range input, a number field, or any other types that accept those attributes."
		}, {
			name: ":invalid",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:invalid"
			}],
			description: "An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification."
		}, {
			name: ":lang()",
			browsers: ["E", "C", "FF1", "IE8", "O8", "S3"],
			description: "Represents an element that is in language specified."
		}, {
			name: ":last-child",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:last-child"
			}],
			description: "Same as :nth-last-child(1). Represents an element that is the last child of some other element."
		}, {
			name: ":last-of-type",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:last-of-type"
			}],
			description: "Same as :nth-last-of-type(1). Represents an element that is the last sibling of its type in the list of children of its parent element."
		}, {
			name: ":left",
			browsers: ["E12", "S5.1", "C6", "IE8", "O9.2"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:left"
			}],
			description: "When printing double-sided documents, the page boxes on left and right pages may be different. This can be expressed through CSS pseudo-classes defined in the  page context."
		}, {
			name: ":link",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:link"
			}],
			description: "Applies to links that have not yet been visited."
		}, {
			name: ":matches()",
			browsers: ["S9"],
			description: "Takes a selector list as its argument. It represents an element that is represented by its argument."
		}, {
			name: ":-moz-any()",
			browsers: ["FF4"],
			description: "Represents an element that is represented by the selector list passed as its argument. Standardized as :matches()."
		}, {
			name: ":-moz-any-link",
			browsers: ["FF1"],
			description: "Represents an element that acts as the source anchor of a hyperlink. Applies to both visited and unvisited links."
		}, {
			name: ":-moz-broken",
			browsers: ["FF3"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:-moz-broken"
			}],
			description: "Non-standard. Matches elements representing broken images."
		}, {
			name: ":-moz-drag-over",
			browsers: ["FF1"],
			description: "Non-standard. Matches elements when a drag-over event applies to it."
		}, {
			name: ":-moz-first-node",
			browsers: ["FF1"],
			description: "Non-standard. Represents an element that is the first child node of some other element."
		}, {
			name: ":-moz-focusring",
			browsers: ["FF4"],
			description: "Non-standard. Matches an element that has focus and focus ring drawing is enabled in the browser."
		}, {
			name: ":-moz-full-screen",
			browsers: ["FF9"],
			description: "Matches any element that has its fullscreen flag set. Standardized as :fullscreen."
		}, {
			name: ":-moz-last-node",
			browsers: ["FF1"],
			description: "Non-standard. Represents an element that is the last child node of some other element."
		}, {
			name: ":-moz-loading",
			browsers: ["FF3"],
			description: "Non-standard. Matches elements, such as images, that haven’t started loading yet."
		}, {
			name: ":-moz-only-whitespace",
			browsers: ["FF1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:-moz-only-whitespace"
			}],
			description: "The same as :empty, except that it additionally matches elements that only contain code points affected by whitespace processing. Standardized as :blank."
		}, {
			name: ":-moz-placeholder",
			browsers: ["FF4"],
			description: "Deprecated. Represents placeholder text in an input field. Use ::-moz-placeholder for Firefox 19+."
		}, {
			name: ":-moz-submit-invalid",
			browsers: ["FF88"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:-moz-submit-invalid"
			}],
			description: "Non-standard. Represents any submit button when the contents of the associated form are not valid."
		}, {
			name: ":-moz-suppressed",
			browsers: ["FF3"],
			description: "Non-standard. Matches elements representing images that have been blocked from loading."
		}, {
			name: ":-moz-ui-invalid",
			browsers: ["FF4"],
			description: "Non-standard. Represents any validated form element whose value isn't valid "
		}, {
			name: ":-moz-ui-valid",
			browsers: ["FF4"],
			description: "Non-standard. Represents any validated form element whose value is valid "
		}, {
			name: ":-moz-user-disabled",
			browsers: ["FF3"],
			description: "Non-standard. Matches elements representing images that have been disabled due to the user’s preferences."
		}, {
			name: ":-moz-window-inactive",
			browsers: ["FF4"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:-moz-window-inactive"
			}],
			description: "Non-standard. Matches elements in an inactive window."
		}, {
			name: ":-ms-fullscreen",
			browsers: ["IE11"],
			description: "Matches any element that has its fullscreen flag set."
		}, {
			name: ":-ms-input-placeholder",
			browsers: ["IE10"],
			description: "Represents placeholder text in an input field. Note: for Edge use the pseudo-element ::-ms-input-placeholder. Standardized as ::placeholder."
		}, {
			name: ":-ms-keyboard-active",
			browsers: ["IE10"],
			description: "Windows Store apps only. Applies one or more styles to an element when it has focus and the user presses the space bar."
		}, {
			name: ":-ms-lang()",
			browsers: ["E", "IE10"],
			description: "Represents an element that is in the language specified. Accepts a comma separated list of language tokens."
		}, {
			name: ":no-button",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to track pieces. Applies when there is no button at that end of the track."
		}, {
			name: ":not()",
			browsers: ["E", "C", "FF1", "IE9", "O9.5", "S2"],
			description: "The negation pseudo-class, :not(X), is a functional notation taking a simple selector (excluding the negation pseudo-class itself) as an argument. It represents an element that is not represented by its argument."
		}, {
			name: ":nth-child()",
			browsers: ["E", "C", "FF3.5", "IE9", "O9.5", "S3.1"],
			description: "Represents an element that has an+b-1 siblings before it in the document tree, for any positive integer or zero value of n, and has a parent element."
		}, {
			name: ":nth-last-child()",
			browsers: ["E", "C", "FF3.5", "IE9", "O9.5", "S3.1"],
			description: "Represents an element that has an+b-1 siblings after it in the document tree, for any positive integer or zero value of n, and has a parent element."
		}, {
			name: ":nth-last-of-type()",
			browsers: ["E", "C", "FF3.5", "IE9", "O9.5", "S3.1"],
			description: "Represents an element that has an+b-1 siblings with the same expanded element name after it in the document tree, for any zero or positive integer value of n, and has a parent element."
		}, {
			name: ":nth-of-type()",
			browsers: ["E", "C", "FF3.5", "IE9", "O9.5", "S3.1"],
			description: "Represents an element that has an+b-1 siblings with the same expanded element name before it in the document tree, for any zero or positive integer value of n, and has a parent element."
		}, {
			name: ":only-child",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:only-child"
			}],
			description: "Represents an element that has a parent element and whose parent element has no other element children. Same as :first-child:last-child or :nth-child(1):nth-last-child(1), but with a lower specificity."
		}, {
			name: ":only-of-type",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:only-of-type"
			}],
			description: "Matches every element that is the only child of its type, of its parent. Same as :first-of-type:last-of-type or :nth-of-type(1):nth-last-of-type(1), but with a lower specificity."
		}, {
			name: ":optional",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:optional"
			}],
			description: "A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional."
		}, {
			name: ":out-of-range",
			browsers: ["E13", "FF29", "S5.1", "C10", "O11"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:out-of-range"
			}],
			description: "Used in conjunction with the min and max attributes, whether on a range input, a number field, or any other types that accept those attributes."
		}, {
			name: ":past",
			browsers: ["S6.1"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:past"
			}],
			description: "Represents any element that is defined to occur entirely prior to a :current element."
		}, {
			name: ":read-only",
			browsers: ["E13", "FF78", "S4", "C1", "O9"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:read-only"
			}],
			description: "An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only."
		}, {
			name: ":read-write",
			browsers: ["E13", "FF78", "S4", "C1", "O9"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:read-write"
			}],
			description: "An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only."
		}, {
			name: ":required",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:required"
			}],
			description: "A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional."
		}, {
			name: ":right",
			browsers: ["E12", "S5.1", "C6", "IE8", "O9.2"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:right"
			}],
			description: "When printing double-sided documents, the page boxes on left and right pages may be different. This can be expressed through CSS pseudo-classes defined in the  page context."
		}, {
			name: ":root",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:root"
			}],
			description: "Represents an element that is the root of the document. In HTML 4, this is always the HTML element."
		}, {
			name: ":scope",
			browsers: ["E79", "FF32", "S7", "C27", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:scope"
			}],
			description: "Represents any element that is in the contextual reference element set."
		}, {
			name: ":single-button",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to buttons and track pieces. Applies when both buttons are displayed separately at either end of the scrollbar."
		}, {
			name: ":start",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to buttons and track pieces. Indicates whether the object is placed before the thumb."
		}, {
			name: ":target",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:target"
			}],
			description: "Some URIs refer to a location within a resource. This kind of URI ends with a 'number sign' (#) followed by an anchor identifier (called the fragment identifier)."
		}, {
			name: ":valid",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:valid"
			}],
			description: "An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification."
		}, {
			name: ":vertical",
			browsers: ["C", "S5"],
			description: "Non-standard. Applies to any scrollbar pieces that have a vertical orientation."
		}, {
			name: ":visited",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:visited"
			}],
			description: "Applies once the link has been visited by the user."
		}, {
			name: ":-webkit-any()",
			browsers: ["C", "S5"],
			description: "Represents an element that is represented by the selector list passed as its argument. Standardized as :matches()."
		}, {
			name: ":-webkit-full-screen",
			browsers: ["C", "S6"],
			description: "Matches any element that has its fullscreen flag set. Standardized as :fullscreen."
		}, {
			name: ":window-inactive",
			browsers: ["C", "S3"],
			description: "Non-standard. Applies to all scrollbar pieces. Indicates whether or not the window containing the scrollbar is currently active."
		}, {
			name: ":current",
			status: "experimental",
			description: "The :current CSS pseudo-class selector is a time-dimensional pseudo-class that represents the element, or an ancestor of the element, that is currently being displayed"
		}, {
			name: ":blank",
			status: "experimental",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:blank"
			}],
			description: "The :blank CSS pseudo-class selects empty user input elements (eg. <input> or <textarea>)."
		}, {
			name: ":defined",
			status: "experimental",
			browsers: ["E79", "FF63", "S10", "C54", "O41"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:defined"
			}],
			description: "The :defined CSS pseudo-class represents any element that has been defined. This includes any standard element built in to the browser, and custom elements that have been successfully defined (i.e. with the CustomElementRegistry.define() method)."
		}, {
			name: ":dir",
			browsers: ["FF49"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:dir"
			}],
			description: "The :dir() CSS pseudo-class matches elements based on the directionality of the text contained in them."
		}, {
			name: ":focus-visible",
			browsers: ["E86", "FF85", "C86", "O72"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:focus-visible"
			}],
			description: "The :focus-visible pseudo-class applies while an element matches the :focus pseudo-class and the UA determines via heuristics that the focus should be made evident on the element."
		}, {
			name: ":focus-within",
			browsers: ["E79", "FF52", "S10.1", "C60", "O47"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:focus-within"
			}],
			description: "The :focus-within pseudo-class applies to any element for which the :focus pseudo class applies as well as to an element whose descendant in the flat tree (including non-element nodes, such as text nodes) matches the conditions for matching :focus."
		}, {
			name: ":has",
			status: "experimental",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:has"
			}],
			description: ":The :has() CSS pseudo-class represents an element if any of the selectors passed as parameters (relative to the :scope of the given element), match at least one element."
		}, {
			name: ":is",
			status: "experimental",
			browsers: ["E79", "FF78", "S14", "C88", "O55"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:is"
			}],
			description: "The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form."
		}, {
			name: ":local-link",
			status: "experimental",
			description: "The :local-link CSS pseudo-class represents an link to the same document"
		}, {
			name: ":nth-col",
			status: "experimental",
			description: "The :nth-col() CSS pseudo-class is designed for tables and grids. It accepts the An+B notation such as used with the :nth-child selector, using this to target every nth column. "
		}, {
			name: ":nth-last-col",
			status: "experimental",
			description: "The :nth-last-col() CSS pseudo-class is designed for tables and grids. It accepts the An+B notation such as used with the :nth-child selector, using this to target every nth column before it, therefore counting back from the end of the set of columns."
		}, {
			name: ":paused",
			status: "experimental",
			description: "The :paused CSS pseudo-class selector is a resource state pseudo-class that will match an audio, video, or similar resource that is capable of being “played” or “paused”, when that element is “paused”."
		}, {
			name: ":placeholder-shown",
			status: "experimental",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:placeholder-shown"
			}],
			description: "The :placeholder-shown CSS pseudo-class represents any <input> or <textarea> element that is currently displaying placeholder text."
		}, {
			name: ":playing",
			status: "experimental",
			description: "The :playing CSS pseudo-class selector is a resource state pseudo-class that will match an audio, video, or similar resource that is capable of being “played” or “paused”, when that element is “playing”. "
		}, {
			name: ":target-within",
			status: "experimental",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:target-within"
			}],
			description: "The :target-within CSS pseudo-class represents an element that is a target element or contains an element that is a target. A target element is a unique element with an id matching the URL's fragment."
		}, {
			name: ":user-invalid",
			status: "experimental",
			browsers: ["FF88"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:user-invalid"
			}],
			description: "The :user-invalid CSS pseudo-class represents any validated form element whose value isn't valid based on their validation constraints, after the user has interacted with it."
		}, {
			name: ":user-valid",
			status: "experimental",
			browsers: ["FF88"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:user-valid"
			}],
			description: "The :user-valid CSS pseudo-class represents any validated form element whose value validates correctly based on its validation constraints. However, unlike :valid it only matches once the user has interacted with it."
		}, {
			name: ":where",
			status: "experimental",
			browsers: ["E88", "FF78", "S14", "C88", "O74"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/:where"
			}],
			description: "The :where() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list."
		}, {
			name: ":picture-in-picture",
			status: "experimental",
			description: "The :picture-in-picture CSS pseudo-class matches the element which is currently in picture-in-picture mode."
		}],
		pseudoElements: [{
			name: "::after",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::after"
			}],
			description: "Represents a styleable child pseudo-element immediately after the originating element’s actual content."
		}, {
			name: "::backdrop",
			browsers: ["E12", "FF47", "C37", "IE11", "O24"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::backdrop"
			}],
			description: "Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen)."
		}, {
			name: "::before",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::before"
			}],
			description: "Represents a styleable child pseudo-element immediately before the originating element’s actual content."
		}, {
			name: "::content",
			browsers: ["C35", "O22"],
			description: "Deprecated. Matches the distribution list itself, on elements that have one. Use ::slotted for forward compatibility."
		}, {
			name: "::cue",
			browsers: ["E79", "FF55", "S6.1", "C26", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::cue"
			}]
		}, {
			name: "::cue()",
			browsers: ["C", "O16", "S6"]
		}, {
			name: "::cue-region",
			browsers: ["C", "O16", "S6"]
		}, {
			name: "::cue-region()",
			browsers: ["C", "O16", "S6"]
		}, {
			name: "::first-letter",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::first-letter"
			}],
			description: "Represents the first letter of an element, if it is not preceded by any other content (such as images or inline tables) on its line."
		}, {
			name: "::first-line",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::first-line"
			}],
			description: "Describes the contents of the first formatted line of its originating element."
		}, {
			name: "::-moz-focus-inner",
			browsers: ["FF4"]
		}, {
			name: "::-moz-focus-outer",
			browsers: ["FF4"]
		}, {
			name: "::-moz-list-bullet",
			browsers: ["FF1"],
			description: "Used to style the bullet of a list element. Similar to the standardized ::marker."
		}, {
			name: "::-moz-list-number",
			browsers: ["FF1"],
			description: "Used to style the numbers of a list element. Similar to the standardized ::marker."
		}, {
			name: "::-moz-placeholder",
			browsers: ["FF19"],
			description: "Represents placeholder text in an input field"
		}, {
			name: "::-moz-progress-bar",
			browsers: ["FF9"],
			description: "Represents the bar portion of a progress bar."
		}, {
			name: "::-moz-selection",
			browsers: ["FF1"],
			description: "Represents the portion of a document that has been highlighted by the user."
		}, {
			name: "::-ms-backdrop",
			browsers: ["IE11"],
			description: "Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen)."
		}, {
			name: "::-ms-browse",
			browsers: ["E", "IE10"],
			description: "Represents the browse button of an input type=file control."
		}, {
			name: "::-ms-check",
			browsers: ["E", "IE10"],
			description: "Represents the check of a checkbox or radio button input control."
		}, {
			name: "::-ms-clear",
			browsers: ["E", "IE10"],
			description: "Represents the clear button of a text input control"
		}, {
			name: "::-ms-expand",
			browsers: ["E", "IE10"],
			description: "Represents the drop-down button of a select control."
		}, {
			name: "::-ms-fill",
			browsers: ["E", "IE10"],
			description: "Represents the bar portion of a progress bar."
		}, {
			name: "::-ms-fill-lower",
			browsers: ["E", "IE10"],
			description: "Represents the portion of the slider track from its smallest value up to the value currently selected by the thumb. In a left-to-right layout, this is the portion of the slider track to the left of the thumb."
		}, {
			name: "::-ms-fill-upper",
			browsers: ["E", "IE10"],
			description: "Represents the portion of the slider track from the value currently selected by the thumb up to the slider's largest value. In a left-to-right layout, this is the portion of the slider track to the right of the thumb."
		}, {
			name: "::-ms-reveal",
			browsers: ["E", "IE10"],
			description: "Represents the password reveal button of an input type=password control."
		}, {
			name: "::-ms-thumb",
			browsers: ["E", "IE10"],
			description: "Represents the portion of range input control (also known as a slider control) that the user drags."
		}, {
			name: "::-ms-ticks-after",
			browsers: ["E", "IE10"],
			description: "Represents the tick marks of a slider that begin just after the thumb and continue up to the slider's largest value. In a left-to-right layout, these are the ticks to the right of the thumb."
		}, {
			name: "::-ms-ticks-before",
			browsers: ["E", "IE10"],
			description: "Represents the tick marks of a slider that represent its smallest values up to the value currently selected by the thumb. In a left-to-right layout, these are the ticks to the left of the thumb."
		}, {
			name: "::-ms-tooltip",
			browsers: ["E", "IE10"],
			description: "Represents the tooltip of a slider (input type=range)."
		}, {
			name: "::-ms-track",
			browsers: ["E", "IE10"],
			description: "Represents the track of a slider."
		}, {
			name: "::-ms-value",
			browsers: ["E", "IE10"],
			description: "Represents the content of a text or password input control, or a select control."
		}, {
			name: "::selection",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::selection"
			}],
			description: "Represents the portion of a document that has been highlighted by the user."
		}, {
			name: "::shadow",
			browsers: ["C35", "O22"],
			description: "Matches the shadow root if an element has a shadow tree."
		}, {
			name: "::-webkit-file-upload-button",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-inner-spin-button",
			browsers: ["E79", "S5", "C6", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-inner-spin-button"
			}]
		}, {
			name: "::-webkit-input-placeholder",
			browsers: ["C", "S4"]
		}, {
			name: "::-webkit-keygen-select",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-meter-bar",
			browsers: ["E79", "S5.1", "C12", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-bar"
			}]
		}, {
			name: "::-webkit-meter-even-less-good-value",
			browsers: ["E79", "S5.1", "C12", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-even-less-good-value"
			}]
		}, {
			name: "::-webkit-meter-optimum-value",
			browsers: ["E79", "S5.1", "C12", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-optimum-value"
			}]
		}, {
			name: "::-webkit-meter-suboptimum-value",
			browsers: ["E79", "S5.1", "C12", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-suboptimum-value"
			}]
		}, {
			name: "::-webkit-outer-spin-button",
			browsers: ["S5", "C6"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-outer-spin-button"
			}]
		}, {
			name: "::-webkit-progress-bar",
			browsers: ["E79", "S6.1", "C25", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-bar"
			}]
		}, {
			name: "::-webkit-progress-inner-element",
			browsers: ["E79", "S6.1", "C23", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-inner-element"
			}]
		}, {
			name: "::-webkit-progress-value",
			browsers: ["E79", "S6.1", "C25", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-value"
			}]
		}, {
			name: "::-webkit-resizer",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-scrollbar",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-scrollbar-button",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-scrollbar-corner",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-scrollbar-thumb",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-scrollbar-track",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-scrollbar-track-piece",
			browsers: ["E79", "S4", "C2", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar"
			}]
		}, {
			name: "::-webkit-search-cancel-button",
			browsers: ["E79", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-search-cancel-button"
			}]
		}, {
			name: "::-webkit-search-decoration",
			browsers: ["C", "S4"]
		}, {
			name: "::-webkit-search-results-button",
			browsers: ["E79", "S3", "C1", "O15"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-webkit-search-results-button"
			}]
		}, {
			name: "::-webkit-search-results-decoration",
			browsers: ["C", "S4"]
		}, {
			name: "::-webkit-slider-runnable-track",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-slider-thumb",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-textfield-decoration-container",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-validation-bubble",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-validation-bubble-arrow",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-validation-bubble-arrow-clipper",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-validation-bubble-heading",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-validation-bubble-message",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::-webkit-validation-bubble-text-block",
			browsers: ["C", "O", "S6"]
		}, {
			name: "::target-text",
			status: "experimental",
			browsers: ["E89", "C89", "O75"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::target-text"
			}],
			description: "The ::target-text CSS pseudo-element represents the text that has been scrolled to if the browser supports scroll-to-text fragments. It allows authors to choose how to highlight that section of text."
		}, {
			name: "::-moz-range-progress",
			status: "nonstandard",
			browsers: ["FF22"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-moz-range-progress"
			}],
			description: 'The ::-moz-range-progress CSS pseudo-element is a Mozilla extension that represents the lower portion of the track (i.e., groove) in which the indicator slides in an <input> of type="range". This portion corresponds to values lower than the value currently selected by the thumb (i.e., virtual knob).'
		}, {
			name: "::-moz-range-thumb",
			status: "nonstandard",
			browsers: ["FF21"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-moz-range-thumb"
			}],
			description: 'The ::-moz-range-thumb CSS pseudo-element is a Mozilla extension that represents the thumb (i.e., virtual knob) of an <input> of type="range". The user can move the thumb along the input\'s track to alter its numerical value.'
		}, {
			name: "::-moz-range-track",
			status: "nonstandard",
			browsers: ["FF21"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::-moz-range-track"
			}],
			description: 'The ::-moz-range-track CSS pseudo-element is a Mozilla extension that represents the track (i.e., groove) in which the indicator slides in an <input> of type="range".'
		}, {
			name: "::-webkit-progress-inner-value",
			status: "nonstandard",
			description: "The ::-webkit-progress-value CSS pseudo-element represents the filled-in portion of the bar of a <progress> element. It is a child of the ::-webkit-progress-bar pseudo-element.\n\nIn order to let ::-webkit-progress-value take effect, -webkit-appearance needs to be set to none on the <progress> element."
		}, {
			name: "::grammar-error",
			status: "experimental",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::grammar-error"
			}],
			description: "The ::grammar-error CSS pseudo-element represents a text segment which the user agent has flagged as grammatically incorrect."
		}, {
			name: "::marker",
			browsers: ["E86", "FF68", "S11.1", "C86", "O72"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::marker"
			}],
			description: "The ::marker CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to display: list-item, such as the <li> and <summary> elements."
		}, {
			name: "::part",
			status: "experimental",
			browsers: ["E79", "FF72", "S13.1", "C73", "O60"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::part"
			}],
			description: "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute."
		}, {
			name: "::placeholder",
			browsers: ["E12", "FF51", "S10.1", "C57", "O44"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::placeholder"
			}],
			description: "The ::placeholder CSS pseudo-element represents the placeholder text of a form element."
		}, {
			name: "::slotted",
			browsers: ["E79", "FF63", "S10", "C50", "O37"],
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::slotted"
			}],
			description: "The :slotted() CSS pseudo-element represents any element that has been placed into a slot inside an HTML template."
		}, {
			name: "::spelling-error",
			status: "experimental",
			references: [{
				name: "MDN Reference",
				url: "https://developer.mozilla.org/docs/Web/CSS/::spelling-error"
			}],
			description: "The ::spelling-error CSS pseudo-element represents a text segment which the user agent has flagged as incorrectly spelled."
		}]
	}
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/languageFacts/dataProvider", [
		"require", "exports"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSDataProvider = void 0;
	var n = function() {
		function e(e) {
			this._properties = [], this._atDirectives = [], this._pseudoClasses = [], this._pseudoElements = [], this.addData(
				e)
		}
		return e.prototype.provideProperties = function() {
			return this._properties
		}, e.prototype.provideAtDirectives = function() {
			return this._atDirectives
		}, e.prototype.providePseudoClasses = function() {
			return this._pseudoClasses
		}, e.prototype.providePseudoElements = function() {
			return this._pseudoElements
		}, e.prototype.addData = function(e) {
			if (Array.isArray(e.properties))
				for (var t = 0, n = e.properties; t < n.length; t++) {
					var s = n[t];
					"string" == typeof s.name && this._properties.push(s)
				}
			if (Array.isArray(e.atDirectives))
				for (var a = 0, l = e.atDirectives; a < l.length; a++) {
					r(s = l[a]) && this._atDirectives.push(s)
				}
			if (Array.isArray(e.pseudoClasses))
				for (var c = 0, d = e.pseudoClasses; c < d.length; c++) {
					i(s = d[c]) && this._pseudoClasses.push(s)
				}
			if (Array.isArray(e.pseudoElements))
				for (var p = 0, h = e.pseudoElements; p < h.length; p++) {
					o(s = h[p]) && this._pseudoElements.push(s)
				}
		}, e
	}();

	function r(e) {
		return "string" == typeof e.name
	}

	function i(e) {
		return "string" == typeof e.name
	}

	function o(e) {
		return "string" == typeof e.name
	}
	t.CSSDataProvider = n
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/languageFacts/dataManager", [
		"require", "exports", "../utils/objects", "../data/webCustomData", "./dataProvider"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.CSSDataManager = void 0;
	var n = e("../utils/objects"),
		r = e("../data/webCustomData"),
		i = e("./dataProvider"),
		o = function() {
			function e(e) {
				this.dataProviders = [], this._propertySet = {}, this._atDirectiveSet = {}, this._pseudoClassSet = {}, this._pseudoElementSet = {},
					this._properties = [], this._atDirectives = [], this._pseudoClasses = [], this._pseudoElements = [], this.setDataProviders(
						!1 !== (null == e ? void 0 : e.useDefaultDataProvider), (null == e ? void 0 : e.customDataProviders) || [])
			}
			return e.prototype.setDataProviders = function(e, t) {
				var n;
				this.dataProviders = [], e && this.dataProviders.push(new i.CSSDataProvider(r.cssData)), (n = this.dataProviders)
					.push.apply(n, t), this.collectData()
			}, e.prototype.collectData = function() {
				var e = this;
				this._propertySet = {}, this._atDirectiveSet = {}, this._pseudoClassSet = {}, this._pseudoElementSet = {}, this.dataProviders
					.forEach((function(t) {
						t.provideProperties().forEach((function(t) {
							e._propertySet[t.name] || (e._propertySet[t.name] = t)
						})), t.provideAtDirectives().forEach((function(t) {
							e._atDirectiveSet[t.name] || (e._atDirectiveSet[t.name] = t)
						})), t.providePseudoClasses().forEach((function(t) {
							e._pseudoClassSet[t.name] || (e._pseudoClassSet[t.name] = t)
						})), t.providePseudoElements().forEach((function(t) {
							e._pseudoElementSet[t.name] || (e._pseudoElementSet[t.name] = t)
						}))
					})), this._properties = n.values(this._propertySet), this._atDirectives = n.values(this._atDirectiveSet), this._pseudoClasses =
					n.values(this._pseudoClassSet), this._pseudoElements = n.values(this._pseudoElementSet)
			}, e.prototype.getProperty = function(e) {
				return this._propertySet[e]
			}, e.prototype.getAtDirective = function(e) {
				return this._atDirectiveSet[e]
			}, e.prototype.getPseudoClass = function(e) {
				return this._pseudoClassSet[e]
			}, e.prototype.getPseudoElement = function(e) {
				return this._pseudoElementSet[e]
			}, e.prototype.getProperties = function() {
				return this._properties
			}, e.prototype.getAtDirectives = function() {
				return this._atDirectives
			}, e.prototype.getPseudoClasses = function() {
				return this._pseudoClasses
			}, e.prototype.getPseudoElements = function() {
				return this._pseudoElements
			}, e.prototype.isKnownProperty = function(e) {
				return e.toLowerCase() in this._propertySet
			}, e.prototype.isStandardProperty = function(e) {
				return this.isKnownProperty(e) && (!this._propertySet[e.toLowerCase()].status || "standard" === this._propertySet[
					e.toLowerCase()].status)
			}, e
		}();
	t.CSSDataManager = o
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/cssSelectionRange", [
		"require", "exports", "../cssLanguageTypes", "../parser/cssNodes"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.getSelectionRanges = void 0;
	var n = e("../cssLanguageTypes"),
		r = e("../parser/cssNodes");
	t.getSelectionRanges = function(e, t, i) {
		return t.map((function(t) {
			for (var o = function(t) {
					var n = e.offsetAt(t),
						o = i.findChildAtOffset(n, !0);
					if (!o) return [];
					var s = [];
					for (; o;) o.parent && o.offset === o.parent.offset && o.end === o.parent.end || (o.type === r.NodeType.Declarations &&
						n > o.offset && n < o.end && s.push([o.offset + 1, o.end - 1]), s.push([o.offset, o.end])), o = o.parent;
					return s
				}(t), s = void 0, a = o.length - 1; a >= 0; a--) s = n.SelectionRange.create(n.Range.create(e.positionAt(o[a]
				[0]), e.positionAt(o[a][1])), s);
			return s || (s = n.SelectionRange.create(n.Range.create(t, t))), s
		}))
	}
}));
__extends = this && this.__extends || function() {
	var e = function(t, n) {
		return (e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			})(t, n)
	};
	return function(t, n) {
		if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) +
			" is not a constructor or null");

		function r() {
			this.constructor = t
		}
		e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
	}
}(), __awaiter = this && this.__awaiter || function(e, t, n, r) {
	return new(n || (n = Promise))((function(i, o) {
		function s(e) {
			try {
				l(r.next(e))
			} catch (e) {
				o(e)
			}
		}

		function a(e) {
			try {
				l(r.throw(e))
			} catch (e) {
				o(e)
			}
		}

		function l(e) {
			var t;
			e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
				e(t)
			}))).then(s, a)
		}
		l((r = r.apply(e, t || [])).next())
	}))
}, __generator = this && this.__generator || function(e, t) {
	var n, r, i, o, s = {
		label: 0,
		sent: function() {
			if (1 & i[0]) throw i[1];
			return i[1]
		},
		trys: [],
		ops: []
	};
	return o = {
		next: a(0),
		throw: a(1),
		return: a(2)
	}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
		return this
	}), o;

	function a(o) {
		return function(a) {
			return function(o) {
				if (n) throw new TypeError("Generator is already executing.");
				for (; s;) try {
					if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i =
							i.call(r, o[1])).done) return i;
					switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
						case 0:
						case 1:
							i = o;
							break;
						case 4:
							return s.label++, {
								value: o[1],
								done: !1
							};
						case 5:
							s.label++, r = o[1], o = [0];
							continue;
						case 7:
							o = s.ops.pop(), s.trys.pop();
							continue;
						default:
							if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
								s = 0;
								continue
							}
							if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
								s.label = o[1];
								break
							}
							if (6 === o[0] && s.label < i[1]) {
								s.label = i[1], i = o;
								break
							}
							if (i && s.label < i[2]) {
								s.label = i[2], s.ops.push(o);
								break
							}
							i[2] && s.ops.pop(), s.trys.pop();
							continue
					}
					o = t.call(e, s)
				} catch (e) {
					o = [6, e], r = 0
				} finally {
					n = i = 0
				}
				if (5 & o[0]) throw o[1];
				return {
					value: o[0] ? o[1] : void 0,
					done: !0
				}
			}([o, a])
		}
	}
};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/services/scssNavigation", [
		"require", "exports", "./cssNavigation", "../parser/cssNodes", "vscode-uri", "../utils/strings"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.SCSSNavigation = void 0;
	var n = e("./cssNavigation"),
		r = e("../parser/cssNodes"),
		i = e("vscode-uri"),
		o = e("../utils/strings"),
		s = function(e) {
			function t(t) {
				return e.call(this, t) || this
			}
			return __extends(t, e), t.prototype.isRawStringDocumentLinkNode = function(t) {
				return e.prototype.isRawStringDocumentLinkNode.call(this, t) || t.type === r.NodeType.Use || t.type === r.NodeType
					.Forward
			}, t.prototype.resolveRelativeReference = function(t, n, r, s) {
				return __awaiter(this, void 0, void 0, (function() {
					var a, l, c, d;
					return __generator(this, (function(p) {
						switch (p.label) {
							case 0:
								return o.startsWith(t, "sass:") ? [2, void 0] : [4, e.prototype.resolveRelativeReference.call(this, t,
									n, r, s)];
							case 1:
								if (a = p.sent(), !(this.fileSystemProvider && a && s)) return [3, 8];
								l = i.URI.parse(a), p.label = 2;
							case 2:
								if (p.trys.push([2, 7, , 8]), !(c = function(e) {
										if ("" !== e.path && !e.path.endsWith(".scss") && !e.path.endsWith(".css")) {
											if (e.path.endsWith("/")) return [e.with({
												path: e.path + "index.scss"
											}).toString(), e.with({
												path: e.path + "_index.scss"
											}).toString()];
											var t = e.path.split("/"),
												n = t[t.length - 1],
												r = e.path.slice(0, -n.length);
											if (n.startsWith("_")) return e.path.endsWith(".scss") ? void 0 : [e.with({
												path: e.path + ".scss"
											}).toString()];
											var i = n + ".scss",
												o = function(t) {
													return e.with({
														path: r + t
													}).toString()
												};
											return [o(i), o("_" + i), o(i.slice(0, -5) + "/index.scss"), o(i.slice(0, -5) + "/_index.scss"), o(
												i.slice(0, -5) + ".css")]
										}
									}(l))) return [3, 6];
								d = 0, p.label = 3;
							case 3:
								return d < c.length ? [4, this.fileExists(c[d])] : [3, 6];
							case 4:
								if (p.sent()) return [2, c[d]];
								p.label = 5;
							case 5:
								return d++, [3, 3];
							case 6:
								return [3, 8];
							case 7:
								return p.sent(), [3, 8];
							case 8:
								return [2, a]
						}
					}))
				}))
			}, t
		}(n.CSSNavigation);
	t.SCSSNavigation = s
}));
__createBinding = this && this.__createBinding || (Object.create ? function(e, t, n, r) {
	void 0 === r && (r = n), Object.defineProperty(e, r, {
		enumerable: !0,
		get: function() {
			return t[n]
		}
	})
} : function(e, t, n, r) {
	void 0 === r && (r = n), e[r] = t[n]
}), __exportStar = this && this.__exportStar || function(e, t) {
	for (var n in e) "default" === n || Object.prototype.hasOwnProperty.call(t, n) || __createBinding(t, e, n)
};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-css-languageservice/cssLanguageService", ["require",
		"exports", "./parser/cssParser", "./services/cssCompletion", "./services/cssHover", "./services/cssNavigation",
		"./services/cssCodeActions", "./services/cssValidation", "./parser/scssParser", "./services/scssCompletion",
		"./parser/lessParser", "./services/lessCompletion", "./services/cssFolding", "./languageFacts/dataManager",
		"./languageFacts/dataProvider", "./services/cssSelectionRange", "./services/scssNavigation", "./data/webCustomData",
		"./cssLanguageTypes"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getLESSLanguageService = t.getSCSSLanguageService = t.getCSSLanguageService = t.newCSSDataProvider = t.getDefaultCSSDataProvider =
		void 0;
	var n = e("./parser/cssParser"),
		r = e("./services/cssCompletion"),
		i = e("./services/cssHover"),
		o = e("./services/cssNavigation"),
		s = e("./services/cssCodeActions"),
		a = e("./services/cssValidation"),
		l = e("./parser/scssParser"),
		c = e("./services/scssCompletion"),
		d = e("./parser/lessParser"),
		p = e("./services/lessCompletion"),
		h = e("./services/cssFolding"),
		u = e("./languageFacts/dataManager"),
		m = e("./languageFacts/dataProvider"),
		f = e("./services/cssSelectionRange"),
		g = e("./services/scssNavigation"),
		b = e("./data/webCustomData");

	function y(e) {
		return new m.CSSDataProvider(e)
	}

	function v(e, t, n, r, i, o, s) {
		return {
			configure: function(e) {
				o.configure(e), t.configure(null == e ? void 0 : e.completion), n.configure(null == e ? void 0 : e.hover)
			},
			setDataProviders: s.setDataProviders.bind(s),
			doValidation: o.doValidation.bind(o),
			parseStylesheet: e.parseStylesheet.bind(e),
			doComplete: t.doComplete.bind(t),
			doComplete2: t.doComplete2.bind(t),
			setCompletionParticipants: t.setCompletionParticipants.bind(t),
			doHover: n.doHover.bind(n),
			findDefinition: r.findDefinition.bind(r),
			findReferences: r.findReferences.bind(r),
			findDocumentHighlights: r.findDocumentHighlights.bind(r),
			findDocumentLinks: r.findDocumentLinks.bind(r),
			findDocumentLinks2: r.findDocumentLinks2.bind(r),
			findDocumentSymbols: r.findDocumentSymbols.bind(r),
			doCodeActions: i.doCodeActions.bind(i),
			doCodeActions2: i.doCodeActions2.bind(i),
			findDocumentColors: r.findDocumentColors.bind(r),
			getColorPresentations: r.getColorPresentations.bind(r),
			doRename: r.doRename.bind(r),
			getFoldingRanges: h.getFoldingRanges,
			getSelectionRanges: f.getSelectionRanges
		}
	}
	__exportStar(e("./cssLanguageTypes"), t), t.getDefaultCSSDataProvider = function() {
		return y(b.cssData)
	}, t.newCSSDataProvider = y;
	var w = {};
	t.getCSSLanguageService = function(e) {
		void 0 === e && (e = w);
		var t = new u.CSSDataManager(e);
		return v(new n.Parser, new r.CSSCompletion(null, e, t), new i.CSSHover(e && e.clientCapabilities, t), new o.CSSNavigation(
			e && e.fileSystemProvider), new s.CSSCodeActions(t), new a.CSSValidation(t), t)
	}, t.getSCSSLanguageService = function(e) {
		void 0 === e && (e = w);
		var t = new u.CSSDataManager(e);
		return v(new l.SCSSParser, new c.SCSSCompletion(e, t), new i.CSSHover(e && e.clientCapabilities, t), new g.SCSSNavigation(
			e && e.fileSystemProvider), new s.CSSCodeActions(t), new a.CSSValidation(t), t)
	}, t.getLESSLanguageService = function(e) {
		void 0 === e && (e = w);
		var t = new u.CSSDataManager(e);
		return v(new d.LESSParser, new p.LESSCompletion(e, t), new i.CSSHover(e && e.clientCapabilities, t), new o.CSSNavigation(
			e && e.fileSystemProvider), new s.CSSCodeActions(t), new a.CSSValidation(t), t)
	}
})), define("vscode-css-languageservice", ["vscode-css-languageservice/cssLanguageService"], (function(e) {
	return e
})), define("vs/language/css/languageFeatures", ["require", "exports", "vscode-css-languageservice",
	"./fillers/monaco-editor-core"
], (function(e, t, n, r) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SelectionRangeAdapter = t.FoldingRangeAdapter = t.DocumentColorAdapter = t.DocumentSymbolAdapter = t.RenameAdapter =
		t.ReferenceAdapter = t.DefinitionAdapter = t.DocumentHighlightAdapter = t.HoverAdapter = t.CompletionAdapter = t.DiagnosticsAdapter =
		void 0;
	var i = function() {
		function e(e, t, n) {
			var i = this;
			this._languageId = e, this._worker = t, this._disposables = [], this._listener = Object.create(null);
			var o = function(e) {
					var t, n = e.getModeId();
					n === i._languageId && (i._listener[e.uri.toString()] = e.onDidChangeContent((function() {
						window.clearTimeout(t), t = window.setTimeout((function() {
							return i._doValidate(e.uri, n)
						}), 500)
					})), i._doValidate(e.uri, n))
				},
				s = function(e) {
					r.editor.setModelMarkers(e, i._languageId, []);
					var t = e.uri.toString(),
						n = i._listener[t];
					n && (n.dispose(), delete i._listener[t])
				};
			this._disposables.push(r.editor.onDidCreateModel(o)), this._disposables.push(r.editor.onWillDisposeModel(s)),
				this._disposables.push(r.editor.onDidChangeModelLanguage((function(e) {
					s(e.model), o(e.model)
				}))), n.onDidChange((function(e) {
					r.editor.getModels().forEach((function(e) {
						e.getModeId() === i._languageId && (s(e), o(e))
					}))
				})), this._disposables.push({
					dispose: function() {
						for (var e in i._listener) i._listener[e].dispose()
					}
				}), r.editor.getModels().forEach(o)
		}
		return e.prototype.dispose = function() {
			this._disposables.forEach((function(e) {
				return e && e.dispose()
			})), this._disposables = []
		}, e.prototype._doValidate = function(e, t) {
			this._worker(e).then((function(t) {
				return t.doValidation(e.toString())
			})).then((function(n) {
				var i = n.map((function(e) {
						return n = "number" == typeof(t = e).code ? String(t.code) : t.code, {
							severity: o(t.severity),
							startLineNumber: t.range.start.line + 1,
							startColumn: t.range.start.character + 1,
							endLineNumber: t.range.end.line + 1,
							endColumn: t.range.end.character + 1,
							message: t.message,
							code: n,
							source: t.source
						};
						var t, n
					})),
					s = r.editor.getModel(e);
				s && s.getModeId() === t && r.editor.setModelMarkers(s, t, i)
			})).then(void 0, (function(e) {
				console.error(e)
			}))
		}, e
	}();

	function o(e) {
		switch (e) {
			case n.DiagnosticSeverity.Error:
				return r.MarkerSeverity.Error;
			case n.DiagnosticSeverity.Warning:
				return r.MarkerSeverity.Warning;
			case n.DiagnosticSeverity.Information:
				return r.MarkerSeverity.Info;
			case n.DiagnosticSeverity.Hint:
				return r.MarkerSeverity.Hint;
			default:
				return r.MarkerSeverity.Info
		}
	}

	function s(e) {
		if (e) return {
			character: e.column - 1,
			line: e.lineNumber - 1
		}
	}

	function a(e) {
		if (e) return new r.Range(e.start.line + 1, e.start.character + 1, e.end.line + 1, e.end.character + 1)
	}

	function l(e) {
		var t = r.languages.CompletionItemKind;
		switch (e) {
			case n.CompletionItemKind.Text:
				return t.Text;
			case n.CompletionItemKind.Method:
				return t.Method;
			case n.CompletionItemKind.Function:
				return t.Function;
			case n.CompletionItemKind.Constructor:
				return t.Constructor;
			case n.CompletionItemKind.Field:
				return t.Field;
			case n.CompletionItemKind.Variable:
				return t.Variable;
			case n.CompletionItemKind.Class:
				return t.Class;
			case n.CompletionItemKind.Interface:
				return t.Interface;
			case n.CompletionItemKind.Module:
				return t.Module;
			case n.CompletionItemKind.Property:
				return t.Property;
			case n.CompletionItemKind.Unit:
				return t.Unit;
			case n.CompletionItemKind.Value:
				return t.Value;
			case n.CompletionItemKind.Enum:
				return t.Enum;
			case n.CompletionItemKind.Keyword:
				return t.Keyword;
			case n.CompletionItemKind.Snippet:
				return t.Snippet;
			case n.CompletionItemKind.Color:
				return t.Color;
			case n.CompletionItemKind.File:
				return t.File;
			case n.CompletionItemKind.Reference:
				return t.Reference
		}
		return t.Property
	}

	function c(e) {
		if (e) return {
			range: a(e.range),
			text: e.newText
		}
	}
	t.DiagnosticsAdapter = i;
	var d = function() {
		function e(e) {
			this._worker = e
		}
		return Object.defineProperty(e.prototype, "triggerCharacters", {
			get: function() {
				return [" ", ":"]
			},
			enumerable: !1,
			configurable: !0
		}), e.prototype.provideCompletionItems = function(e, t, i, o) {
			var d = e.uri;
			return this._worker(d).then((function(e) {
				return e.doComplete(d.toString(), s(t))
			})).then((function(i) {
				if (i) {
					var o = e.getWordUntilPosition(t),
						s = new r.Range(t.lineNumber, o.startColumn, t.lineNumber, o.endColumn),
						d = i.items.map((function(e) {
							var t, i, o = {
								label: e.label,
								insertText: e.insertText || e.label,
								sortText: e.sortText,
								filterText: e.filterText,
								documentation: e.documentation,
								detail: e.detail,
								command: (t = e.command, t && "editor.action.triggerSuggest" === t.command ? {
									id: t.command,
									title: t.title,
									arguments: t.arguments
								} : void 0),
								range: s,
								kind: l(e.kind)
							};
							return e.textEdit && (void 0 !== (i = e.textEdit).insert && void 0 !== i.replace ? o.range = {
								insert: a(e.textEdit.insert),
								replace: a(e.textEdit.replace)
							} : o.range = a(e.textEdit.range), o.insertText = e.textEdit.newText), e.additionalTextEdits && (o.additionalTextEdits =
								e.additionalTextEdits.map(c)), e.insertTextFormat === n.InsertTextFormat.Snippet && (o.insertTextRules =
								r.languages.CompletionItemInsertTextRule.InsertAsSnippet), o
						}));
					return {
						isIncomplete: i.isIncomplete,
						suggestions: d
					}
				}
			}))
		}, e
	}();

	function p(e) {
		return "string" == typeof e ? {
			value: e
		} : (t = e) && "object" == typeof t && "string" == typeof t.kind ? "plaintext" === e.kind ? {
			value: e.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
		} : {
			value: e.value
		} : {
			value: "```" + e.language + "\n" + e.value + "\n```\n"
		};
		var t
	}

	function h(e) {
		if (e) return Array.isArray(e) ? e.map(p) : [p(e)]
	}
	t.CompletionAdapter = d;
	var u = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideHover = function(e, t, n) {
			var r = e.uri;
			return this._worker(r).then((function(e) {
				return e.doHover(r.toString(), s(t))
			})).then((function(e) {
				if (e) return {
					range: a(e.range),
					contents: h(e.contents)
				}
			}))
		}, e
	}();

	function m(e) {
		switch (e) {
			case n.DocumentHighlightKind.Read:
				return r.languages.DocumentHighlightKind.Read;
			case n.DocumentHighlightKind.Write:
				return r.languages.DocumentHighlightKind.Write;
			case n.DocumentHighlightKind.Text:
				return r.languages.DocumentHighlightKind.Text
		}
		return r.languages.DocumentHighlightKind.Text
	}
	t.HoverAdapter = u;
	var f = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDocumentHighlights = function(e, t, n) {
			var r = e.uri;
			return this._worker(r).then((function(e) {
				return e.findDocumentHighlights(r.toString(), s(t))
			})).then((function(e) {
				if (e) return e.map((function(e) {
					return {
						range: a(e.range),
						kind: m(e.kind)
					}
				}))
			}))
		}, e
	}();

	function g(e) {
		return {
			uri: r.Uri.parse(e.uri),
			range: a(e.range)
		}
	}
	t.DocumentHighlightAdapter = f;
	var b = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDefinition = function(e, t, n) {
			var r = e.uri;
			return this._worker(r).then((function(e) {
				return e.findDefinition(r.toString(), s(t))
			})).then((function(e) {
				if (e) return [g(e)]
			}))
		}, e
	}();
	t.DefinitionAdapter = b;
	var y = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideReferences = function(e, t, n, r) {
			var i = e.uri;
			return this._worker(i).then((function(e) {
				return e.findReferences(i.toString(), s(t))
			})).then((function(e) {
				if (e) return e.map(g)
			}))
		}, e
	}();
	t.ReferenceAdapter = y;
	var v = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideRenameEdits = function(e, t, n, i) {
			var o = e.uri;
			return this._worker(o).then((function(e) {
				return e.doRename(o.toString(), s(t), n)
			})).then((function(e) {
				return function(e) {
					if (e && e.changes) {
						var t = [];
						for (var n in e.changes)
							for (var i = r.Uri.parse(n), o = 0, s = e.changes[n]; o < s.length; o++) {
								var l = s[o];
								t.push({
									resource: i,
									edit: {
										range: a(l.range),
										text: l.newText
									}
								})
							}
						return {
							edits: t
						}
					}
				}(e)
			}))
		}, e
	}();

	function w(e) {
		var t = r.languages.SymbolKind;
		switch (e) {
			case n.SymbolKind.File:
				return t.Array;
			case n.SymbolKind.Module:
				return t.Module;
			case n.SymbolKind.Namespace:
				return t.Namespace;
			case n.SymbolKind.Package:
				return t.Package;
			case n.SymbolKind.Class:
				return t.Class;
			case n.SymbolKind.Method:
				return t.Method;
			case n.SymbolKind.Property:
				return t.Property;
			case n.SymbolKind.Field:
				return t.Field;
			case n.SymbolKind.Constructor:
				return t.Constructor;
			case n.SymbolKind.Enum:
				return t.Enum;
			case n.SymbolKind.Interface:
				return t.Interface;
			case n.SymbolKind.Function:
				return t.Function;
			case n.SymbolKind.Variable:
				return t.Variable;
			case n.SymbolKind.Constant:
				return t.Constant;
			case n.SymbolKind.String:
				return t.String;
			case n.SymbolKind.Number:
				return t.Number;
			case n.SymbolKind.Boolean:
				return t.Boolean;
			case n.SymbolKind.Array:
				return t.Array
		}
		return t.Function
	}
	t.RenameAdapter = v;
	var x = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDocumentSymbols = function(e, t) {
			var n = e.uri;
			return this._worker(n).then((function(e) {
				return e.findDocumentSymbols(n.toString())
			})).then((function(e) {
				if (e) return e.map((function(e) {
					return {
						name: e.name,
						detail: "",
						containerName: e.containerName,
						kind: w(e.kind),
						tags: [],
						range: a(e.location.range),
						selectionRange: a(e.location.range)
					}
				}))
			}))
		}, e
	}();
	t.DocumentSymbolAdapter = x;
	var S = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDocumentColors = function(e, t) {
			var n = e.uri;
			return this._worker(n).then((function(e) {
				return e.findDocumentColors(n.toString())
			})).then((function(e) {
				if (e) return e.map((function(e) {
					return {
						color: e.color,
						range: a(e.range)
					}
				}))
			}))
		}, e.prototype.provideColorPresentations = function(e, t, n) {
			var r = e.uri;
			return this._worker(r).then((function(e) {
				return e.getColorPresentations(r.toString(), t.color, function(e) {
					if (e) return {
						start: {
							line: e.startLineNumber - 1,
							character: e.startColumn - 1
						},
						end: {
							line: e.endLineNumber - 1,
							character: e.endColumn - 1
						}
					}
				}(t.range))
			})).then((function(e) {
				if (e) return e.map((function(e) {
					var t = {
						label: e.label
					};
					return e.textEdit && (t.textEdit = c(e.textEdit)), e.additionalTextEdits && (t.additionalTextEdits = e
						.additionalTextEdits.map(c)), t
				}))
			}))
		}, e
	}();
	t.DocumentColorAdapter = S;
	var k = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideFoldingRanges = function(e, t, i) {
			var o = e.uri;
			return this._worker(o).then((function(e) {
				return e.getFoldingRanges(o.toString(), t)
			})).then((function(e) {
				if (e) return e.map((function(e) {
					var t = {
						start: e.startLine + 1,
						end: e.endLine + 1
					};
					return void 0 !== e.kind && (t.kind = function(e) {
						switch (e) {
							case n.FoldingRangeKind.Comment:
								return r.languages.FoldingRangeKind.Comment;
							case n.FoldingRangeKind.Imports:
								return r.languages.FoldingRangeKind.Imports;
							case n.FoldingRangeKind.Region:
								return r.languages.FoldingRangeKind.Region
						}
					}(e.kind)), t
				}))
			}))
		}, e
	}();
	t.FoldingRangeAdapter = k;
	var C = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideSelectionRanges = function(e, t, n) {
			var r = e.uri;
			return this._worker(r).then((function(e) {
				return e.getSelectionRanges(r.toString(), t.map(s))
			})).then((function(e) {
				if (e) return e.map((function(e) {
					for (var t = []; e;) t.push({
						range: a(e.range)
					}), e = e.parent;
					return t
				}))
			}))
		}, e
	}();
	t.SelectionRangeAdapter = C
})), define("vs/language/css/cssMode", ["require", "exports", "./workerManager", "./languageFeatures",
	"./fillers/monaco-editor-core"
], (function(e, t, n, r, i) {
	"use strict";

	function o(e) {
		return {
			dispose: function() {
				return s(e)
			}
		}
	}

	function s(e) {
		for (; e.length;) e.pop().dispose()
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.setupMode = void 0, t.setupMode = function(e) {
		var t = [],
			a = [],
			l = new n.WorkerManager(e);
		t.push(l);
		var c, d, p = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return l.getLanguageServiceWorker.apply(l, e)
		};
		return c = e.languageId, d = e.modeConfiguration, s(a), d.completionItems && a.push(i.languages.registerCompletionItemProvider(
				c, new r.CompletionAdapter(p))), d.hovers && a.push(i.languages.registerHoverProvider(c, new r.HoverAdapter(p))),
			d.documentHighlights && a.push(i.languages.registerDocumentHighlightProvider(c, new r.DocumentHighlightAdapter(p))),
			d.definitions && a.push(i.languages.registerDefinitionProvider(c, new r.DefinitionAdapter(p))), d.references &&
			a.push(i.languages.registerReferenceProvider(c, new r.ReferenceAdapter(p))), d.documentSymbols && a.push(i.languages
				.registerDocumentSymbolProvider(c, new r.DocumentSymbolAdapter(p))), d.rename && a.push(i.languages.registerRenameProvider(
				c, new r.RenameAdapter(p))), d.colors && a.push(i.languages.registerColorProvider(c, new r.DocumentColorAdapter(
				p))), d.foldingRanges && a.push(i.languages.registerFoldingRangeProvider(c, new r.FoldingRangeAdapter(p))), d.diagnostics &&
			a.push(new r.DiagnosticsAdapter(c, p, e)), d.selectionRanges && a.push(i.languages.registerSelectionRangeProvider(
				c, new r.SelectionRangeAdapter(p))), t.push(o(a)), o(t)
	}
}));
