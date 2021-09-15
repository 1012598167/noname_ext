/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-html version: 3.7.0(0b1dc817dccc3fc52be56c8e0b8f6c302754f6d3)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-html/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/language/html/workerManager", ["require", "exports", "./fillers/monaco-editor-core"], (function(e, t, n) {
		"use strict";
		t = t || module.exports;
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WorkerManager = void 0;
		var i = function() {
			function e(e) {
				var t = this;
				this._defaults = e, this._worker = null, this._idleCheckInterval = setInterval((function() {
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
					moduleId: "vs/language/html/htmlWorker",
					createData: {
						languageSettings: this._defaults.options,
						languageId: this._defaults.languageId
					},
					label: this._defaults.languageId
				}), this._client = this._worker.getProxy()), this._client
			}, e.prototype.getLanguageServiceWorker = function() {
				for (var e, t = this, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
				return this._getClient().then((function(t) {
					e = t
				})).then((function(e) {
					return t._worker.withSyncedResources(n)
				})).then((function(t) {
					return e
				}))
			}, e
		}();
		t.WorkerManager = i
	})), define("vscode-nls/vscode-nls", ["require", "exports"], (function(e, t) {
		"use strict";

		function n(e, t) {
			return 0 === t.length ? e : e.replace(/\{(\d+)\}/g, (function(e, n) {
				var i = n[0];
				return void 0 !== t[i] ? t[i] : e
			}))
		}

		function i(e, t) {
			for (var i = [], r = 2; r < arguments.length; r++) i[r - 2] = arguments[r];
			return n(t, i)
		}

		function r(e) {
			return i
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.config = t.loadMessageBundle = void 0, t.loadMessageBundle = r, t.config = function(e) {
			return r
		}
	})), define("vscode-nls", ["vscode-nls/vscode-nls"], (function(e) {
		return e
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-languageserver-types/main", ["require", "exports"],
			e)
	}((function(e, t) {
		"use strict";
		var n, i, r, a, o, s, l, c, d, h, u, p, m, f, g, b, v;
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.TextDocument = t.EOL = t.SelectionRange = t.DocumentLink = t.FormattingOptions = t.CodeLens = t.CodeAction =
			t.CodeActionContext = t.CodeActionKind = t.DocumentSymbol = t.SymbolInformation = t.SymbolTag = t.SymbolKind = t.DocumentHighlight =
			t.DocumentHighlightKind = t.SignatureInformation = t.ParameterInformation = t.Hover = t.MarkedString = t.CompletionList =
			t.CompletionItem = t.InsertTextMode = t.InsertReplaceEdit = t.CompletionItemTag = t.InsertTextFormat = t.CompletionItemKind =
			t.MarkupContent = t.MarkupKind = t.TextDocumentItem = t.OptionalVersionedTextDocumentIdentifier = t.VersionedTextDocumentIdentifier =
			t.TextDocumentIdentifier = t.WorkspaceChange = t.WorkspaceEdit = t.DeleteFile = t.RenameFile = t.CreateFile = t.TextDocumentEdit =
			t.AnnotatedTextEdit = t.ChangeAnnotationIdentifier = t.ChangeAnnotation = t.TextEdit = t.Command = t.Diagnostic =
			t.CodeDescription = t.DiagnosticTag = t.DiagnosticSeverity = t.DiagnosticRelatedInformation = t.FoldingRange = t.FoldingRangeKind =
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
					return L.objectLiteral(t) && L.uinteger(t.line) && L.uinteger(t.character)
				}
			}(i = t.Position || (t.Position = {})),
			function(e) {
				e.create = function(e, t, n, r) {
					if (L.uinteger(e) && L.uinteger(t) && L.uinteger(n) && L.uinteger(r)) return {
						start: i.create(e, t),
						end: i.create(n, r)
					};
					if (i.is(e) && i.is(t)) return {
						start: e,
						end: t
					};
					throw new Error("Range#create called with invalid arguments[" + e + ", " + t + ", " + n + ", " + r + "]")
				}, e.is = function(e) {
					var t = e;
					return L.objectLiteral(t) && i.is(t.start) && i.is(t.end)
				}
			}(r = t.Range || (t.Range = {})),
			function(e) {
				e.create = function(e, t) {
					return {
						uri: e,
						range: t
					}
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && r.is(t.range) && (L.string(t.uri) || L.undefined(t.uri))
				}
			}(a = t.Location || (t.Location = {})),
			function(e) {
				e.create = function(e, t, n, i) {
					return {
						targetUri: e,
						targetRange: t,
						targetSelectionRange: n,
						originSelectionRange: i
					}
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && r.is(t.targetRange) && L.string(t.targetUri) && (r.is(t.targetSelectionRange) || L.undefined(
						t.targetSelectionRange)) && (r.is(t.originSelectionRange) || L.undefined(t.originSelectionRange))
				}
			}(t.LocationLink || (t.LocationLink = {})),
			function(e) {
				e.create = function(e, t, n, i) {
					return {
						red: e,
						green: t,
						blue: n,
						alpha: i
					}
				}, e.is = function(e) {
					var t = e;
					return L.numberRange(t.red, 0, 1) && L.numberRange(t.green, 0, 1) && L.numberRange(t.blue, 0, 1) && L.numberRange(
						t.alpha, 0, 1)
				}
			}(o = t.Color || (t.Color = {})),
			function(e) {
				e.create = function(e, t) {
					return {
						range: e,
						color: t
					}
				}, e.is = function(e) {
					var t = e;
					return r.is(t.range) && o.is(t.color)
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
					return L.string(t.label) && (L.undefined(t.textEdit) || d.is(t)) && (L.undefined(t.additionalTextEdits) || L.typedArray(
						t.additionalTextEdits, d.is))
				}
			}(t.ColorPresentation || (t.ColorPresentation = {})),
			function(e) {
				e.Comment = "comment", e.Imports = "imports", e.Region = "region"
			}(t.FoldingRangeKind || (t.FoldingRangeKind = {})),
			function(e) {
				e.create = function(e, t, n, i, r) {
					var a = {
						startLine: e,
						endLine: t
					};
					return L.defined(n) && (a.startCharacter = n), L.defined(i) && (a.endCharacter = i), L.defined(r) && (a.kind =
						r), a
				}, e.is = function(e) {
					var t = e;
					return L.uinteger(t.startLine) && L.uinteger(t.startLine) && (L.undefined(t.startCharacter) || L.uinteger(t.startCharacter)) &&
						(L.undefined(t.endCharacter) || L.uinteger(t.endCharacter)) && (L.undefined(t.kind) || L.string(t.kind))
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
					return L.defined(t) && a.is(t.location) && L.string(t.message)
				}
			}(s = t.DiagnosticRelatedInformation || (t.DiagnosticRelatedInformation = {})),
			function(e) {
				e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4
			}(t.DiagnosticSeverity || (t.DiagnosticSeverity = {})),
			function(e) {
				e.Unnecessary = 1, e.Deprecated = 2
			}(t.DiagnosticTag || (t.DiagnosticTag = {})),
			function(e) {
				e.is = function(e) {
					var t = e;
					return null != t && L.string(t.href)
				}
			}(t.CodeDescription || (t.CodeDescription = {})),
			function(e) {
				e.create = function(e, t, n, i, r, a) {
					var o = {
						range: e,
						message: t
					};
					return L.defined(n) && (o.severity = n), L.defined(i) && (o.code = i), L.defined(r) && (o.source = r), L.defined(
						a) && (o.relatedInformation = a), o
				}, e.is = function(e) {
					var t, n = e;
					return L.defined(n) && r.is(n.range) && L.string(n.message) && (L.number(n.severity) || L.undefined(n.severity)) &&
						(L.integer(n.code) || L.string(n.code) || L.undefined(n.code)) && (L.undefined(n.codeDescription) || L.string(
							null === (t = n.codeDescription) || void 0 === t ? void 0 : t.href)) && (L.string(n.source) || L.undefined(n.source)) &&
						(L.undefined(n.relatedInformation) || L.typedArray(n.relatedInformation, s.is))
				}
			}(l = t.Diagnostic || (t.Diagnostic = {})),
			function(e) {
				e.create = function(e, t) {
					for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
					var r = {
						title: e,
						command: t
					};
					return L.defined(n) && n.length > 0 && (r.arguments = n), r
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && L.string(t.title) && L.string(t.command)
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
					return L.objectLiteral(t) && L.string(t.newText) && r.is(t.range)
				}
			}(d = t.TextEdit || (t.TextEdit = {})),
			function(e) {
				e.create = function(e, t, n) {
					var i = {
						label: e
					};
					return void 0 !== t && (i.needsConfirmation = t), void 0 !== n && (i.description = n), i
				}, e.is = function(e) {
					var t = e;
					return void 0 !== t && L.objectLiteral(t) && L.string(t.label) && (L.boolean(t.needsConfirmation) || void 0 ===
						t.needsConfirmation) && (L.string(t.description) || void 0 === t.description)
				}
			}(h = t.ChangeAnnotation || (t.ChangeAnnotation = {})),
			function(e) {
				e.is = function(e) {
					return "string" == typeof e
				}
			}(u = t.ChangeAnnotationIdentifier || (t.ChangeAnnotationIdentifier = {})),
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
					return d.is(t) && (h.is(t.annotationId) || u.is(t.annotationId))
				}
			}(p = t.AnnotatedTextEdit || (t.AnnotatedTextEdit = {})),
			function(e) {
				e.create = function(e, t) {
					return {
						textDocument: e,
						edits: t
					}
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && _.is(t.textDocument) && Array.isArray(t.edits)
				}
			}(m = t.TextDocumentEdit || (t.TextDocumentEdit = {})),
			function(e) {
				e.create = function(e, t, n) {
					var i = {
						kind: "create",
						uri: e
					};
					return void 0 === t || void 0 === t.overwrite && void 0 === t.ignoreIfExists || (i.options = t), void 0 !== n &&
						(i.annotationId = n), i
				}, e.is = function(e) {
					var t = e;
					return t && "create" === t.kind && L.string(t.uri) && (void 0 === t.options || (void 0 === t.options.overwrite ||
							L.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || L.boolean(t.options.ignoreIfExists))) &&
						(void 0 === t.annotationId || u.is(t.annotationId))
				}
			}(f = t.CreateFile || (t.CreateFile = {})),
			function(e) {
				e.create = function(e, t, n, i) {
					var r = {
						kind: "rename",
						oldUri: e,
						newUri: t
					};
					return void 0 === n || void 0 === n.overwrite && void 0 === n.ignoreIfExists || (r.options = n), void 0 !== i &&
						(r.annotationId = i), r
				}, e.is = function(e) {
					var t = e;
					return t && "rename" === t.kind && L.string(t.oldUri) && L.string(t.newUri) && (void 0 === t.options || (void 0 ===
						t.options.overwrite || L.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || L.boolean(
						t.options.ignoreIfExists))) && (void 0 === t.annotationId || u.is(t.annotationId))
				}
			}(g = t.RenameFile || (t.RenameFile = {})),
			function(e) {
				e.create = function(e, t, n) {
					var i = {
						kind: "delete",
						uri: e
					};
					return void 0 === t || void 0 === t.recursive && void 0 === t.ignoreIfNotExists || (i.options = t), void 0 !==
						n && (i.annotationId = n), i
				}, e.is = function(e) {
					var t = e;
					return t && "delete" === t.kind && L.string(t.uri) && (void 0 === t.options || (void 0 === t.options.recursive ||
							L.boolean(t.options.recursive)) && (void 0 === t.options.ignoreIfNotExists || L.boolean(t.options.ignoreIfNotExists))) &&
						(void 0 === t.annotationId || u.is(t.annotationId))
				}
			}(b = t.DeleteFile || (t.DeleteFile = {})),
			function(e) {
				e.is = function(e) {
					var t = e;
					return t && (void 0 !== t.changes || void 0 !== t.documentChanges) && (void 0 === t.documentChanges || t.documentChanges
						.every((function(e) {
							return L.string(e.kind) ? f.is(e) || g.is(e) || b.is(e) : m.is(e)
						})))
				}
			}(v = t.WorkspaceEdit || (t.WorkspaceEdit = {}));
		var _, w, y, T, k = function() {
				function e(e, t) {
					this.edits = e, this.changeAnnotations = t
				}
				return e.prototype.insert = function(e, t, n) {
					var i, r;
					if (void 0 === n ? i = d.insert(e, t) : u.is(n) ? (r = n, i = p.insert(e, t, n)) : (this.assertChangeAnnotations(
							this.changeAnnotations), r = this.changeAnnotations.manage(n), i = p.insert(e, t, r)), this.edits.push(i),
						void 0 !== r) return r
				}, e.prototype.replace = function(e, t, n) {
					var i, r;
					if (void 0 === n ? i = d.replace(e, t) : u.is(n) ? (r = n, i = p.replace(e, t, n)) : (this.assertChangeAnnotations(
							this.changeAnnotations), r = this.changeAnnotations.manage(n), i = p.replace(e, t, r)), this.edits.push(i),
						void 0 !== r) return r
				}, e.prototype.delete = function(e, t) {
					var n, i;
					if (void 0 === t ? n = d.del(e) : u.is(t) ? (i = t, n = p.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations),
							i = this.changeAnnotations.manage(t), n = p.del(e, i)), this.edits.push(n), void 0 !== i) return i
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
			S = function() {
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
					if (u.is(e) ? n = e : (n = this.nextId(), t = e), void 0 !== this._annotations[n]) throw new Error("Id " + n +
						" is already in use.");
					if (void 0 === t) throw new Error("No annotation provided for id " + n);
					return this._annotations[n] = t, this._size++, n
				}, e.prototype.nextId = function() {
					return this._counter++, this._counter.toString()
				}, e
			}(),
			x = function() {
				function e(e) {
					var t = this;
					this._textEditChanges = Object.create(null), void 0 !== e ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations =
						new S(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((
							function(e) {
								if (m.is(e)) {
									var n = new k(e.edits, t._changeAnnotations);
									t._textEditChanges[e.textDocument.uri] = n
								}
							}))) : e.changes && Object.keys(e.changes).forEach((function(n) {
						var i = new k(e.changes[n]);
						t._textEditChanges[n] = i
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
					if (_.is(e)) {
						if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
							"Workspace edit is not configured for document changes.");
						var t = {
							uri: e.uri,
							version: e.version
						};
						if (!(i = this._textEditChanges[t.uri])) {
							var n = {
								textDocument: t,
								edits: r = []
							};
							this._workspaceEdit.documentChanges.push(n), i = new k(r, this._changeAnnotations), this._textEditChanges[t.uri] =
								i
						}
						return i
					}
					if (this.initChanges(), void 0 === this._workspaceEdit.changes) throw new Error(
						"Workspace edit is not configured for normal text edit changes.");
					var i;
					if (!(i = this._textEditChanges[e])) {
						var r = [];
						this._workspaceEdit.changes[e] = r, i = new k(r), this._textEditChanges[e] = i
					}
					return i
				}, e.prototype.initDocumentChanges = function() {
					void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._changeAnnotations =
						new S, this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations
						.all())
				}, e.prototype.initChanges = function() {
					void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._workspaceEdit
						.changes = Object.create(null))
				}, e.prototype.createFile = function(e, t, n) {
					if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
						"Workspace edit is not configured for document changes.");
					var i, r, a;
					if (h.is(t) || u.is(t) ? i = t : n = t, void 0 === i ? r = f.create(e, n) : (a = u.is(i) ? i : this._changeAnnotations
							.manage(i), r = f.create(e, n, a)), this._workspaceEdit.documentChanges.push(r), void 0 !== a) return a
				}, e.prototype.renameFile = function(e, t, n, i) {
					if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
						"Workspace edit is not configured for document changes.");
					var r, a, o;
					if (h.is(n) || u.is(n) ? r = n : i = n, void 0 === r ? a = g.create(e, t, i) : (o = u.is(r) ? r : this._changeAnnotations
							.manage(r), a = g.create(e, t, i, o)), this._workspaceEdit.documentChanges.push(a), void 0 !== o) return o
				}, e.prototype.deleteFile = function(e, t, n) {
					if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges) throw new Error(
						"Workspace edit is not configured for document changes.");
					var i, r, a;
					if (h.is(t) || u.is(t) ? i = t : n = t, void 0 === i ? r = b.create(e, n) : (a = u.is(i) ? i : this._changeAnnotations
							.manage(i), r = b.create(e, n, a)), this._workspaceEdit.documentChanges.push(r), void 0 !== a) return a
				}, e
			}();
		t.WorkspaceChange = x,
			function(e) {
				e.create = function(e) {
					return {
						uri: e
					}
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && L.string(t.uri)
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
					return L.defined(t) && L.string(t.uri) && L.integer(t.version)
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
					return L.defined(t) && L.string(t.uri) && (null === t.version || L.integer(t.version))
				}
			}(_ = t.OptionalVersionedTextDocumentIdentifier || (t.OptionalVersionedTextDocumentIdentifier = {})),
			function(e) {
				e.create = function(e, t, n, i) {
					return {
						uri: e,
						languageId: t,
						version: n,
						text: i
					}
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && L.string(t.uri) && L.string(t.languageId) && L.integer(t.version) && L.string(t.text)
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
					return L.objectLiteral(e) && w.is(t.kind) && L.string(t.value)
				}
			}(y = t.MarkupContent || (t.MarkupContent = {})),
			function(e) {
				e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface =
					8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color =
					16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event =
					23, e.Operator = 24, e.TypeParameter = 25
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
					return t && L.string(t.newText) && r.is(t.insert) && r.is(t.replace)
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
					return L.string(t) || L.objectLiteral(t) && L.string(t.language) && L.string(t.value)
				}
			}(T = t.MarkedString || (t.MarkedString = {})),
			function(e) {
				e.is = function(e) {
					var t = e;
					return !!t && L.objectLiteral(t) && (y.is(t.contents) || T.is(t.contents) || L.typedArray(t.contents, T.is)) &&
						(void 0 === e.range || r.is(e.range))
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
					for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
					var r = {
						label: e
					};
					return L.defined(t) && (r.documentation = t), L.defined(n) ? r.parameters = n : r.parameters = [], r
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
					return L.number(t) && (n.kind = t), n
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
				e.create = function(e, t, n, i, r) {
					var a = {
						name: e,
						kind: t,
						location: {
							uri: i,
							range: n
						}
					};
					return r && (a.containerName = r), a
				}
			}(t.SymbolInformation || (t.SymbolInformation = {})),
			function(e) {
				e.create = function(e, t, n, i, r, a) {
					var o = {
						name: e,
						detail: t,
						kind: n,
						range: i,
						selectionRange: r
					};
					return void 0 !== a && (o.children = a), o
				}, e.is = function(e) {
					var t = e;
					return t && L.string(t.name) && L.number(t.kind) && r.is(t.range) && r.is(t.selectionRange) && (void 0 === t.detail ||
						L.string(t.detail)) && (void 0 === t.deprecated || L.boolean(t.deprecated)) && (void 0 === t.children ||
						Array.isArray(t.children)) && (void 0 === t.tags || Array.isArray(t.tags))
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
					return L.defined(t) && L.typedArray(t.diagnostics, l.is) && (void 0 === t.only || L.typedArray(t.only, L.string))
				}
			}(t.CodeActionContext || (t.CodeActionContext = {})),
			function(e) {
				e.create = function(e, t, n) {
					var i = {
							title: e
						},
						r = !0;
					return "string" == typeof t ? (r = !1, i.kind = t) : c.is(t) ? i.command = t : i.edit = t, r && void 0 !== n &&
						(i.kind = n), i
				}, e.is = function(e) {
					var t = e;
					return t && L.string(t.title) && (void 0 === t.diagnostics || L.typedArray(t.diagnostics, l.is)) && (void 0 ===
						t.kind || L.string(t.kind)) && (void 0 !== t.edit || void 0 !== t.command) && (void 0 === t.command || c.is(t
						.command)) && (void 0 === t.isPreferred || L.boolean(t.isPreferred)) && (void 0 === t.edit || v.is(t.edit))
				}
			}(t.CodeAction || (t.CodeAction = {})),
			function(e) {
				e.create = function(e, t) {
					var n = {
						range: e
					};
					return L.defined(t) && (n.data = t), n
				}, e.is = function(e) {
					var t = e;
					return L.defined(t) && r.is(t.range) && (L.undefined(t.command) || c.is(t.command))
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
					return L.defined(t) && L.uinteger(t.tabSize) && L.boolean(t.insertSpaces)
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
					return L.defined(t) && r.is(t.range) && (L.undefined(t.target) || L.string(t.target))
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
					return void 0 !== n && r.is(n.range) && (void 0 === n.parent || e.is(n.parent))
				}
			}(t.SelectionRange || (t.SelectionRange = {})), t.EOL = ["\n", "\r\n", "\r"],
			function(e) {
				function t(e, n) {
					if (e.length <= 1) return e;
					var i = e.length / 2 | 0,
						r = e.slice(0, i),
						a = e.slice(i);
					t(r, n), t(a, n);
					for (var o = 0, s = 0, l = 0; o < r.length && s < a.length;) {
						var c = n(r[o], a[s]);
						e[l++] = c <= 0 ? r[o++] : a[s++]
					}
					for (; o < r.length;) e[l++] = r[o++];
					for (; s < a.length;) e[l++] = a[s++];
					return e
				}
				e.create = function(e, t, n, i) {
					return new M(e, t, n, i)
				}, e.is = function(e) {
					var t = e;
					return !!(L.defined(t) && L.string(t.uri) && (L.undefined(t.languageId) || L.string(t.languageId)) && L.uinteger(
						t.lineCount) && L.func(t.getText) && L.func(t.positionAt) && L.func(t.offsetAt))
				}, e.applyEdits = function(e, n) {
					for (var i = e.getText(), r = t(n, (function(e, t) {
							var n = e.range.start.line - t.range.start.line;
							return 0 === n ? e.range.start.character - t.range.start.character : n
						})), a = i.length, o = r.length - 1; o >= 0; o--) {
						var s = r[o],
							l = e.offsetAt(s.range.start),
							c = e.offsetAt(s.range.end);
						if (!(c <= a)) throw new Error("Overlapping edit");
						i = i.substring(0, l) + s.newText + i.substring(c, i.length), a = l
					}
					return i
				}
			}(t.TextDocument || (t.TextDocument = {}));
		var L, M = function() {
			function e(e, t, n, i) {
				this._uri = e, this._languageId = t, this._version = n, this._content = i, this._lineOffsets = void 0
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
					for (var e = [], t = this._content, n = !0, i = 0; i < t.length; i++) {
						n && (e.push(i), n = !1);
						var r = t.charAt(i);
						n = "\r" === r || "\n" === r, "\r" === r && i + 1 < t.length && "\n" === t.charAt(i + 1) && i++
					}
					n && t.length > 0 && e.push(t.length), this._lineOffsets = e
				}
				return this._lineOffsets
			}, e.prototype.positionAt = function(e) {
				e = Math.max(Math.min(e, this._content.length), 0);
				var t = this.getLineOffsets(),
					n = 0,
					r = t.length;
				if (0 === r) return i.create(0, e);
				for (; n < r;) {
					var a = Math.floor((n + r) / 2);
					t[a] > e ? r = a : n = a + 1
				}
				var o = n - 1;
				return i.create(o, e - t[o])
			}, e.prototype.offsetAt = function(e) {
				var t = this.getLineOffsets();
				if (e.line >= t.length) return this._content.length;
				if (e.line < 0) return 0;
				var n = t[e.line],
					i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
				return Math.max(Math.min(n + e.character, i), n)
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
			}, e.numberRange = function(e, n, i) {
				return "[object Number]" === t.call(e) && n <= e && e <= i
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
		}(L || (L = {}))
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
			function e(e, t, n, i) {
				this._uri = e, this._languageId = t, this._version = n, this._content = i, this._lineOffsets = void 0
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
				for (var i = 0, o = t; i < o.length; i++) {
					var s = o[i];
					if (e.isIncremental(s)) {
						var l = a(s.range),
							c = this.offsetAt(l.start),
							d = this.offsetAt(l.end);
						this._content = this._content.substring(0, c) + s.text + this._content.substring(d, this._content.length);
						var h = Math.max(l.start.line, 0),
							u = Math.max(l.end.line, 0),
							p = this._lineOffsets,
							m = r(s.text, !1, c);
						if (u - h === m.length)
							for (var f = 0, g = m.length; f < g; f++) p[f + h + 1] = m[f];
						else m.length < 1e4 ? p.splice.apply(p, [h + 1, u - h].concat(m)) : this._lineOffsets = p = p.slice(0, h + 1)
							.concat(m, p.slice(u + 1));
						var b = s.text.length - (d - c);
						if (0 !== b)
							for (f = h + 1 + m.length, g = p.length; f < g; f++) p[f] = p[f] + b
					} else {
						if (!e.isFull(s)) throw new Error("Unknown change event received");
						this._content = s.text, this._lineOffsets = void 0
					}
				}
				this._version = n
			}, e.prototype.getLineOffsets = function() {
				return void 0 === this._lineOffsets && (this._lineOffsets = r(this._content, !0)), this._lineOffsets
			}, e.prototype.positionAt = function(e) {
				e = Math.max(Math.min(e, this._content.length), 0);
				var t = this.getLineOffsets(),
					n = 0,
					i = t.length;
				if (0 === i) return {
					line: 0,
					character: e
				};
				for (; n < i;) {
					var r = Math.floor((n + i) / 2);
					t[r] > e ? i = r : n = r + 1
				}
				var a = n - 1;
				return {
					line: a,
					character: e - t[a]
				}
			}, e.prototype.offsetAt = function(e) {
				var t = this.getLineOffsets();
				if (e.line >= t.length) return this._content.length;
				if (e.line < 0) return 0;
				var n = t[e.line],
					i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
				return Math.max(Math.min(n + e.character, i), n)
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

		function i(e, t) {
			if (e.length <= 1) return e;
			var n = e.length / 2 | 0,
				r = e.slice(0, n),
				a = e.slice(n);
			i(r, t), i(a, t);
			for (var o = 0, s = 0, l = 0; o < r.length && s < a.length;) {
				var c = t(r[o], a[s]);
				e[l++] = c <= 0 ? r[o++] : a[s++]
			}
			for (; o < r.length;) e[l++] = r[o++];
			for (; s < a.length;) e[l++] = a[s++];
			return e
		}

		function r(e, t, n) {
			void 0 === n && (n = 0);
			for (var i = t ? [n] : [], r = 0; r < e.length; r++) {
				var a = e.charCodeAt(r);
				13 !== a && 10 !== a || (13 === a && r + 1 < e.length && 10 === e.charCodeAt(r + 1) && r++, i.push(n + r + 1))
			}
			return i
		}

		function a(e) {
			var t = e.start,
				n = e.end;
			return t.line > n.line || t.line === n.line && t.character > n.character ? {
				start: n,
				end: t
			} : e
		}

		function o(e) {
			var t = a(e.range);
			return t !== e.range ? {
				newText: e.newText,
				range: t
			} : e
		}! function(e) {
			e.create = function(e, t, i, r) {
				return new n(e, t, i, r)
			}, e.update = function(e, t, i) {
				if (e instanceof n) return e.update(t, i), e;
				throw new Error("TextDocument.update: document must be created by TextDocument.create")
			}, e.applyEdits = function(e, t) {
				for (var n = e.getText(), r = 0, a = [], s = 0, l = i(t.map(o), (function(e, t) {
						var n = e.range.start.line - t.range.start.line;
						return 0 === n ? e.range.start.character - t.range.start.character : n
					})); s < l.length; s++) {
					var c = l[s],
						d = e.offsetAt(c.range.start);
					if (d < r) throw new Error("Overlapping edit");
					d > r && a.push(n.substring(r, d)), c.newText.length && a.push(c.newText), r = e.offsetAt(c.range.end)
				}
				return a.push(n.substr(r)), a.join("")
			}
		}(t.TextDocument || (t.TextDocument = {}))
	})), define("vscode-languageserver-textdocument", ["vscode-languageserver-textdocument/main"], (function(e) {
		return e
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/htmlLanguageTypes", [
			"require", "exports", "vscode-languageserver-types", "vscode-languageserver-textdocument"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.FileType = t.ClientCapabilities = t.ScannerState = t.TokenType = t.ColorPresentation = t.ColorInformation =
			t.Color = t.FormattingOptions = t.Diagnostic = t.FoldingRangeKind = t.FoldingRange = t.DocumentLink = t.DocumentHighlightKind =
			t.DocumentHighlight = t.InsertTextFormat = t.InsertReplaceEdit = t.TextEdit = t.Hover = t.SymbolKind = t.SymbolInformation =
			t.Command = t.InsertTextMode = t.CompletionItemTag = t.CompletionItem = t.CompletionItemKind = t.CompletionList =
			t.WorkspaceEdit = t.SelectionRange = t.MarkedString = t.MarkupKind = t.MarkupContent = t.Location = t.Range = t.Position =
			t.TextDocument = void 0;
		var n = e("vscode-languageserver-types");
		Object.defineProperty(t, "Position", {
			enumerable: !0,
			get: function() {
				return n.Position
			}
		}), Object.defineProperty(t, "Range", {
			enumerable: !0,
			get: function() {
				return n.Range
			}
		}), Object.defineProperty(t, "Location", {
			enumerable: !0,
			get: function() {
				return n.Location
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
		}), Object.defineProperty(t, "MarkedString", {
			enumerable: !0,
			get: function() {
				return n.MarkedString
			}
		}), Object.defineProperty(t, "SelectionRange", {
			enumerable: !0,
			get: function() {
				return n.SelectionRange
			}
		}), Object.defineProperty(t, "WorkspaceEdit", {
			enumerable: !0,
			get: function() {
				return n.WorkspaceEdit
			}
		}), Object.defineProperty(t, "CompletionList", {
			enumerable: !0,
			get: function() {
				return n.CompletionList
			}
		}), Object.defineProperty(t, "CompletionItemKind", {
			enumerable: !0,
			get: function() {
				return n.CompletionItemKind
			}
		}), Object.defineProperty(t, "CompletionItem", {
			enumerable: !0,
			get: function() {
				return n.CompletionItem
			}
		}), Object.defineProperty(t, "CompletionItemTag", {
			enumerable: !0,
			get: function() {
				return n.CompletionItemTag
			}
		}), Object.defineProperty(t, "InsertTextMode", {
			enumerable: !0,
			get: function() {
				return n.InsertTextMode
			}
		}), Object.defineProperty(t, "Command", {
			enumerable: !0,
			get: function() {
				return n.Command
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
		}), Object.defineProperty(t, "Hover", {
			enumerable: !0,
			get: function() {
				return n.Hover
			}
		}), Object.defineProperty(t, "TextEdit", {
			enumerable: !0,
			get: function() {
				return n.TextEdit
			}
		}), Object.defineProperty(t, "InsertReplaceEdit", {
			enumerable: !0,
			get: function() {
				return n.InsertReplaceEdit
			}
		}), Object.defineProperty(t, "InsertTextFormat", {
			enumerable: !0,
			get: function() {
				return n.InsertTextFormat
			}
		}), Object.defineProperty(t, "DocumentHighlight", {
			enumerable: !0,
			get: function() {
				return n.DocumentHighlight
			}
		}), Object.defineProperty(t, "DocumentHighlightKind", {
			enumerable: !0,
			get: function() {
				return n.DocumentHighlightKind
			}
		}), Object.defineProperty(t, "DocumentLink", {
			enumerable: !0,
			get: function() {
				return n.DocumentLink
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
		}), Object.defineProperty(t, "Diagnostic", {
			enumerable: !0,
			get: function() {
				return n.Diagnostic
			}
		}), Object.defineProperty(t, "FormattingOptions", {
			enumerable: !0,
			get: function() {
				return n.FormattingOptions
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
		});
		var i = e("vscode-languageserver-textdocument");
		Object.defineProperty(t, "TextDocument", {
				enumerable: !0,
				get: function() {
					return i.TextDocument
				}
			}),
			function(e) {
				e[e.StartCommentTag = 0] = "StartCommentTag", e[e.Comment = 1] = "Comment", e[e.EndCommentTag = 2] =
					"EndCommentTag", e[e.StartTagOpen = 3] = "StartTagOpen", e[e.StartTagClose = 4] = "StartTagClose", e[e.StartTagSelfClose =
						5] = "StartTagSelfClose", e[e.StartTag = 6] = "StartTag", e[e.EndTagOpen = 7] = "EndTagOpen", e[e.EndTagClose =
						8] = "EndTagClose", e[e.EndTag = 9] = "EndTag", e[e.DelimiterAssign = 10] = "DelimiterAssign", e[e.AttributeName =
						11] = "AttributeName", e[e.AttributeValue = 12] = "AttributeValue", e[e.StartDoctypeTag = 13] =
					"StartDoctypeTag", e[e.Doctype = 14] = "Doctype", e[e.EndDoctypeTag = 15] = "EndDoctypeTag", e[e.Content = 16] =
					"Content", e[e.Whitespace = 17] = "Whitespace", e[e.Unknown = 18] = "Unknown", e[e.Script = 19] = "Script", e[e.Styles =
						20] = "Styles", e[e.EOS = 21] = "EOS"
			}(t.TokenType || (t.TokenType = {})),
			function(e) {
				e[e.WithinContent = 0] = "WithinContent", e[e.AfterOpeningStartTag = 1] = "AfterOpeningStartTag", e[e.AfterOpeningEndTag =
						2] = "AfterOpeningEndTag", e[e.WithinDoctype = 3] = "WithinDoctype", e[e.WithinTag = 4] = "WithinTag", e[e.WithinEndTag =
						5] = "WithinEndTag", e[e.WithinComment = 6] = "WithinComment", e[e.WithinScriptContent = 7] =
					"WithinScriptContent", e[e.WithinStyleContent = 8] = "WithinStyleContent", e[e.AfterAttributeName = 9] =
					"AfterAttributeName", e[e.BeforeAttributeValue = 10] = "BeforeAttributeValue"
			}(t.ScannerState || (t.ScannerState = {})),
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
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/parser/htmlScanner", [
			"require", "exports", "vscode-nls", "../htmlLanguageTypes"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.createScanner = void 0;
		var n = e("vscode-nls"),
			i = e("../htmlLanguageTypes"),
			r = n.loadMessageBundle(),
			a = function() {
				function e(e, t) {
					this.source = e, this.len = e.length, this.position = t
				}
				return e.prototype.eos = function() {
					return this.len <= this.position
				}, e.prototype.getSource = function() {
					return this.source
				}, e.prototype.pos = function() {
					return this.position
				}, e.prototype.goBackTo = function(e) {
					this.position = e
				}, e.prototype.goBack = function(e) {
					this.position -= e
				}, e.prototype.advance = function(e) {
					this.position += e
				}, e.prototype.goToEnd = function() {
					this.position = this.source.length
				}, e.prototype.nextChar = function() {
					return this.source.charCodeAt(this.position++) || 0
				}, e.prototype.peekChar = function(e) {
					return void 0 === e && (e = 0), this.source.charCodeAt(this.position + e) || 0
				}, e.prototype.advanceIfChar = function(e) {
					return e === this.source.charCodeAt(this.position) && (this.position++, !0)
				}, e.prototype.advanceIfChars = function(e) {
					var t;
					if (this.position + e.length > this.source.length) return !1;
					for (t = 0; t < e.length; t++)
						if (this.source.charCodeAt(this.position + t) !== e[t]) return !1;
					return this.advance(t), !0
				}, e.prototype.advanceIfRegExp = function(e) {
					var t = this.source.substr(this.position).match(e);
					return t ? (this.position = this.position + t.index + t[0].length, t[0]) : ""
				}, e.prototype.advanceUntilRegExp = function(e) {
					var t = this.source.substr(this.position).match(e);
					return t ? (this.position = this.position + t.index, t[0]) : (this.goToEnd(), "")
				}, e.prototype.advanceUntilChar = function(e) {
					for (; this.position < this.source.length;) {
						if (this.source.charCodeAt(this.position) === e) return !0;
						this.advance(1)
					}
					return !1
				}, e.prototype.advanceUntilChars = function(e) {
					for (; this.position + e.length <= this.source.length;) {
						for (var t = 0; t < e.length && this.source.charCodeAt(this.position + t) === e[t]; t++);
						if (t === e.length) return !0;
						this.advance(1)
					}
					return this.goToEnd(), !1
				}, e.prototype.skipWhitespace = function() {
					return this.advanceWhileChar((function(e) {
						return e === b || e === v || e === m || e === g || e === f
					})) > 0
				}, e.prototype.advanceWhileChar = function(e) {
					for (var t = this.position; this.position < this.len && e(this.source.charCodeAt(this.position));) this.position++;
					return this.position - t
				}, e
			}(),
			o = "!".charCodeAt(0),
			s = "-".charCodeAt(0),
			l = "<".charCodeAt(0),
			c = ">".charCodeAt(0),
			d = "/".charCodeAt(0),
			h = "=".charCodeAt(0),
			u = '"'.charCodeAt(0),
			p = "'".charCodeAt(0),
			m = "\n".charCodeAt(0),
			f = "\r".charCodeAt(0),
			g = "\f".charCodeAt(0),
			b = " ".charCodeAt(0),
			v = "\t".charCodeAt(0),
			_ = {
				"text/x-handlebars-template": !0,
				"text/html": !0
			};
		t.createScanner = function(e, t, n, m) {
			void 0 === t && (t = 0), void 0 === n && (n = i.ScannerState.WithinContent), void 0 === m && (m = !1);
			var f, g, b, v, w, y = new a(e, t),
				T = n,
				k = 0,
				S = i.TokenType.Unknown;

			function x() {
				return y.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase()
			}

			function L(e, t, n) {
				return S = t, k = e, f = n, t
			}

			function M() {
				var e, t = y.pos();
				if (y.eos()) return L(t, i.TokenType.EOS);
				switch (T) {
					case i.ScannerState.WithinComment:
						return y.advanceIfChars([s, s, c]) ? (T = i.ScannerState.WithinContent, L(t, i.TokenType.EndCommentTag)) : (y.advanceUntilChars(
							[s, s, c]), L(t, i.TokenType.Comment));
					case i.ScannerState.WithinDoctype:
						return y.advanceIfChar(c) ? (T = i.ScannerState.WithinContent, L(t, i.TokenType.EndDoctypeTag)) : (y.advanceUntilChar(
							c), L(t, i.TokenType.Doctype));
					case i.ScannerState.WithinContent:
						if (y.advanceIfChar(l)) {
							if (!y.eos() && y.peekChar() === o) {
								if (y.advanceIfChars([o, s, s])) return T = i.ScannerState.WithinComment, L(t, i.TokenType.StartCommentTag);
								if (y.advanceIfRegExp(/^!doctype/i)) return T = i.ScannerState.WithinDoctype, L(t, i.TokenType.StartDoctypeTag)
							}
							return y.advanceIfChar(d) ? (T = i.ScannerState.AfterOpeningEndTag, L(t, i.TokenType.EndTagOpen)) : (T = i.ScannerState
								.AfterOpeningStartTag, L(t, i.TokenType.StartTagOpen))
						}
						return y.advanceUntilChar(l), L(t, i.TokenType.Content);
					case i.ScannerState.AfterOpeningEndTag:
						return x().length > 0 ? (T = i.ScannerState.WithinEndTag, L(t, i.TokenType.EndTag)) : y.skipWhitespace() ? L(t,
								i.TokenType.Whitespace, r("error.unexpectedWhitespace", "Tag name must directly follow the open bracket.")) :
							(T = i.ScannerState.WithinEndTag, y.advanceUntilChar(c), t < y.pos() ? L(t, i.TokenType.Unknown, r(
								"error.endTagNameExpected", "End tag name expected.")) : M());
					case i.ScannerState.WithinEndTag:
						if (y.skipWhitespace()) return L(t, i.TokenType.Whitespace);
						if (y.advanceIfChar(c)) return T = i.ScannerState.WithinContent, L(t, i.TokenType.EndTagClose);
						if (m && y.peekChar() === l) return T = i.ScannerState.WithinContent, L(t, i.TokenType.EndTagClose, r(
							"error.closingBracketMissing", "Closing bracket missing."));
						e = r("error.closingBracketExpected", "Closing bracket expected.");
						break;
					case i.ScannerState.AfterOpeningStartTag:
						return b = x(), w = void 0, v = void 0, b.length > 0 ? (g = !1, T = i.ScannerState.WithinTag, L(t, i.TokenType
							.StartTag)) : y.skipWhitespace() ? L(t, i.TokenType.Whitespace, r("error.unexpectedWhitespace",
							"Tag name must directly follow the open bracket.")) : (T = i.ScannerState.WithinTag, y.advanceUntilChar(c),
							t < y.pos() ? L(t, i.TokenType.Unknown, r("error.startTagNameExpected", "Start tag name expected.")) : M());
					case i.ScannerState.WithinTag:
						return y.skipWhitespace() ? (g = !0, L(t, i.TokenType.Whitespace)) : g && (v = y.advanceIfRegExp(
							/^[^\s"'></=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase()).length > 0 ? (T = i.ScannerState.AfterAttributeName, g = !
							1, L(t, i.TokenType.AttributeName)) : y.advanceIfChars([d, c]) ? (T = i.ScannerState.WithinContent, L(t, i.TokenType
							.StartTagSelfClose)) : y.advanceIfChar(c) ? (T = "script" === b ? w && _[w] ? i.ScannerState.WithinContent :
							i.ScannerState.WithinScriptContent : "style" === b ? i.ScannerState.WithinStyleContent : i.ScannerState.WithinContent,
							L(t, i.TokenType.StartTagClose)) : m && y.peekChar() === l ? (T = i.ScannerState.WithinContent, L(t, i.TokenType
							.StartTagClose, r("error.closingBracketMissing", "Closing bracket missing."))) : (y.advance(1), L(t, i.TokenType
							.Unknown, r("error.unexpectedCharacterInTag", "Unexpected character in tag.")));
					case i.ScannerState.AfterAttributeName:
						return y.skipWhitespace() ? (g = !0, L(t, i.TokenType.Whitespace)) : y.advanceIfChar(h) ? (T = i.ScannerState.BeforeAttributeValue,
							L(t, i.TokenType.DelimiterAssign)) : (T = i.ScannerState.WithinTag, M());
					case i.ScannerState.BeforeAttributeValue:
						if (y.skipWhitespace()) return L(t, i.TokenType.Whitespace);
						var n = y.advanceIfRegExp(/^[^\s"'`=<>]+/);
						if (n.length > 0) return y.peekChar() === c && y.peekChar(-1) === d && (y.goBack(1), n = n.substr(0, n.length -
							1)), "type" === v && (w = n), T = i.ScannerState.WithinTag, g = !1, L(t, i.TokenType.AttributeValue);
						var a = y.peekChar();
						return a === p || a === u ? (y.advance(1), y.advanceUntilChar(a) && y.advance(1), "type" === v && (w = y.getSource()
							.substring(t + 1, y.pos() - 1)), T = i.ScannerState.WithinTag, g = !1, L(t, i.TokenType.AttributeValue)) : (
							T = i.ScannerState.WithinTag, g = !1, M());
					case i.ScannerState.WithinScriptContent:
						for (var f = 1; !y.eos();) {
							var k = y.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
							if (0 === k.length) return y.goToEnd(), L(t, i.TokenType.Script);
							if ("\x3c!--" === k) 1 === f && (f = 2);
							else if ("--\x3e" === k) f = 1;
							else if ("/" !== k[1]) 2 === f && (f = 3);
							else {
								if (3 !== f) {
									y.goBack(k.length);
									break
								}
								f = 2
							}
						}
						return T = i.ScannerState.WithinContent, t < y.pos() ? L(t, i.TokenType.Script) : M();
					case i.ScannerState.WithinStyleContent:
						return y.advanceUntilRegExp(/<\/style/i), T = i.ScannerState.WithinContent, t < y.pos() ? L(t, i.TokenType.Styles) :
							M()
				}
				return y.advance(1), T = i.ScannerState.WithinContent, L(t, i.TokenType.Unknown, e)
			}
			return {
				scan: function() {
					var e = y.pos(),
						t = T,
						n = M();
					return n === i.TokenType.EOS || e !== y.pos() || m && (n === i.TokenType.StartTagClose || n === i.TokenType.EndTagClose) ?
						n : (console.log("Scanner.scan has not advanced at offset " + e + ", state before: " + t + " after: " + T), y
							.advance(1), L(e, i.TokenType.Unknown))
				},
				getTokenType: function() {
					return S
				},
				getTokenOffset: function() {
					return k
				},
				getTokenLength: function() {
					return y.pos() - k
				},
				getTokenEnd: function() {
					return y.pos()
				},
				getTokenText: function() {
					return y.getSource().substring(k, y.pos())
				},
				getScannerState: function() {
					return T
				},
				getTokenError: function() {
					return f
				}
			}
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/utils/arrays", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.binarySearch = t.findFirst = void 0, t.findFirst = function(e, t) {
			var n = 0,
				i = e.length;
			if (0 === i) return 0;
			for (; n < i;) {
				var r = Math.floor((n + i) / 2);
				t(e[r]) ? i = r : n = r + 1
			}
			return n
		}, t.binarySearch = function(e, t, n) {
			for (var i = 0, r = e.length - 1; i <= r;) {
				var a = (i + r) / 2 | 0,
					o = n(e[a], t);
				if (o < 0) i = a + 1;
				else {
					if (!(o > 0)) return a;
					r = a - 1
				}
			}
			return -(i + 1)
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/languageFacts/fact", [
			"require", "exports", "../utils/arrays"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.isVoidElement = t.VOID_ELEMENTS = void 0;
		var n = e("../utils/arrays");
		t.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta",
			"param", "source", "track", "wbr"
		], t.isVoidElement = function(e) {
			return !!e && n.binarySearch(t.VOID_ELEMENTS, e.toLowerCase(), (function(e, t) {
				return e.localeCompare(t)
			})) >= 0
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/parser/htmlParser", [
			"require", "exports", "./htmlScanner", "../utils/arrays", "../htmlLanguageTypes", "../languageFacts/fact"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.parse = t.Node = void 0;
		var n = e("./htmlScanner"),
			i = e("../utils/arrays"),
			r = e("../htmlLanguageTypes"),
			a = e("../languageFacts/fact"),
			o = function() {
				function e(e, t, n, i) {
					this.start = e, this.end = t, this.children = n, this.parent = i, this.closed = !1
				}
				return Object.defineProperty(e.prototype, "attributeNames", {
					get: function() {
						return this.attributes ? Object.keys(this.attributes) : []
					},
					enumerable: !1,
					configurable: !0
				}), e.prototype.isSameTag = function(e) {
					return void 0 === this.tag ? void 0 === e : void 0 !== e && this.tag.length === e.length && this.tag.toLowerCase() ===
						e
				}, Object.defineProperty(e.prototype, "firstChild", {
					get: function() {
						return this.children[0]
					},
					enumerable: !1,
					configurable: !0
				}), Object.defineProperty(e.prototype, "lastChild", {
					get: function() {
						return this.children.length ? this.children[this.children.length - 1] : void 0
					},
					enumerable: !1,
					configurable: !0
				}), e.prototype.findNodeBefore = function(e) {
					var t = i.findFirst(this.children, (function(t) {
						return e <= t.start
					})) - 1;
					if (t >= 0) {
						var n = this.children[t];
						if (e > n.start) {
							if (e < n.end) return n.findNodeBefore(e);
							var r = n.lastChild;
							return r && r.end === n.end ? n.findNodeBefore(e) : n
						}
					}
					return this
				}, e.prototype.findNodeAt = function(e) {
					var t = i.findFirst(this.children, (function(t) {
						return e <= t.start
					})) - 1;
					if (t >= 0) {
						var n = this.children[t];
						if (e > n.start && e <= n.end) return n.findNodeAt(e)
					}
					return this
				}, e
			}();
		t.Node = o, t.parse = function(e) {
			for (var t = n.createScanner(e, void 0, void 0, !0), i = new o(0, e.length, [], void 0), s = i, l = -1, c = void 0,
					d = null, h = t.scan(); h !== r.TokenType.EOS;) {
				switch (h) {
					case r.TokenType.StartTagOpen:
						var u = new o(t.getTokenOffset(), e.length, [], s);
						s.children.push(u), s = u;
						break;
					case r.TokenType.StartTag:
						s.tag = t.getTokenText();
						break;
					case r.TokenType.StartTagClose:
						s.parent && (s.end = t.getTokenEnd(), t.getTokenLength() ? (s.startTagEnd = t.getTokenEnd(), s.tag && a.isVoidElement(
							s.tag) && (s.closed = !0, s = s.parent)) : s = s.parent);
						break;
					case r.TokenType.StartTagSelfClose:
						s.parent && (s.closed = !0, s.end = t.getTokenEnd(), s.startTagEnd = t.getTokenEnd(), s = s.parent);
						break;
					case r.TokenType.EndTagOpen:
						l = t.getTokenOffset(), c = void 0;
						break;
					case r.TokenType.EndTag:
						c = t.getTokenText().toLowerCase();
						break;
					case r.TokenType.EndTagClose:
						for (var p = s; !p.isSameTag(c) && p.parent;) p = p.parent;
						if (p.parent) {
							for (; s !== p;) s.end = l, s.closed = !1, s = s.parent;
							s.closed = !0, s.endTagStart = l, s.end = t.getTokenEnd(), s = s.parent
						}
						break;
					case r.TokenType.AttributeName:
						d = t.getTokenText(), (m = s.attributes) || (s.attributes = m = {}), m[d] = null;
						break;
					case r.TokenType.AttributeValue:
						var m, f = t.getTokenText();
						(m = s.attributes) && d && (m[d] = f, d = null)
				}
				h = t.scan()
			}
			for (; s.parent;) s.end = e.length, s.closed = !1, s = s.parent;
			return {
				roots: i.children,
				findNodeBefore: i.findNodeBefore.bind(i),
				findNodeAt: i.findNodeAt.bind(i)
			}
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/parser/htmlEntities", [
			"require", "exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.entities = void 0, t.entities = {
			"Aacute;": "Á",
			Aacute: "Á",
			"aacute;": "á",
			aacute: "á",
			"Abreve;": "Ă",
			"abreve;": "ă",
			"ac;": "∾",
			"acd;": "∿",
			"acE;": "∾̳",
			"Acirc;": "Â",
			Acirc: "Â",
			"acirc;": "â",
			acirc: "â",
			"acute;": "´",
			acute: "´",
			"Acy;": "А",
			"acy;": "а",
			"AElig;": "Æ",
			AElig: "Æ",
			"aelig;": "æ",
			aelig: "æ",
			"af;": "⁡",
			"Afr;": "𝔄",
			"afr;": "𝔞",
			"Agrave;": "À",
			Agrave: "À",
			"agrave;": "à",
			agrave: "à",
			"alefsym;": "ℵ",
			"aleph;": "ℵ",
			"Alpha;": "Α",
			"alpha;": "α",
			"Amacr;": "Ā",
			"amacr;": "ā",
			"amalg;": "⨿",
			"AMP;": "&",
			AMP: "&",
			"amp;": "&",
			amp: "&",
			"And;": "⩓",
			"and;": "∧",
			"andand;": "⩕",
			"andd;": "⩜",
			"andslope;": "⩘",
			"andv;": "⩚",
			"ang;": "∠",
			"ange;": "⦤",
			"angle;": "∠",
			"angmsd;": "∡",
			"angmsdaa;": "⦨",
			"angmsdab;": "⦩",
			"angmsdac;": "⦪",
			"angmsdad;": "⦫",
			"angmsdae;": "⦬",
			"angmsdaf;": "⦭",
			"angmsdag;": "⦮",
			"angmsdah;": "⦯",
			"angrt;": "∟",
			"angrtvb;": "⊾",
			"angrtvbd;": "⦝",
			"angsph;": "∢",
			"angst;": "Å",
			"angzarr;": "⍼",
			"Aogon;": "Ą",
			"aogon;": "ą",
			"Aopf;": "𝔸",
			"aopf;": "𝕒",
			"ap;": "≈",
			"apacir;": "⩯",
			"apE;": "⩰",
			"ape;": "≊",
			"apid;": "≋",
			"apos;": "'",
			"ApplyFunction;": "⁡",
			"approx;": "≈",
			"approxeq;": "≊",
			"Aring;": "Å",
			Aring: "Å",
			"aring;": "å",
			aring: "å",
			"Ascr;": "𝒜",
			"ascr;": "𝒶",
			"Assign;": "≔",
			"ast;": "*",
			"asymp;": "≈",
			"asympeq;": "≍",
			"Atilde;": "Ã",
			Atilde: "Ã",
			"atilde;": "ã",
			atilde: "ã",
			"Auml;": "Ä",
			Auml: "Ä",
			"auml;": "ä",
			auml: "ä",
			"awconint;": "∳",
			"awint;": "⨑",
			"backcong;": "≌",
			"backepsilon;": "϶",
			"backprime;": "‵",
			"backsim;": "∽",
			"backsimeq;": "⋍",
			"Backslash;": "∖",
			"Barv;": "⫧",
			"barvee;": "⊽",
			"Barwed;": "⌆",
			"barwed;": "⌅",
			"barwedge;": "⌅",
			"bbrk;": "⎵",
			"bbrktbrk;": "⎶",
			"bcong;": "≌",
			"Bcy;": "Б",
			"bcy;": "б",
			"bdquo;": "„",
			"becaus;": "∵",
			"Because;": "∵",
			"because;": "∵",
			"bemptyv;": "⦰",
			"bepsi;": "϶",
			"bernou;": "ℬ",
			"Bernoullis;": "ℬ",
			"Beta;": "Β",
			"beta;": "β",
			"beth;": "ℶ",
			"between;": "≬",
			"Bfr;": "𝔅",
			"bfr;": "𝔟",
			"bigcap;": "⋂",
			"bigcirc;": "◯",
			"bigcup;": "⋃",
			"bigodot;": "⨀",
			"bigoplus;": "⨁",
			"bigotimes;": "⨂",
			"bigsqcup;": "⨆",
			"bigstar;": "★",
			"bigtriangledown;": "▽",
			"bigtriangleup;": "△",
			"biguplus;": "⨄",
			"bigvee;": "⋁",
			"bigwedge;": "⋀",
			"bkarow;": "⤍",
			"blacklozenge;": "⧫",
			"blacksquare;": "▪",
			"blacktriangle;": "▴",
			"blacktriangledown;": "▾",
			"blacktriangleleft;": "◂",
			"blacktriangleright;": "▸",
			"blank;": "␣",
			"blk12;": "▒",
			"blk14;": "░",
			"blk34;": "▓",
			"block;": "█",
			"bne;": "=⃥",
			"bnequiv;": "≡⃥",
			"bNot;": "⫭",
			"bnot;": "⌐",
			"Bopf;": "𝔹",
			"bopf;": "𝕓",
			"bot;": "⊥",
			"bottom;": "⊥",
			"bowtie;": "⋈",
			"boxbox;": "⧉",
			"boxDL;": "╗",
			"boxDl;": "╖",
			"boxdL;": "╕",
			"boxdl;": "┐",
			"boxDR;": "╔",
			"boxDr;": "╓",
			"boxdR;": "╒",
			"boxdr;": "┌",
			"boxH;": "═",
			"boxh;": "─",
			"boxHD;": "╦",
			"boxHd;": "╤",
			"boxhD;": "╥",
			"boxhd;": "┬",
			"boxHU;": "╩",
			"boxHu;": "╧",
			"boxhU;": "╨",
			"boxhu;": "┴",
			"boxminus;": "⊟",
			"boxplus;": "⊞",
			"boxtimes;": "⊠",
			"boxUL;": "╝",
			"boxUl;": "╜",
			"boxuL;": "╛",
			"boxul;": "┘",
			"boxUR;": "╚",
			"boxUr;": "╙",
			"boxuR;": "╘",
			"boxur;": "└",
			"boxV;": "║",
			"boxv;": "│",
			"boxVH;": "╬",
			"boxVh;": "╫",
			"boxvH;": "╪",
			"boxvh;": "┼",
			"boxVL;": "╣",
			"boxVl;": "╢",
			"boxvL;": "╡",
			"boxvl;": "┤",
			"boxVR;": "╠",
			"boxVr;": "╟",
			"boxvR;": "╞",
			"boxvr;": "├",
			"bprime;": "‵",
			"Breve;": "˘",
			"breve;": "˘",
			"brvbar;": "¦",
			brvbar: "¦",
			"Bscr;": "ℬ",
			"bscr;": "𝒷",
			"bsemi;": "⁏",
			"bsim;": "∽",
			"bsime;": "⋍",
			"bsol;": "\\",
			"bsolb;": "⧅",
			"bsolhsub;": "⟈",
			"bull;": "•",
			"bullet;": "•",
			"bump;": "≎",
			"bumpE;": "⪮",
			"bumpe;": "≏",
			"Bumpeq;": "≎",
			"bumpeq;": "≏",
			"Cacute;": "Ć",
			"cacute;": "ć",
			"Cap;": "⋒",
			"cap;": "∩",
			"capand;": "⩄",
			"capbrcup;": "⩉",
			"capcap;": "⩋",
			"capcup;": "⩇",
			"capdot;": "⩀",
			"CapitalDifferentialD;": "ⅅ",
			"caps;": "∩︀",
			"caret;": "⁁",
			"caron;": "ˇ",
			"Cayleys;": "ℭ",
			"ccaps;": "⩍",
			"Ccaron;": "Č",
			"ccaron;": "č",
			"Ccedil;": "Ç",
			Ccedil: "Ç",
			"ccedil;": "ç",
			ccedil: "ç",
			"Ccirc;": "Ĉ",
			"ccirc;": "ĉ",
			"Cconint;": "∰",
			"ccups;": "⩌",
			"ccupssm;": "⩐",
			"Cdot;": "Ċ",
			"cdot;": "ċ",
			"cedil;": "¸",
			cedil: "¸",
			"Cedilla;": "¸",
			"cemptyv;": "⦲",
			"cent;": "¢",
			cent: "¢",
			"CenterDot;": "·",
			"centerdot;": "·",
			"Cfr;": "ℭ",
			"cfr;": "𝔠",
			"CHcy;": "Ч",
			"chcy;": "ч",
			"check;": "✓",
			"checkmark;": "✓",
			"Chi;": "Χ",
			"chi;": "χ",
			"cir;": "○",
			"circ;": "ˆ",
			"circeq;": "≗",
			"circlearrowleft;": "↺",
			"circlearrowright;": "↻",
			"circledast;": "⊛",
			"circledcirc;": "⊚",
			"circleddash;": "⊝",
			"CircleDot;": "⊙",
			"circledR;": "®",
			"circledS;": "Ⓢ",
			"CircleMinus;": "⊖",
			"CirclePlus;": "⊕",
			"CircleTimes;": "⊗",
			"cirE;": "⧃",
			"cire;": "≗",
			"cirfnint;": "⨐",
			"cirmid;": "⫯",
			"cirscir;": "⧂",
			"ClockwiseContourIntegral;": "∲",
			"CloseCurlyDoubleQuote;": "”",
			"CloseCurlyQuote;": "’",
			"clubs;": "♣",
			"clubsuit;": "♣",
			"Colon;": "∷",
			"colon;": ":",
			"Colone;": "⩴",
			"colone;": "≔",
			"coloneq;": "≔",
			"comma;": ",",
			"commat;": "@",
			"comp;": "∁",
			"compfn;": "∘",
			"complement;": "∁",
			"complexes;": "ℂ",
			"cong;": "≅",
			"congdot;": "⩭",
			"Congruent;": "≡",
			"Conint;": "∯",
			"conint;": "∮",
			"ContourIntegral;": "∮",
			"Copf;": "ℂ",
			"copf;": "𝕔",
			"coprod;": "∐",
			"Coproduct;": "∐",
			"COPY;": "©",
			COPY: "©",
			"copy;": "©",
			copy: "©",
			"copysr;": "℗",
			"CounterClockwiseContourIntegral;": "∳",
			"crarr;": "↵",
			"Cross;": "⨯",
			"cross;": "✗",
			"Cscr;": "𝒞",
			"cscr;": "𝒸",
			"csub;": "⫏",
			"csube;": "⫑",
			"csup;": "⫐",
			"csupe;": "⫒",
			"ctdot;": "⋯",
			"cudarrl;": "⤸",
			"cudarrr;": "⤵",
			"cuepr;": "⋞",
			"cuesc;": "⋟",
			"cularr;": "↶",
			"cularrp;": "⤽",
			"Cup;": "⋓",
			"cup;": "∪",
			"cupbrcap;": "⩈",
			"CupCap;": "≍",
			"cupcap;": "⩆",
			"cupcup;": "⩊",
			"cupdot;": "⊍",
			"cupor;": "⩅",
			"cups;": "∪︀",
			"curarr;": "↷",
			"curarrm;": "⤼",
			"curlyeqprec;": "⋞",
			"curlyeqsucc;": "⋟",
			"curlyvee;": "⋎",
			"curlywedge;": "⋏",
			"curren;": "¤",
			curren: "¤",
			"curvearrowleft;": "↶",
			"curvearrowright;": "↷",
			"cuvee;": "⋎",
			"cuwed;": "⋏",
			"cwconint;": "∲",
			"cwint;": "∱",
			"cylcty;": "⌭",
			"Dagger;": "‡",
			"dagger;": "†",
			"daleth;": "ℸ",
			"Darr;": "↡",
			"dArr;": "⇓",
			"darr;": "↓",
			"dash;": "‐",
			"Dashv;": "⫤",
			"dashv;": "⊣",
			"dbkarow;": "⤏",
			"dblac;": "˝",
			"Dcaron;": "Ď",
			"dcaron;": "ď",
			"Dcy;": "Д",
			"dcy;": "д",
			"DD;": "ⅅ",
			"dd;": "ⅆ",
			"ddagger;": "‡",
			"ddarr;": "⇊",
			"DDotrahd;": "⤑",
			"ddotseq;": "⩷",
			"deg;": "°",
			deg: "°",
			"Del;": "∇",
			"Delta;": "Δ",
			"delta;": "δ",
			"demptyv;": "⦱",
			"dfisht;": "⥿",
			"Dfr;": "𝔇",
			"dfr;": "𝔡",
			"dHar;": "⥥",
			"dharl;": "⇃",
			"dharr;": "⇂",
			"DiacriticalAcute;": "´",
			"DiacriticalDot;": "˙",
			"DiacriticalDoubleAcute;": "˝",
			"DiacriticalGrave;": "`",
			"DiacriticalTilde;": "˜",
			"diam;": "⋄",
			"Diamond;": "⋄",
			"diamond;": "⋄",
			"diamondsuit;": "♦",
			"diams;": "♦",
			"die;": "¨",
			"DifferentialD;": "ⅆ",
			"digamma;": "ϝ",
			"disin;": "⋲",
			"div;": "÷",
			"divide;": "÷",
			divide: "÷",
			"divideontimes;": "⋇",
			"divonx;": "⋇",
			"DJcy;": "Ђ",
			"djcy;": "ђ",
			"dlcorn;": "⌞",
			"dlcrop;": "⌍",
			"dollar;": "$",
			"Dopf;": "𝔻",
			"dopf;": "𝕕",
			"Dot;": "¨",
			"dot;": "˙",
			"DotDot;": "⃜",
			"doteq;": "≐",
			"doteqdot;": "≑",
			"DotEqual;": "≐",
			"dotminus;": "∸",
			"dotplus;": "∔",
			"dotsquare;": "⊡",
			"doublebarwedge;": "⌆",
			"DoubleContourIntegral;": "∯",
			"DoubleDot;": "¨",
			"DoubleDownArrow;": "⇓",
			"DoubleLeftArrow;": "⇐",
			"DoubleLeftRightArrow;": "⇔",
			"DoubleLeftTee;": "⫤",
			"DoubleLongLeftArrow;": "⟸",
			"DoubleLongLeftRightArrow;": "⟺",
			"DoubleLongRightArrow;": "⟹",
			"DoubleRightArrow;": "⇒",
			"DoubleRightTee;": "⊨",
			"DoubleUpArrow;": "⇑",
			"DoubleUpDownArrow;": "⇕",
			"DoubleVerticalBar;": "∥",
			"DownArrow;": "↓",
			"Downarrow;": "⇓",
			"downarrow;": "↓",
			"DownArrowBar;": "⤓",
			"DownArrowUpArrow;": "⇵",
			"DownBreve;": "̑",
			"downdownarrows;": "⇊",
			"downharpoonleft;": "⇃",
			"downharpoonright;": "⇂",
			"DownLeftRightVector;": "⥐",
			"DownLeftTeeVector;": "⥞",
			"DownLeftVector;": "↽",
			"DownLeftVectorBar;": "⥖",
			"DownRightTeeVector;": "⥟",
			"DownRightVector;": "⇁",
			"DownRightVectorBar;": "⥗",
			"DownTee;": "⊤",
			"DownTeeArrow;": "↧",
			"drbkarow;": "⤐",
			"drcorn;": "⌟",
			"drcrop;": "⌌",
			"Dscr;": "𝒟",
			"dscr;": "𝒹",
			"DScy;": "Ѕ",
			"dscy;": "ѕ",
			"dsol;": "⧶",
			"Dstrok;": "Đ",
			"dstrok;": "đ",
			"dtdot;": "⋱",
			"dtri;": "▿",
			"dtrif;": "▾",
			"duarr;": "⇵",
			"duhar;": "⥯",
			"dwangle;": "⦦",
			"DZcy;": "Џ",
			"dzcy;": "џ",
			"dzigrarr;": "⟿",
			"Eacute;": "É",
			Eacute: "É",
			"eacute;": "é",
			eacute: "é",
			"easter;": "⩮",
			"Ecaron;": "Ě",
			"ecaron;": "ě",
			"ecir;": "≖",
			"Ecirc;": "Ê",
			Ecirc: "Ê",
			"ecirc;": "ê",
			ecirc: "ê",
			"ecolon;": "≕",
			"Ecy;": "Э",
			"ecy;": "э",
			"eDDot;": "⩷",
			"Edot;": "Ė",
			"eDot;": "≑",
			"edot;": "ė",
			"ee;": "ⅇ",
			"efDot;": "≒",
			"Efr;": "𝔈",
			"efr;": "𝔢",
			"eg;": "⪚",
			"Egrave;": "È",
			Egrave: "È",
			"egrave;": "è",
			egrave: "è",
			"egs;": "⪖",
			"egsdot;": "⪘",
			"el;": "⪙",
			"Element;": "∈",
			"elinters;": "⏧",
			"ell;": "ℓ",
			"els;": "⪕",
			"elsdot;": "⪗",
			"Emacr;": "Ē",
			"emacr;": "ē",
			"empty;": "∅",
			"emptyset;": "∅",
			"EmptySmallSquare;": "◻",
			"emptyv;": "∅",
			"EmptyVerySmallSquare;": "▫",
			"emsp;": " ",
			"emsp13;": " ",
			"emsp14;": " ",
			"ENG;": "Ŋ",
			"eng;": "ŋ",
			"ensp;": " ",
			"Eogon;": "Ę",
			"eogon;": "ę",
			"Eopf;": "𝔼",
			"eopf;": "𝕖",
			"epar;": "⋕",
			"eparsl;": "⧣",
			"eplus;": "⩱",
			"epsi;": "ε",
			"Epsilon;": "Ε",
			"epsilon;": "ε",
			"epsiv;": "ϵ",
			"eqcirc;": "≖",
			"eqcolon;": "≕",
			"eqsim;": "≂",
			"eqslantgtr;": "⪖",
			"eqslantless;": "⪕",
			"Equal;": "⩵",
			"equals;": "=",
			"EqualTilde;": "≂",
			"equest;": "≟",
			"Equilibrium;": "⇌",
			"equiv;": "≡",
			"equivDD;": "⩸",
			"eqvparsl;": "⧥",
			"erarr;": "⥱",
			"erDot;": "≓",
			"Escr;": "ℰ",
			"escr;": "ℯ",
			"esdot;": "≐",
			"Esim;": "⩳",
			"esim;": "≂",
			"Eta;": "Η",
			"eta;": "η",
			"ETH;": "Ð",
			ETH: "Ð",
			"eth;": "ð",
			eth: "ð",
			"Euml;": "Ë",
			Euml: "Ë",
			"euml;": "ë",
			euml: "ë",
			"euro;": "€",
			"excl;": "!",
			"exist;": "∃",
			"Exists;": "∃",
			"expectation;": "ℰ",
			"ExponentialE;": "ⅇ",
			"exponentiale;": "ⅇ",
			"fallingdotseq;": "≒",
			"Fcy;": "Ф",
			"fcy;": "ф",
			"female;": "♀",
			"ffilig;": "ﬃ",
			"fflig;": "ﬀ",
			"ffllig;": "ﬄ",
			"Ffr;": "𝔉",
			"ffr;": "𝔣",
			"filig;": "ﬁ",
			"FilledSmallSquare;": "◼",
			"FilledVerySmallSquare;": "▪",
			"fjlig;": "fj",
			"flat;": "♭",
			"fllig;": "ﬂ",
			"fltns;": "▱",
			"fnof;": "ƒ",
			"Fopf;": "𝔽",
			"fopf;": "𝕗",
			"ForAll;": "∀",
			"forall;": "∀",
			"fork;": "⋔",
			"forkv;": "⫙",
			"Fouriertrf;": "ℱ",
			"fpartint;": "⨍",
			"frac12;": "½",
			frac12: "½",
			"frac13;": "⅓",
			"frac14;": "¼",
			frac14: "¼",
			"frac15;": "⅕",
			"frac16;": "⅙",
			"frac18;": "⅛",
			"frac23;": "⅔",
			"frac25;": "⅖",
			"frac34;": "¾",
			frac34: "¾",
			"frac35;": "⅗",
			"frac38;": "⅜",
			"frac45;": "⅘",
			"frac56;": "⅚",
			"frac58;": "⅝",
			"frac78;": "⅞",
			"frasl;": "⁄",
			"frown;": "⌢",
			"Fscr;": "ℱ",
			"fscr;": "𝒻",
			"gacute;": "ǵ",
			"Gamma;": "Γ",
			"gamma;": "γ",
			"Gammad;": "Ϝ",
			"gammad;": "ϝ",
			"gap;": "⪆",
			"Gbreve;": "Ğ",
			"gbreve;": "ğ",
			"Gcedil;": "Ģ",
			"Gcirc;": "Ĝ",
			"gcirc;": "ĝ",
			"Gcy;": "Г",
			"gcy;": "г",
			"Gdot;": "Ġ",
			"gdot;": "ġ",
			"gE;": "≧",
			"ge;": "≥",
			"gEl;": "⪌",
			"gel;": "⋛",
			"geq;": "≥",
			"geqq;": "≧",
			"geqslant;": "⩾",
			"ges;": "⩾",
			"gescc;": "⪩",
			"gesdot;": "⪀",
			"gesdoto;": "⪂",
			"gesdotol;": "⪄",
			"gesl;": "⋛︀",
			"gesles;": "⪔",
			"Gfr;": "𝔊",
			"gfr;": "𝔤",
			"Gg;": "⋙",
			"gg;": "≫",
			"ggg;": "⋙",
			"gimel;": "ℷ",
			"GJcy;": "Ѓ",
			"gjcy;": "ѓ",
			"gl;": "≷",
			"gla;": "⪥",
			"glE;": "⪒",
			"glj;": "⪤",
			"gnap;": "⪊",
			"gnapprox;": "⪊",
			"gnE;": "≩",
			"gne;": "⪈",
			"gneq;": "⪈",
			"gneqq;": "≩",
			"gnsim;": "⋧",
			"Gopf;": "𝔾",
			"gopf;": "𝕘",
			"grave;": "`",
			"GreaterEqual;": "≥",
			"GreaterEqualLess;": "⋛",
			"GreaterFullEqual;": "≧",
			"GreaterGreater;": "⪢",
			"GreaterLess;": "≷",
			"GreaterSlantEqual;": "⩾",
			"GreaterTilde;": "≳",
			"Gscr;": "𝒢",
			"gscr;": "ℊ",
			"gsim;": "≳",
			"gsime;": "⪎",
			"gsiml;": "⪐",
			"GT;": ">",
			GT: ">",
			"Gt;": "≫",
			"gt;": ">",
			gt: ">",
			"gtcc;": "⪧",
			"gtcir;": "⩺",
			"gtdot;": "⋗",
			"gtlPar;": "⦕",
			"gtquest;": "⩼",
			"gtrapprox;": "⪆",
			"gtrarr;": "⥸",
			"gtrdot;": "⋗",
			"gtreqless;": "⋛",
			"gtreqqless;": "⪌",
			"gtrless;": "≷",
			"gtrsim;": "≳",
			"gvertneqq;": "≩︀",
			"gvnE;": "≩︀",
			"Hacek;": "ˇ",
			"hairsp;": " ",
			"half;": "½",
			"hamilt;": "ℋ",
			"HARDcy;": "Ъ",
			"hardcy;": "ъ",
			"hArr;": "⇔",
			"harr;": "↔",
			"harrcir;": "⥈",
			"harrw;": "↭",
			"Hat;": "^",
			"hbar;": "ℏ",
			"Hcirc;": "Ĥ",
			"hcirc;": "ĥ",
			"hearts;": "♥",
			"heartsuit;": "♥",
			"hellip;": "…",
			"hercon;": "⊹",
			"Hfr;": "ℌ",
			"hfr;": "𝔥",
			"HilbertSpace;": "ℋ",
			"hksearow;": "⤥",
			"hkswarow;": "⤦",
			"hoarr;": "⇿",
			"homtht;": "∻",
			"hookleftarrow;": "↩",
			"hookrightarrow;": "↪",
			"Hopf;": "ℍ",
			"hopf;": "𝕙",
			"horbar;": "―",
			"HorizontalLine;": "─",
			"Hscr;": "ℋ",
			"hscr;": "𝒽",
			"hslash;": "ℏ",
			"Hstrok;": "Ħ",
			"hstrok;": "ħ",
			"HumpDownHump;": "≎",
			"HumpEqual;": "≏",
			"hybull;": "⁃",
			"hyphen;": "‐",
			"Iacute;": "Í",
			Iacute: "Í",
			"iacute;": "í",
			iacute: "í",
			"ic;": "⁣",
			"Icirc;": "Î",
			Icirc: "Î",
			"icirc;": "î",
			icirc: "î",
			"Icy;": "И",
			"icy;": "и",
			"Idot;": "İ",
			"IEcy;": "Е",
			"iecy;": "е",
			"iexcl;": "¡",
			iexcl: "¡",
			"iff;": "⇔",
			"Ifr;": "ℑ",
			"ifr;": "𝔦",
			"Igrave;": "Ì",
			Igrave: "Ì",
			"igrave;": "ì",
			igrave: "ì",
			"ii;": "ⅈ",
			"iiiint;": "⨌",
			"iiint;": "∭",
			"iinfin;": "⧜",
			"iiota;": "℩",
			"IJlig;": "Ĳ",
			"ijlig;": "ĳ",
			"Im;": "ℑ",
			"Imacr;": "Ī",
			"imacr;": "ī",
			"image;": "ℑ",
			"ImaginaryI;": "ⅈ",
			"imagline;": "ℐ",
			"imagpart;": "ℑ",
			"imath;": "ı",
			"imof;": "⊷",
			"imped;": "Ƶ",
			"Implies;": "⇒",
			"in;": "∈",
			"incare;": "℅",
			"infin;": "∞",
			"infintie;": "⧝",
			"inodot;": "ı",
			"Int;": "∬",
			"int;": "∫",
			"intcal;": "⊺",
			"integers;": "ℤ",
			"Integral;": "∫",
			"intercal;": "⊺",
			"Intersection;": "⋂",
			"intlarhk;": "⨗",
			"intprod;": "⨼",
			"InvisibleComma;": "⁣",
			"InvisibleTimes;": "⁢",
			"IOcy;": "Ё",
			"iocy;": "ё",
			"Iogon;": "Į",
			"iogon;": "į",
			"Iopf;": "𝕀",
			"iopf;": "𝕚",
			"Iota;": "Ι",
			"iota;": "ι",
			"iprod;": "⨼",
			"iquest;": "¿",
			iquest: "¿",
			"Iscr;": "ℐ",
			"iscr;": "𝒾",
			"isin;": "∈",
			"isindot;": "⋵",
			"isinE;": "⋹",
			"isins;": "⋴",
			"isinsv;": "⋳",
			"isinv;": "∈",
			"it;": "⁢",
			"Itilde;": "Ĩ",
			"itilde;": "ĩ",
			"Iukcy;": "І",
			"iukcy;": "і",
			"Iuml;": "Ï",
			Iuml: "Ï",
			"iuml;": "ï",
			iuml: "ï",
			"Jcirc;": "Ĵ",
			"jcirc;": "ĵ",
			"Jcy;": "Й",
			"jcy;": "й",
			"Jfr;": "𝔍",
			"jfr;": "𝔧",
			"jmath;": "ȷ",
			"Jopf;": "𝕁",
			"jopf;": "𝕛",
			"Jscr;": "𝒥",
			"jscr;": "𝒿",
			"Jsercy;": "Ј",
			"jsercy;": "ј",
			"Jukcy;": "Є",
			"jukcy;": "є",
			"Kappa;": "Κ",
			"kappa;": "κ",
			"kappav;": "ϰ",
			"Kcedil;": "Ķ",
			"kcedil;": "ķ",
			"Kcy;": "К",
			"kcy;": "к",
			"Kfr;": "𝔎",
			"kfr;": "𝔨",
			"kgreen;": "ĸ",
			"KHcy;": "Х",
			"khcy;": "х",
			"KJcy;": "Ќ",
			"kjcy;": "ќ",
			"Kopf;": "𝕂",
			"kopf;": "𝕜",
			"Kscr;": "𝒦",
			"kscr;": "𝓀",
			"lAarr;": "⇚",
			"Lacute;": "Ĺ",
			"lacute;": "ĺ",
			"laemptyv;": "⦴",
			"lagran;": "ℒ",
			"Lambda;": "Λ",
			"lambda;": "λ",
			"Lang;": "⟪",
			"lang;": "⟨",
			"langd;": "⦑",
			"langle;": "⟨",
			"lap;": "⪅",
			"Laplacetrf;": "ℒ",
			"laquo;": "«",
			laquo: "«",
			"Larr;": "↞",
			"lArr;": "⇐",
			"larr;": "←",
			"larrb;": "⇤",
			"larrbfs;": "⤟",
			"larrfs;": "⤝",
			"larrhk;": "↩",
			"larrlp;": "↫",
			"larrpl;": "⤹",
			"larrsim;": "⥳",
			"larrtl;": "↢",
			"lat;": "⪫",
			"lAtail;": "⤛",
			"latail;": "⤙",
			"late;": "⪭",
			"lates;": "⪭︀",
			"lBarr;": "⤎",
			"lbarr;": "⤌",
			"lbbrk;": "❲",
			"lbrace;": "{",
			"lbrack;": "[",
			"lbrke;": "⦋",
			"lbrksld;": "⦏",
			"lbrkslu;": "⦍",
			"Lcaron;": "Ľ",
			"lcaron;": "ľ",
			"Lcedil;": "Ļ",
			"lcedil;": "ļ",
			"lceil;": "⌈",
			"lcub;": "{",
			"Lcy;": "Л",
			"lcy;": "л",
			"ldca;": "⤶",
			"ldquo;": "“",
			"ldquor;": "„",
			"ldrdhar;": "⥧",
			"ldrushar;": "⥋",
			"ldsh;": "↲",
			"lE;": "≦",
			"le;": "≤",
			"LeftAngleBracket;": "⟨",
			"LeftArrow;": "←",
			"Leftarrow;": "⇐",
			"leftarrow;": "←",
			"LeftArrowBar;": "⇤",
			"LeftArrowRightArrow;": "⇆",
			"leftarrowtail;": "↢",
			"LeftCeiling;": "⌈",
			"LeftDoubleBracket;": "⟦",
			"LeftDownTeeVector;": "⥡",
			"LeftDownVector;": "⇃",
			"LeftDownVectorBar;": "⥙",
			"LeftFloor;": "⌊",
			"leftharpoondown;": "↽",
			"leftharpoonup;": "↼",
			"leftleftarrows;": "⇇",
			"LeftRightArrow;": "↔",
			"Leftrightarrow;": "⇔",
			"leftrightarrow;": "↔",
			"leftrightarrows;": "⇆",
			"leftrightharpoons;": "⇋",
			"leftrightsquigarrow;": "↭",
			"LeftRightVector;": "⥎",
			"LeftTee;": "⊣",
			"LeftTeeArrow;": "↤",
			"LeftTeeVector;": "⥚",
			"leftthreetimes;": "⋋",
			"LeftTriangle;": "⊲",
			"LeftTriangleBar;": "⧏",
			"LeftTriangleEqual;": "⊴",
			"LeftUpDownVector;": "⥑",
			"LeftUpTeeVector;": "⥠",
			"LeftUpVector;": "↿",
			"LeftUpVectorBar;": "⥘",
			"LeftVector;": "↼",
			"LeftVectorBar;": "⥒",
			"lEg;": "⪋",
			"leg;": "⋚",
			"leq;": "≤",
			"leqq;": "≦",
			"leqslant;": "⩽",
			"les;": "⩽",
			"lescc;": "⪨",
			"lesdot;": "⩿",
			"lesdoto;": "⪁",
			"lesdotor;": "⪃",
			"lesg;": "⋚︀",
			"lesges;": "⪓",
			"lessapprox;": "⪅",
			"lessdot;": "⋖",
			"lesseqgtr;": "⋚",
			"lesseqqgtr;": "⪋",
			"LessEqualGreater;": "⋚",
			"LessFullEqual;": "≦",
			"LessGreater;": "≶",
			"lessgtr;": "≶",
			"LessLess;": "⪡",
			"lesssim;": "≲",
			"LessSlantEqual;": "⩽",
			"LessTilde;": "≲",
			"lfisht;": "⥼",
			"lfloor;": "⌊",
			"Lfr;": "𝔏",
			"lfr;": "𝔩",
			"lg;": "≶",
			"lgE;": "⪑",
			"lHar;": "⥢",
			"lhard;": "↽",
			"lharu;": "↼",
			"lharul;": "⥪",
			"lhblk;": "▄",
			"LJcy;": "Љ",
			"ljcy;": "љ",
			"Ll;": "⋘",
			"ll;": "≪",
			"llarr;": "⇇",
			"llcorner;": "⌞",
			"Lleftarrow;": "⇚",
			"llhard;": "⥫",
			"lltri;": "◺",
			"Lmidot;": "Ŀ",
			"lmidot;": "ŀ",
			"lmoust;": "⎰",
			"lmoustache;": "⎰",
			"lnap;": "⪉",
			"lnapprox;": "⪉",
			"lnE;": "≨",
			"lne;": "⪇",
			"lneq;": "⪇",
			"lneqq;": "≨",
			"lnsim;": "⋦",
			"loang;": "⟬",
			"loarr;": "⇽",
			"lobrk;": "⟦",
			"LongLeftArrow;": "⟵",
			"Longleftarrow;": "⟸",
			"longleftarrow;": "⟵",
			"LongLeftRightArrow;": "⟷",
			"Longleftrightarrow;": "⟺",
			"longleftrightarrow;": "⟷",
			"longmapsto;": "⟼",
			"LongRightArrow;": "⟶",
			"Longrightarrow;": "⟹",
			"longrightarrow;": "⟶",
			"looparrowleft;": "↫",
			"looparrowright;": "↬",
			"lopar;": "⦅",
			"Lopf;": "𝕃",
			"lopf;": "𝕝",
			"loplus;": "⨭",
			"lotimes;": "⨴",
			"lowast;": "∗",
			"lowbar;": "_",
			"LowerLeftArrow;": "↙",
			"LowerRightArrow;": "↘",
			"loz;": "◊",
			"lozenge;": "◊",
			"lozf;": "⧫",
			"lpar;": "(",
			"lparlt;": "⦓",
			"lrarr;": "⇆",
			"lrcorner;": "⌟",
			"lrhar;": "⇋",
			"lrhard;": "⥭",
			"lrm;": "‎",
			"lrtri;": "⊿",
			"lsaquo;": "‹",
			"Lscr;": "ℒ",
			"lscr;": "𝓁",
			"Lsh;": "↰",
			"lsh;": "↰",
			"lsim;": "≲",
			"lsime;": "⪍",
			"lsimg;": "⪏",
			"lsqb;": "[",
			"lsquo;": "‘",
			"lsquor;": "‚",
			"Lstrok;": "Ł",
			"lstrok;": "ł",
			"LT;": "<",
			LT: "<",
			"Lt;": "≪",
			"lt;": "<",
			lt: "<",
			"ltcc;": "⪦",
			"ltcir;": "⩹",
			"ltdot;": "⋖",
			"lthree;": "⋋",
			"ltimes;": "⋉",
			"ltlarr;": "⥶",
			"ltquest;": "⩻",
			"ltri;": "◃",
			"ltrie;": "⊴",
			"ltrif;": "◂",
			"ltrPar;": "⦖",
			"lurdshar;": "⥊",
			"luruhar;": "⥦",
			"lvertneqq;": "≨︀",
			"lvnE;": "≨︀",
			"macr;": "¯",
			macr: "¯",
			"male;": "♂",
			"malt;": "✠",
			"maltese;": "✠",
			"Map;": "⤅",
			"map;": "↦",
			"mapsto;": "↦",
			"mapstodown;": "↧",
			"mapstoleft;": "↤",
			"mapstoup;": "↥",
			"marker;": "▮",
			"mcomma;": "⨩",
			"Mcy;": "М",
			"mcy;": "м",
			"mdash;": "—",
			"mDDot;": "∺",
			"measuredangle;": "∡",
			"MediumSpace;": " ",
			"Mellintrf;": "ℳ",
			"Mfr;": "𝔐",
			"mfr;": "𝔪",
			"mho;": "℧",
			"micro;": "µ",
			micro: "µ",
			"mid;": "∣",
			"midast;": "*",
			"midcir;": "⫰",
			"middot;": "·",
			middot: "·",
			"minus;": "−",
			"minusb;": "⊟",
			"minusd;": "∸",
			"minusdu;": "⨪",
			"MinusPlus;": "∓",
			"mlcp;": "⫛",
			"mldr;": "…",
			"mnplus;": "∓",
			"models;": "⊧",
			"Mopf;": "𝕄",
			"mopf;": "𝕞",
			"mp;": "∓",
			"Mscr;": "ℳ",
			"mscr;": "𝓂",
			"mstpos;": "∾",
			"Mu;": "Μ",
			"mu;": "μ",
			"multimap;": "⊸",
			"mumap;": "⊸",
			"nabla;": "∇",
			"Nacute;": "Ń",
			"nacute;": "ń",
			"nang;": "∠⃒",
			"nap;": "≉",
			"napE;": "⩰̸",
			"napid;": "≋̸",
			"napos;": "ŉ",
			"napprox;": "≉",
			"natur;": "♮",
			"natural;": "♮",
			"naturals;": "ℕ",
			"nbsp;": " ",
			nbsp: " ",
			"nbump;": "≎̸",
			"nbumpe;": "≏̸",
			"ncap;": "⩃",
			"Ncaron;": "Ň",
			"ncaron;": "ň",
			"Ncedil;": "Ņ",
			"ncedil;": "ņ",
			"ncong;": "≇",
			"ncongdot;": "⩭̸",
			"ncup;": "⩂",
			"Ncy;": "Н",
			"ncy;": "н",
			"ndash;": "–",
			"ne;": "≠",
			"nearhk;": "⤤",
			"neArr;": "⇗",
			"nearr;": "↗",
			"nearrow;": "↗",
			"nedot;": "≐̸",
			"NegativeMediumSpace;": "​",
			"NegativeThickSpace;": "​",
			"NegativeThinSpace;": "​",
			"NegativeVeryThinSpace;": "​",
			"nequiv;": "≢",
			"nesear;": "⤨",
			"nesim;": "≂̸",
			"NestedGreaterGreater;": "≫",
			"NestedLessLess;": "≪",
			"NewLine;": "\n",
			"nexist;": "∄",
			"nexists;": "∄",
			"Nfr;": "𝔑",
			"nfr;": "𝔫",
			"ngE;": "≧̸",
			"nge;": "≱",
			"ngeq;": "≱",
			"ngeqq;": "≧̸",
			"ngeqslant;": "⩾̸",
			"nges;": "⩾̸",
			"nGg;": "⋙̸",
			"ngsim;": "≵",
			"nGt;": "≫⃒",
			"ngt;": "≯",
			"ngtr;": "≯",
			"nGtv;": "≫̸",
			"nhArr;": "⇎",
			"nharr;": "↮",
			"nhpar;": "⫲",
			"ni;": "∋",
			"nis;": "⋼",
			"nisd;": "⋺",
			"niv;": "∋",
			"NJcy;": "Њ",
			"njcy;": "њ",
			"nlArr;": "⇍",
			"nlarr;": "↚",
			"nldr;": "‥",
			"nlE;": "≦̸",
			"nle;": "≰",
			"nLeftarrow;": "⇍",
			"nleftarrow;": "↚",
			"nLeftrightarrow;": "⇎",
			"nleftrightarrow;": "↮",
			"nleq;": "≰",
			"nleqq;": "≦̸",
			"nleqslant;": "⩽̸",
			"nles;": "⩽̸",
			"nless;": "≮",
			"nLl;": "⋘̸",
			"nlsim;": "≴",
			"nLt;": "≪⃒",
			"nlt;": "≮",
			"nltri;": "⋪",
			"nltrie;": "⋬",
			"nLtv;": "≪̸",
			"nmid;": "∤",
			"NoBreak;": "⁠",
			"NonBreakingSpace;": " ",
			"Nopf;": "ℕ",
			"nopf;": "𝕟",
			"Not;": "⫬",
			"not;": "¬",
			not: "¬",
			"NotCongruent;": "≢",
			"NotCupCap;": "≭",
			"NotDoubleVerticalBar;": "∦",
			"NotElement;": "∉",
			"NotEqual;": "≠",
			"NotEqualTilde;": "≂̸",
			"NotExists;": "∄",
			"NotGreater;": "≯",
			"NotGreaterEqual;": "≱",
			"NotGreaterFullEqual;": "≧̸",
			"NotGreaterGreater;": "≫̸",
			"NotGreaterLess;": "≹",
			"NotGreaterSlantEqual;": "⩾̸",
			"NotGreaterTilde;": "≵",
			"NotHumpDownHump;": "≎̸",
			"NotHumpEqual;": "≏̸",
			"notin;": "∉",
			"notindot;": "⋵̸",
			"notinE;": "⋹̸",
			"notinva;": "∉",
			"notinvb;": "⋷",
			"notinvc;": "⋶",
			"NotLeftTriangle;": "⋪",
			"NotLeftTriangleBar;": "⧏̸",
			"NotLeftTriangleEqual;": "⋬",
			"NotLess;": "≮",
			"NotLessEqual;": "≰",
			"NotLessGreater;": "≸",
			"NotLessLess;": "≪̸",
			"NotLessSlantEqual;": "⩽̸",
			"NotLessTilde;": "≴",
			"NotNestedGreaterGreater;": "⪢̸",
			"NotNestedLessLess;": "⪡̸",
			"notni;": "∌",
			"notniva;": "∌",
			"notnivb;": "⋾",
			"notnivc;": "⋽",
			"NotPrecedes;": "⊀",
			"NotPrecedesEqual;": "⪯̸",
			"NotPrecedesSlantEqual;": "⋠",
			"NotReverseElement;": "∌",
			"NotRightTriangle;": "⋫",
			"NotRightTriangleBar;": "⧐̸",
			"NotRightTriangleEqual;": "⋭",
			"NotSquareSubset;": "⊏̸",
			"NotSquareSubsetEqual;": "⋢",
			"NotSquareSuperset;": "⊐̸",
			"NotSquareSupersetEqual;": "⋣",
			"NotSubset;": "⊂⃒",
			"NotSubsetEqual;": "⊈",
			"NotSucceeds;": "⊁",
			"NotSucceedsEqual;": "⪰̸",
			"NotSucceedsSlantEqual;": "⋡",
			"NotSucceedsTilde;": "≿̸",
			"NotSuperset;": "⊃⃒",
			"NotSupersetEqual;": "⊉",
			"NotTilde;": "≁",
			"NotTildeEqual;": "≄",
			"NotTildeFullEqual;": "≇",
			"NotTildeTilde;": "≉",
			"NotVerticalBar;": "∤",
			"npar;": "∦",
			"nparallel;": "∦",
			"nparsl;": "⫽⃥",
			"npart;": "∂̸",
			"npolint;": "⨔",
			"npr;": "⊀",
			"nprcue;": "⋠",
			"npre;": "⪯̸",
			"nprec;": "⊀",
			"npreceq;": "⪯̸",
			"nrArr;": "⇏",
			"nrarr;": "↛",
			"nrarrc;": "⤳̸",
			"nrarrw;": "↝̸",
			"nRightarrow;": "⇏",
			"nrightarrow;": "↛",
			"nrtri;": "⋫",
			"nrtrie;": "⋭",
			"nsc;": "⊁",
			"nsccue;": "⋡",
			"nsce;": "⪰̸",
			"Nscr;": "𝒩",
			"nscr;": "𝓃",
			"nshortmid;": "∤",
			"nshortparallel;": "∦",
			"nsim;": "≁",
			"nsime;": "≄",
			"nsimeq;": "≄",
			"nsmid;": "∤",
			"nspar;": "∦",
			"nsqsube;": "⋢",
			"nsqsupe;": "⋣",
			"nsub;": "⊄",
			"nsubE;": "⫅̸",
			"nsube;": "⊈",
			"nsubset;": "⊂⃒",
			"nsubseteq;": "⊈",
			"nsubseteqq;": "⫅̸",
			"nsucc;": "⊁",
			"nsucceq;": "⪰̸",
			"nsup;": "⊅",
			"nsupE;": "⫆̸",
			"nsupe;": "⊉",
			"nsupset;": "⊃⃒",
			"nsupseteq;": "⊉",
			"nsupseteqq;": "⫆̸",
			"ntgl;": "≹",
			"Ntilde;": "Ñ",
			Ntilde: "Ñ",
			"ntilde;": "ñ",
			ntilde: "ñ",
			"ntlg;": "≸",
			"ntriangleleft;": "⋪",
			"ntrianglelefteq;": "⋬",
			"ntriangleright;": "⋫",
			"ntrianglerighteq;": "⋭",
			"Nu;": "Ν",
			"nu;": "ν",
			"num;": "#",
			"numero;": "№",
			"numsp;": " ",
			"nvap;": "≍⃒",
			"nVDash;": "⊯",
			"nVdash;": "⊮",
			"nvDash;": "⊭",
			"nvdash;": "⊬",
			"nvge;": "≥⃒",
			"nvgt;": ">⃒",
			"nvHarr;": "⤄",
			"nvinfin;": "⧞",
			"nvlArr;": "⤂",
			"nvle;": "≤⃒",
			"nvlt;": "<⃒",
			"nvltrie;": "⊴⃒",
			"nvrArr;": "⤃",
			"nvrtrie;": "⊵⃒",
			"nvsim;": "∼⃒",
			"nwarhk;": "⤣",
			"nwArr;": "⇖",
			"nwarr;": "↖",
			"nwarrow;": "↖",
			"nwnear;": "⤧",
			"Oacute;": "Ó",
			Oacute: "Ó",
			"oacute;": "ó",
			oacute: "ó",
			"oast;": "⊛",
			"ocir;": "⊚",
			"Ocirc;": "Ô",
			Ocirc: "Ô",
			"ocirc;": "ô",
			ocirc: "ô",
			"Ocy;": "О",
			"ocy;": "о",
			"odash;": "⊝",
			"Odblac;": "Ő",
			"odblac;": "ő",
			"odiv;": "⨸",
			"odot;": "⊙",
			"odsold;": "⦼",
			"OElig;": "Œ",
			"oelig;": "œ",
			"ofcir;": "⦿",
			"Ofr;": "𝔒",
			"ofr;": "𝔬",
			"ogon;": "˛",
			"Ograve;": "Ò",
			Ograve: "Ò",
			"ograve;": "ò",
			ograve: "ò",
			"ogt;": "⧁",
			"ohbar;": "⦵",
			"ohm;": "Ω",
			"oint;": "∮",
			"olarr;": "↺",
			"olcir;": "⦾",
			"olcross;": "⦻",
			"oline;": "‾",
			"olt;": "⧀",
			"Omacr;": "Ō",
			"omacr;": "ō",
			"Omega;": "Ω",
			"omega;": "ω",
			"Omicron;": "Ο",
			"omicron;": "ο",
			"omid;": "⦶",
			"ominus;": "⊖",
			"Oopf;": "𝕆",
			"oopf;": "𝕠",
			"opar;": "⦷",
			"OpenCurlyDoubleQuote;": "“",
			"OpenCurlyQuote;": "‘",
			"operp;": "⦹",
			"oplus;": "⊕",
			"Or;": "⩔",
			"or;": "∨",
			"orarr;": "↻",
			"ord;": "⩝",
			"order;": "ℴ",
			"orderof;": "ℴ",
			"ordf;": "ª",
			ordf: "ª",
			"ordm;": "º",
			ordm: "º",
			"origof;": "⊶",
			"oror;": "⩖",
			"orslope;": "⩗",
			"orv;": "⩛",
			"oS;": "Ⓢ",
			"Oscr;": "𝒪",
			"oscr;": "ℴ",
			"Oslash;": "Ø",
			Oslash: "Ø",
			"oslash;": "ø",
			oslash: "ø",
			"osol;": "⊘",
			"Otilde;": "Õ",
			Otilde: "Õ",
			"otilde;": "õ",
			otilde: "õ",
			"Otimes;": "⨷",
			"otimes;": "⊗",
			"otimesas;": "⨶",
			"Ouml;": "Ö",
			Ouml: "Ö",
			"ouml;": "ö",
			ouml: "ö",
			"ovbar;": "⌽",
			"OverBar;": "‾",
			"OverBrace;": "⏞",
			"OverBracket;": "⎴",
			"OverParenthesis;": "⏜",
			"par;": "∥",
			"para;": "¶",
			para: "¶",
			"parallel;": "∥",
			"parsim;": "⫳",
			"parsl;": "⫽",
			"part;": "∂",
			"PartialD;": "∂",
			"Pcy;": "П",
			"pcy;": "п",
			"percnt;": "%",
			"period;": ".",
			"permil;": "‰",
			"perp;": "⊥",
			"pertenk;": "‱",
			"Pfr;": "𝔓",
			"pfr;": "𝔭",
			"Phi;": "Φ",
			"phi;": "φ",
			"phiv;": "ϕ",
			"phmmat;": "ℳ",
			"phone;": "☎",
			"Pi;": "Π",
			"pi;": "π",
			"pitchfork;": "⋔",
			"piv;": "ϖ",
			"planck;": "ℏ",
			"planckh;": "ℎ",
			"plankv;": "ℏ",
			"plus;": "+",
			"plusacir;": "⨣",
			"plusb;": "⊞",
			"pluscir;": "⨢",
			"plusdo;": "∔",
			"plusdu;": "⨥",
			"pluse;": "⩲",
			"PlusMinus;": "±",
			"plusmn;": "±",
			plusmn: "±",
			"plussim;": "⨦",
			"plustwo;": "⨧",
			"pm;": "±",
			"Poincareplane;": "ℌ",
			"pointint;": "⨕",
			"Popf;": "ℙ",
			"popf;": "𝕡",
			"pound;": "£",
			pound: "£",
			"Pr;": "⪻",
			"pr;": "≺",
			"prap;": "⪷",
			"prcue;": "≼",
			"prE;": "⪳",
			"pre;": "⪯",
			"prec;": "≺",
			"precapprox;": "⪷",
			"preccurlyeq;": "≼",
			"Precedes;": "≺",
			"PrecedesEqual;": "⪯",
			"PrecedesSlantEqual;": "≼",
			"PrecedesTilde;": "≾",
			"preceq;": "⪯",
			"precnapprox;": "⪹",
			"precneqq;": "⪵",
			"precnsim;": "⋨",
			"precsim;": "≾",
			"Prime;": "″",
			"prime;": "′",
			"primes;": "ℙ",
			"prnap;": "⪹",
			"prnE;": "⪵",
			"prnsim;": "⋨",
			"prod;": "∏",
			"Product;": "∏",
			"profalar;": "⌮",
			"profline;": "⌒",
			"profsurf;": "⌓",
			"prop;": "∝",
			"Proportion;": "∷",
			"Proportional;": "∝",
			"propto;": "∝",
			"prsim;": "≾",
			"prurel;": "⊰",
			"Pscr;": "𝒫",
			"pscr;": "𝓅",
			"Psi;": "Ψ",
			"psi;": "ψ",
			"puncsp;": " ",
			"Qfr;": "𝔔",
			"qfr;": "𝔮",
			"qint;": "⨌",
			"Qopf;": "ℚ",
			"qopf;": "𝕢",
			"qprime;": "⁗",
			"Qscr;": "𝒬",
			"qscr;": "𝓆",
			"quaternions;": "ℍ",
			"quatint;": "⨖",
			"quest;": "?",
			"questeq;": "≟",
			"QUOT;": '"',
			QUOT: '"',
			"quot;": '"',
			quot: '"',
			"rAarr;": "⇛",
			"race;": "∽̱",
			"Racute;": "Ŕ",
			"racute;": "ŕ",
			"radic;": "√",
			"raemptyv;": "⦳",
			"Rang;": "⟫",
			"rang;": "⟩",
			"rangd;": "⦒",
			"range;": "⦥",
			"rangle;": "⟩",
			"raquo;": "»",
			raquo: "»",
			"Rarr;": "↠",
			"rArr;": "⇒",
			"rarr;": "→",
			"rarrap;": "⥵",
			"rarrb;": "⇥",
			"rarrbfs;": "⤠",
			"rarrc;": "⤳",
			"rarrfs;": "⤞",
			"rarrhk;": "↪",
			"rarrlp;": "↬",
			"rarrpl;": "⥅",
			"rarrsim;": "⥴",
			"Rarrtl;": "⤖",
			"rarrtl;": "↣",
			"rarrw;": "↝",
			"rAtail;": "⤜",
			"ratail;": "⤚",
			"ratio;": "∶",
			"rationals;": "ℚ",
			"RBarr;": "⤐",
			"rBarr;": "⤏",
			"rbarr;": "⤍",
			"rbbrk;": "❳",
			"rbrace;": "}",
			"rbrack;": "]",
			"rbrke;": "⦌",
			"rbrksld;": "⦎",
			"rbrkslu;": "⦐",
			"Rcaron;": "Ř",
			"rcaron;": "ř",
			"Rcedil;": "Ŗ",
			"rcedil;": "ŗ",
			"rceil;": "⌉",
			"rcub;": "}",
			"Rcy;": "Р",
			"rcy;": "р",
			"rdca;": "⤷",
			"rdldhar;": "⥩",
			"rdquo;": "”",
			"rdquor;": "”",
			"rdsh;": "↳",
			"Re;": "ℜ",
			"real;": "ℜ",
			"realine;": "ℛ",
			"realpart;": "ℜ",
			"reals;": "ℝ",
			"rect;": "▭",
			"REG;": "®",
			REG: "®",
			"reg;": "®",
			reg: "®",
			"ReverseElement;": "∋",
			"ReverseEquilibrium;": "⇋",
			"ReverseUpEquilibrium;": "⥯",
			"rfisht;": "⥽",
			"rfloor;": "⌋",
			"Rfr;": "ℜ",
			"rfr;": "𝔯",
			"rHar;": "⥤",
			"rhard;": "⇁",
			"rharu;": "⇀",
			"rharul;": "⥬",
			"Rho;": "Ρ",
			"rho;": "ρ",
			"rhov;": "ϱ",
			"RightAngleBracket;": "⟩",
			"RightArrow;": "→",
			"Rightarrow;": "⇒",
			"rightarrow;": "→",
			"RightArrowBar;": "⇥",
			"RightArrowLeftArrow;": "⇄",
			"rightarrowtail;": "↣",
			"RightCeiling;": "⌉",
			"RightDoubleBracket;": "⟧",
			"RightDownTeeVector;": "⥝",
			"RightDownVector;": "⇂",
			"RightDownVectorBar;": "⥕",
			"RightFloor;": "⌋",
			"rightharpoondown;": "⇁",
			"rightharpoonup;": "⇀",
			"rightleftarrows;": "⇄",
			"rightleftharpoons;": "⇌",
			"rightrightarrows;": "⇉",
			"rightsquigarrow;": "↝",
			"RightTee;": "⊢",
			"RightTeeArrow;": "↦",
			"RightTeeVector;": "⥛",
			"rightthreetimes;": "⋌",
			"RightTriangle;": "⊳",
			"RightTriangleBar;": "⧐",
			"RightTriangleEqual;": "⊵",
			"RightUpDownVector;": "⥏",
			"RightUpTeeVector;": "⥜",
			"RightUpVector;": "↾",
			"RightUpVectorBar;": "⥔",
			"RightVector;": "⇀",
			"RightVectorBar;": "⥓",
			"ring;": "˚",
			"risingdotseq;": "≓",
			"rlarr;": "⇄",
			"rlhar;": "⇌",
			"rlm;": "‏",
			"rmoust;": "⎱",
			"rmoustache;": "⎱",
			"rnmid;": "⫮",
			"roang;": "⟭",
			"roarr;": "⇾",
			"robrk;": "⟧",
			"ropar;": "⦆",
			"Ropf;": "ℝ",
			"ropf;": "𝕣",
			"roplus;": "⨮",
			"rotimes;": "⨵",
			"RoundImplies;": "⥰",
			"rpar;": ")",
			"rpargt;": "⦔",
			"rppolint;": "⨒",
			"rrarr;": "⇉",
			"Rrightarrow;": "⇛",
			"rsaquo;": "›",
			"Rscr;": "ℛ",
			"rscr;": "𝓇",
			"Rsh;": "↱",
			"rsh;": "↱",
			"rsqb;": "]",
			"rsquo;": "’",
			"rsquor;": "’",
			"rthree;": "⋌",
			"rtimes;": "⋊",
			"rtri;": "▹",
			"rtrie;": "⊵",
			"rtrif;": "▸",
			"rtriltri;": "⧎",
			"RuleDelayed;": "⧴",
			"ruluhar;": "⥨",
			"rx;": "℞",
			"Sacute;": "Ś",
			"sacute;": "ś",
			"sbquo;": "‚",
			"Sc;": "⪼",
			"sc;": "≻",
			"scap;": "⪸",
			"Scaron;": "Š",
			"scaron;": "š",
			"sccue;": "≽",
			"scE;": "⪴",
			"sce;": "⪰",
			"Scedil;": "Ş",
			"scedil;": "ş",
			"Scirc;": "Ŝ",
			"scirc;": "ŝ",
			"scnap;": "⪺",
			"scnE;": "⪶",
			"scnsim;": "⋩",
			"scpolint;": "⨓",
			"scsim;": "≿",
			"Scy;": "С",
			"scy;": "с",
			"sdot;": "⋅",
			"sdotb;": "⊡",
			"sdote;": "⩦",
			"searhk;": "⤥",
			"seArr;": "⇘",
			"searr;": "↘",
			"searrow;": "↘",
			"sect;": "§",
			sect: "§",
			"semi;": ";",
			"seswar;": "⤩",
			"setminus;": "∖",
			"setmn;": "∖",
			"sext;": "✶",
			"Sfr;": "𝔖",
			"sfr;": "𝔰",
			"sfrown;": "⌢",
			"sharp;": "♯",
			"SHCHcy;": "Щ",
			"shchcy;": "щ",
			"SHcy;": "Ш",
			"shcy;": "ш",
			"ShortDownArrow;": "↓",
			"ShortLeftArrow;": "←",
			"shortmid;": "∣",
			"shortparallel;": "∥",
			"ShortRightArrow;": "→",
			"ShortUpArrow;": "↑",
			"shy;": "­",
			shy: "­",
			"Sigma;": "Σ",
			"sigma;": "σ",
			"sigmaf;": "ς",
			"sigmav;": "ς",
			"sim;": "∼",
			"simdot;": "⩪",
			"sime;": "≃",
			"simeq;": "≃",
			"simg;": "⪞",
			"simgE;": "⪠",
			"siml;": "⪝",
			"simlE;": "⪟",
			"simne;": "≆",
			"simplus;": "⨤",
			"simrarr;": "⥲",
			"slarr;": "←",
			"SmallCircle;": "∘",
			"smallsetminus;": "∖",
			"smashp;": "⨳",
			"smeparsl;": "⧤",
			"smid;": "∣",
			"smile;": "⌣",
			"smt;": "⪪",
			"smte;": "⪬",
			"smtes;": "⪬︀",
			"SOFTcy;": "Ь",
			"softcy;": "ь",
			"sol;": "/",
			"solb;": "⧄",
			"solbar;": "⌿",
			"Sopf;": "𝕊",
			"sopf;": "𝕤",
			"spades;": "♠",
			"spadesuit;": "♠",
			"spar;": "∥",
			"sqcap;": "⊓",
			"sqcaps;": "⊓︀",
			"sqcup;": "⊔",
			"sqcups;": "⊔︀",
			"Sqrt;": "√",
			"sqsub;": "⊏",
			"sqsube;": "⊑",
			"sqsubset;": "⊏",
			"sqsubseteq;": "⊑",
			"sqsup;": "⊐",
			"sqsupe;": "⊒",
			"sqsupset;": "⊐",
			"sqsupseteq;": "⊒",
			"squ;": "□",
			"Square;": "□",
			"square;": "□",
			"SquareIntersection;": "⊓",
			"SquareSubset;": "⊏",
			"SquareSubsetEqual;": "⊑",
			"SquareSuperset;": "⊐",
			"SquareSupersetEqual;": "⊒",
			"SquareUnion;": "⊔",
			"squarf;": "▪",
			"squf;": "▪",
			"srarr;": "→",
			"Sscr;": "𝒮",
			"sscr;": "𝓈",
			"ssetmn;": "∖",
			"ssmile;": "⌣",
			"sstarf;": "⋆",
			"Star;": "⋆",
			"star;": "☆",
			"starf;": "★",
			"straightepsilon;": "ϵ",
			"straightphi;": "ϕ",
			"strns;": "¯",
			"Sub;": "⋐",
			"sub;": "⊂",
			"subdot;": "⪽",
			"subE;": "⫅",
			"sube;": "⊆",
			"subedot;": "⫃",
			"submult;": "⫁",
			"subnE;": "⫋",
			"subne;": "⊊",
			"subplus;": "⪿",
			"subrarr;": "⥹",
			"Subset;": "⋐",
			"subset;": "⊂",
			"subseteq;": "⊆",
			"subseteqq;": "⫅",
			"SubsetEqual;": "⊆",
			"subsetneq;": "⊊",
			"subsetneqq;": "⫋",
			"subsim;": "⫇",
			"subsub;": "⫕",
			"subsup;": "⫓",
			"succ;": "≻",
			"succapprox;": "⪸",
			"succcurlyeq;": "≽",
			"Succeeds;": "≻",
			"SucceedsEqual;": "⪰",
			"SucceedsSlantEqual;": "≽",
			"SucceedsTilde;": "≿",
			"succeq;": "⪰",
			"succnapprox;": "⪺",
			"succneqq;": "⪶",
			"succnsim;": "⋩",
			"succsim;": "≿",
			"SuchThat;": "∋",
			"Sum;": "∑",
			"sum;": "∑",
			"sung;": "♪",
			"Sup;": "⋑",
			"sup;": "⊃",
			"sup1;": "¹",
			sup1: "¹",
			"sup2;": "²",
			sup2: "²",
			"sup3;": "³",
			sup3: "³",
			"supdot;": "⪾",
			"supdsub;": "⫘",
			"supE;": "⫆",
			"supe;": "⊇",
			"supedot;": "⫄",
			"Superset;": "⊃",
			"SupersetEqual;": "⊇",
			"suphsol;": "⟉",
			"suphsub;": "⫗",
			"suplarr;": "⥻",
			"supmult;": "⫂",
			"supnE;": "⫌",
			"supne;": "⊋",
			"supplus;": "⫀",
			"Supset;": "⋑",
			"supset;": "⊃",
			"supseteq;": "⊇",
			"supseteqq;": "⫆",
			"supsetneq;": "⊋",
			"supsetneqq;": "⫌",
			"supsim;": "⫈",
			"supsub;": "⫔",
			"supsup;": "⫖",
			"swarhk;": "⤦",
			"swArr;": "⇙",
			"swarr;": "↙",
			"swarrow;": "↙",
			"swnwar;": "⤪",
			"szlig;": "ß",
			szlig: "ß",
			"Tab;": "\t",
			"target;": "⌖",
			"Tau;": "Τ",
			"tau;": "τ",
			"tbrk;": "⎴",
			"Tcaron;": "Ť",
			"tcaron;": "ť",
			"Tcedil;": "Ţ",
			"tcedil;": "ţ",
			"Tcy;": "Т",
			"tcy;": "т",
			"tdot;": "⃛",
			"telrec;": "⌕",
			"Tfr;": "𝔗",
			"tfr;": "𝔱",
			"there4;": "∴",
			"Therefore;": "∴",
			"therefore;": "∴",
			"Theta;": "Θ",
			"theta;": "θ",
			"thetasym;": "ϑ",
			"thetav;": "ϑ",
			"thickapprox;": "≈",
			"thicksim;": "∼",
			"ThickSpace;": "  ",
			"thinsp;": " ",
			"ThinSpace;": " ",
			"thkap;": "≈",
			"thksim;": "∼",
			"THORN;": "Þ",
			THORN: "Þ",
			"thorn;": "þ",
			thorn: "þ",
			"Tilde;": "∼",
			"tilde;": "˜",
			"TildeEqual;": "≃",
			"TildeFullEqual;": "≅",
			"TildeTilde;": "≈",
			"times;": "×",
			times: "×",
			"timesb;": "⊠",
			"timesbar;": "⨱",
			"timesd;": "⨰",
			"tint;": "∭",
			"toea;": "⤨",
			"top;": "⊤",
			"topbot;": "⌶",
			"topcir;": "⫱",
			"Topf;": "𝕋",
			"topf;": "𝕥",
			"topfork;": "⫚",
			"tosa;": "⤩",
			"tprime;": "‴",
			"TRADE;": "™",
			"trade;": "™",
			"triangle;": "▵",
			"triangledown;": "▿",
			"triangleleft;": "◃",
			"trianglelefteq;": "⊴",
			"triangleq;": "≜",
			"triangleright;": "▹",
			"trianglerighteq;": "⊵",
			"tridot;": "◬",
			"trie;": "≜",
			"triminus;": "⨺",
			"TripleDot;": "⃛",
			"triplus;": "⨹",
			"trisb;": "⧍",
			"tritime;": "⨻",
			"trpezium;": "⏢",
			"Tscr;": "𝒯",
			"tscr;": "𝓉",
			"TScy;": "Ц",
			"tscy;": "ц",
			"TSHcy;": "Ћ",
			"tshcy;": "ћ",
			"Tstrok;": "Ŧ",
			"tstrok;": "ŧ",
			"twixt;": "≬",
			"twoheadleftarrow;": "↞",
			"twoheadrightarrow;": "↠",
			"Uacute;": "Ú",
			Uacute: "Ú",
			"uacute;": "ú",
			uacute: "ú",
			"Uarr;": "↟",
			"uArr;": "⇑",
			"uarr;": "↑",
			"Uarrocir;": "⥉",
			"Ubrcy;": "Ў",
			"ubrcy;": "ў",
			"Ubreve;": "Ŭ",
			"ubreve;": "ŭ",
			"Ucirc;": "Û",
			Ucirc: "Û",
			"ucirc;": "û",
			ucirc: "û",
			"Ucy;": "У",
			"ucy;": "у",
			"udarr;": "⇅",
			"Udblac;": "Ű",
			"udblac;": "ű",
			"udhar;": "⥮",
			"ufisht;": "⥾",
			"Ufr;": "𝔘",
			"ufr;": "𝔲",
			"Ugrave;": "Ù",
			Ugrave: "Ù",
			"ugrave;": "ù",
			ugrave: "ù",
			"uHar;": "⥣",
			"uharl;": "↿",
			"uharr;": "↾",
			"uhblk;": "▀",
			"ulcorn;": "⌜",
			"ulcorner;": "⌜",
			"ulcrop;": "⌏",
			"ultri;": "◸",
			"Umacr;": "Ū",
			"umacr;": "ū",
			"uml;": "¨",
			uml: "¨",
			"UnderBar;": "_",
			"UnderBrace;": "⏟",
			"UnderBracket;": "⎵",
			"UnderParenthesis;": "⏝",
			"Union;": "⋃",
			"UnionPlus;": "⊎",
			"Uogon;": "Ų",
			"uogon;": "ų",
			"Uopf;": "𝕌",
			"uopf;": "𝕦",
			"UpArrow;": "↑",
			"Uparrow;": "⇑",
			"uparrow;": "↑",
			"UpArrowBar;": "⤒",
			"UpArrowDownArrow;": "⇅",
			"UpDownArrow;": "↕",
			"Updownarrow;": "⇕",
			"updownarrow;": "↕",
			"UpEquilibrium;": "⥮",
			"upharpoonleft;": "↿",
			"upharpoonright;": "↾",
			"uplus;": "⊎",
			"UpperLeftArrow;": "↖",
			"UpperRightArrow;": "↗",
			"Upsi;": "ϒ",
			"upsi;": "υ",
			"upsih;": "ϒ",
			"Upsilon;": "Υ",
			"upsilon;": "υ",
			"UpTee;": "⊥",
			"UpTeeArrow;": "↥",
			"upuparrows;": "⇈",
			"urcorn;": "⌝",
			"urcorner;": "⌝",
			"urcrop;": "⌎",
			"Uring;": "Ů",
			"uring;": "ů",
			"urtri;": "◹",
			"Uscr;": "𝒰",
			"uscr;": "𝓊",
			"utdot;": "⋰",
			"Utilde;": "Ũ",
			"utilde;": "ũ",
			"utri;": "▵",
			"utrif;": "▴",
			"uuarr;": "⇈",
			"Uuml;": "Ü",
			Uuml: "Ü",
			"uuml;": "ü",
			uuml: "ü",
			"uwangle;": "⦧",
			"vangrt;": "⦜",
			"varepsilon;": "ϵ",
			"varkappa;": "ϰ",
			"varnothing;": "∅",
			"varphi;": "ϕ",
			"varpi;": "ϖ",
			"varpropto;": "∝",
			"vArr;": "⇕",
			"varr;": "↕",
			"varrho;": "ϱ",
			"varsigma;": "ς",
			"varsubsetneq;": "⊊︀",
			"varsubsetneqq;": "⫋︀",
			"varsupsetneq;": "⊋︀",
			"varsupsetneqq;": "⫌︀",
			"vartheta;": "ϑ",
			"vartriangleleft;": "⊲",
			"vartriangleright;": "⊳",
			"Vbar;": "⫫",
			"vBar;": "⫨",
			"vBarv;": "⫩",
			"Vcy;": "В",
			"vcy;": "в",
			"VDash;": "⊫",
			"Vdash;": "⊩",
			"vDash;": "⊨",
			"vdash;": "⊢",
			"Vdashl;": "⫦",
			"Vee;": "⋁",
			"vee;": "∨",
			"veebar;": "⊻",
			"veeeq;": "≚",
			"vellip;": "⋮",
			"Verbar;": "‖",
			"verbar;": "|",
			"Vert;": "‖",
			"vert;": "|",
			"VerticalBar;": "∣",
			"VerticalLine;": "|",
			"VerticalSeparator;": "❘",
			"VerticalTilde;": "≀",
			"VeryThinSpace;": " ",
			"Vfr;": "𝔙",
			"vfr;": "𝔳",
			"vltri;": "⊲",
			"vnsub;": "⊂⃒",
			"vnsup;": "⊃⃒",
			"Vopf;": "𝕍",
			"vopf;": "𝕧",
			"vprop;": "∝",
			"vrtri;": "⊳",
			"Vscr;": "𝒱",
			"vscr;": "𝓋",
			"vsubnE;": "⫋︀",
			"vsubne;": "⊊︀",
			"vsupnE;": "⫌︀",
			"vsupne;": "⊋︀",
			"Vvdash;": "⊪",
			"vzigzag;": "⦚",
			"Wcirc;": "Ŵ",
			"wcirc;": "ŵ",
			"wedbar;": "⩟",
			"Wedge;": "⋀",
			"wedge;": "∧",
			"wedgeq;": "≙",
			"weierp;": "℘",
			"Wfr;": "𝔚",
			"wfr;": "𝔴",
			"Wopf;": "𝕎",
			"wopf;": "𝕨",
			"wp;": "℘",
			"wr;": "≀",
			"wreath;": "≀",
			"Wscr;": "𝒲",
			"wscr;": "𝓌",
			"xcap;": "⋂",
			"xcirc;": "◯",
			"xcup;": "⋃",
			"xdtri;": "▽",
			"Xfr;": "𝔛",
			"xfr;": "𝔵",
			"xhArr;": "⟺",
			"xharr;": "⟷",
			"Xi;": "Ξ",
			"xi;": "ξ",
			"xlArr;": "⟸",
			"xlarr;": "⟵",
			"xmap;": "⟼",
			"xnis;": "⋻",
			"xodot;": "⨀",
			"Xopf;": "𝕏",
			"xopf;": "𝕩",
			"xoplus;": "⨁",
			"xotime;": "⨂",
			"xrArr;": "⟹",
			"xrarr;": "⟶",
			"Xscr;": "𝒳",
			"xscr;": "𝓍",
			"xsqcup;": "⨆",
			"xuplus;": "⨄",
			"xutri;": "△",
			"xvee;": "⋁",
			"xwedge;": "⋀",
			"Yacute;": "Ý",
			Yacute: "Ý",
			"yacute;": "ý",
			yacute: "ý",
			"YAcy;": "Я",
			"yacy;": "я",
			"Ycirc;": "Ŷ",
			"ycirc;": "ŷ",
			"Ycy;": "Ы",
			"ycy;": "ы",
			"yen;": "¥",
			yen: "¥",
			"Yfr;": "𝔜",
			"yfr;": "𝔶",
			"YIcy;": "Ї",
			"yicy;": "ї",
			"Yopf;": "𝕐",
			"yopf;": "𝕪",
			"Yscr;": "𝒴",
			"yscr;": "𝓎",
			"YUcy;": "Ю",
			"yucy;": "ю",
			"Yuml;": "Ÿ",
			"yuml;": "ÿ",
			yuml: "ÿ",
			"Zacute;": "Ź",
			"zacute;": "ź",
			"Zcaron;": "Ž",
			"zcaron;": "ž",
			"Zcy;": "З",
			"zcy;": "з",
			"Zdot;": "Ż",
			"zdot;": "ż",
			"zeetrf;": "ℨ",
			"ZeroWidthSpace;": "​",
			"Zeta;": "Ζ",
			"zeta;": "ζ",
			"Zfr;": "ℨ",
			"zfr;": "𝔷",
			"ZHcy;": "Ж",
			"zhcy;": "ж",
			"zigrarr;": "⇝",
			"Zopf;": "ℤ",
			"zopf;": "𝕫",
			"Zscr;": "𝒵",
			"zscr;": "𝓏",
			"zwj;": "‍",
			"zwnj;": "‌"
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/utils/strings", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.isLetterOrDigit = t.repeat = t.commonPrefixLength = t.endsWith = t.startsWith = void 0, t.startsWith =
			function(e, t) {
				if (e.length < t.length) return !1;
				for (var n = 0; n < t.length; n++)
					if (e[n] !== t[n]) return !1;
				return !0
			}, t.endsWith = function(e, t) {
				var n = e.length - t.length;
				return n > 0 ? e.lastIndexOf(t) === n : 0 === n && e === t
			}, t.commonPrefixLength = function(e, t) {
				var n, i = Math.min(e.length, t.length);
				for (n = 0; n < i; n++)
					if (e.charCodeAt(n) !== t.charCodeAt(n)) return n;
				return i
			}, t.repeat = function(e, t) {
				for (var n = ""; t > 0;) 1 == (1 & t) && (n += e), e += e, t >>>= 1;
				return n
			};
		var n = "a".charCodeAt(0),
			i = "z".charCodeAt(0),
			r = "A".charCodeAt(0),
			a = "Z".charCodeAt(0),
			o = "0".charCodeAt(0),
			s = "9".charCodeAt(0);
		t.isLetterOrDigit = function(e, t) {
			var l = e.charCodeAt(t);
			return n <= l && l <= i || r <= l && l <= a || o <= l && l <= s
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/utils/object", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.isDefined = void 0, t.isDefined = function(e) {
			return void 0 !== e
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/utils/markup", ["require",
			"exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.normalizeMarkupContent = void 0, t.normalizeMarkupContent = function(e) {
			if (e) return "string" == typeof e ? {
				kind: "markdown",
				value: e
			} : {
				kind: "markdown",
				value: e.value
			}
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/languageFacts/dataProvider",
			["require", "exports", "../utils/markup"], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.generateDocumentation = t.HTMLDataProvider = void 0;
		var n = e("../utils/markup"),
			i = function() {
				function e(e, t) {
					var n = this;
					this.id = e, this._tags = [], this._tagMap = {}, this._valueSetMap = {}, this._tags = t.tags || [], this._globalAttributes =
						t.globalAttributes || [], this._tags.forEach((function(e) {
							n._tagMap[e.name.toLowerCase()] = e
						})), t.valueSets && t.valueSets.forEach((function(e) {
							n._valueSetMap[e.name] = e.values
						}))
				}
				return e.prototype.isApplicable = function() {
					return !0
				}, e.prototype.getId = function() {
					return this.id
				}, e.prototype.provideTags = function() {
					return this._tags
				}, e.prototype.provideAttributes = function(e) {
					var t = [],
						n = function(e) {
							t.push(e)
						},
						i = this._tagMap[e.toLowerCase()];
					return i && i.attributes.forEach(n), this._globalAttributes.forEach(n), t
				}, e.prototype.provideValues = function(e, t) {
					var n = this,
						i = [];
					t = t.toLowerCase();
					var r = function(e) {
							e.forEach((function(e) {
								e.name.toLowerCase() === t && (e.values && e.values.forEach((function(e) {
									i.push(e)
								})), e.valueSet && n._valueSetMap[e.valueSet] && n._valueSetMap[e.valueSet].forEach((function(e) {
									i.push(e)
								})))
							}))
						},
						a = this._tagMap[e.toLowerCase()];
					return a && r(a.attributes), r(this._globalAttributes), i
				}, e
			}();
		t.HTMLDataProvider = i, t.generateDocumentation = function(e, t, i) {
			void 0 === t && (t = {});
			var r = {
				kind: i ? "markdown" : "plaintext",
				value: ""
			};
			if (e.description && !1 !== t.documentation) {
				var a = n.normalizeMarkupContent(e.description);
				a && (r.value += a.value)
			}
			if (e.references && e.references.length > 0 && !1 !== t.references && (r.value.length && (r.value += "\n\n"), r.value +=
					i ? e.references.map((function(e) {
						return "[" + e.name + "](" + e.url + ")"
					})).join(" | ") : e.references.map((function(e) {
						return e.name + ": " + e.url
					})).join("\n")), "" !== r.value) return r
		}
	}));
var __awaiter = this && this.__awaiter || function(e, t, n, i) {
		return new(n || (n = Promise))((function(r, a) {
			function o(e) {
				try {
					l(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					l(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function l(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
					e(t)
				}))).then(o, s)
			}
			l((i = i.apply(e, t || [])).next())
		}))
	},
	__generator = this && this.__generator || function(e, t) {
		var n, i, r, a, o = {
			label: 0,
			sent: function() {
				if (1 & r[0]) throw r[1];
				return r[1]
			},
			trys: [],
			ops: []
		};
		return a = {
			next: s(0),
			throw: s(1),
			return: s(2)
		}, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
			return this
		}), a;

		function s(a) {
			return function(s) {
				return function(a) {
					if (n) throw new TypeError("Generator is already executing.");
					for (; o;) try {
						if (n = 1, i && (r = 2 & a[0] ? i.return : a[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r =
								r.call(i, a[1])).done) return r;
						switch (i = 0, r && (a = [2 & a[0], r.value]), a[0]) {
							case 0:
							case 1:
								r = a;
								break;
							case 4:
								return o.label++, {
									value: a[1],
									done: !1
								};
							case 5:
								o.label++, i = a[1], a = [0];
								continue;
							case 7:
								a = o.ops.pop(), o.trys.pop();
								continue;
							default:
								if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
									o = 0;
									continue
								}
								if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
									o.label = a[1];
									break
								}
								if (6 === a[0] && o.label < r[1]) {
									o.label = r[1], r = a;
									break
								}
								if (r && o.label < r[2]) {
									o.label = r[2], o.ops.push(a);
									break
								}
								r[2] && o.ops.pop(), o.trys.pop();
								continue
						}
						a = t.call(e, o)
					} catch (e) {
						a = [6, e], i = 0
					} finally {
						n = r = 0
					}
					if (5 & a[0]) throw a[1];
					return {
						value: a[0] ? a[1] : void 0,
						done: !0
					}
				}([a, s])
			}
		}
	};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/pathCompletion", [
		"require", "exports", "../htmlLanguageTypes", "../utils/strings"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.PathCompletionParticipant = void 0;
	var n = e("../htmlLanguageTypes"),
		i = e("../utils/strings"),
		r = function() {
			function e(e) {
				this.readDirectory = e, this.atributeCompletions = []
			}
			return e.prototype.onHtmlAttributeValue = function(e) {
				(function(e, t) {
					var n = l[e];
					if (n) return "string" == typeof n ? n === t : -1 !== n.indexOf(t);
					return !1
				})(e.tag, e.attribute) && this.atributeCompletions.push(e)
			}, e.prototype.computeCompletions = function(e, t) {
				return __awaiter(this, void 0, void 0, (function() {
					var r, a, o, l, c, d, h, u, p, m;
					return __generator(this, (function(f) {
						switch (f.label) {
							case 0:
								r = {
									items: [],
									isIncomplete: !1
								}, a = 0, o = this.atributeCompletions, f.label = 1;
							case 1:
								return a < o.length ? (l = o[a], function(e) {
										if (i.startsWith(e, "http") || i.startsWith(e, "https") || i.startsWith(e, "//")) return !1;
										return !0
									}(c = function(e) {
										return i.startsWith(e, "'") || i.startsWith(e, '"') ? e.slice(1, -1) : e
									}(e.getText(l.range))) ? "." !== c && ".." !== c ? [3, 2] : (r.isIncomplete = !0, [3, 4]) : [3, 4]) :
									[3, 5];
							case 2:
								return d = function(e, t, i) {
									var r, a = e.lastIndexOf("/");
									if (-1 === a) r = function(e, t, i) {
										var r = s(e.start, t),
											a = s(e.end, i);
										return n.Range.create(r, a)
									}(i, 1, -1);
									else {
										var o = t.slice(a + 1),
											l = s(i.end, -1 - o.length),
											c = o.indexOf(" "),
											d = void 0;
										d = -1 !== c ? s(l, c) : s(i.end, -1), r = n.Range.create(l, d)
									}
									return r
								}(l.value, c, l.range), [4, this.providePathSuggestions(l.value, d, e, t)];
							case 3:
								for (h = f.sent(), u = 0, p = h; u < p.length; u++) m = p[u], r.items.push(m);
								f.label = 4;
							case 4:
								return a++, [3, 1];
							case 5:
								return [2, r]
						}
					}))
				}))
			}, e.prototype.providePathSuggestions = function(e, t, i, r) {
				return __awaiter(this, void 0, void 0, (function() {
					var s, l, c, d, h, u, p, m, f;
					return __generator(this, (function(g) {
						switch (g.label) {
							case 0:
								if (s = e.substring(0, e.lastIndexOf("/") + 1), !(l = r.resolveReference(s || ".", i.uri))) return [3,
									4
								];
								g.label = 1;
							case 1:
								return g.trys.push([1, 3, , 4]), c = [], [4, this.readDirectory(l)];
							case 2:
								for (d = g.sent(), h = 0, u = d; h < u.length; h++) p = u[h], m = p[0], f = p[1], m.charCodeAt(0) !==
									a && c.push(o(m, f === n.FileType.Directory, t));
								return [2, c];
							case 3:
								return g.sent(), [3, 4];
							case 4:
								return [2, []]
						}
					}))
				}))
			}, e
		}();
	t.PathCompletionParticipant = r;
	var a = ".".charCodeAt(0);

	function o(e, t, i) {
		return t ? {
			label: e += "/",
			kind: n.CompletionItemKind.Folder,
			textEdit: n.TextEdit.replace(i, e),
			command: {
				title: "Suggest",
				command: "editor.action.triggerSuggest"
			}
		} : {
			label: e,
			kind: n.CompletionItemKind.File,
			textEdit: n.TextEdit.replace(i, e)
		}
	}

	function s(e, t) {
		return n.Position.create(e.line, e.character + t)
	}
	var l = {
		a: "href",
		area: "href",
		body: "background",
		del: "cite",
		form: "action",
		frame: ["src", "longdesc"],
		img: ["src", "longdesc"],
		ins: "cite",
		link: "href",
		object: "data",
		q: "cite",
		script: "src",
		audio: "src",
		button: "formaction",
		command: "icon",
		embed: "src",
		html: "manifest",
		input: ["src", "formaction"],
		source: "src",
		track: "src",
		video: ["src", "poster"]
	}
}));
__awaiter = this && this.__awaiter || function(e, t, n, i) {
	return new(n || (n = Promise))((function(r, a) {
		function o(e) {
			try {
				l(i.next(e))
			} catch (e) {
				a(e)
			}
		}

		function s(e) {
			try {
				l(i.throw(e))
			} catch (e) {
				a(e)
			}
		}

		function l(e) {
			var t;
			e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
				e(t)
			}))).then(o, s)
		}
		l((i = i.apply(e, t || [])).next())
	}))
}, __generator = this && this.__generator || function(e, t) {
	var n, i, r, a, o = {
		label: 0,
		sent: function() {
			if (1 & r[0]) throw r[1];
			return r[1]
		},
		trys: [],
		ops: []
	};
	return a = {
		next: s(0),
		throw: s(1),
		return: s(2)
	}, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
		return this
	}), a;

	function s(a) {
		return function(s) {
			return function(a) {
				if (n) throw new TypeError("Generator is already executing.");
				for (; o;) try {
					if (n = 1, i && (r = 2 & a[0] ? i.return : a[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r =
							r.call(i, a[1])).done) return r;
					switch (i = 0, r && (a = [2 & a[0], r.value]), a[0]) {
						case 0:
						case 1:
							r = a;
							break;
						case 4:
							return o.label++, {
								value: a[1],
								done: !1
							};
						case 5:
							o.label++, i = a[1], a = [0];
							continue;
						case 7:
							a = o.ops.pop(), o.trys.pop();
							continue;
						default:
							if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
								o = 0;
								continue
							}
							if (3 === a[0] && (!r || a[1] > r[0] && a[1] < r[3])) {
								o.label = a[1];
								break
							}
							if (6 === a[0] && o.label < r[1]) {
								o.label = r[1], r = a;
								break
							}
							if (r && o.label < r[2]) {
								o.label = r[2], o.ops.push(a);
								break
							}
							r[2] && o.ops.pop(), o.trys.pop();
							continue
					}
					a = t.call(e, o)
				} catch (e) {
					a = [6, e], i = 0
				} finally {
					n = r = 0
				}
				if (5 & a[0]) throw a[1];
				return {
					value: a[0] ? a[1] : void 0,
					done: !0
				}
			}([a, s])
		}
	}
};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlCompletion", [
		"require", "exports", "../parser/htmlScanner", "../htmlLanguageTypes", "../parser/htmlEntities", "vscode-nls",
		"../utils/strings", "../languageFacts/fact", "../utils/object", "../languageFacts/dataProvider", "./pathCompletion"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.HTMLCompletion = void 0;
	var n = e("../parser/htmlScanner"),
		i = e("../htmlLanguageTypes"),
		r = e("../parser/htmlEntities"),
		a = e("vscode-nls"),
		o = e("../utils/strings"),
		s = e("../languageFacts/fact"),
		l = e("../utils/object"),
		c = e("../languageFacts/dataProvider"),
		d = e("./pathCompletion"),
		h = a.loadMessageBundle(),
		u = function() {
			function e(e, t) {
				this.lsOptions = e, this.dataManager = t, this.completionParticipants = []
			}
			return e.prototype.setCompletionParticipants = function(e) {
				this.completionParticipants = e || []
			}, e.prototype.doComplete2 = function(e, t, n, i, r) {
				return __awaiter(this, void 0, void 0, (function() {
					var a, o, s, l;
					return __generator(this, (function(c) {
						switch (c.label) {
							case 0:
								if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory) return [2,
									this.doComplete(e, t, n, r)
								];
								a = new d.PathCompletionParticipant(this.lsOptions.fileSystemProvider.readDirectory), o = this.completionParticipants,
									this.completionParticipants = [a].concat(o), s = this.doComplete(e, t, n, r), c.label = 1;
							case 1:
								return c.trys.push([1, , 3, 4]), [4, a.computeCompletions(e, i)];
							case 2:
								return l = c.sent(), [2, {
									isIncomplete: s.isIncomplete || l.isIncomplete,
									items: l.items.concat(s.items)
								}];
							case 3:
								return this.completionParticipants = o, [7];
							case 4:
								return [2]
						}
					}))
				}))
			}, e.prototype.doComplete = function(e, t, n, i) {
				var r = this._doComplete(e, t, n, i);
				return this.convertCompletionList(r)
			}, e.prototype._doComplete = function(e, t, a, l) {
				var d = {
						isIncomplete: !1,
						items: []
					},
					u = this.completionParticipants,
					f = this.dataManager.getDataProviders().filter((function(t) {
						return t.isApplicable(e.languageId) && (!l || !1 !== l[t.getId()])
					})),
					g = this.doesSupportMarkdown(),
					b = e.getText(),
					v = e.offsetAt(t),
					_ = a.findNodeBefore(v);
				if (!_) return d;
				var w, y = n.createScanner(b, _.start),
					T = "";

				function k(t, n) {
					return void 0 === n && (n = v), t > v && (t = v), {
						start: e.positionAt(t),
						end: e.positionAt(n)
					}
				}

				function S(e, t) {
					var n = k(e, t);
					return f.forEach((function(e) {
						e.provideTags().forEach((function(e) {
							d.items.push({
								label: e.name,
								kind: i.CompletionItemKind.Property,
								documentation: c.generateDocumentation(e, void 0, g),
								textEdit: i.TextEdit.replace(n, e.name),
								insertTextFormat: i.InsertTextFormat.PlainText
							})
						}))
					})), d
				}

				function x(e) {
					for (var t = e; t > 0;) {
						var n = b.charAt(t - 1);
						if ("\n\r".indexOf(n) >= 0) return b.substring(t, e);
						if (!p(n)) return null;
						t--
					}
					return b.substring(0, e)
				}

				function L(e, t, n) {
					void 0 === n && (n = v);
					var r = k(e, n),
						a = m(b, n, i.ScannerState.WithinEndTag, i.TokenType.EndTagClose) ? "" : ">",
						o = _;
					for (t && (o = o.parent); o;) {
						var s = o.tag;
						if (s && (!o.closed || o.endTagStart && o.endTagStart > v)) {
							var l = {
									label: "/" + s,
									kind: i.CompletionItemKind.Property,
									filterText: "/" + s,
									textEdit: i.TextEdit.replace(r, "/" + s + a),
									insertTextFormat: i.InsertTextFormat.PlainText
								},
								h = x(o.start),
								u = x(e - 1);
							if (null !== h && null !== u && h !== u) {
								var p = h + "</" + s + a;
								l.textEdit = i.TextEdit.replace(k(e - 1 - u.length), p), l.filterText = u + "</" + s
							}
							return d.items.push(l), d
						}
						o = o.parent
					}
					return t || f.forEach((function(e) {
						e.provideTags().forEach((function(e) {
							d.items.push({
								label: "/" + e.name,
								kind: i.CompletionItemKind.Property,
								documentation: c.generateDocumentation(e, void 0, g),
								filterText: "/" + e.name + a,
								textEdit: i.TextEdit.replace(r, "/" + e.name + a),
								insertTextFormat: i.InsertTextFormat.PlainText
							})
						}))
					})), d
				}

				function M(t, n) {
					if (l && l.hideAutoCompleteProposals) return d;
					if (!s.isVoidElement(n)) {
						var r = e.positionAt(t);
						d.items.push({
							label: "</" + n + ">",
							kind: i.CompletionItemKind.Property,
							filterText: "</" + n + ">",
							textEdit: i.TextEdit.insert(r, "$0</" + n + ">"),
							insertTextFormat: i.InsertTextFormat.Snippet
						})
					}
					return d
				}

				function E(e, t) {
					return S(e, t), L(e, !0, t), d
				}

				function A(e, t) {
					void 0 === t && (t = v);
					for (var n = v; n < t && "<" !== b[n];) n++;
					var r, s = b.substring(e, t),
						l = k(e, n),
						h = m(b, t, i.ScannerState.AfterAttributeName, i.TokenType.DelimiterAssign) ? "" : '="$1"',
						u = (r = Object.create(null), _.attributeNames.forEach((function(e) {
							r[e] = !0
						})), r);
					return u[s] = !1, f.forEach((function(e) {
							e.provideAttributes(T).forEach((function(e) {
								if (!u[e.name]) {
									u[e.name] = !0;
									var t, n = e.name;
									"v" !== e.valueSet && h.length && (n += h, (e.valueSet || "style" === e.name) && (t = {
										title: "Suggest",
										command: "editor.action.triggerSuggest"
									})), d.items.push({
										label: e.name,
										kind: "handler" === e.valueSet ? i.CompletionItemKind.Function : i.CompletionItemKind.Value,
										documentation: c.generateDocumentation(e, void 0, g),
										textEdit: i.TextEdit.replace(l, n),
										insertTextFormat: i.InsertTextFormat.Snippet,
										command: t
									})
								}
							}))
						})),
						function(e, t) {
							var n = "data-",
								r = {};

							function s(e) {
								e.attributeNames.forEach((function(e) {
									!o.startsWith(e, n) || r[e] || t[e] || (r[e] = e + '="$1"')
								})), e.children.forEach((function(e) {
									return s(e)
								}))
							}
							r[n] = n + '$1="$2"', a && a.roots.forEach((function(e) {
								return s(e)
							}));
							Object.keys(r).forEach((function(t) {
								return d.items.push({
									label: t,
									kind: i.CompletionItemKind.Value,
									textEdit: i.TextEdit.replace(e, r[t]),
									insertTextFormat: i.InsertTextFormat.Snippet
								})
							}))
						}(l, u), d
				}

				function C(n, r) {
					var a, o, s, l;
					if (void 0 === r && (r = v), v > n && v <= r && (l = b[n], /^["']*$/.test(l))) {
						var h = n + 1,
							m = r;
						r > n && b[r - 1] === b[n] && m--;
						var _ = function(e, t, n) {
								for (; t > n && !p(e[t - 1]);) t--;
								return t
							}(b, v, h),
							y = function(e, t, n) {
								for (; t < n && !p(e[t]);) t++;
								return t
							}(b, v, m);
						a = k(_, y), s = v >= h && v <= m ? b.substring(h, v) : "", o = !1
					} else a = k(n, r), s = b.substring(n, v), o = !0;
					if (u.length > 0)
						for (var S = T.toLowerCase(), x = w.toLowerCase(), L = k(n, r), M = 0, E = u; M < E.length; M++) {
							var A = E[M];
							A.onHtmlAttributeValue && A.onHtmlAttributeValue({
								document: e,
								position: t,
								tag: S,
								attribute: x,
								value: s,
								range: L
							})
						}
					return f.forEach((function(e) {
						e.provideValues(T, w).forEach((function(e) {
							var t = o ? '"' + e.name + '"' : e.name;
							d.items.push({
								label: e.name,
								filterText: t,
								kind: i.CompletionItemKind.Unit,
								documentation: c.generateDocumentation(e, void 0, g),
								textEdit: i.TextEdit.replace(a, t),
								insertTextFormat: i.InsertTextFormat.PlainText
							})
						}))
					})), H(), d
				}

				function R(e) {
					return v === y.getTokenEnd() && (U = y.scan()) === e && y.getTokenOffset() === v ? y.getTokenEnd() : v
				}

				function I() {
					for (var n = 0, i = u; n < i.length; n++) {
						var r = i[n];
						r.onHtmlContent && r.onHtmlContent({
							document: e,
							position: t
						})
					}
					return H()
				}

				function H() {
					for (var e = v - 1, n = t.character; e >= 0 && o.isLetterOrDigit(b, e);) e--, n--;
					if (e >= 0 && "&" === b[e]) {
						var a = i.Range.create(i.Position.create(t.line, n - 1), t);
						for (var s in r.entities)
							if (o.endsWith(s, ";")) {
								var l = "&" + s;
								d.items.push({
									label: l,
									kind: i.CompletionItemKind.Keyword,
									documentation: h("entity.propose", "Character entity representing '" + r.entities[s] + "'"),
									textEdit: i.TextEdit.replace(a, l),
									insertTextFormat: i.InsertTextFormat.PlainText
								})
							}
					}
					return d
				}
				for (var z, U = y.scan(); U !== i.TokenType.EOS && y.getTokenOffset() <= v;) {
					switch (U) {
						case i.TokenType.StartTagOpen:
							if (y.getTokenEnd() === v) {
								var W = R(i.TokenType.StartTag);
								return 0 === t.line && (z = void 0, z = k(v, W), d.items.push({
									label: "!DOCTYPE",
									kind: i.CompletionItemKind.Property,
									documentation: "A preamble for an HTML document.",
									textEdit: i.TextEdit.replace(z, "!DOCTYPE html>"),
									insertTextFormat: i.InsertTextFormat.PlainText
								})), E(v, W)
							}
							break;
						case i.TokenType.StartTag:
							if (y.getTokenOffset() <= v && v <= y.getTokenEnd()) return S(y.getTokenOffset(), y.getTokenEnd());
							T = y.getTokenText();
							break;
						case i.TokenType.AttributeName:
							if (y.getTokenOffset() <= v && v <= y.getTokenEnd()) return A(y.getTokenOffset(), y.getTokenEnd());
							w = y.getTokenText();
							break;
						case i.TokenType.DelimiterAssign:
							if (y.getTokenEnd() === v) {
								W = R(i.TokenType.AttributeValue);
								return C(v, W)
							}
							break;
						case i.TokenType.AttributeValue:
							if (y.getTokenOffset() <= v && v <= y.getTokenEnd()) return C(y.getTokenOffset(), y.getTokenEnd());
							break;
						case i.TokenType.Whitespace:
							if (v <= y.getTokenEnd()) switch (y.getScannerState()) {
								case i.ScannerState.AfterOpeningStartTag:
									return E(y.getTokenOffset(), R(i.TokenType.StartTag));
								case i.ScannerState.WithinTag:
								case i.ScannerState.AfterAttributeName:
									return A(y.getTokenEnd());
								case i.ScannerState.BeforeAttributeValue:
									return C(y.getTokenEnd());
								case i.ScannerState.AfterOpeningEndTag:
									return L(y.getTokenOffset() - 1, !1);
								case i.ScannerState.WithinContent:
									return I()
							}
							break;
						case i.TokenType.EndTagOpen:
							if (v <= y.getTokenEnd()) return L(y.getTokenOffset() + 1, !1, R(i.TokenType.EndTag));
							break;
						case i.TokenType.EndTag:
							if (v <= y.getTokenEnd())
								for (var D = y.getTokenOffset() - 1; D >= 0;) {
									var P = b.charAt(D);
									if ("/" === P) return L(D, !1, y.getTokenEnd());
									if (!p(P)) break;
									D--
								}
							break;
						case i.TokenType.StartTagClose:
							if (v <= y.getTokenEnd() && T) return M(y.getTokenEnd(), T);
							break;
						case i.TokenType.Content:
							if (v <= y.getTokenEnd()) return I();
							break;
						default:
							if (v <= y.getTokenEnd()) return d
					}
					U = y.scan()
				}
				return d
			}, e.prototype.doTagComplete = function(e, t, r) {
				var a = e.offsetAt(t);
				if (a <= 0) return null;
				var o = e.getText().charAt(a - 1);
				if (">" === o) {
					if ((c = r.findNodeBefore(a)) && c.tag && !s.isVoidElement(c.tag) && c.start < a && (!c.endTagStart || c.endTagStart >
							a))
						for (var l = (d = n.createScanner(e.getText(), c.start)).scan(); l !== i.TokenType.EOS && d.getTokenEnd() <= a;) {
							if (l === i.TokenType.StartTagClose && d.getTokenEnd() === a) return "$0</" + c.tag + ">";
							l = d.scan()
						}
				} else if ("/" === o) {
					for (var c = r.findNodeBefore(a); c && c.closed && !(c.endTagStart && c.endTagStart > a);) c = c.parent;
					if (c && c.tag) {
						var d;
						for (l = (d = n.createScanner(e.getText(), c.start)).scan(); l !== i.TokenType.EOS && d.getTokenEnd() <= a;) {
							if (l === i.TokenType.EndTagOpen && d.getTokenEnd() === a) return c.tag + ">";
							l = d.scan()
						}
					}
				}
				return null
			}, e.prototype.convertCompletionList = function(e) {
				return this.doesSupportMarkdown() || e.items.forEach((function(e) {
					e.documentation && "string" != typeof e.documentation && (e.documentation = {
						kind: "plaintext",
						value: e.documentation.value
					})
				})), e
			}, e.prototype.doesSupportMarkdown = function() {
				var e, t, n;
				if (!l.isDefined(this.supportsMarkdown)) {
					if (!l.isDefined(this.lsOptions.clientCapabilities)) return this.supportsMarkdown = !0, this.supportsMarkdown;
					var r = null === (n = null === (t = null === (e = this.lsOptions.clientCapabilities.textDocument) || void 0 ===
						e ? void 0 : e.completion) || void 0 === t ? void 0 : t.completionItem) || void 0 === n ? void 0 : n.documentationFormat;
					this.supportsMarkdown = Array.isArray(r) && -1 !== r.indexOf(i.MarkupKind.Markdown)
				}
				return this.supportsMarkdown
			}, e
		}();

	function p(e) {
		return /^\s*$/.test(e)
	}

	function m(e, t, r, a) {
		for (var o = n.createScanner(e, t, r), s = o.scan(); s === i.TokenType.Whitespace;) s = o.scan();
		return s === a
	}
	t.HTMLCompletion = u
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlHover", [
		"require", "exports", "../parser/htmlScanner", "../htmlLanguageTypes", "../utils/object",
		"../languageFacts/dataProvider", "../parser/htmlEntities", "../utils/strings", "vscode-nls"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.HTMLHover = void 0;
	var n = e("../parser/htmlScanner"),
		i = e("../htmlLanguageTypes"),
		r = e("../utils/object"),
		a = e("../languageFacts/dataProvider"),
		o = e("../parser/htmlEntities"),
		s = e("../utils/strings"),
		l = e("vscode-nls").loadMessageBundle(),
		c = function() {
			function e(e, t) {
				this.lsOptions = e, this.dataManager = t
			}
			return e.prototype.doHover = function(e, t, r, c) {
				var d = this.convertContents.bind(this),
					h = this.doesSupportMarkdown(),
					u = e.offsetAt(t),
					p = r.findNodeAt(u),
					m = e.getText();
				if (!p || !p.tag) return null;
				var f = this.dataManager.getDataProviders().filter((function(t) {
					return t.isApplicable(e.languageId)
				}));

				function g(e, t, n) {
					for (var i = function(n) {
							var i = null;
							if (n.provideTags().forEach((function(n) {
									if (n.name.toLowerCase() === e.toLowerCase()) {
										var r = a.generateDocumentation(n, c, h);
										r || (r = {
											kind: h ? "markdown" : "plaintext",
											value: ""
										}), i = {
											contents: r,
											range: t
										}
									}
								})), i) return i.contents = d(i.contents), {
								value: i
							}
						}, r = 0, o = f; r < o.length; r++) {
						var s = i(o[r]);
						if ("object" == typeof s) return s.value
					}
					return null
				}

				function b(t, r) {
					for (var a = n.createScanner(e.getText(), r), o = a.scan(); o !== i.TokenType.EOS && (a.getTokenEnd() < u || a.getTokenEnd() ===
							u && o !== t);) o = a.scan();
					return o === t && u <= a.getTokenEnd() ? {
						start: e.positionAt(a.getTokenOffset()),
						end: e.positionAt(a.getTokenEnd())
					} : null
				}
				if (p.endTagStart && u >= p.endTagStart) {
					var v = b(i.TokenType.EndTag, p.endTagStart);
					return v ? g(p.tag, v) : null
				}
				var _ = b(i.TokenType.StartTag, p.start);
				if (_) return g(p.tag, _);
				var w = b(i.TokenType.AttributeName, p.start);
				if (w) return function(e, t, n) {
					for (var i = function(i) {
							var r = null;
							if (i.provideAttributes(e).forEach((function(e) {
									if (t === e.name && e.description) {
										var i = a.generateDocumentation(e, c, h);
										r = i ? {
											contents: i,
											range: n
										} : null
									}
								})), r) return r.contents = d(r.contents), {
								value: r
							}
						}, r = 0, o = f; r < o.length; r++) {
						var s = i(o[r]);
						if ("object" == typeof s) return s.value
					}
					return null
				}(k = p.tag, e.getText(w), w);
				var y = function() {
					for (var e = u - 1, n = t.character; e >= 0 && s.isLetterOrDigit(m, e);) e--, n--;
					for (var r = e + 1, a = n; s.isLetterOrDigit(m, r);) r++, a++;
					if (e >= 0 && "&" === m[e]) {
						return ";" === m[r] ? i.Range.create(i.Position.create(t.line, n), i.Position.create(t.line, a + 1)) : i.Range
							.create(i.Position.create(t.line, n), i.Position.create(t.line, a))
					}
					return null
				}();
				if (y) return function(e, t) {
					var n = function(e) {
						for (var t = u - 1, n = "&"; t >= 0 && s.isLetterOrDigit(e, t);) t--;
						for (t += 1; s.isLetterOrDigit(e, t);) n += e[t], t += 1;
						return n + ";"
					}(e);
					for (var i in o.entities) {
						var r = null;
						if (n === "&" + i) {
							var a = o.entities[i].charCodeAt(0).toString(16).toUpperCase(),
								c = "U+";
							if (a.length < 4)
								for (var h = 4 - a.length, p = 0; p < h;) c += "0", p += 1;
							c += a;
							var m = l("entity.propose", "Character entity representing '" + o.entities[i] + "', unicode equivalent '" +
								c + "'");
							r = m ? {
								contents: m,
								range: t
							} : null
						}
						if (r) return r.contents = d(r.contents), r
					}
					return null
				}(m, y);
				var T = b(i.TokenType.AttributeValue, p.start);
				if (T) {
					var k = p.tag,
						S = function(e) {
							if (e.length <= 1) return e.replace(/['"]/, "");
							"'" !== e[0] && '"' !== e[0] || (e = e.slice(1));
							"'" !== e[e.length - 1] && '"' !== e[e.length - 1] || (e = e.slice(0, -1));
							return e
						}(e.getText(T)),
						x = function(t, r) {
							for (var a = n.createScanner(e.getText(), t), o = a.scan(), s = void 0; o !== i.TokenType.EOS && a.getTokenEnd() <=
								r;)(o = a.scan()) === i.TokenType.AttributeName && (s = a.getTokenText());
							return s
						}(p.start, e.offsetAt(T.start));
					if (x) return function(e, t, n, i) {
						for (var r = function(r) {
								var o = null;
								if (r.provideValues(e, t).forEach((function(e) {
										if (n === e.name && e.description) {
											var t = a.generateDocumentation(e, c, h);
											o = t ? {
												contents: t,
												range: i
											} : null
										}
									})), o) return o.contents = d(o.contents), {
									value: o
								}
							}, o = 0, s = f; o < s.length; o++) {
							var l = r(s[o]);
							if ("object" == typeof l) return l.value
						}
						return null
					}(k, x, S, T)
				}
				return null
			}, e.prototype.convertContents = function(e) {
				if (!this.doesSupportMarkdown()) {
					if ("string" == typeof e) return e;
					if ("kind" in e) return {
						kind: "plaintext",
						value: e.value
					};
					if (!Array.isArray(e)) return e.value;
					e.map((function(e) {
						return "string" == typeof e ? e : e.value
					}))
				}
				return e
			}, e.prototype.doesSupportMarkdown = function() {
				var e, t, n;
				if (!r.isDefined(this.supportsMarkdown)) {
					if (!r.isDefined(this.lsOptions.clientCapabilities)) return this.supportsMarkdown = !0, this.supportsMarkdown;
					var a = null === (n = null === (t = null === (e = this.lsOptions.clientCapabilities) || void 0 === e ? void 0 :
						e.textDocument) || void 0 === t ? void 0 : t.hover) || void 0 === n ? void 0 : n.contentFormat;
					this.supportsMarkdown = Array.isArray(a) && -1 !== a.indexOf(i.MarkupKind.Markdown)
				}
				return this.supportsMarkdown
			}, e
		}();
	t.HTMLHover = c
})),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-html-languageservice/beautify/beautify", ["require",
		"exports"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.js_beautify = void 0, t.js_beautify = function(e, t) {
		return e
	}
})),
function() {
	var e;
	! function() {
		"use strict";
		var t = [, , function(e) {
				function t(e) {
					this.__parent = e, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index =
						0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count =
						0, this.__items = []
				}

				function n(e, t) {
					this.__cache = [""], this.__indent_size = e.indent_size, this.__indent_string = e.indent_char, e.indent_with_tabs ||
						(this.__indent_string = new Array(e.indent_size + 1).join(e.indent_char)), t = t || "", e.indent_level > 0 && (t =
							new Array(e.indent_level + 1).join(this.__indent_string)), this.__base_string = t, this.__base_string_length =
						t.length
				}

				function i(e, i) {
					this.__indent_cache = new n(e, i), this.raw = !1, this._end_with_newline = e.end_with_newline, this.indent_size =
						e.indent_size, this.wrap_line_length = e.wrap_line_length, this.indent_empty_lines = e.indent_empty_lines, this.__lines = [],
						this.previous_line = null, this.current_line = null, this.next_line = new t(this), this.space_before_token = !1,
						this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline()
				}
				t.prototype.clone_empty = function() {
					var e = new t(this.__parent);
					return e.set_indent(this.__indent_count, this.__alignment_count), e
				}, t.prototype.item = function(e) {
					return e < 0 ? this.__items[this.__items.length + e] : this.__items[e]
				}, t.prototype.has_match = function(e) {
					for (var t = this.__items.length - 1; t >= 0; t--)
						if (this.__items[t].match(e)) return !0;
					return !1
				}, t.prototype.set_indent = function(e, t) {
					this.is_empty() && (this.__indent_count = e || 0, this.__alignment_count = t || 0, this.__character_count = this
						.__parent.get_indent_size(this.__indent_count, this.__alignment_count))
				}, t.prototype._set_wrap_point = function() {
					this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count =
						this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count =
						this.__parent.next_line.__alignment_count)
				}, t.prototype._should_wrap = function() {
					return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count >
						this.__parent.next_line.__character_count
				}, t.prototype._allow_wrap = function() {
					if (this._should_wrap()) {
						this.__parent.add_new_line();
						var e = this.__parent.current_line;
						return e.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), e.__items = this.__items
							.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), e.__character_count +=
							this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count,
							" " === e.__items[0] && (e.__items.splice(0, 1), e.__character_count -= 1), !0
					}
					return !1
				}, t.prototype.is_empty = function() {
					return 0 === this.__items.length
				}, t.prototype.last = function() {
					return this.is_empty() ? null : this.__items[this.__items.length - 1]
				}, t.prototype.push = function(e) {
					this.__items.push(e);
					var t = e.lastIndexOf("\n"); - 1 !== t ? this.__character_count = e.length - t : this.__character_count += e.length
				}, t.prototype.pop = function() {
					var e = null;
					return this.is_empty() || (e = this.__items.pop(), this.__character_count -= e.length), e
				}, t.prototype._remove_indent = function() {
					this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size)
				}, t.prototype._remove_wrap_indent = function() {
					this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1)
				}, t.prototype.trim = function() {
					for (;
						" " === this.last();) this.__items.pop(), this.__character_count -= 1
				}, t.prototype.toString = function() {
					var e = "";
					return this.is_empty() ? this.__parent.indent_empty_lines && (e = this.__parent.get_indent_string(this.__indent_count)) :
						(e = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), e += this.__items.join("")),
						e
				}, n.prototype.get_indent_size = function(e, t) {
					var n = this.__base_string_length;
					return t = t || 0, e < 0 && (n = 0), n += e * this.__indent_size, n += t
				}, n.prototype.get_indent_string = function(e, t) {
					var n = this.__base_string;
					return t = t || 0, e < 0 && (e = 0, n = ""), t += e * this.__indent_size, this.__ensure_cache(t), n += this.__cache[
						t]
				}, n.prototype.__ensure_cache = function(e) {
					for (; e >= this.__cache.length;) this.__add_column()
				}, n.prototype.__add_column = function() {
					var e = this.__cache.length,
						t = 0,
						n = "";
					this.__indent_size && e >= this.__indent_size && (e -= (t = Math.floor(e / this.__indent_size)) * this.__indent_size,
						n = new Array(t + 1).join(this.__indent_string)), e && (n += new Array(e + 1).join(" ")), this.__cache.push(n)
				}, i.prototype.__add_outputline = function() {
					this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this
						.current_line)
				}, i.prototype.get_line_number = function() {
					return this.__lines.length
				}, i.prototype.get_indent_string = function(e, t) {
					return this.__indent_cache.get_indent_string(e, t)
				}, i.prototype.get_indent_size = function(e, t) {
					return this.__indent_cache.get_indent_size(e, t)
				}, i.prototype.is_empty = function() {
					return !this.previous_line && this.current_line.is_empty()
				}, i.prototype.add_new_line = function(e) {
					return !(this.is_empty() || !e && this.just_added_newline()) && (this.raw || this.__add_outputline(), !0)
				}, i.prototype.get_code = function(e) {
					this.trim(!0);
					var t = this.current_line.pop();
					t && ("\n" === t[t.length - 1] && (t = t.replace(/\n+$/g, "")), this.current_line.push(t)), this._end_with_newline &&
						this.__add_outputline();
					var n = this.__lines.join("\n");
					return "\n" !== e && (n = n.replace(/[\n]/g, e)), n
				}, i.prototype.set_wrap_point = function() {
					this.current_line._set_wrap_point()
				}, i.prototype.set_indent = function(e, t) {
					return e = e || 0, t = t || 0, this.next_line.set_indent(e, t), this.__lines.length > 1 ? (this.current_line.set_indent(
						e, t), !0) : (this.current_line.set_indent(), !1)
				}, i.prototype.add_raw_token = function(e) {
					for (var t = 0; t < e.newlines; t++) this.__add_outputline();
					this.current_line.set_indent(-1), this.current_line.push(e.whitespace_before), this.current_line.push(e.text),
						this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1
				}, i.prototype.add_token = function(e) {
					this.__add_space_before_token(), this.current_line.push(e), this.space_before_token = !1, this.non_breaking_space = !
						1, this.previous_token_wrapped = this.current_line._allow_wrap()
				}, i.prototype.__add_space_before_token = function() {
					this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this
						.current_line.push(" "))
				}, i.prototype.remove_indent = function(e) {
					for (var t = this.__lines.length; e < t;) this.__lines[e]._remove_indent(), e++;
					this.current_line._remove_wrap_indent()
				}, i.prototype.trim = function(e) {
					for (e = void 0 !== e && e, this.current_line.trim(); e && this.__lines.length > 1 && this.current_line.is_empty();)
						this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
					this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null
				}, i.prototype.just_added_newline = function() {
					return this.current_line.is_empty()
				}, i.prototype.just_added_blankline = function() {
					return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty()
				}, i.prototype.ensure_empty_line_above = function(e, n) {
					for (var i = this.__lines.length - 2; i >= 0;) {
						var r = this.__lines[i];
						if (r.is_empty()) break;
						if (0 !== r.item(0).indexOf(e) && r.item(-1) !== n) {
							this.__lines.splice(i + 1, 0, new t(this)), this.previous_line = this.__lines[this.__lines.length - 2];
							break
						}
						i--
					}
				}, e.exports.Output = i
			}, , , , function(e) {
				function t(e, t) {
					this.raw_options = n(e, t), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol",
							"auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number(
							"indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number(
							"indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines =
						this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0),
						this.indent_with_tabs = this._get_boolean("indent_with_tabs", "\t" === this.indent_char), this.indent_with_tabs &&
						(this.indent_char = "\t", 1 === this.indent_size && (this.indent_size = 4)), this.wrap_line_length = this._get_number(
							"wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean(
							"indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "django",
							"erb", "handlebars", "php", "smarty"
						], ["auto"])
				}

				function n(e, t) {
					var n, r = {};
					for (n in e = i(e)) n !== t && (r[n] = e[n]);
					if (t && e[t])
						for (n in e[t]) r[n] = e[t][n];
					return r
				}

				function i(e) {
					var t, n = {};
					for (t in e) {
						n[t.replace(/-/g, "_")] = e[t]
					}
					return n
				}
				t.prototype._get_array = function(e, t) {
					var n = this.raw_options[e],
						i = t || [];
					return "object" == typeof n ? null !== n && "function" == typeof n.concat && (i = n.concat()) : "string" ==
						typeof n && (i = n.split(/[^a-zA-Z0-9_\/\-]+/)), i
				}, t.prototype._get_boolean = function(e, t) {
					var n = this.raw_options[e];
					return void 0 === n ? !!t : !!n
				}, t.prototype._get_characters = function(e, t) {
					var n = this.raw_options[e],
						i = t || "";
					return "string" == typeof n && (i = n.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "\t")), i
				}, t.prototype._get_number = function(e, t) {
					var n = this.raw_options[e];
					t = parseInt(t, 10), isNaN(t) && (t = 0);
					var i = parseInt(n, 10);
					return isNaN(i) && (i = t), i
				}, t.prototype._get_selection = function(e, t, n) {
					var i = this._get_selection_list(e, t, n);
					if (1 !== i.length) throw new Error("Invalid Option Value: The option '" + e +
						"' can only be one of the following values:\n" + t + "\nYou passed in: '" + this.raw_options[e] + "'");
					return i[0]
				}, t.prototype._get_selection_list = function(e, t, n) {
					if (!t || 0 === t.length) throw new Error("Selection list cannot be empty.");
					if (n = n || [t[0]], !this._is_valid_selection(n, t)) throw new Error("Invalid Default Value!");
					var i = this._get_array(e, n);
					if (!this._is_valid_selection(i, t)) throw new Error("Invalid Option Value: The option '" + e +
						"' can contain only the following values:\n" + t + "\nYou passed in: '" + this.raw_options[e] + "'");
					return i
				}, t.prototype._is_valid_selection = function(e, t) {
					return e.length && t.length && !e.some((function(e) {
						return -1 === t.indexOf(e)
					}))
				}, e.exports.Options = t, e.exports.normalizeOpts = i, e.exports.mergeOpts = n
			}, , function(e) {
				var t = RegExp.prototype.hasOwnProperty("sticky");

				function n(e) {
					this.__input = e || "", this.__input_length = this.__input.length, this.__position = 0
				}
				n.prototype.restart = function() {
					this.__position = 0
				}, n.prototype.back = function() {
					this.__position > 0 && (this.__position -= 1)
				}, n.prototype.hasNext = function() {
					return this.__position < this.__input_length
				}, n.prototype.next = function() {
					var e = null;
					return this.hasNext() && (e = this.__input.charAt(this.__position), this.__position += 1), e
				}, n.prototype.peek = function(e) {
					var t = null;
					return e = e || 0, (e += this.__position) >= 0 && e < this.__input_length && (t = this.__input.charAt(e)), t
				}, n.prototype.__match = function(e, n) {
					e.lastIndex = n;
					var i = e.exec(this.__input);
					return !i || t && e.sticky || i.index !== n && (i = null), i
				}, n.prototype.test = function(e, t) {
					return t = t || 0, (t += this.__position) >= 0 && t < this.__input_length && !!this.__match(e, t)
				}, n.prototype.testChar = function(e, t) {
					var n = this.peek(t);
					return e.lastIndex = 0, null !== n && e.test(n)
				}, n.prototype.match = function(e) {
					var t = this.__match(e, this.__position);
					return t ? this.__position += t[0].length : t = null, t
				}, n.prototype.read = function(e, t, n) {
					var i, r = "";
					return e && (i = this.match(e)) && (r += i[0]), !t || !i && e || (r += this.readUntil(t, n)), r
				}, n.prototype.readUntil = function(e, t) {
					var n, i = this.__position;
					e.lastIndex = this.__position;
					var r = e.exec(this.__input);
					return r ? (i = r.index, t && (i += r[0].length)) : i = this.__input_length, n = this.__input.substring(this.__position,
						i), this.__position = i, n
				}, n.prototype.readUntilAfter = function(e) {
					return this.readUntil(e, !0)
				}, n.prototype.get_regexp = function(e, n) {
					var i = null,
						r = "g";
					return n && t && (r = "y"), "string" == typeof e && "" !== e ? i = new RegExp(e, r) : e && (i = new RegExp(e.source,
						r)), i
				}, n.prototype.get_literal_regexp = function(e) {
					return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
				}, n.prototype.peekUntilAfter = function(e) {
					var t = this.__position,
						n = this.readUntilAfter(e);
					return this.__position = t, n
				}, n.prototype.lookBack = function(e) {
					var t = this.__position - 1;
					return t >= e.length && this.__input.substring(t - e.length, t).toLowerCase() === e
				}, e.exports.InputScanner = n
			}, , , , , function(e) {
				function t(e, t) {
					e = "string" == typeof e ? e : e.source, t = "string" == typeof t ? t : t.source, this.__directives_block_pattern =
						new RegExp(e + / beautify( \w+[:]\w+)+ /.source + t, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern =
						new RegExp(e + /\sbeautify\signore:end\s/.source + t, "g")
				}
				t.prototype.get_directives = function(e) {
					if (!e.match(this.__directives_block_pattern)) return null;
					var t = {};
					this.__directive_pattern.lastIndex = 0;
					for (var n = this.__directive_pattern.exec(e); n;) t[n[1]] = n[2], n = this.__directive_pattern.exec(e);
					return t
				}, t.prototype.readIgnored = function(e) {
					return e.readUntilAfter(this.__directives_end_ignore_pattern)
				}, e.exports.Directives = t
			}, , function(e, t, n) {
				var i = n(16).Beautifier,
					r = n(17).Options;
				e.exports = function(e, t) {
					return new i(e, t).beautify()
				}, e.exports.defaultOptions = function() {
					return new r
				}
			}, function(e, t, n) {
				var i = n(17).Options,
					r = n(2).Output,
					a = n(8).InputScanner,
					o = new(0, n(13).Directives)(/\/\*/, /\*\//),
					s = /\r\n|[\r\n]/,
					l = /\r\n|[\r\n]/g,
					c = /\s/,
					d = /(?:\s|\n)+/g,
					h = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,
					u = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

				function p(e, t) {
					this._source_text = e || "", this._options = new i(t), this._ch = null, this._input = null, this.NESTED_AT_RULE = {
						"@page": !0,
						"@font-face": !0,
						"@keyframes": !0,
						"@media": !0,
						"@supports": !0,
						"@document": !0
					}, this.CONDITIONAL_GROUP_RULE = {
						"@media": !0,
						"@supports": !0,
						"@document": !0
					}
				}
				p.prototype.eatString = function(e) {
					var t = "";
					for (this._ch = this._input.next(); this._ch;) {
						if (t += this._ch, "\\" === this._ch) t += this._input.next();
						else if (-1 !== e.indexOf(this._ch) || "\n" === this._ch) break;
						this._ch = this._input.next()
					}
					return t
				}, p.prototype.eatWhitespace = function(e) {
					for (var t = c.test(this._input.peek()), n = 0; c.test(this._input.peek());) this._ch = this._input.next(), e &&
						"\n" === this._ch && (0 === n || n < this._options.max_preserve_newlines) && (n++, this._output.add_new_line(!0));
					return t
				}, p.prototype.foundNestedPseudoClass = function() {
					for (var e = 0, t = 1, n = this._input.peek(t); n;) {
						if ("{" === n) return !0;
						if ("(" === n) e += 1;
						else if (")" === n) {
							if (0 === e) return !1;
							e -= 1
						} else if (";" === n || "}" === n) return !1;
						t++, n = this._input.peek(t)
					}
					return !1
				}, p.prototype.print_string = function(e) {
					this._output.set_indent(this._indentLevel), this._output.non_breaking_space = !0, this._output.add_token(e)
				}, p.prototype.preserveSingleSpace = function(e) {
					e && (this._output.space_before_token = !0)
				}, p.prototype.indent = function() {
					this._indentLevel++
				}, p.prototype.outdent = function() {
					this._indentLevel > 0 && this._indentLevel--
				}, p.prototype.beautify = function() {
					if (this._options.disabled) return this._source_text;
					var e = this._source_text,
						t = this._options.eol;
					"auto" === t && (t = "\n", e && s.test(e || "") && (t = e.match(s)[0]));
					var n = (e = e.replace(l, "\n")).match(/^[\t ]*/)[0];
					this._output = new r(this._options, n), this._input = new a(e), this._indentLevel = 0, this._nestedLevel = 0,
						this._ch = null;
					for (var i, p, m = 0, f = !1, g = !1, b = !1, v = !1, _ = !1, w = this._ch; i = "" !== this._input.read(d), p =
						w, this._ch = this._input.next(), "\\" === this._ch && this._input.hasNext() && (this._ch += this._input.next()),
						w = this._ch, this._ch;)
						if ("/" === this._ch && "*" === this._input.peek()) {
							this._output.add_new_line(), this._input.back();
							var y = this._input.read(h),
								T = o.get_directives(y);
							T && "start" === T.ignore && (y += o.readIgnored(this._input)), this.print_string(y), this.eatWhitespace(!0),
								this._output.add_new_line()
						} else if ("/" === this._ch && "/" === this._input.peek()) this._output.space_before_token = !0, this._input.back(),
						this.print_string(this._input.read(u)), this.eatWhitespace(!0);
					else if ("@" === this._ch)
						if (this.preserveSingleSpace(i), "{" === this._input.peek()) this.print_string(this._ch + this.eatString("}"));
						else {
							this.print_string(this._ch);
							var k = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
							k.match(/[ :]$/) && (k = this.eatString(": ").replace(/\s$/, ""), this.print_string(k), this._output.space_before_token = !
									0), "extend" === (k = k.replace(/\s$/, "")) ? v = !0 : "import" === k && (_ = !0), k in this.NESTED_AT_RULE ?
								(this._nestedLevel += 1, k in this.CONDITIONAL_GROUP_RULE && (b = !0)) : f || 0 !== m || -1 === k.indexOf(":") ||
								(g = !0, this.indent())
						}
					else "#" === this._ch && "{" === this._input.peek() ? (this.preserveSingleSpace(i), this.print_string(this._ch +
							this.eatString("}"))) : "{" === this._ch ? (g && (g = !1, this.outdent()), b ? (b = !1, f = this._indentLevel >=
								this._nestedLevel) : f = this._indentLevel >= this._nestedLevel - 1, this._options.newline_between_rules && f &&
							this._output.previous_line && "{" !== this._output.previous_line.item(-1) && this._output.ensure_empty_line_above(
								"/", ","), this._output.space_before_token = !0, "expand" === this._options.brace_style ? (this._output.add_new_line(),
								this.print_string(this._ch), this.indent(), this._output.set_indent(this._indentLevel)) : (this.indent(),
								this.print_string(this._ch)), this.eatWhitespace(!0), this._output.add_new_line()) : "}" === this._ch ? (this
							.outdent(), this._output.add_new_line(), "{" === p && this._output.trim(!0), _ = !1, v = !1, g && (this.outdent(),
								g = !1), this.print_string(this._ch), f = !1, this._nestedLevel && this._nestedLevel--, this.eatWhitespace(!0),
							this._output.add_new_line(), this._options.newline_between_rules && !this._output.just_added_blankline() &&
							"}" !== this._input.peek() && this._output.add_new_line(!0)) : ":" === this._ch ? !f && !b || this._input.lookBack(
							"&") || this.foundNestedPseudoClass() || this._input.lookBack("(") || v || 0 !== m ? (this._input.lookBack(" ") &&
							(this._output.space_before_token = !0), ":" === this._input.peek() ? (this._ch = this._input.next(), this.print_string(
								"::")) : this.print_string(":")) : (this.print_string(":"), g || (g = !0, this._output.space_before_token = !
							0, this.eatWhitespace(!0), this.indent())) : '"' === this._ch || "'" === this._ch ? (this.preserveSingleSpace(
							i), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(!0)) : ";" === this._ch ? 0 ===
						m ? (g && (this.outdent(), g = !1), v = !1, _ = !1, this.print_string(this._ch), this.eatWhitespace(!0), "/" !==
							this._input.peek() && this._output.add_new_line()) : (this.print_string(this._ch), this.eatWhitespace(!0),
							this._output.space_before_token = !0) : "(" === this._ch ? this._input.lookBack("url") ? (this.print_string(
								this._ch), this.eatWhitespace(), m++, this.indent(), this._ch = this._input.next(), ")" === this._ch || '"' ===
							this._ch || "'" === this._ch ? this._input.back() : this._ch && (this.print_string(this._ch + this.eatString(
								")")), m && (m--, this.outdent()))) : (this.preserveSingleSpace(i), this.print_string(this._ch), this.eatWhitespace(),
							m++, this.indent()) : ")" === this._ch ? (m && (m--, this.outdent()), this.print_string(this._ch)) : "," ===
						this._ch ? (this.print_string(this._ch), this.eatWhitespace(!0), !this._options.selector_separator_newline || g ||
							0 !== m || _ || v ? this._output.space_before_token = !0 : this._output.add_new_line()) : ">" !== this._ch &&
						"+" !== this._ch && "~" !== this._ch || g || 0 !== m ? "]" === this._ch ? this.print_string(this._ch) : "[" ===
						this._ch ? (this.preserveSingleSpace(i), this.print_string(this._ch)) : "=" === this._ch ? (this.eatWhitespace(),
							this.print_string("="), c.test(this._ch) && (this._ch = "")) : "!" !== this._ch || this._input.lookBack("\\") ?
						(this.preserveSingleSpace(i), this.print_string(this._ch)) : (this.print_string(" "), this.print_string(this._ch)) :
						this._options.space_around_combinator ? (this._output.space_before_token = !0, this.print_string(this._ch),
							this._output.space_before_token = !0) : (this.print_string(this._ch), this.eatWhitespace(), this._ch && c.test(
							this._ch) && (this._ch = ""));
					return this._output.get_code(t)
				}, e.exports.Beautifier = p
			}, function(e, t, n) {
				var i = n(6).Options;

				function r(e) {
					i.call(this, e, "css"), this.selector_separator_newline = this._get_boolean("selector_separator_newline", !0),
						this.newline_between_rules = this._get_boolean("newline_between_rules", !0);
					var t = this._get_boolean("space_around_selector_separator");
					this.space_around_combinator = this._get_boolean("space_around_combinator") || t;
					var n = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
					this.brace_style = "collapse";
					for (var r = 0; r < n.length; r++) "expand" !== n[r] ? this.brace_style = "collapse" : this.brace_style = n[r]
				}
				r.prototype = new i, e.exports.Options = r
			}],
			n = {};
		var i = function e(i) {
			var r = n[i];
			if (void 0 !== r) return r.exports;
			var a = n[i] = {
				exports: {}
			};
			return t[i](a, a.exports, e), a.exports
		}(15);
		e = i
	}();
	var t = e;
	"function" == typeof define && define.amd ? define("vscode-html-languageservice/beautify/beautify-css", [], (function() {
			return {
				css_beautify: t
			}
		})) : "undefined" != typeof exports ? exports.css_beautify = t : "undefined" != typeof window ? window.css_beautify =
		t : "undefined" != typeof global && (global.css_beautify = t)
}(),
function() {
	var e;
	! function() {
		"use strict";
		var t = [, , function(e) {
				function t(e) {
					this.__parent = e, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index =
						0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count =
						0, this.__items = []
				}

				function n(e, t) {
					this.__cache = [""], this.__indent_size = e.indent_size, this.__indent_string = e.indent_char, e.indent_with_tabs ||
						(this.__indent_string = new Array(e.indent_size + 1).join(e.indent_char)), t = t || "", e.indent_level > 0 && (t =
							new Array(e.indent_level + 1).join(this.__indent_string)), this.__base_string = t, this.__base_string_length =
						t.length
				}

				function i(e, i) {
					this.__indent_cache = new n(e, i), this.raw = !1, this._end_with_newline = e.end_with_newline, this.indent_size =
						e.indent_size, this.wrap_line_length = e.wrap_line_length, this.indent_empty_lines = e.indent_empty_lines, this.__lines = [],
						this.previous_line = null, this.current_line = null, this.next_line = new t(this), this.space_before_token = !1,
						this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline()
				}
				t.prototype.clone_empty = function() {
					var e = new t(this.__parent);
					return e.set_indent(this.__indent_count, this.__alignment_count), e
				}, t.prototype.item = function(e) {
					return e < 0 ? this.__items[this.__items.length + e] : this.__items[e]
				}, t.prototype.has_match = function(e) {
					for (var t = this.__items.length - 1; t >= 0; t--)
						if (this.__items[t].match(e)) return !0;
					return !1
				}, t.prototype.set_indent = function(e, t) {
					this.is_empty() && (this.__indent_count = e || 0, this.__alignment_count = t || 0, this.__character_count = this
						.__parent.get_indent_size(this.__indent_count, this.__alignment_count))
				}, t.prototype._set_wrap_point = function() {
					this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count =
						this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count =
						this.__parent.next_line.__alignment_count)
				}, t.prototype._should_wrap = function() {
					return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count >
						this.__parent.next_line.__character_count
				}, t.prototype._allow_wrap = function() {
					if (this._should_wrap()) {
						this.__parent.add_new_line();
						var e = this.__parent.current_line;
						return e.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), e.__items = this.__items
							.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), e.__character_count +=
							this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count,
							" " === e.__items[0] && (e.__items.splice(0, 1), e.__character_count -= 1), !0
					}
					return !1
				}, t.prototype.is_empty = function() {
					return 0 === this.__items.length
				}, t.prototype.last = function() {
					return this.is_empty() ? null : this.__items[this.__items.length - 1]
				}, t.prototype.push = function(e) {
					this.__items.push(e);
					var t = e.lastIndexOf("\n"); - 1 !== t ? this.__character_count = e.length - t : this.__character_count += e.length
				}, t.prototype.pop = function() {
					var e = null;
					return this.is_empty() || (e = this.__items.pop(), this.__character_count -= e.length), e
				}, t.prototype._remove_indent = function() {
					this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size)
				}, t.prototype._remove_wrap_indent = function() {
					this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1)
				}, t.prototype.trim = function() {
					for (;
						" " === this.last();) this.__items.pop(), this.__character_count -= 1
				}, t.prototype.toString = function() {
					var e = "";
					return this.is_empty() ? this.__parent.indent_empty_lines && (e = this.__parent.get_indent_string(this.__indent_count)) :
						(e = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), e += this.__items.join("")),
						e
				}, n.prototype.get_indent_size = function(e, t) {
					var n = this.__base_string_length;
					return t = t || 0, e < 0 && (n = 0), n += e * this.__indent_size, n += t
				}, n.prototype.get_indent_string = function(e, t) {
					var n = this.__base_string;
					return t = t || 0, e < 0 && (e = 0, n = ""), t += e * this.__indent_size, this.__ensure_cache(t), n += this.__cache[
						t]
				}, n.prototype.__ensure_cache = function(e) {
					for (; e >= this.__cache.length;) this.__add_column()
				}, n.prototype.__add_column = function() {
					var e = this.__cache.length,
						t = 0,
						n = "";
					this.__indent_size && e >= this.__indent_size && (e -= (t = Math.floor(e / this.__indent_size)) * this.__indent_size,
						n = new Array(t + 1).join(this.__indent_string)), e && (n += new Array(e + 1).join(" ")), this.__cache.push(n)
				}, i.prototype.__add_outputline = function() {
					this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this
						.current_line)
				}, i.prototype.get_line_number = function() {
					return this.__lines.length
				}, i.prototype.get_indent_string = function(e, t) {
					return this.__indent_cache.get_indent_string(e, t)
				}, i.prototype.get_indent_size = function(e, t) {
					return this.__indent_cache.get_indent_size(e, t)
				}, i.prototype.is_empty = function() {
					return !this.previous_line && this.current_line.is_empty()
				}, i.prototype.add_new_line = function(e) {
					return !(this.is_empty() || !e && this.just_added_newline()) && (this.raw || this.__add_outputline(), !0)
				}, i.prototype.get_code = function(e) {
					this.trim(!0);
					var t = this.current_line.pop();
					t && ("\n" === t[t.length - 1] && (t = t.replace(/\n+$/g, "")), this.current_line.push(t)), this._end_with_newline &&
						this.__add_outputline();
					var n = this.__lines.join("\n");
					return "\n" !== e && (n = n.replace(/[\n]/g, e)), n
				}, i.prototype.set_wrap_point = function() {
					this.current_line._set_wrap_point()
				}, i.prototype.set_indent = function(e, t) {
					return e = e || 0, t = t || 0, this.next_line.set_indent(e, t), this.__lines.length > 1 ? (this.current_line.set_indent(
						e, t), !0) : (this.current_line.set_indent(), !1)
				}, i.prototype.add_raw_token = function(e) {
					for (var t = 0; t < e.newlines; t++) this.__add_outputline();
					this.current_line.set_indent(-1), this.current_line.push(e.whitespace_before), this.current_line.push(e.text),
						this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1
				}, i.prototype.add_token = function(e) {
					this.__add_space_before_token(), this.current_line.push(e), this.space_before_token = !1, this.non_breaking_space = !
						1, this.previous_token_wrapped = this.current_line._allow_wrap()
				}, i.prototype.__add_space_before_token = function() {
					this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this
						.current_line.push(" "))
				}, i.prototype.remove_indent = function(e) {
					for (var t = this.__lines.length; e < t;) this.__lines[e]._remove_indent(), e++;
					this.current_line._remove_wrap_indent()
				}, i.prototype.trim = function(e) {
					for (e = void 0 !== e && e, this.current_line.trim(); e && this.__lines.length > 1 && this.current_line.is_empty();)
						this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
					this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null
				}, i.prototype.just_added_newline = function() {
					return this.current_line.is_empty()
				}, i.prototype.just_added_blankline = function() {
					return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty()
				}, i.prototype.ensure_empty_line_above = function(e, n) {
					for (var i = this.__lines.length - 2; i >= 0;) {
						var r = this.__lines[i];
						if (r.is_empty()) break;
						if (0 !== r.item(0).indexOf(e) && r.item(-1) !== n) {
							this.__lines.splice(i + 1, 0, new t(this)), this.previous_line = this.__lines[this.__lines.length - 2];
							break
						}
						i--
					}
				}, e.exports.Output = i
			}, function(e) {
				e.exports.Token = function(e, t, n, i) {
					this.type = e, this.text = t, this.comments_before = null, this.newlines = n || 0, this.whitespace_before = i ||
						"", this.parent = null, this.next = null, this.previous = null, this.opened = null, this.closed = null, this.directives =
						null
				}
			}, , , function(e) {
				function t(e, t) {
					this.raw_options = n(e, t), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol",
							"auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number(
							"indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number(
							"indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines =
						this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0),
						this.indent_with_tabs = this._get_boolean("indent_with_tabs", "\t" === this.indent_char), this.indent_with_tabs &&
						(this.indent_char = "\t", 1 === this.indent_size && (this.indent_size = 4)), this.wrap_line_length = this._get_number(
							"wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean(
							"indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "django",
							"erb", "handlebars", "php", "smarty"
						], ["auto"])
				}

				function n(e, t) {
					var n, r = {};
					for (n in e = i(e)) n !== t && (r[n] = e[n]);
					if (t && e[t])
						for (n in e[t]) r[n] = e[t][n];
					return r
				}

				function i(e) {
					var t, n = {};
					for (t in e) {
						n[t.replace(/-/g, "_")] = e[t]
					}
					return n
				}
				t.prototype._get_array = function(e, t) {
					var n = this.raw_options[e],
						i = t || [];
					return "object" == typeof n ? null !== n && "function" == typeof n.concat && (i = n.concat()) : "string" ==
						typeof n && (i = n.split(/[^a-zA-Z0-9_\/\-]+/)), i
				}, t.prototype._get_boolean = function(e, t) {
					var n = this.raw_options[e];
					return void 0 === n ? !!t : !!n
				}, t.prototype._get_characters = function(e, t) {
					var n = this.raw_options[e],
						i = t || "";
					return "string" == typeof n && (i = n.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "\t")), i
				}, t.prototype._get_number = function(e, t) {
					var n = this.raw_options[e];
					t = parseInt(t, 10), isNaN(t) && (t = 0);
					var i = parseInt(n, 10);
					return isNaN(i) && (i = t), i
				}, t.prototype._get_selection = function(e, t, n) {
					var i = this._get_selection_list(e, t, n);
					if (1 !== i.length) throw new Error("Invalid Option Value: The option '" + e +
						"' can only be one of the following values:\n" + t + "\nYou passed in: '" + this.raw_options[e] + "'");
					return i[0]
				}, t.prototype._get_selection_list = function(e, t, n) {
					if (!t || 0 === t.length) throw new Error("Selection list cannot be empty.");
					if (n = n || [t[0]], !this._is_valid_selection(n, t)) throw new Error("Invalid Default Value!");
					var i = this._get_array(e, n);
					if (!this._is_valid_selection(i, t)) throw new Error("Invalid Option Value: The option '" + e +
						"' can contain only the following values:\n" + t + "\nYou passed in: '" + this.raw_options[e] + "'");
					return i
				}, t.prototype._is_valid_selection = function(e, t) {
					return e.length && t.length && !e.some((function(e) {
						return -1 === t.indexOf(e)
					}))
				}, e.exports.Options = t, e.exports.normalizeOpts = i, e.exports.mergeOpts = n
			}, , function(e) {
				var t = RegExp.prototype.hasOwnProperty("sticky");

				function n(e) {
					this.__input = e || "", this.__input_length = this.__input.length, this.__position = 0
				}
				n.prototype.restart = function() {
					this.__position = 0
				}, n.prototype.back = function() {
					this.__position > 0 && (this.__position -= 1)
				}, n.prototype.hasNext = function() {
					return this.__position < this.__input_length
				}, n.prototype.next = function() {
					var e = null;
					return this.hasNext() && (e = this.__input.charAt(this.__position), this.__position += 1), e
				}, n.prototype.peek = function(e) {
					var t = null;
					return e = e || 0, (e += this.__position) >= 0 && e < this.__input_length && (t = this.__input.charAt(e)), t
				}, n.prototype.__match = function(e, n) {
					e.lastIndex = n;
					var i = e.exec(this.__input);
					return !i || t && e.sticky || i.index !== n && (i = null), i
				}, n.prototype.test = function(e, t) {
					return t = t || 0, (t += this.__position) >= 0 && t < this.__input_length && !!this.__match(e, t)
				}, n.prototype.testChar = function(e, t) {
					var n = this.peek(t);
					return e.lastIndex = 0, null !== n && e.test(n)
				}, n.prototype.match = function(e) {
					var t = this.__match(e, this.__position);
					return t ? this.__position += t[0].length : t = null, t
				}, n.prototype.read = function(e, t, n) {
					var i, r = "";
					return e && (i = this.match(e)) && (r += i[0]), !t || !i && e || (r += this.readUntil(t, n)), r
				}, n.prototype.readUntil = function(e, t) {
					var n, i = this.__position;
					e.lastIndex = this.__position;
					var r = e.exec(this.__input);
					return r ? (i = r.index, t && (i += r[0].length)) : i = this.__input_length, n = this.__input.substring(this.__position,
						i), this.__position = i, n
				}, n.prototype.readUntilAfter = function(e) {
					return this.readUntil(e, !0)
				}, n.prototype.get_regexp = function(e, n) {
					var i = null,
						r = "g";
					return n && t && (r = "y"), "string" == typeof e && "" !== e ? i = new RegExp(e, r) : e && (i = new RegExp(e.source,
						r)), i
				}, n.prototype.get_literal_regexp = function(e) {
					return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
				}, n.prototype.peekUntilAfter = function(e) {
					var t = this.__position,
						n = this.readUntilAfter(e);
					return this.__position = t, n
				}, n.prototype.lookBack = function(e) {
					var t = this.__position - 1;
					return t >= e.length && this.__input.substring(t - e.length, t).toLowerCase() === e
				}, e.exports.InputScanner = n
			}, function(e, t, n) {
				var i = n(8).InputScanner,
					r = n(3).Token,
					a = n(10).TokenStream,
					o = n(11).WhitespacePattern,
					s = {
						START: "TK_START",
						RAW: "TK_RAW",
						EOF: "TK_EOF"
					},
					l = function(e, t) {
						this._input = new i(e), this._options = t || {}, this.__tokens = null, this._patterns = {}, this._patterns.whitespace =
							new o(this._input)
					};
				l.prototype.tokenize = function() {
					var e;
					this._input.restart(), this.__tokens = new a, this._reset();
					for (var t = new r(s.START, ""), n = null, i = [], o = new a; t.type !== s.EOF;) {
						for (e = this._get_next_token(t, n); this._is_comment(e);) o.add(e), e = this._get_next_token(t, n);
						o.isEmpty() || (e.comments_before = o, o = new a), e.parent = n, this._is_opening(e) ? (i.push(n), n = e) : n &&
							this._is_closing(e, n) && (e.opened = n, n.closed = e, n = i.pop(), e.parent = n), e.previous = t, t.next = e,
							this.__tokens.add(e), t = e
					}
					return this.__tokens
				}, l.prototype._is_first_token = function() {
					return this.__tokens.isEmpty()
				}, l.prototype._reset = function() {}, l.prototype._get_next_token = function(e, t) {
					this._readWhitespace();
					var n = this._input.read(/.+/g);
					return n ? this._create_token(s.RAW, n) : this._create_token(s.EOF, "")
				}, l.prototype._is_comment = function(e) {
					return !1
				}, l.prototype._is_opening = function(e) {
					return !1
				}, l.prototype._is_closing = function(e, t) {
					return !1
				}, l.prototype._create_token = function(e, t) {
					return new r(e, t, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token)
				}, l.prototype._readWhitespace = function() {
					return this._patterns.whitespace.read()
				}, e.exports.Tokenizer = l, e.exports.TOKEN = s
			}, function(e) {
				function t(e) {
					this.__tokens = [], this.__tokens_length = this.__tokens.length, this.__position = 0, this.__parent_token = e
				}
				t.prototype.restart = function() {
					this.__position = 0
				}, t.prototype.isEmpty = function() {
					return 0 === this.__tokens_length
				}, t.prototype.hasNext = function() {
					return this.__position < this.__tokens_length
				}, t.prototype.next = function() {
					var e = null;
					return this.hasNext() && (e = this.__tokens[this.__position], this.__position += 1), e
				}, t.prototype.peek = function(e) {
					var t = null;
					return e = e || 0, (e += this.__position) >= 0 && e < this.__tokens_length && (t = this.__tokens[e]), t
				}, t.prototype.add = function(e) {
					this.__parent_token && (e.parent = this.__parent_token), this.__tokens.push(e), this.__tokens_length += 1
				}, e.exports.TokenStream = t
			}, function(e, t, n) {
				var i = n(12).Pattern;

				function r(e, t) {
					i.call(this, e, t), t ? this._line_regexp = this._input.get_regexp(t._line_regexp) : this.__set_whitespace_patterns(
						"", ""), this.newline_count = 0, this.whitespace_before_token = ""
				}
				r.prototype = new i, r.prototype.__set_whitespace_patterns = function(e, t) {
					e += "\\t ", t += "\\n\\r", this._match_pattern = this._input.get_regexp("[" + e + t + "]+", !0), this._newline_regexp =
						this._input.get_regexp("\\r\\n|[" + t + "]")
				}, r.prototype.read = function() {
					this.newline_count = 0, this.whitespace_before_token = "";
					var e = this._input.read(this._match_pattern);
					if (" " === e) this.whitespace_before_token = " ";
					else if (e) {
						var t = this.__split(this._newline_regexp, e);
						this.newline_count = t.length - 1, this.whitespace_before_token = t[this.newline_count]
					}
					return e
				}, r.prototype.matching = function(e, t) {
					var n = this._create();
					return n.__set_whitespace_patterns(e, t), n._update(), n
				}, r.prototype._create = function() {
					return new r(this._input, this)
				}, r.prototype.__split = function(e, t) {
					e.lastIndex = 0;
					for (var n = 0, i = [], r = e.exec(t); r;) i.push(t.substring(n, r.index)), n = r.index + r[0].length, r = e.exec(
						t);
					return n < t.length ? i.push(t.substring(n, t.length)) : i.push(""), i
				}, e.exports.WhitespacePattern = r
			}, function(e) {
				function t(e, t) {
					this._input = e, this._starting_pattern = null, this._match_pattern = null, this._until_pattern = null, this._until_after = !
						1, t && (this._starting_pattern = this._input.get_regexp(t._starting_pattern, !0), this._match_pattern = this._input
							.get_regexp(t._match_pattern, !0), this._until_pattern = this._input.get_regexp(t._until_pattern), this._until_after =
							t._until_after)
				}
				t.prototype.read = function() {
					var e = this._input.read(this._starting_pattern);
					return this._starting_pattern && !e || (e += this._input.read(this._match_pattern, this._until_pattern, this._until_after)),
						e
				}, t.prototype.read_match = function() {
					return this._input.match(this._match_pattern)
				}, t.prototype.until_after = function(e) {
					var t = this._create();
					return t._until_after = !0, t._until_pattern = this._input.get_regexp(e), t._update(), t
				}, t.prototype.until = function(e) {
					var t = this._create();
					return t._until_after = !1, t._until_pattern = this._input.get_regexp(e), t._update(), t
				}, t.prototype.starting_with = function(e) {
					var t = this._create();
					return t._starting_pattern = this._input.get_regexp(e, !0), t._update(), t
				}, t.prototype.matching = function(e) {
					var t = this._create();
					return t._match_pattern = this._input.get_regexp(e, !0), t._update(), t
				}, t.prototype._create = function() {
					return new t(this._input, this)
				}, t.prototype._update = function() {}, e.exports.Pattern = t
			}, function(e) {
				function t(e, t) {
					e = "string" == typeof e ? e : e.source, t = "string" == typeof t ? t : t.source, this.__directives_block_pattern =
						new RegExp(e + / beautify( \w+[:]\w+)+ /.source + t, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern =
						new RegExp(e + /\sbeautify\signore:end\s/.source + t, "g")
				}
				t.prototype.get_directives = function(e) {
					if (!e.match(this.__directives_block_pattern)) return null;
					var t = {};
					this.__directive_pattern.lastIndex = 0;
					for (var n = this.__directive_pattern.exec(e); n;) t[n[1]] = n[2], n = this.__directive_pattern.exec(e);
					return t
				}, t.prototype.readIgnored = function(e) {
					return e.readUntilAfter(this.__directives_end_ignore_pattern)
				}, e.exports.Directives = t
			}, function(e, t, n) {
				var i = n(12).Pattern,
					r = {
						django: !1,
						erb: !1,
						handlebars: !1,
						php: !1,
						smarty: !1
					};

				function a(e, t) {
					i.call(this, e, t), this.__template_pattern = null, this._disabled = Object.assign({}, r), this._excluded =
						Object.assign({}, r), t && (this.__template_pattern = this._input.get_regexp(t.__template_pattern), this._excluded =
							Object.assign(this._excluded, t._excluded), this._disabled = Object.assign(this._disabled, t._disabled));
					var n = new i(e);
					this.__patterns = {
						handlebars_comment: n.starting_with(/{{!--/).until_after(/--}}/),
						handlebars_unescaped: n.starting_with(/{{{/).until_after(/}}}/),
						handlebars: n.starting_with(/{{/).until_after(/}}/),
						php: n.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
						erb: n.starting_with(/<%[^%]/).until_after(/[^%]%>/),
						django: n.starting_with(/{%/).until_after(/%}/),
						django_value: n.starting_with(/{{/).until_after(/}}/),
						django_comment: n.starting_with(/{#/).until_after(/#}/),
						smarty: n.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
						smarty_comment: n.starting_with(/{\*/).until_after(/\*}/),
						smarty_literal: n.starting_with(/{literal}/).until_after(/{\/literal}/)
					}
				}
				a.prototype = new i, a.prototype._create = function() {
					return new a(this._input, this)
				}, a.prototype._update = function() {
					this.__set_templated_pattern()
				}, a.prototype.disable = function(e) {
					var t = this._create();
					return t._disabled[e] = !0, t._update(), t
				}, a.prototype.read_options = function(e) {
					var t = this._create();
					for (var n in r) t._disabled[n] = -1 === e.templating.indexOf(n);
					return t._update(), t
				}, a.prototype.exclude = function(e) {
					var t = this._create();
					return t._excluded[e] = !0, t._update(), t
				}, a.prototype.read = function() {
					var e = "";
					e = this._match_pattern ? this._input.read(this._starting_pattern) : this._input.read(this._starting_pattern,
						this.__template_pattern);
					for (var t = this._read_template(); t;) this._match_pattern ? t += this._input.read(this._match_pattern) : t +=
						this._input.readUntil(this.__template_pattern), e += t, t = this._read_template();
					return this._until_after && (e += this._input.readUntilAfter(this._until_pattern)), e
				}, a.prototype.__set_templated_pattern = function() {
					var e = [];
					this._disabled.php || e.push(this.__patterns.php._starting_pattern.source), this._disabled.handlebars || e.push(
							this.__patterns.handlebars._starting_pattern.source), this._disabled.erb || e.push(this.__patterns.erb._starting_pattern
							.source), this._disabled.django || (e.push(this.__patterns.django._starting_pattern.source), e.push(this.__patterns
							.django_value._starting_pattern.source), e.push(this.__patterns.django_comment._starting_pattern.source)),
						this._disabled.smarty || e.push(this.__patterns.smarty._starting_pattern.source), this._until_pattern && e.push(
							this._until_pattern.source), this.__template_pattern = this._input.get_regexp("(?:" + e.join("|") + ")")
				}, a.prototype._read_template = function() {
					var e = "",
						t = this._input.peek();
					if ("<" === t) {
						var n = this._input.peek(1);
						this._disabled.php || this._excluded.php || "?" !== n || (e = e || this.__patterns.php.read()), this._disabled.erb ||
							this._excluded.erb || "%" !== n || (e = e || this.__patterns.erb.read())
					} else "{" === t && (this._disabled.handlebars || this._excluded.handlebars || (e = (e = (e = e || this.__patterns
							.handlebars_comment.read()) || this.__patterns.handlebars_unescaped.read()) || this.__patterns.handlebars.read()),
						this._disabled.django || (this._excluded.django || this._excluded.handlebars || (e = e || this.__patterns.django_value
							.read()), this._excluded.django || (e = (e = e || this.__patterns.django_comment.read()) || this.__patterns.django
							.read())), this._disabled.smarty || this._disabled.django && this._disabled.handlebars && (e = (e = (e = e ||
							this.__patterns.smarty_comment.read()) || this.__patterns.smarty_literal.read()) || this.__patterns.smarty.read())
					);
					return e
				}, e.exports.TemplatablePattern = a
			}, , , , function(e, t, n) {
				var i = n(19).Beautifier,
					r = n(20).Options;
				e.exports = function(e, t, n, r) {
					return new i(e, t, n, r).beautify()
				}, e.exports.defaultOptions = function() {
					return new r
				}
			}, function(e, t, n) {
				var i = n(20).Options,
					r = n(2).Output,
					a = n(21).Tokenizer,
					o = n(21).TOKEN,
					s = /\r\n|[\r\n]/,
					l = /\r\n|[\r\n]/g,
					c = function(e, t) {
						this.indent_level = 0, this.alignment_size = 0, this.max_preserve_newlines = e.max_preserve_newlines, this.preserve_newlines =
							e.preserve_newlines, this._output = new r(e, t)
					};
				c.prototype.current_line_has_match = function(e) {
					return this._output.current_line.has_match(e)
				}, c.prototype.set_space_before_token = function(e, t) {
					this._output.space_before_token = e, this._output.non_breaking_space = t
				}, c.prototype.set_wrap_point = function() {
					this._output.set_indent(this.indent_level, this.alignment_size), this._output.set_wrap_point()
				}, c.prototype.add_raw_token = function(e) {
					this._output.add_raw_token(e)
				}, c.prototype.print_preserved_newlines = function(e) {
					var t = 0;
					e.type !== o.TEXT && e.previous.type !== o.TEXT && (t = e.newlines ? 1 : 0), this.preserve_newlines && (t = e.newlines <
						this.max_preserve_newlines + 1 ? e.newlines : this.max_preserve_newlines + 1);
					for (var n = 0; n < t; n++) this.print_newline(n > 0);
					return 0 !== t
				}, c.prototype.traverse_whitespace = function(e) {
					return !(!e.whitespace_before && !e.newlines) && (this.print_preserved_newlines(e) || (this._output.space_before_token = !
						0), !0)
				}, c.prototype.previous_token_wrapped = function() {
					return this._output.previous_token_wrapped
				}, c.prototype.print_newline = function(e) {
					this._output.add_new_line(e)
				}, c.prototype.print_token = function(e) {
					e.text && (this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(e.text))
				}, c.prototype.indent = function() {
					this.indent_level++
				}, c.prototype.get_full_indent = function(e) {
					return (e = this.indent_level + (e || 0)) < 1 ? "" : this._output.get_indent_string(e)
				};
				var d = function(e, t) {
					var n = null,
						i = null;
					return t.closed ? ("script" === e ? n = "text/javascript" : "style" === e && (n = "text/css"), (n = function(e) {
						for (var t = null, n = e.next; n.type !== o.EOF && e.closed !== n;) {
							if (n.type === o.ATTRIBUTE && "type" === n.text) {
								n.next && n.next.type === o.EQUALS && n.next.next && n.next.next.type === o.VALUE && (t = n.next.next.text);
								break
							}
							n = n.next
						}
						return t
					}(t) || n).search("text/css") > -1 ? i = "css" : n.search(
						/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/
					) > -1 ? i = "javascript" : n.search(/(text|application|dojo)\/(x-)?(html)/) > -1 ? i = "html" : n.search(
						/test\/null/) > -1 && (i = "null"), i) : null
				};

				function h(e, t) {
					return -1 !== t.indexOf(e)
				}

				function u(e, t, n) {
					this.parent = e || null, this.tag = t ? t.tag_name : "", this.indent_level = n || 0, this.parser_token = t ||
						null
				}

				function p(e) {
					this._printer = e, this._current_frame = null
				}

				function m(e, t, n, r) {
					this._source_text = e || "", t = t || {}, this._js_beautify = n, this._css_beautify = r, this._tag_stack = null;
					var a = new i(t, "html");
					this._options = a, this._is_wrap_attributes_force = "force" === this._options.wrap_attributes.substr(0, "force".length),
						this._is_wrap_attributes_force_expand_multiline = "force-expand-multiline" === this._options.wrap_attributes,
						this._is_wrap_attributes_force_aligned = "force-aligned" === this._options.wrap_attributes, this._is_wrap_attributes_aligned_multiple =
						"aligned-multiple" === this._options.wrap_attributes, this._is_wrap_attributes_preserve = "preserve" === this._options
						.wrap_attributes.substr(0, "preserve".length), this._is_wrap_attributes_preserve_aligned = "preserve-aligned" ===
						this._options.wrap_attributes
				}
				p.prototype.get_parser_token = function() {
					return this._current_frame ? this._current_frame.parser_token : null
				}, p.prototype.record_tag = function(e) {
					var t = new u(this._current_frame, e, this._printer.indent_level);
					this._current_frame = t
				}, p.prototype._try_pop_frame = function(e) {
					var t = null;
					return e && (t = e.parser_token, this._printer.indent_level = e.indent_level, this._current_frame = e.parent), t
				}, p.prototype._get_frame = function(e, t) {
					for (var n = this._current_frame; n && -1 === e.indexOf(n.tag);) {
						if (t && -1 !== t.indexOf(n.tag)) {
							n = null;
							break
						}
						n = n.parent
					}
					return n
				}, p.prototype.try_pop = function(e, t) {
					var n = this._get_frame([e], t);
					return this._try_pop_frame(n)
				}, p.prototype.indent_to_tag = function(e) {
					var t = this._get_frame(e);
					t && (this._printer.indent_level = t.indent_level)
				}, m.prototype.beautify = function() {
					if (this._options.disabled) return this._source_text;
					var e = this._source_text,
						t = this._options.eol;
					"auto" === this._options.eol && (t = "\n", e && s.test(e) && (t = e.match(s)[0]));
					var n = (e = e.replace(l, "\n")).match(/^[\t ]*/)[0],
						i = {
							text: "",
							type: ""
						},
						r = new f,
						d = new c(this._options, n),
						h = new a(e, this._options).tokenize();
					this._tag_stack = new p(d);
					for (var u = null, m = h.next(); m.type !== o.EOF;) m.type === o.TAG_OPEN || m.type === o.COMMENT ? r = u = this
						._handle_tag_open(d, m, r, i) : m.type === o.ATTRIBUTE || m.type === o.EQUALS || m.type === o.VALUE || m.type ===
						o.TEXT && !r.tag_complete ? u = this._handle_inside_tag(d, m, r, h) : m.type === o.TAG_CLOSE ? u = this._handle_tag_close(
							d, m, r) : m.type === o.TEXT ? u = this._handle_text(d, m, r) : d.add_raw_token(m), i = u, m = h.next();
					return d._output.get_code(t)
				}, m.prototype._handle_tag_close = function(e, t, n) {
					var i = {
						text: t.text,
						type: t.type
					};
					return e.alignment_size = 0, n.tag_complete = !0, e.set_space_before_token(t.newlines || "" !== t.whitespace_before,
							!0), n.is_unformatted ? e.add_raw_token(t) : ("<" === n.tag_start_char && (e.set_space_before_token("/" === t.text[
							0], !0), this._is_wrap_attributes_force_expand_multiline && n.has_wrapped_attrs && e.print_newline(!1)), e.print_token(
							t)), !n.indent_content || n.is_unformatted || n.is_content_unformatted || (e.indent(), n.indent_content = !1),
						n.is_inline_element || n.is_unformatted || n.is_content_unformatted || e.set_wrap_point(), i
				}, m.prototype._handle_inside_tag = function(e, t, n, i) {
					var r = n.has_wrapped_attrs,
						a = {
							text: t.text,
							type: t.type
						};
					if (e.set_space_before_token(t.newlines || "" !== t.whitespace_before, !0), n.is_unformatted) e.add_raw_token(t);
					else if ("{" === n.tag_start_char && t.type === o.TEXT) e.print_preserved_newlines(t) ? (t.newlines = 0, e.add_raw_token(
						t)) : e.print_token(t);
					else {
						if (t.type === o.ATTRIBUTE ? (e.set_space_before_token(!0), n.attr_count += 1) : (t.type === o.EQUALS || t.type ===
								o.VALUE && t.previous.type === o.EQUALS) && e.set_space_before_token(!1), t.type === o.ATTRIBUTE && "<" ===
							n.tag_start_char && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (e.traverse_whitespace(
								t), r = r || 0 !== t.newlines), this._is_wrap_attributes_force)) {
							var s = n.attr_count > 1;
							if (this._is_wrap_attributes_force_expand_multiline && 1 === n.attr_count) {
								var l, c = !0,
									d = 0;
								do {
									if ((l = i.peek(d)).type === o.ATTRIBUTE) {
										c = !1;
										break
									}
									d += 1
								} while (d < 4 && l.type !== o.EOF && l.type !== o.TAG_CLOSE);
								s = !c
							}
							s && (e.print_newline(!1), r = !0)
						}
						e.print_token(t), r = r || e.previous_token_wrapped(), n.has_wrapped_attrs = r
					}
					return a
				}, m.prototype._handle_text = function(e, t, n) {
					var i = {
						text: t.text,
						type: "TK_CONTENT"
					};
					return n.custom_beautifier_name ? this._print_custom_beatifier_text(e, t, n) : n.is_unformatted || n.is_content_unformatted ?
						e.add_raw_token(t) : (e.traverse_whitespace(t), e.print_token(t)), i
				}, m.prototype._print_custom_beatifier_text = function(e, t, n) {
					var i = this;
					if ("" !== t.text) {
						var r, a = t.text,
							o = 1,
							s = "",
							l = "";
						"javascript" === n.custom_beautifier_name && "function" == typeof this._js_beautify ? r = this._js_beautify :
							"css" === n.custom_beautifier_name && "function" == typeof this._css_beautify ? r = this._css_beautify :
							"html" === n.custom_beautifier_name && (r = function(e, t) {
								return new m(e, t, i._js_beautify, i._css_beautify).beautify()
							}), "keep" === this._options.indent_scripts ? o = 0 : "separate" === this._options.indent_scripts && (o = -e.indent_level);
						var c = e.get_full_indent(o);
						if (a = a.replace(/\n[ \t]*$/, ""), "html" !== n.custom_beautifier_name && "<" === a[0] && a.match(
								/^(<!--|<!\[CDATA\[)/)) {
							var d = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(a);
							if (!d) return void e.add_raw_token(t);
							s = c + d[1] + "\n", a = d[4], d[5] && (l = c + d[5]), a = a.replace(/\n[ \t]*$/, ""), (d[2] || -1 !== d[3].indexOf(
								"\n")) && (d = d[3].match(/[ \t]+$/)) && (t.whitespace_before = d[0])
						}
						if (a)
							if (r) {
								var h = function() {
									this.eol = "\n"
								};
								h.prototype = this._options.raw_options, a = r(c + a, new h)
							} else {
								var u = t.whitespace_before;
								u && (a = a.replace(new RegExp("\n(" + u + ")?", "g"), "\n")), a = c + a.replace(/\n/g, "\n" + c)
							} s && (a = a ? s + a + "\n" + l : s + l), e.print_newline(!1), a && (t.text = a, t.whitespace_before = "", t.newlines =
							0, e.add_raw_token(t), e.print_newline(!0))
					}
				}, m.prototype._handle_tag_open = function(e, t, n, i) {
					var r = this._get_tag_open_token(t);
					return !n.is_unformatted && !n.is_content_unformatted || n.is_empty_element || t.type !== o.TAG_OPEN || 0 !== t.text
						.indexOf("</") ? (e.traverse_whitespace(t), this._set_tag_position(e, t, r, n, i), r.is_inline_element || e.set_wrap_point(),
							e.print_token(t)) : (e.add_raw_token(t), r.start_tag_token = this._tag_stack.try_pop(r.tag_name)), (this._is_wrap_attributes_force_aligned ||
							this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (r.alignment_size =
							t.text.length + 1), r.tag_complete || r.is_unformatted || (e.alignment_size = r.alignment_size), r
				};
				var f = function(e, t) {
					var n;
					(this.parent = e || null, this.text = "", this.type = "TK_TAG_OPEN", this.tag_name = "", this.is_inline_element = !
						1, this.is_unformatted = !1, this.is_content_unformatted = !1, this.is_empty_element = !1, this.is_start_tag = !
						1, this.is_end_tag = !1, this.indent_content = !1, this.multiline_content = !1, this.custom_beautifier_name =
						null, this.start_tag_token = null, this.attr_count = 0, this.has_wrapped_attrs = !1, this.alignment_size = 0,
						this.tag_complete = !1, this.tag_start_char = "", this.tag_check = "", t) ? (this.tag_start_char = t.text[0],
						this.text = t.text, "<" === this.tag_start_char ? (n = t.text.match(/^<([^\s>]*)/), this.tag_check = n ? n[1] :
							"") : (n = t.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/), this.tag_check = n ? n[1] : "", "{{#>" === t.text &&
							">" === this.tag_check && null !== t.next && (this.tag_check = t.next.text)), this.tag_check = this.tag_check.toLowerCase(),
						t.type === o.COMMENT && (this.tag_complete = !0), this.is_start_tag = "/" !== this.tag_check.charAt(0), this.tag_name =
						this.is_start_tag ? this.tag_check : this.tag_check.substr(1), this.is_end_tag = !this.is_start_tag || t.closed &&
						"/>" === t.closed.text, this.is_end_tag = this.is_end_tag || "{" === this.tag_start_char && (this.text.length <
							3 || /[^#\^]/.test(this.text.charAt(2)))) : this.tag_complete = !0
				};
				m.prototype._get_tag_open_token = function(e) {
					var t = new f(this._tag_stack.get_parser_token(), e);
					return t.alignment_size = this._options.wrap_attributes_indent_size, t.is_end_tag = t.is_end_tag || h(t.tag_check,
							this._options.void_elements), t.is_empty_element = t.tag_complete || t.is_start_tag && t.is_end_tag, t.is_unformatted = !
						t.tag_complete && h(t.tag_check, this._options.unformatted), t.is_content_unformatted = !t.is_empty_element &&
						h(t.tag_check, this._options.content_unformatted), t.is_inline_element = h(t.tag_name, this._options.inline) ||
						"{" === t.tag_start_char, t
				}, m.prototype._set_tag_position = function(e, t, n, i, r) {
					if (n.is_empty_element || (n.is_end_tag ? n.start_tag_token = this._tag_stack.try_pop(n.tag_name) : (this._do_optional_end_element(
								n) && (n.is_inline_element || e.print_newline(!1)), this._tag_stack.record_tag(n), "script" !== n.tag_name &&
							"style" !== n.tag_name || n.is_unformatted || n.is_content_unformatted || (n.custom_beautifier_name = d(n.tag_check,
								t)))), h(n.tag_check, this._options.extra_liners) && (e.print_newline(!1), e._output.just_added_blankline() ||
							e.print_newline(!0)), n.is_empty_element) {
						if ("{" === n.tag_start_char && "else" === n.tag_check) this._tag_stack.indent_to_tag(["if", "unless", "each"]),
							n.indent_content = !0, e.current_line_has_match(/{{#if/) || e.print_newline(!1);
						"!--" === n.tag_name && r.type === o.TAG_CLOSE && i.is_end_tag && -1 === n.text.indexOf("\n") || (n.is_inline_element ||
							n.is_unformatted || e.print_newline(!1), this._calcluate_parent_multiline(e, n))
					} else if (n.is_end_tag) {
						var a = !1;
						a = (a = n.start_tag_token && n.start_tag_token.multiline_content) || !n.is_inline_element && !(i.is_inline_element ||
							i.is_unformatted) && !(r.type === o.TAG_CLOSE && n.start_tag_token === i) && "TK_CONTENT" !== r.type, (n.is_content_unformatted ||
							n.is_unformatted) && (a = !1), a && e.print_newline(!1)
					} else n.indent_content = !n.custom_beautifier_name, "<" === n.tag_start_char && ("html" === n.tag_name ? n.indent_content =
							this._options.indent_inner_html : "head" === n.tag_name ? n.indent_content = this._options.indent_head_inner_html :
							"body" === n.tag_name && (n.indent_content = this._options.indent_body_inner_html)), n.is_inline_element || n.is_unformatted ||
						"TK_CONTENT" === r.type && !n.is_content_unformatted || e.print_newline(!1), this._calcluate_parent_multiline(e,
							n)
				}, m.prototype._calcluate_parent_multiline = function(e, t) {
					!t.parent || !e._output.just_added_newline() || (t.is_inline_element || t.is_unformatted) && t.parent.is_inline_element ||
						(t.parent.multiline_content = !0)
				};
				var g = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure",
						"footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "nav", "ol", "p", "pre", "section",
						"table", "ul"
					],
					b = ["a", "audio", "del", "ins", "map", "noscript", "video"];
				m.prototype._do_optional_end_element = function(e) {
					var t = null;
					if (!e.is_empty_element && e.is_start_tag && e.parent) {
						if ("body" === e.tag_name) t = t || this._tag_stack.try_pop("head");
						else if ("li" === e.tag_name) t = t || this._tag_stack.try_pop("li", ["ol", "ul"]);
						else if ("dd" === e.tag_name || "dt" === e.tag_name) t = (t = t || this._tag_stack.try_pop("dt", ["dl"])) ||
							this._tag_stack.try_pop("dd", ["dl"]);
						else if ("p" === e.parent.tag_name && -1 !== g.indexOf(e.tag_name)) {
							var n = e.parent.parent;
							n && -1 !== b.indexOf(n.tag_name) || (t = t || this._tag_stack.try_pop("p"))
						} else "rp" === e.tag_name || "rt" === e.tag_name ? t = (t = t || this._tag_stack.try_pop("rt", ["ruby", "rtc"])) ||
							this._tag_stack.try_pop("rp", ["ruby", "rtc"]) : "optgroup" === e.tag_name ? t = t || this._tag_stack.try_pop(
								"optgroup", ["select"]) : "option" === e.tag_name ? t = t || this._tag_stack.try_pop("option", ["select",
								"datalist", "optgroup"
							]) : "colgroup" === e.tag_name ? t = t || this._tag_stack.try_pop("caption", ["table"]) : "thead" === e.tag_name ?
							t = (t = t || this._tag_stack.try_pop("caption", ["table"])) || this._tag_stack.try_pop("colgroup", ["table"]) :
							"tbody" === e.tag_name || "tfoot" === e.tag_name ? t = (t = (t = (t = t || this._tag_stack.try_pop("caption",
								["table"])) || this._tag_stack.try_pop("colgroup", ["table"])) || this._tag_stack.try_pop("thead", ["table"])) ||
							this._tag_stack.try_pop("tbody", ["table"]) : "tr" === e.tag_name ? t = (t = (t = t || this._tag_stack.try_pop(
								"caption", ["table"])) || this._tag_stack.try_pop("colgroup", ["table"])) || this._tag_stack.try_pop("tr", [
								"table", "thead", "tbody", "tfoot"
							]) : "th" !== e.tag_name && "td" !== e.tag_name || (t = (t = t || this._tag_stack.try_pop("td", ["table",
								"thead", "tbody", "tfoot", "tr"
							])) || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]));
						return e.parent = this._tag_stack.get_parser_token(), t
					}
				}, e.exports.Beautifier = m
			}, function(e, t, n) {
				var i = n(6).Options;

				function r(e) {
					i.call(this, e, "html"), 1 === this.templating.length && "auto" === this.templating[0] && (this.templating = [
							"django", "erb", "handlebars", "php"
						]), this.indent_inner_html = this._get_boolean("indent_inner_html"), this.indent_body_inner_html = this._get_boolean(
							"indent_body_inner_html", !0), this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", !0),
						this.indent_handlebars = this._get_boolean("indent_handlebars", !0), this.wrap_attributes = this._get_selection(
							"wrap_attributes", ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve",
								"preserve-aligned"
							]), this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size), this.extra_liners =
						this._get_array("extra_liners", ["head", "body", "/html"]), this.inline = this._get_array("inline", ["a", "abbr",
							"area", "audio", "b", "bdi", "bdo", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn",
							"em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter",
							"noscript", "object", "output", "progress", "q", "ruby", "s", "samp", "select", "small", "span", "strong",
							"sub", "sup", "svg", "template", "textarea", "time", "u", "var", "video", "wbr", "text", "acronym", "big",
							"strike", "tt"
						]), this.void_elements = this._get_array("void_elements", ["area", "base", "br", "col", "embed", "hr", "img",
							"input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr", "!doctype", "?xml",
							"basefont", "isindex"
						]), this.unformatted = this._get_array("unformatted", []), this.content_unformatted = this._get_array(
							"content_unformatted", ["pre", "textarea"]), this.unformatted_content_delimiter = this._get_characters(
							"unformatted_content_delimiter"), this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep",
							"separate"
						])
				}
				r.prototype = new i, e.exports.Options = r
			}, function(e, t, n) {
				var i = n(9).Tokenizer,
					r = n(9).TOKEN,
					a = n(13).Directives,
					o = n(14).TemplatablePattern,
					s = n(12).Pattern,
					l = {
						TAG_OPEN: "TK_TAG_OPEN",
						TAG_CLOSE: "TK_TAG_CLOSE",
						ATTRIBUTE: "TK_ATTRIBUTE",
						EQUALS: "TK_EQUALS",
						VALUE: "TK_VALUE",
						COMMENT: "TK_COMMENT",
						TEXT: "TK_TEXT",
						UNKNOWN: "TK_UNKNOWN",
						START: r.START,
						RAW: r.RAW,
						EOF: r.EOF
					},
					c = new a(/<\!--/, /-->/),
					d = function(e, t) {
						i.call(this, e, t), this._current_tag_name = "";
						var n = new o(this._input).read_options(this._options),
							r = new s(this._input);
						if (this.__patterns = {
								word: n.until(/[\n\r\t <]/),
								single_quote: n.until_after(/'/),
								double_quote: n.until_after(/"/),
								attribute: n.until(/[\n\r\t =>]|\/>/),
								element_name: n.until(/[\n\r\t >\/]/),
								handlebars_comment: r.starting_with(/{{!--/).until_after(/--}}/),
								handlebars: r.starting_with(/{{/).until_after(/}}/),
								handlebars_open: r.until(/[\n\r\t }]/),
								handlebars_raw_close: r.until(/}}/),
								comment: r.starting_with(/<!--/).until_after(/-->/),
								cdata: r.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
								conditional_comment: r.starting_with(/<!\[/).until_after(/]>/),
								processing: r.starting_with(/<\?/).until_after(/\?>/)
							}, this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude("handlebars")), this
							._unformatted_content_delimiter = null, this._options.unformatted_content_delimiter) {
							var a = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
							this.__patterns.unformatted_content_delimiter = r.matching(a).until_after(a)
						}
					};
				(d.prototype = new i)._is_comment = function(e) {
					return !1
				}, d.prototype._is_opening = function(e) {
					return e.type === l.TAG_OPEN
				}, d.prototype._is_closing = function(e, t) {
					return e.type === l.TAG_CLOSE && t && ((">" === e.text || "/>" === e.text) && "<" === t.text[0] || "}}" === e.text &&
						"{" === t.text[0] && "{" === t.text[1])
				}, d.prototype._reset = function() {
					this._current_tag_name = ""
				}, d.prototype._get_next_token = function(e, t) {
					var n = null;
					this._readWhitespace();
					var i = this._input.peek();
					return null === i ? this._create_token(l.EOF, "") : n = (n = (n = (n = (n = (n = (n = (n = (n = n || this._read_open_handlebars(
							i, t)) || this._read_attribute(i, e, t)) || this._read_close(i, t)) || this._read_raw_content(i, e, t)) ||
						this._read_content_word(i)) || this._read_comment_or_cdata(i)) || this._read_processing(i)) || this._read_open(
						i, t)) || this._create_token(l.UNKNOWN, this._input.next())
				}, d.prototype._read_comment_or_cdata = function(e) {
					var t = null,
						n = null,
						i = null;
					"<" === e && ("!" === this._input.peek(1) && ((n = this.__patterns.comment.read()) ? (i = c.get_directives(n)) &&
						"start" === i.ignore && (n += c.readIgnored(this._input)) : n = this.__patterns.cdata.read()), n && ((t =
						this._create_token(l.COMMENT, n)).directives = i));
					return t
				}, d.prototype._read_processing = function(e) {
					var t = null,
						n = null;
					if ("<" === e) {
						var i = this._input.peek(1);
						"!" !== i && "?" !== i || (n = (n = this.__patterns.conditional_comment.read()) || this.__patterns.processing.read()),
							n && ((t = this._create_token(l.COMMENT, n)).directives = null)
					}
					return t
				}, d.prototype._read_open = function(e, t) {
					var n = null,
						i = null;
					return t || "<" === e && (n = this._input.next(), "/" === this._input.peek() && (n += this._input.next()), n +=
						this.__patterns.element_name.read(), i = this._create_token(l.TAG_OPEN, n)), i
				}, d.prototype._read_open_handlebars = function(e, t) {
					var n = null,
						i = null;
					return t || this._options.indent_handlebars && "{" === e && "{" === this._input.peek(1) && ("!" === this._input.peek(
						2) ? (n = (n = this.__patterns.handlebars_comment.read()) || this.__patterns.handlebars.read(), i = this._create_token(
						l.COMMENT, n)) : (n = this.__patterns.handlebars_open.read(), i = this._create_token(l.TAG_OPEN, n))), i
				}, d.prototype._read_close = function(e, t) {
					var n = null,
						i = null;
					return t && ("<" === t.text[0] && (">" === e || "/" === e && ">" === this._input.peek(1)) ? (n = this._input.next(),
							"/" === e && (n += this._input.next()), i = this._create_token(l.TAG_CLOSE, n)) : "{" === t.text[0] && "}" ===
						e && "}" === this._input.peek(1) && (this._input.next(), this._input.next(), i = this._create_token(l.TAG_CLOSE,
							"}}"))), i
				}, d.prototype._read_attribute = function(e, t, n) {
					var i = null,
						r = "";
					if (n && "<" === n.text[0])
						if ("=" === e) i = this._create_token(l.EQUALS, this._input.next());
						else if ('"' === e || "'" === e) {
						var a = this._input.next();
						a += '"' === e ? this.__patterns.double_quote.read() : this.__patterns.single_quote.read(), i = this._create_token(
							l.VALUE, a)
					} else(r = this.__patterns.attribute.read()) && (i = t.type === l.EQUALS ? this._create_token(l.VALUE, r) : this
						._create_token(l.ATTRIBUTE, r));
					return i
				}, d.prototype._is_content_unformatted = function(e) {
					return -1 === this._options.void_elements.indexOf(e) && (-1 !== this._options.content_unformatted.indexOf(e) ||
						-1 !== this._options.unformatted.indexOf(e))
				}, d.prototype._read_raw_content = function(e, t, n) {
					var i = "";
					if (n && "{" === n.text[0]) i = this.__patterns.handlebars_raw_close.read();
					else if (t.type === l.TAG_CLOSE && "<" === t.opened.text[0] && "/" !== t.text[0]) {
						var r = t.opened.text.substr(1).toLowerCase();
						if ("script" === r || "style" === r) {
							var a = this._read_comment_or_cdata(e);
							if (a) return a.type = l.TEXT, a;
							i = this._input.readUntil(new RegExp("</" + r + "[\\n\\r\\t ]*?>", "ig"))
						} else this._is_content_unformatted(r) && (i = this._input.readUntil(new RegExp("</" + r + "[\\n\\r\\t ]*?>",
							"ig")))
					}
					return i ? this._create_token(l.TEXT, i) : null
				}, d.prototype._read_content_word = function(e) {
					var t = "";
					if (this._options.unformatted_content_delimiter && e === this._options.unformatted_content_delimiter[0] && (t =
							this.__patterns.unformatted_content_delimiter.read()), t || (t = this.__patterns.word.read()), t) return this._create_token(
						l.TEXT, t)
				}, e.exports.Tokenizer = d, e.exports.TOKEN = l
			}],
			n = {};
		var i = function e(i) {
			var r = n[i];
			if (void 0 !== r) return r.exports;
			var a = n[i] = {
				exports: {}
			};
			return t[i](a, a.exports, e), a.exports
		}(18);
		e = i
	}();
	var t = e;
	if ("function" == typeof define && define.amd) define("vscode-html-languageservice/beautify/beautify-html", ["require",
		"./beautify", "./beautify-css"
	], (function(e) {
		var n = e("./beautify"),
			i = e("./beautify-css");
		return {
			html_beautify: function(e, r) {
				return t(e, r, n.js_beautify, i.css_beautify)
			}
		}
	}));
	else if ("undefined" != typeof exports) {
		var n = require("./beautify.js"),
			i = require("./beautify-css.js");
		exports.html_beautify = function(e, r) {
			return t(e, r, n.js_beautify, i.css_beautify)
		}
	} else "undefined" != typeof window ? window.html_beautify = function(e, n) {
		return t(e, n, window.js_beautify, window.css_beautify)
	} : "undefined" != typeof global && (global.html_beautify = function(e, n) {
		return t(e, n, global.js_beautify, global.css_beautify)
	})
}(),
function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlFormatter", [
		"require", "exports", "../htmlLanguageTypes", "../beautify/beautify-html", "../utils/strings"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.format = void 0;
	var n = e("../htmlLanguageTypes"),
		i = e("../beautify/beautify-html"),
		r = e("../utils/strings");

	function a(e, t, n) {
		if (e && e.hasOwnProperty(t)) {
			var i = e[t];
			if (null !== i) return i
		}
		return n
	}

	function o(e, t, n) {
		var i = a(e, t, null);
		return "string" == typeof i ? i.length > 0 ? i.split(",").map((function(e) {
			return e.trim().toLowerCase()
		})) : [] : n
	}

	function s(e, t) {
		return !0 === a(e, "templating", t) ? ["auto"] : ["none"]
	}

	function l(e, t) {
		return -1 !== "\r\n".indexOf(e.charAt(t))
	}

	function c(e, t) {
		return -1 !== " \t".indexOf(e.charAt(t))
	}
	t.format = function(e, t, d) {
		var h = e.getText(),
			u = !0,
			p = 0,
			m = d.tabSize || 4;
		if (t) {
			for (var f = e.offsetAt(t.start), g = f; g > 0 && c(h, g - 1);) g--;
			0 === g || l(h, g - 1) ? f = g : g < f && (f = g + 1);
			for (var b = e.offsetAt(t.end), v = b; v < h.length && c(h, v);) v++;
			(v === h.length || l(h, v)) && (b = v), t = n.Range.create(e.positionAt(f), e.positionAt(b));
			var _ = h.substring(0, f);
			if (new RegExp(/.*[<][^>]*$/).test(_)) return [{
				range: t,
				newText: h = h.substring(f, b)
			}];
			if (u = b === h.length, h = h.substring(f, b), 0 !== f) {
				var w = e.offsetAt(n.Position.create(t.start.line, 0));
				p = function(e, t, n) {
					var i = t,
						r = 0,
						a = n.tabSize || 4;
					for (; i < e.length;) {
						var o = e.charAt(i);
						if (" " === o) r++;
						else {
							if ("\t" !== o) break;
							r += a
						}
						i++
					}
					return Math.floor(r / a)
				}(e.getText(), w, d)
			}
		} else t = n.Range.create(n.Position.create(0, 0), e.positionAt(h.length));
		var y = {
				indent_size: m,
				indent_char: d.insertSpaces ? " " : "\t",
				indent_empty_lines: a(d, "indentEmptyLines", !1),
				wrap_line_length: a(d, "wrapLineLength", 120),
				unformatted: o(d, "unformatted", void 0),
				content_unformatted: o(d, "contentUnformatted", void 0),
				indent_inner_html: a(d, "indentInnerHtml", !1),
				preserve_newlines: a(d, "preserveNewLines", !0),
				max_preserve_newlines: a(d, "maxPreserveNewLines", 32786),
				indent_handlebars: a(d, "indentHandlebars", !1),
				end_with_newline: u && a(d, "endWithNewline", !1),
				extra_liners: o(d, "extraLiners", void 0),
				wrap_attributes: a(d, "wrapAttributes", "auto"),
				wrap_attributes_indent_size: a(d, "wrapAttributesIndentSize", void 0),
				eol: "\n",
				indent_scripts: a(d, "indentScripts", "normal"),
				templating: s(d, "all"),
				unformatted_content_delimiter: a(d, "unformattedContentDelimiter", "")
			},
			T = i.html_beautify(h.replace(/^\s+/, ""), y);
		if (p > 0) {
			var k = d.insertSpaces ? r.repeat(" ", m * p) : r.repeat("\t", p);
			T = T.split("\n").join("\n" + k), 0 === t.start.character && (T = k + T)
		}
		return [{
			range: t,
			newText: T
		}]
	}
})),
function(e, t) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = t();
	else if ("function" == typeof define && define.amd) define("vscode-uri/index", [], t);
	else {
		var n = t();
		for (var i in n)("object" == typeof exports ? exports : e)[i] = n[i]
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
						for (var n, i = "", r = 0, a = -1, o = 0, s = 0; s <= e.length; ++s) {
							if (s < e.length) n = e.charCodeAt(s);
							else {
								if (47 === n) break;
								n = 47
							}
							if (47 === n) {
								if (a === s - 1 || 1 === o);
								else if (a !== s - 1 && 2 === o) {
									if (i.length < 2 || 2 !== r || 46 !== i.charCodeAt(i.length - 1) || 46 !== i.charCodeAt(i.length - 2))
										if (i.length > 2) {
											var l = i.lastIndexOf("/");
											if (l !== i.length - 1) {
												-1 === l ? (i = "", r = 0) : r = (i = i.slice(0, l)).length - 1 - i.lastIndexOf("/"), a = s, o = 0;
												continue
											}
										} else if (2 === i.length || 1 === i.length) {
										i = "", r = 0, a = s, o = 0;
										continue
									}
									t && (i.length > 0 ? i += "/.." : i = "..", r = 2)
								} else i.length > 0 ? i += "/" + e.slice(a + 1, s) : i = e.slice(a + 1, s), r = s - a - 1;
								a = s, o = 0
							} else 46 === n && -1 !== o ? ++o : o = -1
						}
						return i
					}
					var i = {
						resolve: function() {
							for (var e, i = "", r = !1, a = arguments.length - 1; a >= -1 && !r; a--) {
								var o;
								a >= 0 ? o = arguments[a] : (void 0 === e && (e = process.cwd()), o = e), t(o), 0 !== o.length && (i = o +
									"/" + i, r = 47 === o.charCodeAt(0))
							}
							return i = n(i, !r), r ? i.length > 0 ? "/" + i : "/" : i.length > 0 ? i : "."
						},
						normalize: function(e) {
							if (t(e), 0 === e.length) return ".";
							var i = 47 === e.charCodeAt(0),
								r = 47 === e.charCodeAt(e.length - 1);
							return 0 !== (e = n(e, !i)).length || i || (e = "."), e.length > 0 && r && (e += "/"), i ? "/" + e : e
						},
						isAbsolute: function(e) {
							return t(e), e.length > 0 && 47 === e.charCodeAt(0)
						},
						join: function() {
							if (0 === arguments.length) return ".";
							for (var e, n = 0; n < arguments.length; ++n) {
								var r = arguments[n];
								t(r), r.length > 0 && (void 0 === e ? e = r : e += "/" + r)
							}
							return void 0 === e ? "." : i.normalize(e)
						},
						relative: function(e, n) {
							if (t(e), t(n), e === n) return "";
							if ((e = i.resolve(e)) === (n = i.resolve(n))) return "";
							for (var r = 1; r < e.length && 47 === e.charCodeAt(r); ++r);
							for (var a = e.length, o = a - r, s = 1; s < n.length && 47 === n.charCodeAt(s); ++s);
							for (var l = n.length - s, c = o < l ? o : l, d = -1, h = 0; h <= c; ++h) {
								if (h === c) {
									if (l > c) {
										if (47 === n.charCodeAt(s + h)) return n.slice(s + h + 1);
										if (0 === h) return n.slice(s + h)
									} else o > c && (47 === e.charCodeAt(r + h) ? d = h : 0 === h && (d = 0));
									break
								}
								var u = e.charCodeAt(r + h);
								if (u !== n.charCodeAt(s + h)) break;
								47 === u && (d = h)
							}
							var p = "";
							for (h = r + d + 1; h <= a; ++h) h !== a && 47 !== e.charCodeAt(h) || (0 === p.length ? p += ".." : p +=
								"/..");
							return p.length > 0 ? p + n.slice(s + d) : (s += d, 47 === n.charCodeAt(s) && ++s, n.slice(s))
						},
						_makeLong: function(e) {
							return e
						},
						dirname: function(e) {
							if (t(e), 0 === e.length) return ".";
							for (var n = e.charCodeAt(0), i = 47 === n, r = -1, a = !0, o = e.length - 1; o >= 1; --o)
								if (47 === (n = e.charCodeAt(o))) {
									if (!a) {
										r = o;
										break
									}
								} else a = !1;
							return -1 === r ? i ? "/" : "." : i && 1 === r ? "//" : e.slice(0, r)
						},
						basename: function(e, n) {
							if (void 0 !== n && "string" != typeof n) throw new TypeError('"ext" argument must be a string');
							t(e);
							var i, r = 0,
								a = -1,
								o = !0;
							if (void 0 !== n && n.length > 0 && n.length <= e.length) {
								if (n.length === e.length && n === e) return "";
								var s = n.length - 1,
									l = -1;
								for (i = e.length - 1; i >= 0; --i) {
									var c = e.charCodeAt(i);
									if (47 === c) {
										if (!o) {
											r = i + 1;
											break
										}
									} else -1 === l && (o = !1, l = i + 1), s >= 0 && (c === n.charCodeAt(s) ? -1 == --s && (a = i) : (s = -
										1, a = l))
								}
								return r === a ? a = l : -1 === a && (a = e.length), e.slice(r, a)
							}
							for (i = e.length - 1; i >= 0; --i)
								if (47 === e.charCodeAt(i)) {
									if (!o) {
										r = i + 1;
										break
									}
								} else -1 === a && (o = !1, a = i + 1);
							return -1 === a ? "" : e.slice(r, a)
						},
						extname: function(e) {
							t(e);
							for (var n = -1, i = 0, r = -1, a = !0, o = 0, s = e.length - 1; s >= 0; --s) {
								var l = e.charCodeAt(s);
								if (47 !== l) - 1 === r && (a = !1, r = s + 1), 46 === l ? -1 === n ? n = s : 1 !== o && (o = 1) : -1 !==
									n && (o = -1);
								else if (!a) {
									i = s + 1;
									break
								}
							}
							return -1 === n || -1 === r || 0 === o || 1 === o && n === r - 1 && n === i + 1 ? "" : e.slice(n, r)
						},
						format: function(e) {
							if (null === e || "object" != typeof e) throw new TypeError(
								'The "pathObject" argument must be of type Object. Received type ' + typeof e);
							return function(e, t) {
								var n = t.dir || t.root,
									i = t.base || (t.name || "") + (t.ext || "");
								return n ? n === t.root ? n + i : n + "/" + i : i
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
							var i, r = e.charCodeAt(0),
								a = 47 === r;
							a ? (n.root = "/", i = 1) : i = 0;
							for (var o = -1, s = 0, l = -1, c = !0, d = e.length - 1, h = 0; d >= i; --d)
								if (47 !== (r = e.charCodeAt(d))) - 1 === l && (c = !1, l = d + 1), 46 === r ? -1 === o ? o = d : 1 !==
									h && (h = 1) : -1 !== o && (h = -1);
								else if (!c) {
								s = d + 1;
								break
							}
							return -1 === o || -1 === l || 0 === h || 1 === h && o === l - 1 && o === s + 1 ? -1 !== l && (n.base = n
									.name = 0 === s && a ? e.slice(1, l) : e.slice(s, l)) : (0 === s && a ? (n.name = e.slice(1, o), n.base =
									e.slice(1, l)) : (n.name = e.slice(s, o), n.base = e.slice(s, l)), n.ext = e.slice(o, l)), s > 0 ? n.dir =
								e.slice(0, s - 1) : a && (n.dir = "/"), n
						},
						sep: "/",
						delimiter: ":",
						win32: null,
						posix: null
					};
					i.posix = i, e.exports = i
				},
				465: (e, t, n) => {
					Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.Utils = t.URI = void 0;
					var i = n(796);
					Object.defineProperty(t, "URI", {
						enumerable: !0,
						get: function() {
							return i.URI
						}
					});
					var r = n(679);
					Object.defineProperty(t, "Utils", {
						enumerable: !0,
						get: function() {
							return r.Utils
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
					var i, r, a = this && this.__extends || (i = function(e, t) {
						return (i = Object.setPrototypeOf || {
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
						i(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
					});
					Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.uriToFsPath = t.URI = void 0;
					var o = n(674),
						s = /^\w[\w\d+.-]*$/,
						l = /^\//,
						c = /^\/\//,
						d = "",
						h = "/",
						u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
						p = function() {
							function e(e, t, n, i, r, a) {
								void 0 === a && (a = !1), "object" == typeof e ? (this.scheme = e.scheme || d, this.authority = e.authority ||
									d, this.path = e.path || d, this.query = e.query || d, this.fragment = e.fragment || d) : (this.scheme =
									function(e, t) {
										return e || t ? e : "file"
									}(e, a), this.authority = t || d, this.path = function(e, t) {
										switch (e) {
											case "https":
											case "http":
											case "file":
												t ? t[0] !== h && (t = h + t) : t = h
										}
										return t
									}(this.scheme, n || d), this.query = i || d, this.fragment = r || d,
									function(e, t) {
										if (!e.scheme && t) throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + e.authority +
											'", path: "' + e.path + '", query: "' + e.query + '", fragment: "' + e.fragment + '"}');
										if (e.scheme && !s.test(e.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
										if (e.path)
											if (e.authority) {
												if (!l.test(e.path)) throw new Error(
													'[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
												)
											} else if (c.test(e.path)) throw new Error(
											'[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
										)
									}(this, a))
							}
							return e.isUri = function(t) {
								return t instanceof e || !!t && "string" == typeof t.authority && "string" == typeof t.fragment &&
									"string" == typeof t.path && "string" == typeof t.query && "string" == typeof t.scheme && "function" ==
									typeof t.fsPath && "function" == typeof t.with && "function" == typeof t.toString
							}, Object.defineProperty(e.prototype, "fsPath", {
								get: function() {
									return _(this, !1)
								},
								enumerable: !1,
								configurable: !0
							}), e.prototype.with = function(e) {
								if (!e) return this;
								var t = e.scheme,
									n = e.authority,
									i = e.path,
									r = e.query,
									a = e.fragment;
								return void 0 === t ? t = this.scheme : null === t && (t = d), void 0 === n ? n = this.authority : null ===
									n && (n = d), void 0 === i ? i = this.path : null === i && (i = d), void 0 === r ? r = this.query : null ===
									r && (r = d), void 0 === a ? a = this.fragment : null === a && (a = d), t === this.scheme && n === this.authority &&
									i === this.path && r === this.query && a === this.fragment ? this : new f(t, n, i, r, a)
							}, e.parse = function(e, t) {
								void 0 === t && (t = !1);
								var n = u.exec(e);
								return n ? new f(n[2] || d, k(n[4] || d), k(n[5] || d), k(n[7] || d), k(n[9] || d), t) : new f(d, d, d, d,
									d)
							}, e.file = function(e) {
								var t = d;
								if (o.isWindows && (e = e.replace(/\\/g, h)), e[0] === h && e[1] === h) {
									var n = e.indexOf(h, 2); - 1 === n ? (t = e.substring(2), e = h) : (t = e.substring(2, n), e = e.substring(
										n) || h)
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
					t.URI = p;
					var m = o.isWindows ? 1 : void 0,
						f = function(e) {
							function t() {
								var t = null !== e && e.apply(this, arguments) || this;
								return t._formatted = null, t._fsPath = null, t
							}
							return a(t, e), Object.defineProperty(t.prototype, "fsPath", {
								get: function() {
									return this._fsPath || (this._fsPath = _(this, !1)), this._fsPath
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
										this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e
							}, t
						}(p),
						g = ((r = {})[58] = "%3A", r[47] = "%2F", r[63] = "%3F", r[35] = "%23", r[91] = "%5B", r[93] = "%5D", r[64] =
							"%40", r[33] = "%21", r[36] = "%24", r[38] = "%26", r[39] = "%27", r[40] = "%28", r[41] = "%29", r[42] =
							"%2A", r[43] = "%2B", r[44] = "%2C", r[59] = "%3B", r[61] = "%3D", r[32] = "%20", r);

					function b(e, t) {
						for (var n = void 0, i = -1, r = 0; r < e.length; r++) {
							var a = e.charCodeAt(r);
							if (a >= 97 && a <= 122 || a >= 65 && a <= 90 || a >= 48 && a <= 57 || 45 === a || 46 === a || 95 === a ||
								126 === a || t && 47 === a) - 1 !== i && (n += encodeURIComponent(e.substring(i, r)), i = -1), void 0 !==
								n && (n += e.charAt(r));
							else {
								void 0 === n && (n = e.substr(0, r));
								var o = g[a];
								void 0 !== o ? (-1 !== i && (n += encodeURIComponent(e.substring(i, r)), i = -1), n += o) : -1 === i && (i =
									r)
							}
						}
						return -1 !== i && (n += encodeURIComponent(e.substring(i))), void 0 !== n ? n : e
					}

					function v(e) {
						for (var t = void 0, n = 0; n < e.length; n++) {
							var i = e.charCodeAt(n);
							35 === i || 63 === i ? (void 0 === t && (t = e.substr(0, n)), t += g[i]) : void 0 !== t && (t += e[n])
						}
						return void 0 !== t ? t : e
					}

					function _(e, t) {
						var n;
						return n = e.authority && e.path.length > 1 && "file" === e.scheme ? "//" + e.authority + e.path : 47 === e.path
							.charCodeAt(0) && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 &&
								e.path.charCodeAt(1) <= 122) && 58 === e.path.charCodeAt(2) ? t ? e.path.substr(1) : e.path[1].toLowerCase() +
							e.path.substr(2) : e.path, o.isWindows && (n = n.replace(/\//g, "\\")), n
					}

					function w(e, t) {
						var n = t ? v : b,
							i = "",
							r = e.scheme,
							a = e.authority,
							o = e.path,
							s = e.query,
							l = e.fragment;
						if (r && (i += r, i += ":"), (a || "file" === r) && (i += h, i += h), a) {
							var c = a.indexOf("@");
							if (-1 !== c) {
								var d = a.substr(0, c);
								a = a.substr(c + 1), -1 === (c = d.indexOf(":")) ? i += n(d, !1) : (i += n(d.substr(0, c), !1), i += ":",
									i += n(d.substr(c + 1), !1)), i += "@"
							} - 1 === (c = (a = a.toLowerCase()).indexOf(":")) ? i += n(a, !1) : (i += n(a.substr(0, c), !1), i += a.substr(
								c))
						}
						if (o) {
							if (o.length >= 3 && 47 === o.charCodeAt(0) && 58 === o.charCodeAt(2))(u = o.charCodeAt(1)) >= 65 && u <=
								90 && (o = "/" + String.fromCharCode(u + 32) + ":" + o.substr(3));
							else if (o.length >= 2 && 58 === o.charCodeAt(1)) {
								var u;
								(u = o.charCodeAt(0)) >= 65 && u <= 90 && (o = String.fromCharCode(u + 32) + ":" + o.substr(2))
							}
							i += n(o, !0)
						}
						return s && (i += "?", i += n(s, !1)), l && (i += "#", i += t ? l : b(l, !1)), i
					}

					function y(e) {
						try {
							return decodeURIComponent(e)
						} catch (t) {
							return e.length > 3 ? e.substr(0, 3) + y(e.substr(3)) : e
						}
					}
					t.uriToFsPath = _;
					var T = /(%[0-9A-Za-z][0-9A-Za-z])+/g;

					function k(e) {
						return e.match(T) ? e.replace(T, (function(e) {
							return y(e)
						})) : e
					}
				},
				679: function(e, t, n) {
					var i = this && this.__spreadArrays || function() {
						for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
						var i = Array(e),
							r = 0;
						for (t = 0; t < n; t++)
							for (var a = arguments[t], o = 0, s = a.length; o < s; o++, r++) i[r] = a[o];
						return i
					};
					Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.Utils = void 0;
					var r, a = n(470),
						o = a.posix || a;
					(r = t.Utils || (t.Utils = {})).joinPath = function(e) {
						for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
						return e.with({
							path: o.join.apply(o, i([e.path], t))
						})
					}, r.resolvePath = function(e) {
						for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
						var r = e.path || "/";
						return e.with({
							path: o.resolve.apply(o, i([r], t))
						})
					}, r.dirname = function(e) {
						var t = o.dirname(e.path);
						return 1 === t.length && 46 === t.charCodeAt(0) ? e : e.with({
							path: t
						})
					}, r.basename = function(e) {
						return o.basename(e.path)
					}, r.extname = function(e) {
						return o.extname(e.path)
					}
				}
			},
			t = {};
		return function n(i) {
			if (t[i]) return t[i].exports;
			var r = t[i] = {
				exports: {}
			};
			return e[i].call(r.exports, r, r.exports, n), r.exports
		}(465)
	})()
})), define("vscode-uri", ["vscode-uri/index"], (function(e) {
		return e
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlLinks", [
			"require", "exports", "../parser/htmlScanner", "../utils/strings", "vscode-uri", "../htmlLanguageTypes"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.findDocumentLinks = void 0;
		var n = e("../parser/htmlScanner"),
			i = e("../utils/strings"),
			r = e("vscode-uri"),
			a = e("../htmlLanguageTypes");

		function o(e) {
			var t = e[0];
			return t !== e[e.length - 1] || "'" !== t && '"' !== t || (e = e.substr(1, e.length - 2)), e
		}

		function s(e, t, n, s, l, c) {
			var d = o(n);
			if (h = d, u = e.languageId, h.length && ("handlebars" !== u || !/{{.*}}/.test(h)) &&
				/\b(w[\w\d+.-]*:\/\/)?[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/.test(h)) {
				var h, u;
				d.length < n.length && (s++, l--);
				var p = function(e, t, n, r) {
					if (!/^\s*javascript\:/i.test(t) && !/[\n\r]/.test(t)) return t = t.replace(/^\s*/g, ""), /^https?:\/\//i.test(
						t) || /^file:\/\//i.test(t) ? t : /^\#/i.test(t) ? e + t : /^\/\//i.test(t) ? (i.startsWith(e, "https://") ?
						"https" : "http") + ":" + t.replace(/^\s*/g, "") : n ? n.resolveReference(t, r || e) : t
				}(e.uri, d, t, c);
				if (p && function(e) {
						try {
							return r.URI.parse(e), !0
						} catch (e) {
							return !1
						}
					}(p)) return {
					range: a.Range.create(e.positionAt(s), e.positionAt(l)),
					target: p
				}
			}
		}
		t.findDocumentLinks = function(e, t) {
			for (var r = [], l = n.createScanner(e.getText(), 0), c = l.scan(), d = void 0, h = !1, u = void 0, p = {}; c !==
				a.TokenType.EOS;) {
				switch (c) {
					case a.TokenType.StartTag:
						if (!u) h = "base" === l.getTokenText().toLowerCase();
						break;
					case a.TokenType.AttributeName:
						d = l.getTokenText().toLowerCase();
						break;
					case a.TokenType.AttributeValue:
						if ("src" === d || "href" === d) {
							var m = l.getTokenText();
							if (!h)(b = s(e, t, m, l.getTokenOffset(), l.getTokenEnd(), u)) && r.push(b);
							h && void 0 === u && (u = o(m)) && t && (u = t.resolveReference(u, e.uri)), h = !1, d = void 0
						} else if ("id" === d) {
							p[o(l.getTokenText())] = l.getTokenOffset()
						}
				}
				c = l.scan()
			}
			for (var f = 0, g = r; f < g.length; f++) {
				var b = g[f],
					v = e.uri + "#";
				if (b.target && i.startsWith(b.target, v)) {
					var _ = p[b.target.substr(v.length)];
					if (void 0 !== _) {
						var w = e.positionAt(_);
						b.target = "" + v + (w.line + 1) + "," + (w.character + 1)
					}
				}
			}
			return r
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlHighlighting", [
			"require", "exports", "../parser/htmlScanner", "../htmlLanguageTypes"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.findDocumentHighlights = void 0;
		var n = e("../parser/htmlScanner"),
			i = e("../htmlLanguageTypes");

		function r(e, t) {
			return e.line < t.line || e.line === t.line && e.character <= t.character
		}

		function a(e, t) {
			return r(e.start, t) && r(t, e.end)
		}

		function o(e, t, r) {
			for (var a = n.createScanner(t.getText(), r), o = a.scan(); o !== i.TokenType.EOS && o !== e;) o = a.scan();
			return o !== i.TokenType.EOS ? {
				start: t.positionAt(a.getTokenOffset()),
				end: t.positionAt(a.getTokenEnd())
			} : null
		}
		t.findDocumentHighlights = function(e, t, n) {
			var r = e.offsetAt(t),
				s = n.findNodeAt(r);
			if (!s.tag) return [];
			var l = [],
				c = o(i.TokenType.StartTag, e, s.start),
				d = "number" == typeof s.endTagStart && o(i.TokenType.EndTag, e, s.endTagStart);
			return (c && a(c, t) || d && a(d, t)) && (c && l.push({
				kind: i.DocumentHighlightKind.Read,
				range: c
			}), d && l.push({
				kind: i.DocumentHighlightKind.Read,
				range: d
			})), l
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlSymbolsProvider",
			["require", "exports", "../htmlLanguageTypes"], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.findDocumentSymbols = void 0;
		var n = e("../htmlLanguageTypes");

		function i(e, t, r, a) {
			var o = function(e) {
					var t = e.tag;
					if (e.attributes) {
						var n = e.attributes.id,
							i = e.attributes.class;
						n && (t += "#" + n.replace(/[\"\']/g, "")), i && (t += i.replace(/[\"\']/g, "").split(/\s+/).map((function(e) {
							return "." + e
						})).join(""))
					}
					return t || "?"
				}(t),
				s = n.Location.create(e.uri, n.Range.create(e.positionAt(t.start), e.positionAt(t.end))),
				l = {
					name: o,
					location: s,
					containerName: r,
					kind: n.SymbolKind.Field
				};
			a.push(l), t.children.forEach((function(t) {
				i(e, t, o, a)
			}))
		}
		t.findDocumentSymbols = function(e, t) {
			var n = [];
			return t.roots.forEach((function(t) {
				i(e, t, "", n)
			})), n
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlRename", [
			"require", "exports"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.doRename = void 0, t.doRename = function(e, t, n, i) {
			var r, a = e.offsetAt(t),
				o = i.findNodeAt(a);
			if (!o.tag) return null;
			if (! function(e, t, n) {
					if (e.endTagStart && e.endTagStart + "</".length <= t && t <= e.endTagStart + "</".length + n.length) return !0;
					return e.start + "<".length <= t && t <= e.start + "<".length + n.length
				}(o, a, o.tag)) return null;
			var s = [],
				l = {
					start: e.positionAt(o.start + "<".length),
					end: e.positionAt(o.start + "<".length + o.tag.length)
				};
			if (s.push({
					range: l,
					newText: n
				}), o.endTagStart) {
				var c = {
					start: e.positionAt(o.endTagStart + "</".length),
					end: e.positionAt(o.endTagStart + "</".length + o.tag.length)
				};
				s.push({
					range: c,
					newText: n
				})
			}
			return {
				changes: ((r = {})[e.uri.toString()] = s, r)
			}
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define(
			"vscode-html-languageservice/services/htmlMatchingTagPosition", ["require", "exports"], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.findMatchingTagPosition = void 0, t.findMatchingTagPosition = function(e, t, n) {
			var i = e.offsetAt(t),
				r = n.findNodeAt(i);
			if (!r.tag) return null;
			if (!r.endTagStart) return null;
			if (r.start + "<".length <= i && i <= r.start + "<".length + r.tag.length) {
				var a = i - "<".length - r.start + r.endTagStart + "</".length;
				return e.positionAt(a)
			}
			if (r.endTagStart + "</".length <= i && i <= r.endTagStart + "</".length + r.tag.length) {
				a = i - "</".length - r.endTagStart + r.start + "<".length;
				return e.positionAt(a)
			}
			return null
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlLinkedEditing",
			["require", "exports", "../htmlLanguageTypes"], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.findLinkedEditingRanges = void 0;
		var n = e("../htmlLanguageTypes");
		t.findLinkedEditingRanges = function(e, t, i) {
			var r = e.offsetAt(t),
				a = i.findNodeAt(r),
				o = a.tag ? a.tag.length : 0;
			return a.endTagStart && (a.start + "<".length <= r && r <= a.start + "<".length + o || a.endTagStart + "</".length <=
				r && r <= a.endTagStart + "</".length + o) ? [n.Range.create(e.positionAt(a.start + "<".length), e.positionAt(a
				.start + "<".length + o)), n.Range.create(e.positionAt(a.endTagStart + "</".length), e.positionAt(a.endTagStart +
				"</".length + o))] : null
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlFolding", [
			"require", "exports", "../htmlLanguageTypes", "../parser/htmlScanner", "../languageFacts/fact"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getFoldingRanges = void 0;
		var n = e("../htmlLanguageTypes"),
			i = e("../parser/htmlScanner"),
			r = e("../languageFacts/fact");
		t.getFoldingRanges = function(e, t) {
			var a = i.createScanner(e.getText()),
				o = a.scan(),
				s = [],
				l = [],
				c = null,
				d = -1;

			function h(e) {
				s.push(e), d = e.startLine
			}
			for (; o !== n.TokenType.EOS;) {
				switch (o) {
					case n.TokenType.StartTag:
						var u = a.getTokenText(),
							p = e.positionAt(a.getTokenOffset()).line;
						l.push({
							startLine: p,
							tagName: u
						}), c = u;
						break;
					case n.TokenType.EndTag:
						c = a.getTokenText();
						break;
					case n.TokenType.StartTagClose:
						if (!c || !r.isVoidElement(c)) break;
					case n.TokenType.EndTagClose:
					case n.TokenType.StartTagSelfClose:
						for (var m = l.length - 1; m >= 0 && l[m].tagName !== c;) m--;
						if (m >= 0) {
							var f = l[m];
							l.length = m, (b = e.positionAt(a.getTokenOffset()).line - 1) > (p = f.startLine) && d !== p && h({
								startLine: p,
								endLine: b
							})
						}
						break;
					case n.TokenType.Comment:
						p = e.positionAt(a.getTokenOffset()).line;
						var g = a.getTokenText().match(/^\s*#(region\b)|(endregion\b)/);
						if (g)
							if (g[1]) l.push({
								startLine: p,
								tagName: ""
							});
							else {
								for (m = l.length - 1; m >= 0 && l[m].tagName.length;) m--;
								if (m >= 0) {
									var b;
									f = l[m];
									l.length = m, (b = p) > (p = f.startLine) && d !== p && h({
										startLine: p,
										endLine: b,
										kind: n.FoldingRangeKind.Region
									})
								}
							}
						else p < (b = e.positionAt(a.getTokenOffset() + a.getTokenLength()).line) && h({
							startLine: p,
							endLine: b,
							kind: n.FoldingRangeKind.Comment
						})
				}
				o = a.scan()
			}
			var v = t && t.rangeLimit || Number.MAX_VALUE;
			return s.length > v ? function(e, t) {
				e = e.sort((function(e, t) {
					var n = e.startLine - t.startLine;
					return 0 === n && (n = e.endLine - t.endLine), n
				}));
				for (var n = void 0, i = [], r = [], a = [], o = function(e, t) {
						r[e] = t, t < 30 && (a[t] = (a[t] || 0) + 1)
					}, s = 0; s < e.length; s++) {
					var l = e[s];
					if (n) {
						if (l.startLine > n.startLine)
							if (l.endLine <= n.endLine) i.push(n), n = l, o(s, i.length);
							else if (l.startLine > n.endLine) {
							do {
								n = i.pop()
							} while (n && l.startLine > n.endLine);
							n && i.push(n), n = l, o(s, i.length)
						}
					} else n = l, o(s, 0)
				}
				var c = 0,
					d = 0;
				for (s = 0; s < a.length; s++) {
					var h = a[s];
					if (h) {
						if (h + c > t) {
							d = s;
							break
						}
						c += h
					}
				}
				var u = [];
				for (s = 0; s < e.length; s++) {
					var p = r[s];
					"number" == typeof p && (p < d || p === d && c++ < t) && u.push(e[s])
				}
				return u
			}(s, v) : s
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/services/htmlSelectionRange",
			["require", "exports", "../parser/htmlScanner", "../parser/htmlParser", "../htmlLanguageTypes"], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getSelectionRanges = void 0;
		var n = e("../parser/htmlScanner"),
			i = e("../parser/htmlParser"),
			r = e("../htmlLanguageTypes");

		function a(e, t, i) {
			for (var a = r.Range.create(e.positionAt(t.start), e.positionAt(t.end)), o = e.getText(a), s = i - t.start, l = n.createScanner(
					o), c = l.scan(), d = t.start, h = [], u = !1, p = -1; c !== r.TokenType.EOS;) {
				switch (c) {
					case r.TokenType.AttributeName:
						if (s < l.getTokenOffset()) {
							u = !1;
							break
						}
						s <= l.getTokenEnd() && h.unshift([l.getTokenOffset(), l.getTokenEnd()]), u = !0, p = l.getTokenOffset();
						break;
					case r.TokenType.AttributeValue:
						if (!u) break;
						var m = l.getTokenText();
						if (s < l.getTokenOffset()) {
							h.push([p, l.getTokenEnd()]);
							break
						}
						s >= l.getTokenOffset() && s <= l.getTokenEnd() && (h.unshift([l.getTokenOffset(), l.getTokenEnd()]), ('"' ===
								m[0] && '"' === m[m.length - 1] || "'" === m[0] && "'" === m[m.length - 1]) && s >= l.getTokenOffset() + 1 &&
							s <= l.getTokenEnd() - 1 && h.unshift([l.getTokenOffset() + 1, l.getTokenEnd() - 1]), h.push([p, l.getTokenEnd()])
						)
				}
				c = l.scan()
			}
			return h.map((function(e) {
				return [e[0] + d, e[1] + d]
			}))
		}
		t.getSelectionRanges = function(e, t) {
			return t.map((function(t) {
				for (var n = function(e, t) {
						var n = i.parse(e.getText()),
							o = e.offsetAt(t),
							s = n.findNodeAt(o),
							l = function(e) {
								var t = e,
									n = function(e) {
										return e.startTagEnd && e.endTagStart && e.startTagEnd < e.endTagStart ? [
											[e.startTagEnd, e.endTagStart],
											[e.start, e.end]
										] : [
											[e.start, e.end]
										]
									},
									i = [];
								for (; t.parent;) n(t = t.parent).forEach((function(e) {
									return i.push(e)
								}));
								return i
							}(s);
						if (s.startTagEnd && !s.endTagStart) {
							if (s.startTagEnd !== s.end) return [
								[s.start, s.end]
							];
							var c = r.Range.create(e.positionAt(s.startTagEnd - 2), e.positionAt(s.startTagEnd));
							return "/>" === e.getText(c) ? l.unshift([s.start + 1, s.startTagEnd - 2]) : l.unshift([s.start + 1, s.startTagEnd -
								1
							]), l = a(e, s, o).concat(l)
						}
						if (!s.startTagEnd || !s.endTagStart) return l;
						return l.unshift([s.start, s.end]), s.start < o && o < s.startTagEnd ? (l.unshift([s.start + 1, s.startTagEnd -
							1
						]), l = a(e, s, o).concat(l)) : s.startTagEnd <= o && o <= s.endTagStart ? (l.unshift([s.startTagEnd, s.endTagStart]),
							l) : (o >= s.endTagStart + 2 && l.unshift([s.endTagStart + 2, s.end - 1]), l)
					}(e, t), o = void 0, s = void 0, l = n.length - 1; l >= 0; l--) {
					var c = n[l];
					o && c[0] === o[0] && c[1] === o[1] || (s = r.SelectionRange.create(r.Range.create(e.positionAt(n[l][0]), e.positionAt(
						n[l][1])), s)), o = c
				}
				return s || (s = r.SelectionRange.create(r.Range.create(t, t))), s
			}))
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define(
			"vscode-html-languageservice/languageFacts/data/webCustomData", ["require", "exports"], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.htmlData = void 0, t.htmlData = {
			version: 1.1,
			tags: [{
				name: "html",
				description: {
					kind: "markdown",
					value: "The html element represents the root of an HTML document."
				},
				attributes: [{
					name: "manifest",
					description: {
						kind: "markdown",
						value: "Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details."
					}
				}, {
					name: "version",
					description: 'Specifies the version of the HTML [Document Type Definition](https://developer.mozilla.org/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the "<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.'
				}, {
					name: "xmlns",
					description: 'Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/html"
				}]
			}, {
				name: "head",
				description: {
					kind: "markdown",
					value: "The head element represents a collection of metadata for the Document."
				},
				attributes: [{
					name: "profile",
					description: "The URIs of one or more metadata profiles, separated by white space."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/head"
				}]
			}, {
				name: "title",
				description: {
					kind: "markdown",
					value: "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/title"
				}]
			}, {
				name: "base",
				description: {
					kind: "markdown",
					value: "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information."
				},
				attributes: [{
					name: "href",
					description: {
						kind: "markdown",
						value: "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed."
					}
				}, {
					name: "target",
					description: {
						kind: "markdown",
						value: "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/base"
				}]
			}, {
				name: "link",
				description: {
					kind: "markdown",
					value: "The link element allows authors to link their document to other resources."
				},
				attributes: [{
					name: "href",
					description: {
						kind: "markdown",
						value: 'This attribute specifies the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative.'
					}
				}, {
					name: "crossorigin",
					valueSet: "xo",
					description: {
						kind: "markdown",
						value: 'This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn\'t include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn\'t disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request\'s credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.'
					}
				}, {
					name: "rel",
					description: {
						kind: "markdown",
						value: "This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
					}
				}, {
					name: "media",
					description: {
						kind: "markdown",
						value: "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
					}
				}, {
					name: "hreflang",
					description: {
						kind: "markdown",
						value: "This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present."
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: 'This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.'
					}
				}, {
					name: "sizes",
					description: {
						kind: "markdown",
						value: "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it."
					}
				}, {
					name: "as",
					description: 'This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.") request header.'
				}, {
					name: "importance",
					description: "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
				}, {
					name: "importance",
					description: '**`auto`**: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the browser that the resource is of **high** priority.\n\n**`low`**: Indicates to the browser that the resource is of **low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel="preload"` or `rel="prefetch"` is present.'
				}, {
					name: "integrity",
					description: "Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
				}, {
					name: "referrerpolicy",
					description: 'A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer` means that the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` means that no [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.\n*   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n*   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer\'s path.\n*   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.'
				}, {
					name: "title",
					description: 'The `title` attribute has special semantics on the `<link>` element. When used on a `<link rel="stylesheet">` it defines a [preferred or an alternate stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](https://developer.mozilla.org/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets).'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/link"
				}]
			}, {
				name: "meta",
				description: {
					kind: "markdown",
					value: "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements."
				},
				attributes: [{
					name: "name",
					description: {
						kind: "markdown",
						value: 'This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.\n\nThis metadata name is associated with the value contained by the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:\n\n*   `application-name` which defines the name of the application running in the web page.\n    \n    **Note:**\n    \n    *   Browsers may use this to identify the application. It is different from the [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.") element, which usually contain the application name, but may also contain information like the document name or a status.\n    *   Simple web pages shouldn\'t define an application-name.\n    \n*   `author` which defines the name of the document\'s author.\n*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.\n*   `generator` which contains the identifier of the software that generated the page.\n*   `keywords` which contains words relevant to the page\'s content separated by commas.\n*   `referrer` which controls the [`Referer` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:\n    \n    Values for the `content` attribute of `<meta name="referrer">`\n    \n    `no-referrer`\n    \n    Do not send a HTTP `Referrer` header.\n    \n    `origin`\n    \n    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.\n    \n    `no-referrer-when-downgrade`\n    \n    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.\n    \n    `origin-when-cross-origin`\n    \n    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.\n    \n    `same-origin`\n    \n    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.\n    \n    `strict-origin`\n    \n    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don\'t send it to a less secure destination (HTTPS->HTTP).\n    \n    `strict-origin-when-cross-origin`\n    \n    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).\n    \n    `unsafe-URL`\n    \n    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.\n    \n    **Notes:**\n    \n    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.\n    *   Dynamically inserting `<meta name="referrer">` (with [`document.write`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.\n    *   When several conflicting policies are defined, the no-referrer policy is applied.\n    \n\nThis attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:\n\n*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.\n*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).\n*   `publisher` which defines the name of the document\'s publisher.\n*   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:\n    \n    Values for the content of `<meta name="robots">`\n    \n    Value\n    \n    Description\n    \n    Used by\n    \n    `index`\n    \n    Allows the robot to index the page (default).\n    \n    All\n    \n    `noindex`\n    \n    Requests the robot to not index the page.\n    \n    All\n    \n    `follow`\n    \n    Allows the robot to follow the links on the page (default).\n    \n    All\n    \n    `nofollow`\n    \n    Requests the robot to not follow the links on the page.\n    \n    All\n    \n    `none`\n    \n    Equivalent to `noindex, nofollow`\n    \n    [Google](https://support.google.com/webmasters/answer/79812)\n    \n    `noodp`\n    \n    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.\n    \n    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noarchive`\n    \n    Requests the search engine not to cache the page content.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `nosnippet`\n    \n    Prevents displaying any description of the page in search engine results.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noimageindex`\n    \n    Requests this page not to appear as the referring page of an indexed image.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)\n    \n    `nocache`\n    \n    Synonym of `noarchive`.\n    \n    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    **Notes:**\n    \n    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.\n    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.\n    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.\n    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot\'s behaviour is undefined and may vary between them.\n    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.\n    \n*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.\n*   `viewport`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you\'re viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.\n    \n    Values for the content of `<meta name="viewport">`\n    \n    Value\n    \n    Possible subvalues\n    \n    Description\n    \n    `width`\n    \n    A positive integer number, or the text `device-width`\n    \n    Defines the pixel width of the viewport that you want the web site to be rendered at.\n    \n    `height`\n    \n    A positive integer, or the text `device-height`\n    \n    Defines the height of the viewport. Not used by any browser.\n    \n    `initial-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.\n    \n    `maximum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `minimum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `user-scalable`\n    \n    `yes` or `no`\n    \n    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.\n    \n    Specification\n    \n    Status\n    \n    Comment\n    \n    [CSS Device Adaptation  \n    The definition of \'<meta name="viewport">\' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)\n    \n    Working Draft\n    \n    Non-normatively describes the Viewport META element\n    \n    See also: [`@viewport`](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It\'s primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")\n    \n    **Notes:**\n    \n    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.\n    *   The default values may vary between devices and browsers.\n    *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").'
					}
				}, {
					name: "http-equiv",
					description: {
						kind: "markdown",
						value: 'Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `"content-language"`  \n    Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.\n    \n*   `"content-security-policy"`  \n    Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `"content-type"`  \n    Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string \'`text/html`\' followed by a character set with the following syntax: \'`; charset=_IANAcharset_`\', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.\n    \n    **Note:** As [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can\'t change documents\' types in XHTML or HTML5\'s XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `"refresh"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string \'`;url=`\', and a valid URL.\n*   `"set-cookie"`  \n    Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.'
					}
				}, {
					name: "content",
					description: {
						kind: "markdown",
						value: "This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used."
					}
				}, {
					name: "charset",
					description: {
						kind: "markdown",
						value: 'This attribute declares the page\'s character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn\'t request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don\'t map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page\'s character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.\n*   It is strongly recommended to define the character encoding. If a page\'s encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended.'
					}
				}, {
					name: "scheme",
					description: "This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) value, like a format.\n\n**Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/meta"
				}]
			}, {
				name: "style",
				description: {
					kind: "markdown",
					value: "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user."
				},
				attributes: [{
					name: "media",
					description: {
						kind: "markdown",
						value: "This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing."
					}
				}, {
					name: "nonce",
					description: {
						kind: "markdown",
						value: "A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial."
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified — there is very little reason to include this in modern web documents."
					}
				}, {
					name: "scoped",
					valueSet: "v"
				}, {
					name: "title",
					description: "This attribute specifies [alternative style sheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) sets."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/style"
				}]
			}, {
				name: "body",
				description: {
					kind: "markdown",
					value: "The body element represents the content of the document."
				},
				attributes: [{
					name: "onafterprint",
					description: {
						kind: "markdown",
						value: "Function to call after the user has printed the document."
					}
				}, {
					name: "onbeforeprint",
					description: {
						kind: "markdown",
						value: "Function to call when the user requests printing of the document."
					}
				}, {
					name: "onbeforeunload",
					description: {
						kind: "markdown",
						value: "Function to call when the document is about to be unloaded."
					}
				}, {
					name: "onhashchange",
					description: {
						kind: "markdown",
						value: "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
					}
				}, {
					name: "onlanguagechange",
					description: {
						kind: "markdown",
						value: "Function to call when the preferred languages changed."
					}
				}, {
					name: "onmessage",
					description: {
						kind: "markdown",
						value: "Function to call when the document has received a message."
					}
				}, {
					name: "onoffline",
					description: {
						kind: "markdown",
						value: "Function to call when network communication has failed."
					}
				}, {
					name: "ononline",
					description: {
						kind: "markdown",
						value: "Function to call when network communication has been restored."
					}
				}, {
					name: "onpagehide"
				}, {
					name: "onpageshow"
				}, {
					name: "onpopstate",
					description: {
						kind: "markdown",
						value: "Function to call when the user has navigated session history."
					}
				}, {
					name: "onstorage",
					description: {
						kind: "markdown",
						value: "Function to call when the storage area has changed."
					}
				}, {
					name: "onunload",
					description: {
						kind: "markdown",
						value: "Function to call when the document is going away."
					}
				}, {
					name: "alink",
					description: 'Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._'
				}, {
					name: "background",
					description: 'URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._'
				}, {
					name: "bgcolor",
					description: 'Background color for the document. _This method is non-conforming, use CSS [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._'
				}, {
					name: "bottommargin",
					description: 'The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
				}, {
					name: "leftmargin",
					description: 'The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
				}, {
					name: "link",
					description: 'Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.") pseudo-class instead._'
				}, {
					name: "onblur",
					description: "Function to call when the document loses focus."
				}, {
					name: "onerror",
					description: "Function to call when the document fails to load properly."
				}, {
					name: "onfocus",
					description: "Function to call when the document receives focus."
				}, {
					name: "onload",
					description: "Function to call when the document has finished loading."
				}, {
					name: "onredo",
					description: "Function to call when the user has moved forward in undo transaction history."
				}, {
					name: "onresize",
					description: "Function to call when the document has been resized."
				}, {
					name: "onundo",
					description: "Function to call when the user has moved backward in undo transaction history."
				}, {
					name: "rightmargin",
					description: 'The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
				}, {
					name: "text",
					description: 'Foreground color of text. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property on the element instead._'
				}, {
					name: "topmargin",
					description: 'The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
				}, {
					name: "vlink",
					description: 'Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/body"
				}]
			}, {
				name: "article",
				description: {
					kind: "markdown",
					value: "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/article"
				}]
			}, {
				name: "section",
				description: {
					kind: "markdown",
					value: "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/section"
				}]
			}, {
				name: "nav",
				description: {
					kind: "markdown",
					value: "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/nav"
				}]
			}, {
				name: "aside",
				description: {
					kind: "markdown",
					value: "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/aside"
				}]
			}, {
				name: "h1",
				description: {
					kind: "markdown",
					value: "The h1 element represents a section heading."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
				}]
			}, {
				name: "h2",
				description: {
					kind: "markdown",
					value: "The h2 element represents a section heading."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
				}]
			}, {
				name: "h3",
				description: {
					kind: "markdown",
					value: "The h3 element represents a section heading."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
				}]
			}, {
				name: "h4",
				description: {
					kind: "markdown",
					value: "The h4 element represents a section heading."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
				}]
			}, {
				name: "h5",
				description: {
					kind: "markdown",
					value: "The h5 element represents a section heading."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
				}]
			}, {
				name: "h6",
				description: {
					kind: "markdown",
					value: "The h6 element represents a section heading."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
				}]
			}, {
				name: "header",
				description: {
					kind: "markdown",
					value: "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/header"
				}]
			}, {
				name: "footer",
				description: {
					kind: "markdown",
					value: "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/footer"
				}]
			}, {
				name: "address",
				description: {
					kind: "markdown",
					value: "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/address"
				}]
			}, {
				name: "p",
				description: {
					kind: "markdown",
					value: "The p element represents a paragraph."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/p"
				}]
			}, {
				name: "hr",
				description: {
					kind: "markdown",
					value: "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book."
				},
				attributes: [{
					name: "align",
					description: "Sets the alignment of the rule on the page. If no value is specified, the default value is `left`."
				}, {
					name: "color",
					description: "Sets the color of the rule through color name or hexadecimal value."
				}, {
					name: "noshade",
					description: "Sets the rule to have no shading."
				}, {
					name: "size",
					description: "Sets the height, in pixels, of the rule."
				}, {
					name: "width",
					description: "Sets the length of the rule on the page through a pixel or percentage value."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/hr"
				}]
			}, {
				name: "pre",
				description: {
					kind: "markdown",
					value: "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements."
				},
				attributes: [{
					name: "cols",
					description: 'Contains the _preferred_ count of characters that a line should have. It was a non-standard synonym of [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element\'s width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead.'
				}, {
					name: "width",
					description: 'Contains the _preferred_ count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element\'s width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead.'
				}, {
					name: "wrap",
					description: 'Is a _hint_ indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space "The white-space CSS property sets how white space inside an element is handled.") instead.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/pre"
				}]
			}, {
				name: "blockquote",
				description: {
					kind: "markdown",
					value: "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations."
				},
				attributes: [{
					name: "cite",
					description: {
						kind: "markdown",
						value: "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/blockquote"
				}]
			}, {
				name: "ol",
				description: {
					kind: "markdown",
					value: "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document."
				},
				attributes: [{
					name: "reversed",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute specifies that the items of the list are specified in reversed order."
					}
				}, {
					name: "start",
					description: {
						kind: "markdown",
						value: 'This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.'
					}
				}, {
					name: "type",
					valueSet: "lt",
					description: {
						kind: "markdown",
						value: "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead."
					}
				}, {
					name: "compact",
					description: 'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/ol"
				}]
			}, {
				name: "ul",
				description: {
					kind: "markdown",
					value: "The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document."
				},
				attributes: [{
					name: "compact",
					description: 'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Usage note: **Do not use this attribute, as it has been deprecated: the [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [line-height](https://developer.mozilla.org/en-US/docs/CSS/line-height) can be used with a value of `80%`.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/ul"
				}]
			}, {
				name: "li",
				description: {
					kind: "markdown",
					value: "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element."
				},
				attributes: [{
					name: "value",
					description: {
						kind: "markdown",
						value: 'This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed.'
					}
				}, {
					name: "type",
					description: 'This character attribute indicates the numbering type:\n\n*   `a`: lowercase letters\n*   `A`: uppercase letters\n*   `i`: lowercase Roman numerals\n*   `I`: uppercase Roman numerals\n*   `1`: numbers\n\nThis type overrides the one used by its parent [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element, if any.\n\n**Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property instead.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/li"
				}]
			}, {
				name: "dl",
				description: {
					kind: "markdown",
					value: "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/dl"
				}]
			}, {
				name: "dt",
				description: {
					kind: "markdown",
					value: "The dt element represents the term, or name, part of a term-description group in a description list (dl element)."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/dt"
				}]
			}, {
				name: "dd",
				description: {
					kind: "markdown",
					value: "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element)."
				},
				attributes: [{
					name: "nowrap",
					description: "If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/dd"
				}]
			}, {
				name: "figure",
				description: {
					kind: "markdown",
					value: "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/figure"
				}]
			}, {
				name: "figcaption",
				description: {
					kind: "markdown",
					value: "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/figcaption"
				}]
			}, {
				name: "main",
				description: {
					kind: "markdown",
					value: "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/main"
				}]
			}, {
				name: "div",
				description: {
					kind: "markdown",
					value: "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/div"
				}]
			}, {
				name: "a",
				description: {
					kind: "markdown",
					value: "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents."
				},
				attributes: [{
					name: "href",
					description: {
						kind: "markdown",
						value: "Contains a URL or a URL fragment that the hyperlink points to."
					}
				}, {
					name: "target",
					description: {
						kind: "markdown",
						value: 'Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:\n\n*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.\n*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.\n*   `_top`: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.\n\n**Note:** When using `target`, consider adding `rel="noreferrer"` to avoid exploitation of the `window.opener` API.\n\n**Note:** Linking to another page using `target="_blank"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page\'s performance may suffer. To avoid this use `rel="noopener"`.'
					}
				}, {
					name: "download",
					description: {
						kind: "markdown",
						value: "This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\n**Notes:**\n\n*   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).\n*   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n*   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n*   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute."
					}
				}, {
					name: "ping",
					description: {
						kind: "markdown",
						value: 'Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST "The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking.'
					}
				}, {
					name: "rel",
					description: {
						kind: "markdown",
						value: "Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
					}
				}, {
					name: "hreflang",
					description: {
						kind: "markdown",
						value: 'This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt "Tags for Identifying Languages").'
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: 'Specifies the media type in the form of a [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type "MIME type: A MIME type (now properly called "media type", but also sometimes "content type") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).") for the linked URL. It is purely advisory, with no built-in functionality.'
					}
				}, {
					name: "referrerpolicy",
					description: "Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to send when fetching the URL:\n\n*   `'no-referrer'` means the `Referer:` header will not be sent.\n*   `'no-referrer-when-downgrade'` means no `Referer:` header will be sent when navigating to an origin without HTTPS. This is the default behavior.\n*   `'origin'` means the referrer will be the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the page, not including information after the domain.\n*   `'origin-when-cross-origin'` meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.\n*   `'strict-origin-when-cross-origin'`\n*   `'unsafe-url'` means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/a"
				}]
			}, {
				name: "em",
				description: {
					kind: "markdown",
					value: "The em element represents stress emphasis of its contents."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/em"
				}]
			}, {
				name: "strong",
				description: {
					kind: "markdown",
					value: "The strong element represents strong importance, seriousness, or urgency for its contents."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/strong"
				}]
			}, {
				name: "small",
				description: {
					kind: "markdown",
					value: "The small element represents side comments such as small print."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/small"
				}]
			}, {
				name: "s",
				description: {
					kind: "markdown",
					value: "The s element represents contents that are no longer accurate or no longer relevant."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/s"
				}]
			}, {
				name: "cite",
				description: {
					kind: "markdown",
					value: "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/cite"
				}]
			}, {
				name: "q",
				description: {
					kind: "markdown",
					value: "The q element represents some phrasing content quoted from another source."
				},
				attributes: [{
					name: "cite",
					description: {
						kind: "markdown",
						value: "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/q"
				}]
			}, {
				name: "dfn",
				description: {
					kind: "markdown",
					value: "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/dfn"
				}]
			}, {
				name: "abbr",
				description: {
					kind: "markdown",
					value: "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/abbr"
				}]
			}, {
				name: "ruby",
				description: {
					kind: "markdown",
					value: "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]"
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/ruby"
				}]
			}, {
				name: "rb",
				description: {
					kind: "markdown",
					value: "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/rb"
				}]
			}, {
				name: "rt",
				description: {
					kind: "markdown",
					value: "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/rt"
				}]
			}, {
				name: "rp",
				description: {
					kind: "markdown",
					value: "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/rp"
				}]
			}, {
				name: "time",
				description: {
					kind: "markdown",
					value: "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below."
				},
				attributes: [{
					name: "datetime",
					description: {
						kind: "markdown",
						value: "This attribute indicates the time and/or date of the element and must be in one of the formats described below."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/time"
				}]
			}, {
				name: "code",
				description: {
					kind: "markdown",
					value: "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/code"
				}]
			}, {
				name: "var",
				description: {
					kind: "markdown",
					value: "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/var"
				}]
			}, {
				name: "samp",
				description: {
					kind: "markdown",
					value: "The samp element represents sample or quoted output from another program or computing system."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/samp"
				}]
			}, {
				name: "kbd",
				description: {
					kind: "markdown",
					value: "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands)."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/kbd"
				}]
			}, {
				name: "sub",
				description: {
					kind: "markdown",
					value: "The sub element represents a subscript."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/sub"
				}]
			}, {
				name: "sup",
				description: {
					kind: "markdown",
					value: "The sup element represents a superscript."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/sup"
				}]
			}, {
				name: "i",
				description: {
					kind: "markdown",
					value: "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/i"
				}]
			}, {
				name: "b",
				description: {
					kind: "markdown",
					value: "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/b"
				}]
			}, {
				name: "u",
				description: {
					kind: "markdown",
					value: "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/u"
				}]
			}, {
				name: "mark",
				description: {
					kind: "markdown",
					value: "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/mark"
				}]
			}, {
				name: "bdi",
				description: {
					kind: "markdown",
					value: "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]"
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/bdi"
				}]
			}, {
				name: "bdo",
				description: {
					kind: "markdown",
					value: "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]"
				},
				attributes: [{
					name: "dir",
					description: "The direction in which text should be rendered in this element's contents. Possible values are:\n\n*   `ltr`: Indicates that the text should go in a left-to-right direction.\n*   `rtl`: Indicates that the text should go in a right-to-left direction."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/bdo"
				}]
			}, {
				name: "span",
				description: {
					kind: "markdown",
					value: "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/span"
				}]
			}, {
				name: "br",
				description: {
					kind: "markdown",
					value: "The br element represents a line break."
				},
				attributes: [{
					name: "clear",
					description: "Indicates where to begin the next line after the break."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/br"
				}]
			}, {
				name: "wbr",
				description: {
					kind: "markdown",
					value: "The wbr element represents a line break opportunity."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/wbr"
				}]
			}, {
				name: "ins",
				description: {
					kind: "markdown",
					value: "The ins element represents an addition to the document."
				},
				attributes: [{
					name: "cite",
					description: "This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system."
				}, {
					name: "datetime",
					description: 'This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/ins"
				}]
			}, {
				name: "del",
				description: {
					kind: "markdown",
					value: "The del element represents a removal from the document."
				},
				attributes: [{
					name: "cite",
					description: {
						kind: "markdown",
						value: "A URI for a resource that explains the change (for example, meeting minutes)."
					}
				}, {
					name: "datetime",
					description: {
						kind: "markdown",
						value: 'This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").'
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/del"
				}]
			}, {
				name: "picture",
				description: {
					kind: "markdown",
					value: "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/picture"
				}]
			}, {
				name: "img",
				description: {
					kind: "markdown",
					value: "An img element represents an image."
				},
				attributes: [{
					name: "alt",
					description: {
						kind: "markdown",
						value: 'This attribute defines an alternative text description of the image.\n\n**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element\'s `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.\n\n**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering.'
					}
				}, {
					name: "src",
					description: {
						kind: "markdown",
						value: "The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors."
					}
				}, {
					name: "srcset",
					description: {
						kind: "markdown",
						value: "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\n1.  a URL to an image,\n2.  optionally, whitespace followed by one of:\n    *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.\n    *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: `1x`.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example."
					}
				}, {
					name: "crossorigin",
					valueSet: "xo",
					description: {
						kind: "markdown",
						value: 'This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being "[tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas)." The allowed values are:'
					}
				}, {
					name: "usemap",
					description: {
						kind: "markdown",
						value: 'The partial URL (starting with \'#\') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.\n\n**Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") element.'
					}
				}, {
					name: "ismap",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\n**Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute.'
					}
				}, {
					name: "width",
					description: {
						kind: "markdown",
						value: "The intrinsic width of the image in pixels."
					}
				}, {
					name: "height",
					description: {
						kind: "markdown",
						value: "The intrinsic height of the image in pixels."
					}
				}, {
					name: "decoding",
					description: "Provides an image decoding hint to the browser. The allowed values are:"
				}, {
					name: "decoding",
					description: "`sync`\n\nDecode the image synchronously for atomic presentation with other content.\n\n`async`\n\nDecode the image asynchronously to reduce delay in presenting other content.\n\n`auto`\n\nDefault mode, which indicates no preference for the decoding mode. The browser decides what is best for the user."
				}, {
					name: "importance",
					description: "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
				}, {
					name: "importance",
					description: "`auto`: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the image.\n\n`high`: Indicates to the browser that the image is of **high** priority.\n\n`low`: Indicates to the browser that the image is of **low** priority."
				}, {
					name: "intrinsicsize",
					description: "This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in this attribute. [Explainer](https://github.com/ojanvafai/intrinsicsize-attribute), [examples](https://googlechrome.github.io/samples/intrinsic-size/index.html)"
				}, {
					name: "referrerpolicy",
					description: "A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer:` The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade:` No `Referer` header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.\n*   `origin:` The `Referer` header will include the page of origin's scheme, the host, and the port.\n*   `origin-when-cross-origin:` Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.\n*   `unsafe-url:` The `Referer` header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins."
				}, {
					name: "sizes",
					description: "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\n1.  a media condition. This must be omitted for the last item.\n2.  a source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width ('`w`') descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the `srcset` attribute is absent, or contains no values with a width (`w`) descriptor, then the `sizes` attribute has no effect."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/img"
				}]
			}, {
				name: "iframe",
				description: {
					kind: "markdown",
					value: "The iframe element represents a nested browsing context."
				},
				attributes: [{
					name: "src",
					description: {
						kind: "markdown",
						value: 'The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `<iframe>`\'s src attribute (e.g. via [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute "The Element method removeAttribute() removes the attribute with the specified name from the element.")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.'
					}
				}, {
					name: "srcdoc",
					description: {
						kind: "markdown",
						value: "Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute."
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: 'A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL."), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server."), or [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base "The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.") elements; the `formtarget` attribute of the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") elements; or the `windowName` parameter in the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open "The Window interface\'s open() method loads the specified resource into the browsing context (window, <iframe> or tab) with the specified name. If the name doesn\'t exist, then a new window is opened and the specified resource is loaded into its browsing context.") method.'
					}
				}, {
					name: "sandbox",
					valueSet: "sb",
					description: {
						kind: "markdown",
						value: 'Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\n*   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n*   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).\n*   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).\n*   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).\n*   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.\n*   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n*   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).\n*   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy "same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.").\n*   `allow-scripts`: Lets the resource run scripts (but not create popup windows).\n*   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent\'s storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).\n*   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).\n*   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\n**Notes about sandboxing:**\n\n*   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.\n*   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.\n*   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier.'
					}
				}, {
					name: "seamless",
					valueSet: "v"
				}, {
					name: "allowfullscreen",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen "The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.") method.'
					}
				}, {
					name: "width",
					description: {
						kind: "markdown",
						value: "The width of the frame in CSS pixels. Default is `300`."
					}
				}, {
					name: "height",
					description: {
						kind: "markdown",
						value: "The height of the frame in CSS pixels. Default is `150`."
					}
				}, {
					name: "allow",
					description: "Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the `<iframe>`."
				}, {
					name: "allowpaymentrequest",
					description: "Set to `true` if a cross-origin `<iframe>` should be allowed to invoke the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)."
				}, {
					name: "allowpaymentrequest",
					description: 'This attribute is considered a legacy attribute and redefined as `allow="payment"`.'
				}, {
					name: "csp",
					description: 'A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced for the embedded resource. See [`HTMLIFrameElement.csp`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp "The csp property of the HTMLIFrameElement interface specifies the Content Security Policy that an embedded document must agree to enforce upon itself.") for details.'
				}, {
					name: "importance",
					description: "The download priority of the resource in the `<iframe>`'s `src` attribute. Allowed values:\n\n`auto` (default)\n\nNo preference. The browser uses its own heuristics to decide the priority of the resource.\n\n`high`\n\nThe resource should be downloaded before other lower-priority page resources.\n\n`low`\n\nThe resource should be downloaded after other higher-priority page resources."
				}, {
					name: "referrerpolicy",
					description: 'Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the frame\'s resource:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content\'s origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don\'t send it to a less secure destination (HTTPS→HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/iframe"
				}]
			}, {
				name: "embed",
				description: {
					kind: "markdown",
					value: "The embed element provides an integration point for an external (typically non-HTML) application or interactive content."
				},
				attributes: [{
					name: "src",
					description: {
						kind: "markdown",
						value: "The URL of the resource being embedded."
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: "The MIME type to use to select the plug-in to instantiate."
					}
				}, {
					name: "width",
					description: {
						kind: "markdown",
						value: "The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
					}
				}, {
					name: "height",
					description: {
						kind: "markdown",
						value: "The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/embed"
				}]
			}, {
				name: "object",
				description: {
					kind: "markdown",
					value: "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin."
				},
				attributes: [{
					name: "data",
					description: {
						kind: "markdown",
						value: "The address of the resource as a valid URL. At least one of **data** and **type** must be defined."
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: "The [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined."
					}
				}, {
					name: "typemustmatch",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used."
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: "The name of valid browsing context (HTML5), or the name of the control (HTML 4)."
					}
				}, {
					name: "usemap",
					description: {
						kind: "markdown",
						value: "A hash-name reference to a [`<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map \"The HTML <map> element is used with <area> elements to define an image map (a clickable link area).\") element; that is a '#' followed by the value of a [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map#attr-name) of a map element."
					}
				}, {
					name: "form",
					description: {
						kind: "markdown",
						value: 'The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document.'
					}
				}, {
					name: "width",
					description: {
						kind: "markdown",
						value: "The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
					}
				}, {
					name: "height",
					description: {
						kind: "markdown",
						value: "The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
					}
				}, {
					name: "archive",
					description: "A space-separated list of URIs for archives of resources for the object."
				}, {
					name: "border",
					description: "The width of a border around the control, in pixels."
				}, {
					name: "classid",
					description: "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute."
				}, {
					name: "codebase",
					description: "The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document."
				}, {
					name: "codetype",
					description: "The content type of the data specified by **classid**."
				}, {
					name: "declare",
					description: "The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused."
				}, {
					name: "standby",
					description: "A message that the browser can show while loading the object's implementation and data."
				}, {
					name: "tabindex",
					description: "The position of the element in the tabbing navigation order for the current document."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/object"
				}]
			}, {
				name: "param",
				description: {
					kind: "markdown",
					value: "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own."
				},
				attributes: [{
					name: "name",
					description: {
						kind: "markdown",
						value: "Name of the parameter."
					}
				}, {
					name: "value",
					description: {
						kind: "markdown",
						value: "Specifies the value of the parameter."
					}
				}, {
					name: "type",
					description: 'Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value.'
				}, {
					name: "valuetype",
					description: 'Specifies the type of the `value` attribute. Possible values are:\n\n*   data: Default value. The value is passed to the object\'s implementation as a string.\n*   ref: The value is a URI to a resource where run-time values are stored.\n*   object: An ID of another [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/param"
				}]
			}, {
				name: "video",
				description: {
					kind: "markdown",
					value: "A video element is used for playing videos or movies, and audio files with captions."
				},
				attributes: [{
					name: "src"
				}, {
					name: "crossorigin",
					valueSet: "xo"
				}, {
					name: "poster"
				}, {
					name: "preload",
					valueSet: "pl"
				}, {
					name: "autoplay",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data."
					}
				}, {
					name: "mediagroup"
				}, {
					name: "loop",
					valueSet: "v"
				}, {
					name: "muted",
					valueSet: "v"
				}, {
					name: "controls",
					valueSet: "v"
				}, {
					name: "width"
				}, {
					name: "height"
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/video"
				}]
			}, {
				name: "audio",
				description: {
					kind: "markdown",
					value: "An audio element represents a sound or audio stream."
				},
				attributes: [{
					name: "src",
					description: {
						kind: "markdown",
						value: 'The URL of the audio to embed. This is subject to [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element within the audio block to specify the audio to embed.'
					}
				}, {
					name: "crossorigin",
					valueSet: "xo",
					description: {
						kind: "markdown",
						value: 'This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information.'
					}
				}, {
					name: "preload",
					valueSet: "pl",
					description: {
						kind: "markdown",
						value: "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\n*   `none`: Indicates that the audio should not be preloaded.\n*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.\n*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n*   _empty string_: A synonym of the `auto` value.\n\nIf not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.\n\n**Usage notes:**\n\n*   The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.\n*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint."
					}
				}, {
					name: "autoplay",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\n**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control."
					}
				}, {
					name: "mediagroup"
				}, {
					name: "loop",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio."
					}
				}, {
					name: "muted",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`."
					}
				}, {
					name: "controls",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/audio"
				}]
			}, {
				name: "source",
				description: {
					kind: "markdown",
					value: "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own."
				},
				attributes: [{
					name: "src",
					description: {
						kind: "markdown",
						value: 'Required for [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document."), address of the media resource. The value of this attribute is ignored when the `<source>` element is placed inside a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: "The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs."
					}
				}, {
					name: "sizes",
					description: 'Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.  \nThe `sizes` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
				}, {
					name: "srcset",
					description: "A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n\n1.  one URL to an image,\n2.  a width descriptor, that is a positive integer directly followed by `'w'`. The default value, if missing, is the infinity.\n3.  a pixel density descriptor, that is a positive floating number directly followed by `'x'`. The default value, if missing, is `1x`.\n\nEach string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.  \nThe browser chooses the most adequate image to display at a given point of time.  \nThe `srcset` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
				}, {
					name: "media",
					description: '[Media query](https://developer.mozilla.org/en-US/docs/CSS/Media_queries) of the resource\'s intended media; this should be used only in a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/source"
				}]
			}, {
				name: "track",
				description: {
					kind: "markdown",
					value: "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own."
				},
				attributes: [{
					name: "default",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
					}
				}, {
					name: "kind",
					valueSet: "tk",
					description: {
						kind: "markdown",
						value: "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
					}
				}, {
					name: "label",
					description: {
						kind: "markdown",
						value: "A user-readable title of the text track which is used by the browser when listing available text tracks."
					}
				}, {
					name: "src",
					description: {
						kind: "markdown",
						value: 'Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute.'
					}
				}, {
					name: "srclang",
					description: {
						kind: "markdown",
						value: "Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/track"
				}]
			}, {
				name: "map",
				description: {
					kind: "markdown",
					value: "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children."
				},
				attributes: [{
					name: "name",
					description: {
						kind: "markdown",
						value: "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/map"
				}]
			}, {
				name: "area",
				description: {
					kind: "markdown",
					value: "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map."
				},
				attributes: [{
					name: "alt"
				}, {
					name: "coords"
				}, {
					name: "shape",
					valueSet: "sh"
				}, {
					name: "href"
				}, {
					name: "target"
				}, {
					name: "download"
				}, {
					name: "ping"
				}, {
					name: "rel"
				}, {
					name: "hreflang"
				}, {
					name: "type"
				}, {
					name: "accesskey",
					description: "Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/area"
				}]
			}, {
				name: "table",
				description: {
					kind: "markdown",
					value: "The table element represents data with more than one dimension, in the form of a table."
				},
				attributes: [{
					name: "border"
				}, {
					name: "align",
					description: 'This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:\n\n*   left: the table is displayed on the left side of the document;\n*   center: the table is displayed in the center of the document;\n*   right: the table is displayed on the right side of the document.\n\n**Usage Note**\n\n*   **Do not use this attribute**, as it has been deprecated. The [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table "The HTML <table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). Set [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") and [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") to `auto` or [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin "The margin CSS property sets the margin area on all four sides of an element. It is a shorthand for margin-top, margin-right, margin-bottom, and margin-left.") to `0 auto` to achieve an effect that is similar to the align attribute.\n*   Prior to Firefox 4, Firefox also supported the `middle`, `absmiddle`, and `abscenter` values as synonyms of `center`, in quirks mode only.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/table"
				}]
			}, {
				name: "caption",
				description: {
					kind: "markdown",
					value: "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element."
				},
				attributes: [{
					name: "align",
					description: 'This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:\n\n`left`\n\nThe caption is displayed to the left of the table.\n\n`top`\n\nThe caption is displayed above the table.\n\n`right`\n\nThe caption is displayed to the right of the table.\n\n`bottom`\n\nThe caption is displayed below the table.\n\n**Usage note:** Do not use this attribute, as it has been deprecated. The [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.") element should be styled using the [CSS](https://developer.mozilla.org/en-US/docs/CSS) properties [`caption-side`](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side "The caption-side CSS property puts the content of a table\'s <caption> on the specified side. The values are relative to the writing-mode of the table.") and [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.").'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/caption"
				}]
			}, {
				name: "colgroup",
				description: {
					kind: "markdown",
					value: "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element."
				},
				attributes: [{
					name: "span"
				}, {
					name: "align",
					description: 'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed. The descendant [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") elements may override this value using their own [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-align) attribute.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property can be used.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/colgroup"
				}]
			}, {
				name: "col",
				description: {
					kind: "markdown",
					value: "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup."
				},
				attributes: [{
					name: "span"
				}, {
					name: "align",
					description: 'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, its value is inherited from the [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-align) of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element this `<col>` element belongs too. If there are none, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) { text-align: right; }` to right-align the second column.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/col"
				}]
			}, {
				name: "tbody",
				description: {
					kind: "markdown",
					value: "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table."
				},
				attributes: [{
					name: "align",
					description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/tbody"
				}]
			}, {
				name: "thead",
				description: {
					kind: "markdown",
					value: "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table."
				},
				attributes: [{
					name: "align",
					description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/thead"
				}]
			}, {
				name: "tfoot",
				description: {
					kind: "markdown",
					value: "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table."
				},
				attributes: [{
					name: "align",
					description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/tfoot"
				}]
			}, {
				name: "tr",
				description: {
					kind: "markdown",
					value: "The tr element represents a row of cells in a table."
				},
				attributes: [{
					name: "align",
					description: 'A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") which specifies how the cell\'s context should be aligned horizontally within the cells in the row; this is shorthand for using `align` on every cell in the row individually. Possible values are:\n\n`left`\n\nAlign the content of each cell at its left edge.\n\n`center`\n\nCenter the contents of each cell between their left and right edges.\n\n`right`\n\nAlign the content of each cell at its right edge.\n\n`justify`\n\nWiden whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).\n\n`char`\n\nAlign each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically "." or "," when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.\n\nIf no value is expressly set for `align`, the parent node\'s value is inherited.\n\nInstead of using the obsolete `align` attribute, you should instead use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to establish `left`, `center`, `right`, or `justify` alignment for the row\'s cells. To apply character-based alignment, set the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the alignment character (such as `"."` or `","`).'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/tr"
				}]
			}, {
				name: "td",
				description: {
					kind: "markdown",
					value: "The td element represents a data cell in a table."
				},
				attributes: [{
					name: "colspan"
				}, {
					name: "rowspan"
				}, {
					name: "headers"
				}, {
					name: "abbr",
					description: "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute."
				}, {
					name: "align",
					description: 'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char). Unimplemented in CSS3.'
				}, {
					name: "axis",
					description: "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard."
				}, {
					name: "bgcolor",
					description: 'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\n \n\n`black` = "#000000"\n\n \n\n`green` = "#008000"\n\n \n\n`silver` = "#C0C0C0"\n\n \n\n`lime` = "#00FF00"\n\n \n\n`gray` = "#808080"\n\n \n\n`olive` = "#808000"\n\n \n\n`white` = "#FFFFFF"\n\n \n\n`yellow` = "#FFFF00"\n\n \n\n`maroon` = "#800000"\n\n \n\n`navy` = "#000080"\n\n \n\n`red` = "#FF0000"\n\n \n\n`blue` = "#0000FF"\n\n \n\n`purple` = "#800080"\n\n \n\n`teal` = "#008080"\n\n \n\n`fuchsia` = "#FF00FF"\n\n \n\n`aqua` = "#00FFFF"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/CSS) instead.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/td"
				}]
			}, {
				name: "th",
				description: {
					kind: "markdown",
					value: "The th element represents a header cell in a table."
				},
				attributes: [{
					name: "colspan"
				}, {
					name: "rowspan"
				}, {
					name: "headers"
				}, {
					name: "scope",
					valueSet: "s"
				}, {
					name: "sorted"
				}, {
					name: "abbr",
					description: {
						kind: "markdown",
						value: "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
					}
				}, {
					name: "align",
					description: 'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3.'
				}, {
					name: "axis",
					description: "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard: use the [`scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead."
				}, {
					name: "bgcolor",
					description: 'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\n \n\n`black` = "#000000"\n\n \n\n`green` = "#008000"\n\n \n\n`silver` = "#C0C0C0"\n\n \n\n`lime` = "#00FF00"\n\n \n\n`gray` = "#808080"\n\n \n\n`olive` = "#808000"\n\n \n\n`white` = "#FFFFFF"\n\n \n\n`yellow` = "#FFFF00"\n\n \n\n`maroon` = "#800000"\n\n \n\n`navy` = "#000080"\n\n \n\n`red` = "#FF0000"\n\n \n\n`blue` = "#0000FF"\n\n \n\n`purple` = "#800080"\n\n \n\n`teal` = "#008080"\n\n \n\n`fuchsia` = "#FF00FF"\n\n \n\n`aqua` = "#00FFFF"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th "The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) instead.'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/th"
				}]
			}, {
				name: "form",
				description: {
					kind: "markdown",
					value: "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing."
				},
				attributes: [{
					name: "accept-charset",
					description: {
						kind: "markdown",
						value: 'A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.'
					}
				}, {
					name: "action",
					description: {
						kind: "markdown",
						value: 'The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
					}
				}, {
					name: "autocomplete",
					valueSet: "o",
					description: {
						kind: "markdown",
						value: "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields)."
					}
				}, {
					name: "enctype",
					valueSet: "et",
					description: {
						kind: "markdown",
						value: 'When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
					}
				}, {
					name: "method",
					valueSet: "m",
					description: {
						kind: "markdown",
						value: 'The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a \'?\' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.\n\nThis value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5."
					}
				}, {
					name: "novalidate",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form.'
					}
				}, {
					name: "target",
					description: {
						kind: "markdown",
						value: 'A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").\n\nHTML5: This value can be overridden by a [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formtarget) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
					}
				}, {
					name: "accept",
					description: 'A comma-separated list of content types that the server accepts.\n\n**Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) attribute of the specific [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
				}, {
					name: "autocapitalize",
					description: "This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/form"
				}]
			}, {
				name: "label",
				description: {
					kind: "markdown",
					value: "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself."
				},
				attributes: [{
					name: "form",
					description: {
						kind: "markdown",
						value: 'The [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements.'
					}
				}, {
					name: "for",
					description: {
						kind: "markdown",
						value: "The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/label"
				}]
			}, {
				name: "input",
				description: {
					kind: "markdown",
					value: "The input element represents a typed data field, usually with a form control to allow the user to edit the data."
				},
				attributes: [{
					name: "accept"
				}, {
					name: "alt"
				}, {
					name: "autocomplete",
					valueSet: "inputautocomplete"
				}, {
					name: "autofocus",
					valueSet: "v"
				}, {
					name: "checked",
					valueSet: "v"
				}, {
					name: "dirname"
				}, {
					name: "disabled",
					valueSet: "v"
				}, {
					name: "form"
				}, {
					name: "formaction"
				}, {
					name: "formenctype",
					valueSet: "et"
				}, {
					name: "formmethod",
					valueSet: "fm"
				}, {
					name: "formnovalidate",
					valueSet: "v"
				}, {
					name: "formtarget"
				}, {
					name: "height"
				}, {
					name: "inputmode",
					valueSet: "im"
				}, {
					name: "list"
				}, {
					name: "max"
				}, {
					name: "maxlength"
				}, {
					name: "min"
				}, {
					name: "minlength"
				}, {
					name: "multiple",
					valueSet: "v"
				}, {
					name: "name"
				}, {
					name: "pattern"
				}, {
					name: "placeholder"
				}, {
					name: "readonly",
					valueSet: "v"
				}, {
					name: "required",
					valueSet: "v"
				}, {
					name: "size"
				}, {
					name: "src"
				}, {
					name: "step"
				}, {
					name: "type",
					valueSet: "t"
				}, {
					name: "value"
				}, {
					name: "width"
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/input"
				}]
			}, {
				name: "button",
				description: {
					kind: "markdown",
					value: "The button element represents a button labeled by its contents."
				},
				attributes: [{
					name: "autofocus",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified."
					}
				}, {
					name: "disabled",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element with the **disabled** attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.'
					}
				}, {
					name: "form",
					description: {
						kind: "markdown",
						value: 'The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. If this attribute is not specified, the `<button>` element will be associated to an ancestor [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element, if one exists. This attribute enables you to associate `<button>` elements to [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements anywhere within a document, not just as descendants of [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements.'
					}
				}, {
					name: "formaction",
					description: {
						kind: "markdown",
						value: "The URI of a program that processes the information submitted by the button. If specified, it overrides the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner."
					}
				}, {
					name: "formenctype",
					valueSet: "et",
					description: {
						kind: "markdown",
						value: 'If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: Use this value if you are using an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to `file`.\n*   `text/plain`\n\nIf this attribute is specified, it overrides the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button\'s form owner.'
					}
				}, {
					name: "formmethod",
					valueSet: "fm",
					description: {
						kind: "markdown",
						value: "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\n*   `post`: The data from the form are included in the body of the form and sent to the server.\n*   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner."
					}
				}, {
					name: "formnovalidate",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner."
					}
				}, {
					name: "formtarget",
					description: {
						kind: "markdown",
						value: "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:\n\n*   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed browsing context.\n*   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`."
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: "The name of the button, which is submitted with the form data."
					}
				}, {
					name: "type",
					valueSet: "bt",
					description: {
						kind: "markdown",
						value: "The type of the button. Possible values are:\n\n*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n*   `reset`: The button resets all the controls to their initial values.\n*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur."
					}
				}, {
					name: "value",
					description: {
						kind: "markdown",
						value: "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted."
					}
				}, {
					name: "autocomplete",
					description: 'The use of this attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") is nonstandard and Firefox-specific. By default, unlike other browsers, [Firefox persists the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Setting the value of this attribute to `off` (i.e. `autocomplete="off"`) disables this feature. See [bug 654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072 "if disabled state is changed with javascript, the normal state doesn\'t return after refreshing the page").'
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/button"
				}]
			}, {
				name: "select",
				description: {
					kind: "markdown",
					value: "The select element represents a control for selecting amongst a set of options."
				},
				attributes: [{
					name: "autocomplete",
					valueSet: "inputautocomplete",
					description: {
						kind: "markdown",
						value: 'A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") providing a hint for a [user agent\'s](https://developer.mozilla.org/en-US/docs/Glossary/user_agent "user agent\'s: A user agent is a computer program representing a person, for example, a browser in a Web context.") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete.'
					}
				}, {
					name: "autofocus",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute."
					}
				}, {
					name: "disabled",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled."
					}
				}, {
					name: "form",
					description: {
						kind: "markdown",
						value: 'This attribute lets you specify the form element to which the select element is associated (that is, its "form owner"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.'
					}
				}, {
					name: "multiple",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown."
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: "This attribute is used to specify the name of the control."
					}
				}, {
					name: "required",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "A Boolean attribute indicating that an option with a non-empty string value must be selected."
					}
				}, {
					name: "size",
					description: {
						kind: "markdown",
						value: "If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\n**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/select"
				}]
			}, {
				name: "datalist",
				description: {
					kind: "markdown",
					value: "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/datalist"
				}]
			}, {
				name: "optgroup",
				description: {
					kind: "markdown",
					value: "The optgroup element represents a group of option elements with a common label."
				},
				attributes: [{
					name: "disabled",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
					}
				}, {
					name: "label",
					description: {
						kind: "markdown",
						value: "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/optgroup"
				}]
			}, {
				name: "option",
				description: {
					kind: "markdown",
					value: "The option element represents an option in a select element or as part of a list of suggestions in a datalist element."
				},
				attributes: [{
					name: "disabled",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won\'t receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup "The HTML <optgroup> element creates a grouping of options within a <select> element.") element.'
					}
				}, {
					name: "label",
					description: {
						kind: "markdown",
						value: "This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content."
					}
				}, {
					name: "selected",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `<option>` of this [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element may have the `selected` attribute.'
					}
				}, {
					name: "value",
					description: {
						kind: "markdown",
						value: "The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/option"
				}]
			}, {
				name: "textarea",
				description: {
					kind: "markdown",
					value: "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value."
				},
				attributes: [{
					name: "autocomplete",
					valueSet: "inputautocomplete",
					description: {
						kind: "markdown",
						value: 'This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element\'s form owner. The form owner is either the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").'
					}
				}, {
					name: "autofocus",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified."
					}
				}, {
					name: "cols",
					description: {
						kind: "markdown",
						value: "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`."
					}
				}, {
					name: "dirname"
				}, {
					name: "disabled",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled.'
					}
				}, {
					name: "form",
					description: {
						kind: "markdown",
						value: 'The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.'
					}
				}, {
					name: "inputmode",
					valueSet: "im"
				}, {
					name: "maxlength",
					description: {
						kind: "markdown",
						value: "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
					}
				}, {
					name: "minlength",
					description: {
						kind: "markdown",
						value: "The minimum number of characters (unicode code points) required that the user should enter."
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: "The name of the control."
					}
				}, {
					name: "placeholder",
					description: {
						kind: "markdown",
						value: 'A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The HTML <label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [<input>: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.'
					}
				}, {
					name: "readonly",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form."
					}
				}, {
					name: "required",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This attribute specifies that the user must fill in a value before submitting a form."
					}
				}, {
					name: "rows",
					description: {
						kind: "markdown",
						value: "The number of visible text lines for the control."
					}
				}, {
					name: "wrap",
					valueSet: "w",
					description: {
						kind: "markdown",
						value: "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value."
					}
				}, {
					name: "autocapitalize",
					description: "This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
				}, {
					name: "spellcheck",
					description: "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/textarea"
				}]
			}, {
				name: "output",
				description: {
					kind: "markdown",
					value: "The output element represents the result of a calculation performed by the application, or the result of a user action."
				},
				attributes: [{
					name: "for",
					description: {
						kind: "markdown",
						value: "A space-separated list of other elements’ [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation."
					}
				}, {
					name: "form",
					description: {
						kind: "markdown",
						value: 'The [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) that this element is associated with (its "form owner"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.'
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: 'The name of the element, exposed in the [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement "The HTMLFormElement interface represents a <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.") API.'
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/output"
				}]
			}, {
				name: "progress",
				description: {
					kind: "markdown",
					value: "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed."
				},
				attributes: [{
					name: "value",
					description: {
						kind: "markdown",
						value: "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take."
					}
				}, {
					name: "max",
					description: {
						kind: "markdown",
						value: "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/progress"
				}]
			}, {
				name: "meter",
				description: {
					kind: "markdown",
					value: "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate."
				},
				attributes: [{
					name: "value",
					description: {
						kind: "markdown",
						value: "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
					}
				}, {
					name: "min",
					description: {
						kind: "markdown",
						value: "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0."
					}
				}, {
					name: "max",
					description: {
						kind: "markdown",
						value: "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1."
					}
				}, {
					name: "low",
					description: {
						kind: "markdown",
						value: "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value."
					}
				}, {
					name: "high",
					description: {
						kind: "markdown",
						value: "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value."
					}
				}, {
					name: "optimum",
					description: {
						kind: "markdown",
						value: "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred."
					}
				}, {
					name: "form",
					description: "This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/meter"
				}]
			}, {
				name: "fieldset",
				description: {
					kind: "markdown",
					value: "The fieldset element represents a set of form controls optionally grouped under a common name."
				},
				attributes: [{
					name: "disabled",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled."
					}
				}, {
					name: "form",
					description: {
						kind: "markdown",
						value: 'This attribute takes the value of the `id` attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `<fieldset>` to be part of, even if it is not inside the form.'
					}
				}, {
					name: "name",
					description: {
						kind: "markdown",
						value: 'The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element nested inside it.'
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/fieldset"
				}]
			}, {
				name: "legend",
				description: {
					kind: "markdown",
					value: "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/legend"
				}]
			}, {
				name: "details",
				description: {
					kind: "markdown",
					value: "The details element represents a disclosure widget from which the user can obtain additional information or controls."
				},
				attributes: [{
					name: "open",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: "This Boolean attribute indicates whether or not the details — that is, the contents of the `<details>` element — are currently visible. The default, `false`, means the details are not visible."
					}
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/details"
				}]
			}, {
				name: "summary",
				description: {
					kind: "markdown",
					value: "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/summary"
				}]
			}, {
				name: "dialog",
				description: {
					kind: "markdown",
					value: "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window."
				},
				attributes: [{
					name: "open",
					description: "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/dialog"
				}]
			}, {
				name: "script",
				description: {
					kind: "markdown",
					value: "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user."
				},
				attributes: [{
					name: "src",
					description: {
						kind: "markdown",
						value: "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags."
					}
				}, {
					name: "type",
					description: {
						kind: "markdown",
						value: 'This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\n*   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).\n*   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.\n*   **Any other value:** The embedded content is treated as a data block which won\'t be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.\n\n**Note:** in Firefox you could specify the version of JavaScript contained in a `<script>` element by including a non-standard `version` parameter inside the `type` attribute — for example `type="text/javascript;version=1.8"`. This has been removed in Firefox 59 (see [bug 1428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 "FIXED: Remove support for version parameter from script loader")).'
					}
				}, {
					name: "charset"
				}, {
					name: "async",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.\n\nBrowsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async="false"`) during HTML parsing.\n\nDynamically inserted scripts (using [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn\'t recognized.")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async="false"`.\n\nSee [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts).'
					}
				}, {
					name: "defer",
					valueSet: "v",
					description: {
						kind: "markdown",
						value: 'This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").\n\nScripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use `async="false"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document.'
					}
				}, {
					name: "crossorigin",
					valueSet: "xo",
					description: {
						kind: "markdown",
						value: 'Normal `script` elements pass minimal information to the [`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.") for scripts which do not pass the standard [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments.'
					}
				}, {
					name: "nonce",
					description: {
						kind: "markdown",
						value: "A cryptographic nonce (number used once) to whitelist inline scripts in a [script-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
					}
				}, {
					name: "integrity",
					description: "This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
				}, {
					name: "nomodule",
					description: "This Boolean attribute is set to indicate that the script should not be executed in browsers that support [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code."
				}, {
					name: "referrerpolicy",
					description: 'Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the script, or resources fetched by the script:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content\'s origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS→HTTPS), but don\'t send it to a less secure destination (e.g. HTTPS→HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS→HTTPS), and send no header to a less secure destination (e.g. HTTPS→HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.\n\n**Note**: An empty string value (`""`) is both the default value, and a fallback value if `referrerpolicy` is not supported. If `referrerpolicy` is not explicitly specified on the `<script>` element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to `no-referrer-when-downgrade`.'
				}, {
					name: "text",
					description: "Like the `textContent` attribute, this attribute sets the text content of the element. Unlike the `textContent` attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/script"
				}]
			}, {
				name: "noscript",
				description: {
					kind: "markdown",
					value: "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/noscript"
				}]
			}, {
				name: "template",
				description: {
					kind: "markdown",
					value: "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script."
				},
				attributes: [],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/template"
				}]
			}, {
				name: "canvas",
				description: {
					kind: "markdown",
					value: "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly."
				},
				attributes: [{
					name: "width",
					description: {
						kind: "markdown",
						value: "The width of the coordinate space in CSS pixels. Defaults to 300."
					}
				}, {
					name: "height",
					description: {
						kind: "markdown",
						value: "The height of the coordinate space in CSS pixels. Defaults to 150."
					}
				}, {
					name: "moz-opaque",
					description: "Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext \"The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.\") instead."
				}],
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Element/canvas"
				}]
			}],
			globalAttributes: [{
				name: "accesskey",
				description: {
					kind: "markdown",
					value: "Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey"
				}]
			}, {
				name: "autocapitalize",
				description: {
					kind: "markdown",
					value: "Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase"
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize"
				}]
			}, {
				name: "class",
				description: {
					kind: "markdown",
					value: 'A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](/en-US/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](/en-US/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").'
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class"
				}]
			}, {
				name: "contenteditable",
				description: {
					kind: "markdown",
					value: "An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable"
				}]
			}, {
				name: "contextmenu",
				description: {
					kind: "markdown",
					value: 'The `[**id**](#attr-id)` of a [`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.'
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu"
				}]
			}, {
				name: "dir",
				description: {
					kind: "markdown",
					value: "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element."
				},
				valueSet: "d",
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir"
				}]
			}, {
				name: "draggable",
				description: {
					kind: "markdown",
					value: "An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](/en-us/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `true`, which indicates that the element may be dragged\n*   `false`, which indicates that the element may not be dragged."
				},
				valueSet: "b",
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable"
				}]
			}, {
				name: "dropzone",
				description: {
					kind: "markdown",
					value: "An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](/en-US/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `copy`, which indicates that dropping will create a copy of the element that was dragged\n*   `move`, which indicates that the element that was dragged will be moved to this new location.\n*   `link`, will create a link to the dragged data."
				}
			}, {
				name: "exportparts",
				description: {
					kind: "markdown",
					value: "Used to transitively export shadow parts from a nested shadow tree into a containing light tree."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts"
				}]
			}, {
				name: "hidden",
				description: {
					kind: "markdown",
					value: "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown."
				},
				valueSet: "v",
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden"
				}]
			}, {
				name: "id",
				description: {
					kind: "markdown",
					value: "Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS)."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id"
				}]
			}, {
				name: "inputmode",
				description: {
					kind: "markdown",
					value: 'Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](/en-US/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.'
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode"
				}]
			}, {
				name: "is",
				description: {
					kind: "markdown",
					value: "Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](/en-US/docs/Web/Web_Components/Using_custom_elements) for more details)."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is"
				}]
			}, {
				name: "itemid",
				description: {
					kind: "markdown",
					value: "The unique, global identifier of an item."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid"
				}]
			}, {
				name: "itemprop",
				description: {
					kind: "markdown",
					value: "Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop"
				}]
			}, {
				name: "itemref",
				description: {
					kind: "markdown",
					value: "Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref"
				}]
			}, {
				name: "itemscope",
				description: {
					kind: "markdown",
					value: "`itemscope` (usually) works along with `[itemtype](/en-US/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context."
				},
				valueSet: "v",
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope"
				}]
			}, {
				name: "itemtype",
				description: {
					kind: "markdown",
					value: "Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](/en-US/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype"
				}]
			}, {
				name: "lang",
				description: {
					kind: "markdown",
					value: "Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang"
				}]
			}, {
				name: "part",
				description: {
					kind: "markdown",
					value: 'A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](/en-US/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.'
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part"
				}]
			}, {
				name: "role",
				valueSet: "roles"
			}, {
				name: "slot",
				description: {
					kind: "markdown",
					value: "Assigns a slot in a [shadow DOM](/en-US/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](/en-US/docs/Web/HTML/Element/slot \"The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.\") element whose `[name](/en-US/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot"
				}]
			}, {
				name: "spellcheck",
				description: {
					kind: "markdown",
					value: "An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors."
				},
				valueSet: "b",
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck"
				}]
			}, {
				name: "style",
				description: {
					kind: "markdown",
					value: 'Contains [CSS](/en-US/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](/en-US/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.'
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style"
				}]
			}, {
				name: "tabindex",
				description: {
					kind: "markdown",
					value: "An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:\n\n*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;\n*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;\n*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex"
				}]
			}, {
				name: "title",
				description: {
					kind: "markdown",
					value: "Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip."
				},
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title"
				}]
			}, {
				name: "translate",
				description: {
					kind: "markdown",
					value: "An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](/en-US/docs/Web/API/Text \"The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.\") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:\n\n*   empty string and `yes`, which indicates that the element will be translated.\n*   `no`, which indicates that the element will not be translated."
				},
				valueSet: "y",
				references: [{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate"
				}]
			}, {
				name: "onabort",
				description: {
					kind: "markdown",
					value: "The loading of a resource has been aborted."
				}
			}, {
				name: "onblur",
				description: {
					kind: "markdown",
					value: "An element has lost focus (does not bubble)."
				}
			}, {
				name: "oncanplay",
				description: {
					kind: "markdown",
					value: "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content."
				}
			}, {
				name: "oncanplaythrough",
				description: {
					kind: "markdown",
					value: "The user agent can play the media up to its end without having to stop for further buffering of content."
				}
			}, {
				name: "onchange",
				description: {
					kind: "markdown",
					value: "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
				}
			}, {
				name: "onclick",
				description: {
					kind: "markdown",
					value: "A pointing device button has been pressed and released on an element."
				}
			}, {
				name: "oncontextmenu",
				description: {
					kind: "markdown",
					value: "The right button of the mouse is clicked (before the context menu is displayed)."
				}
			}, {
				name: "ondblclick",
				description: {
					kind: "markdown",
					value: "A pointing device button is clicked twice on an element."
				}
			}, {
				name: "ondrag",
				description: {
					kind: "markdown",
					value: "An element or text selection is being dragged (every 350ms)."
				}
			}, {
				name: "ondragend",
				description: {
					kind: "markdown",
					value: "A drag operation is being ended (by releasing a mouse button or hitting the escape key)."
				}
			}, {
				name: "ondragenter",
				description: {
					kind: "markdown",
					value: "A dragged element or text selection enters a valid drop target."
				}
			}, {
				name: "ondragleave",
				description: {
					kind: "markdown",
					value: "A dragged element or text selection leaves a valid drop target."
				}
			}, {
				name: "ondragover",
				description: {
					kind: "markdown",
					value: "An element or text selection is being dragged over a valid drop target (every 350ms)."
				}
			}, {
				name: "ondragstart",
				description: {
					kind: "markdown",
					value: "The user starts dragging an element or text selection."
				}
			}, {
				name: "ondrop",
				description: {
					kind: "markdown",
					value: "An element is dropped on a valid drop target."
				}
			}, {
				name: "ondurationchange",
				description: {
					kind: "markdown",
					value: "The duration attribute has been updated."
				}
			}, {
				name: "onemptied",
				description: {
					kind: "markdown",
					value: "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it."
				}
			}, {
				name: "onended",
				description: {
					kind: "markdown",
					value: "Playback has stopped because the end of the media was reached."
				}
			}, {
				name: "onerror",
				description: {
					kind: "markdown",
					value: "A resource failed to load."
				}
			}, {
				name: "onfocus",
				description: {
					kind: "markdown",
					value: "An element has received focus (does not bubble)."
				}
			}, {
				name: "onformchange"
			}, {
				name: "onforminput"
			}, {
				name: "oninput",
				description: {
					kind: "markdown",
					value: "The value of an element changes or the content of an element with the attribute contenteditable is modified."
				}
			}, {
				name: "oninvalid",
				description: {
					kind: "markdown",
					value: "A submittable element has been checked and doesn't satisfy its constraints."
				}
			}, {
				name: "onkeydown",
				description: {
					kind: "markdown",
					value: "A key is pressed down."
				}
			}, {
				name: "onkeypress",
				description: {
					kind: "markdown",
					value: "A key is pressed down and that key normally produces a character value (use input instead)."
				}
			}, {
				name: "onkeyup",
				description: {
					kind: "markdown",
					value: "A key is released."
				}
			}, {
				name: "onload",
				description: {
					kind: "markdown",
					value: "A resource and its dependent resources have finished loading."
				}
			}, {
				name: "onloadeddata",
				description: {
					kind: "markdown",
					value: "The first frame of the media has finished loading."
				}
			}, {
				name: "onloadedmetadata",
				description: {
					kind: "markdown",
					value: "The metadata has been loaded."
				}
			}, {
				name: "onloadstart",
				description: {
					kind: "markdown",
					value: "Progress has begun."
				}
			}, {
				name: "onmousedown",
				description: {
					kind: "markdown",
					value: "A pointing device button (usually a mouse) is pressed on an element."
				}
			}, {
				name: "onmousemove",
				description: {
					kind: "markdown",
					value: "A pointing device is moved over an element."
				}
			}, {
				name: "onmouseout",
				description: {
					kind: "markdown",
					value: "A pointing device is moved off the element that has the listener attached or off one of its children."
				}
			}, {
				name: "onmouseover",
				description: {
					kind: "markdown",
					value: "A pointing device is moved onto the element that has the listener attached or onto one of its children."
				}
			}, {
				name: "onmouseenter",
				description: "A pointing device is moved onto the element that has the listener attached."
			}, {
				name: "onmouseleave",
				description: "A pointing device is moved off the element that has the listener attached."
			}, {
				name: "onmouseup",
				description: {
					kind: "markdown",
					value: "A pointing device button is released over an element."
				}
			}, {
				name: "onmousewheel"
			}, {
				name: "onpause",
				description: {
					kind: "markdown",
					value: "Playback has been paused."
				}
			}, {
				name: "onplay",
				description: {
					kind: "markdown",
					value: "Playback has begun."
				}
			}, {
				name: "onplaying",
				description: {
					kind: "markdown",
					value: "Playback is ready to start after having been paused or delayed due to lack of data."
				}
			}, {
				name: "onpointercancel",
				description: "The pointer is unlikely to produce any more events."
			}, {
				name: "onpointerdown",
				description: "The pointer enters the active buttons state."
			}, {
				name: "onpointerenter",
				description: "Pointing device is moved inside the hit-testing boundary."
			}, {
				name: "onpointerleave",
				description: "Pointing device is moved out of the hit-testing boundary."
			}, {
				name: "onpointerlockchange",
				description: "The pointer was locked or released."
			}, {
				name: "onpointerlockerror",
				description: "It was impossible to lock the pointer for technical reasons or because the permission was denied."
			}, {
				name: "onpointermove",
				description: "The pointer changed coordinates."
			}, {
				name: "onpointerout",
				description: "The pointing device moved out of hit-testing boundary or leaves detectable hover range."
			}, {
				name: "onpointerover",
				description: "The pointing device is moved into the hit-testing boundary."
			}, {
				name: "onpointerup",
				description: "The pointer leaves the active buttons state."
			}, {
				name: "onprogress",
				description: {
					kind: "markdown",
					value: "In progress."
				}
			}, {
				name: "onratechange",
				description: {
					kind: "markdown",
					value: "The playback rate has changed."
				}
			}, {
				name: "onreset",
				description: {
					kind: "markdown",
					value: "A form is reset."
				}
			}, {
				name: "onresize",
				description: {
					kind: "markdown",
					value: "The document view has been resized."
				}
			}, {
				name: "onreadystatechange",
				description: {
					kind: "markdown",
					value: "The readyState attribute of a document has changed."
				}
			}, {
				name: "onscroll",
				description: {
					kind: "markdown",
					value: "The document view or an element has been scrolled."
				}
			}, {
				name: "onseeked",
				description: {
					kind: "markdown",
					value: "A seek operation completed."
				}
			}, {
				name: "onseeking",
				description: {
					kind: "markdown",
					value: "A seek operation began."
				}
			}, {
				name: "onselect",
				description: {
					kind: "markdown",
					value: "Some text is being selected."
				}
			}, {
				name: "onshow",
				description: {
					kind: "markdown",
					value: "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute"
				}
			}, {
				name: "onstalled",
				description: {
					kind: "markdown",
					value: "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming."
				}
			}, {
				name: "onsubmit",
				description: {
					kind: "markdown",
					value: "A form is submitted."
				}
			}, {
				name: "onsuspend",
				description: {
					kind: "markdown",
					value: "Media data loading has been suspended."
				}
			}, {
				name: "ontimeupdate",
				description: {
					kind: "markdown",
					value: "The time indicated by the currentTime attribute has been updated."
				}
			}, {
				name: "onvolumechange",
				description: {
					kind: "markdown",
					value: "The volume has changed."
				}
			}, {
				name: "onwaiting",
				description: {
					kind: "markdown",
					value: "Playback has stopped because of a temporary lack of data."
				}
			}, {
				name: "aria-activedescendant",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant"
				}],
				description: {
					kind: "markdown",
					value: "Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application)."
				}
			}, {
				name: "aria-atomic",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-atomic"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute."
				}
			}, {
				name: "aria-autocomplete",
				valueSet: "autocomplete",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
				}
			}, {
				name: "aria-busy",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-busy"
				}],
				description: {
					kind: "markdown",
					value: "Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user."
				}
			}, {
				name: "aria-checked",
				valueSet: "tristate",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-checked"
				}],
				description: {
					kind: "markdown",
					value: 'Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
				}
			}, {
				name: "aria-colcount",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colcount"
				}],
				description: {
					kind: "markdown",
					value: "Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex)."
				}
			}, {
				name: "aria-colindex",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colindex"
				}],
				description: {
					kind: "markdown",
					value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
				}
			}, {
				name: "aria-colspan",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colspan"
				}],
				description: {
					kind: "markdown",
					value: "Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
				}
			}, {
				name: "aria-controls",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-controls"
				}],
				description: {
					kind: "markdown",
					value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)."
				}
			}, {
				name: "aria-current",
				valueSet: "current",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-current"
				}],
				description: {
					kind: "markdown",
					value: "Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements."
				}
			}, {
				name: "aria-describedat",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-describedat"
				}]
			}, {
				name: "aria-describedby",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-describedby"
				}],
				description: {
					kind: "markdown",
					value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
				}
			}, {
				name: "aria-disabled",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-disabled"
				}],
				description: {
					kind: "markdown",
					value: "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly)."
				}
			}, {
				name: "aria-dropeffect",
				valueSet: "dropeffect",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect"
				}],
				description: {
					kind: "markdown",
					value: "\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target."
				}
			}, {
				name: "aria-errormessage",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage"
				}],
				description: {
					kind: "markdown",
					value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
				}
			}, {
				name: "aria-expanded",
				valueSet: "u",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-expanded"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed."
				}
			}, {
				name: "aria-flowto",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-flowto"
				}],
				description: {
					kind: "markdown",
					value: "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order."
				}
			}, {
				name: "aria-grabbed",
				valueSet: "u",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed"
				}],
				description: {
					kind: "markdown",
					value: '\\[Deprecated in ARIA 1.1\\] Indicates an element\'s "grabbed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.'
				}
			}, {
				name: "aria-haspopup",
				valueSet: "haspopup",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup"
				}],
				description: {
					kind: "markdown",
					value: "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
				}
			}, {
				name: "aria-hidden",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
				}
			}, {
				name: "aria-invalid",
				valueSet: "invalid",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-invalid"
				}],
				description: {
					kind: "markdown",
					value: "Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage)."
				}
			}, {
				name: "aria-kbdshortcuts",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-kbdshortcuts"
				}]
			}, {
				name: "aria-label",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-label"
				}],
				description: {
					kind: "markdown",
					value: "Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
				}
			}, {
				name: "aria-labelledby",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby"
				}],
				description: {
					kind: "markdown",
					value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
				}
			}, {
				name: "aria-level",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-level"
				}],
				description: {
					kind: "markdown",
					value: "Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure."
				}
			}, {
				name: "aria-live",
				valueSet: "live",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-live"
				}],
				description: {
					kind: "markdown",
					value: "Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)."
				}
			}, {
				name: "aria-modal",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-modal"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed."
				}
			}, {
				name: "aria-multiline",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-multiline"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether a text box accepts multiple lines of input or only a single line."
				}
			}, {
				name: "aria-multiselectable",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable"
				}],
				description: {
					kind: "markdown",
					value: "Indicates that the user may select more than one item from the current selectable descendants."
				}
			}, {
				name: "aria-orientation",
				valueSet: "orientation",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-orientation"
				}],
				description: {
					kind: "markdown",
					value: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
				}
			}, {
				name: "aria-owns",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-owns"
				}],
				description: {
					kind: "markdown",
					value: "Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)."
				}
			}, {
				name: "aria-placeholder",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder"
				}],
				description: {
					kind: "markdown",
					value: "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format."
				}
			}, {
				name: "aria-posinset",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-posinset"
				}],
				description: {
					kind: "markdown",
					value: "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)."
				}
			}, {
				name: "aria-pressed",
				valueSet: "tristate",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-pressed"
				}],
				description: {
					kind: "markdown",
					value: 'Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
				}
			}, {
				name: "aria-readonly",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-readonly"
				}],
				description: {
					kind: "markdown",
					value: "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
				}
			}, {
				name: "aria-relevant",
				valueSet: "relevant",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-relevant"
				}],
				description: {
					kind: "markdown",
					value: "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)."
				}
			}, {
				name: "aria-required",
				valueSet: "b",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-required"
				}],
				description: {
					kind: "markdown",
					value: "Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted."
				}
			}, {
				name: "aria-roledescription",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription"
				}],
				description: {
					kind: "markdown",
					value: "Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
				}
			}, {
				name: "aria-rowcount",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount"
				}],
				description: {
					kind: "markdown",
					value: "Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex)."
				}
			}, {
				name: "aria-rowindex",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex"
				}],
				description: {
					kind: "markdown",
					value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
				}
			}, {
				name: "aria-rowspan",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan"
				}],
				description: {
					kind: "markdown",
					value: "Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
				}
			}, {
				name: "aria-selected",
				valueSet: "u",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-selected"
				}],
				description: {
					kind: "markdown",
					value: 'Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).'
				}
			}, {
				name: "aria-setsize",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-setsize"
				}],
				description: {
					kind: "markdown",
					value: "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset)."
				}
			}, {
				name: "aria-sort",
				valueSet: "sort",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-sort"
				}],
				description: {
					kind: "markdown",
					value: "Indicates if items in a table or grid are sorted in ascending or descending order."
				}
			}, {
				name: "aria-valuemax",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax"
				}],
				description: {
					kind: "markdown",
					value: "Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
				}
			}, {
				name: "aria-valuemin",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin"
				}],
				description: {
					kind: "markdown",
					value: "Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
				}
			}, {
				name: "aria-valuenow",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow"
				}],
				description: {
					kind: "markdown",
					value: "Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)."
				}
			}, {
				name: "aria-valuetext",
				references: [{
					name: "WAI-ARIA Reference",
					url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext"
				}],
				description: {
					kind: "markdown",
					value: "Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
				}
			}, {
				name: "aria-details",
				description: {
					kind: "markdown",
					value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
				}
			}, {
				name: "aria-keyshortcuts",
				description: {
					kind: "markdown",
					value: "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element."
				}
			}],
			valueSets: [{
				name: "b",
				values: [{
					name: "true"
				}, {
					name: "false"
				}]
			}, {
				name: "u",
				values: [{
					name: "true"
				}, {
					name: "false"
				}, {
					name: "undefined"
				}]
			}, {
				name: "o",
				values: [{
					name: "on"
				}, {
					name: "off"
				}]
			}, {
				name: "y",
				values: [{
					name: "yes"
				}, {
					name: "no"
				}]
			}, {
				name: "w",
				values: [{
					name: "soft"
				}, {
					name: "hard"
				}]
			}, {
				name: "d",
				values: [{
					name: "ltr"
				}, {
					name: "rtl"
				}, {
					name: "auto"
				}]
			}, {
				name: "m",
				values: [{
					name: "GET",
					description: {
						kind: "markdown",
						value: "Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters."
					}
				}, {
					name: "POST",
					description: {
						kind: "markdown",
						value: "Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5); form data are included in the body of the form and sent to the server."
					}
				}, {
					name: "dialog",
					description: {
						kind: "markdown",
						value: "Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element to close the dialog when submitted."
					}
				}]
			}, {
				name: "fm",
				values: [{
					name: "GET"
				}, {
					name: "POST"
				}]
			}, {
				name: "s",
				values: [{
					name: "row"
				}, {
					name: "col"
				}, {
					name: "rowgroup"
				}, {
					name: "colgroup"
				}]
			}, {
				name: "t",
				values: [{
					name: "hidden"
				}, {
					name: "text"
				}, {
					name: "search"
				}, {
					name: "tel"
				}, {
					name: "url"
				}, {
					name: "email"
				}, {
					name: "password"
				}, {
					name: "datetime"
				}, {
					name: "date"
				}, {
					name: "month"
				}, {
					name: "week"
				}, {
					name: "time"
				}, {
					name: "datetime-local"
				}, {
					name: "number"
				}, {
					name: "range"
				}, {
					name: "color"
				}, {
					name: "checkbox"
				}, {
					name: "radio"
				}, {
					name: "file"
				}, {
					name: "submit"
				}, {
					name: "image"
				}, {
					name: "reset"
				}, {
					name: "button"
				}]
			}, {
				name: "im",
				values: [{
					name: "verbatim"
				}, {
					name: "latin"
				}, {
					name: "latin-name"
				}, {
					name: "latin-prose"
				}, {
					name: "full-width-latin"
				}, {
					name: "kana"
				}, {
					name: "kana-name"
				}, {
					name: "katakana"
				}, {
					name: "numeric"
				}, {
					name: "tel"
				}, {
					name: "email"
				}, {
					name: "url"
				}]
			}, {
				name: "bt",
				values: [{
					name: "button"
				}, {
					name: "submit"
				}, {
					name: "reset"
				}, {
					name: "menu"
				}]
			}, {
				name: "lt",
				values: [{
					name: "1"
				}, {
					name: "a"
				}, {
					name: "A"
				}, {
					name: "i"
				}, {
					name: "I"
				}]
			}, {
				name: "mt",
				values: [{
					name: "context"
				}, {
					name: "toolbar"
				}]
			}, {
				name: "mit",
				values: [{
					name: "command"
				}, {
					name: "checkbox"
				}, {
					name: "radio"
				}]
			}, {
				name: "et",
				values: [{
					name: "application/x-www-form-urlencoded"
				}, {
					name: "multipart/form-data"
				}, {
					name: "text/plain"
				}]
			}, {
				name: "tk",
				values: [{
					name: "subtitles"
				}, {
					name: "captions"
				}, {
					name: "descriptions"
				}, {
					name: "chapters"
				}, {
					name: "metadata"
				}]
			}, {
				name: "pl",
				values: [{
					name: "none"
				}, {
					name: "metadata"
				}, {
					name: "auto"
				}]
			}, {
				name: "sh",
				values: [{
					name: "circle"
				}, {
					name: "default"
				}, {
					name: "poly"
				}, {
					name: "rect"
				}]
			}, {
				name: "xo",
				values: [{
					name: "anonymous"
				}, {
					name: "use-credentials"
				}]
			}, {
				name: "sb",
				values: [{
					name: "allow-forms"
				}, {
					name: "allow-modals"
				}, {
					name: "allow-pointer-lock"
				}, {
					name: "allow-popups"
				}, {
					name: "allow-popups-to-escape-sandbox"
				}, {
					name: "allow-same-origin"
				}, {
					name: "allow-scripts"
				}, {
					name: "allow-top-navigation"
				}]
			}, {
				name: "tristate",
				values: [{
					name: "true"
				}, {
					name: "false"
				}, {
					name: "mixed"
				}, {
					name: "undefined"
				}]
			}, {
				name: "inputautocomplete",
				values: [{
					name: "additional-name"
				}, {
					name: "address-level1"
				}, {
					name: "address-level2"
				}, {
					name: "address-level3"
				}, {
					name: "address-level4"
				}, {
					name: "address-line1"
				}, {
					name: "address-line2"
				}, {
					name: "address-line3"
				}, {
					name: "bday"
				}, {
					name: "bday-year"
				}, {
					name: "bday-day"
				}, {
					name: "bday-month"
				}, {
					name: "billing"
				}, {
					name: "cc-additional-name"
				}, {
					name: "cc-csc"
				}, {
					name: "cc-exp"
				}, {
					name: "cc-exp-month"
				}, {
					name: "cc-exp-year"
				}, {
					name: "cc-family-name"
				}, {
					name: "cc-given-name"
				}, {
					name: "cc-name"
				}, {
					name: "cc-number"
				}, {
					name: "cc-type"
				}, {
					name: "country"
				}, {
					name: "country-name"
				}, {
					name: "current-password"
				}, {
					name: "email"
				}, {
					name: "family-name"
				}, {
					name: "fax"
				}, {
					name: "given-name"
				}, {
					name: "home"
				}, {
					name: "honorific-prefix"
				}, {
					name: "honorific-suffix"
				}, {
					name: "impp"
				}, {
					name: "language"
				}, {
					name: "mobile"
				}, {
					name: "name"
				}, {
					name: "new-password"
				}, {
					name: "nickname"
				}, {
					name: "organization"
				}, {
					name: "organization-title"
				}, {
					name: "pager"
				}, {
					name: "photo"
				}, {
					name: "postal-code"
				}, {
					name: "sex"
				}, {
					name: "shipping"
				}, {
					name: "street-address"
				}, {
					name: "tel-area-code"
				}, {
					name: "tel"
				}, {
					name: "tel-country-code"
				}, {
					name: "tel-extension"
				}, {
					name: "tel-local"
				}, {
					name: "tel-local-prefix"
				}, {
					name: "tel-local-suffix"
				}, {
					name: "tel-national"
				}, {
					name: "transaction-amount"
				}, {
					name: "transaction-currency"
				}, {
					name: "url"
				}, {
					name: "username"
				}, {
					name: "work"
				}]
			}, {
				name: "autocomplete",
				values: [{
					name: "inline"
				}, {
					name: "list"
				}, {
					name: "both"
				}, {
					name: "none"
				}]
			}, {
				name: "current",
				values: [{
					name: "page"
				}, {
					name: "step"
				}, {
					name: "location"
				}, {
					name: "date"
				}, {
					name: "time"
				}, {
					name: "true"
				}, {
					name: "false"
				}]
			}, {
				name: "dropeffect",
				values: [{
					name: "copy"
				}, {
					name: "move"
				}, {
					name: "link"
				}, {
					name: "execute"
				}, {
					name: "popup"
				}, {
					name: "none"
				}]
			}, {
				name: "invalid",
				values: [{
					name: "grammar"
				}, {
					name: "false"
				}, {
					name: "spelling"
				}, {
					name: "true"
				}]
			}, {
				name: "live",
				values: [{
					name: "off"
				}, {
					name: "polite"
				}, {
					name: "assertive"
				}]
			}, {
				name: "orientation",
				values: [{
					name: "vertical"
				}, {
					name: "horizontal"
				}, {
					name: "undefined"
				}]
			}, {
				name: "relevant",
				values: [{
					name: "additions"
				}, {
					name: "removals"
				}, {
					name: "text"
				}, {
					name: "all"
				}, {
					name: "additions text"
				}]
			}, {
				name: "sort",
				values: [{
					name: "ascending"
				}, {
					name: "descending"
				}, {
					name: "none"
				}, {
					name: "other"
				}]
			}, {
				name: "roles",
				values: [{
					name: "alert"
				}, {
					name: "alertdialog"
				}, {
					name: "button"
				}, {
					name: "checkbox"
				}, {
					name: "dialog"
				}, {
					name: "gridcell"
				}, {
					name: "link"
				}, {
					name: "log"
				}, {
					name: "marquee"
				}, {
					name: "menuitem"
				}, {
					name: "menuitemcheckbox"
				}, {
					name: "menuitemradio"
				}, {
					name: "option"
				}, {
					name: "progressbar"
				}, {
					name: "radio"
				}, {
					name: "scrollbar"
				}, {
					name: "searchbox"
				}, {
					name: "slider"
				}, {
					name: "spinbutton"
				}, {
					name: "status"
				}, {
					name: "switch"
				}, {
					name: "tab"
				}, {
					name: "tabpanel"
				}, {
					name: "textbox"
				}, {
					name: "timer"
				}, {
					name: "tooltip"
				}, {
					name: "treeitem"
				}, {
					name: "combobox"
				}, {
					name: "grid"
				}, {
					name: "listbox"
				}, {
					name: "menu"
				}, {
					name: "menubar"
				}, {
					name: "radiogroup"
				}, {
					name: "tablist"
				}, {
					name: "tree"
				}, {
					name: "treegrid"
				}, {
					name: "application"
				}, {
					name: "article"
				}, {
					name: "cell"
				}, {
					name: "columnheader"
				}, {
					name: "definition"
				}, {
					name: "directory"
				}, {
					name: "document"
				}, {
					name: "feed"
				}, {
					name: "figure"
				}, {
					name: "group"
				}, {
					name: "heading"
				}, {
					name: "img"
				}, {
					name: "list"
				}, {
					name: "listitem"
				}, {
					name: "math"
				}, {
					name: "none"
				}, {
					name: "note"
				}, {
					name: "presentation"
				}, {
					name: "region"
				}, {
					name: "row"
				}, {
					name: "rowgroup"
				}, {
					name: "rowheader"
				}, {
					name: "separator"
				}, {
					name: "table"
				}, {
					name: "term"
				}, {
					name: "text"
				}, {
					name: "toolbar"
				}, {
					name: "banner"
				}, {
					name: "complementary"
				}, {
					name: "contentinfo"
				}, {
					name: "form"
				}, {
					name: "main"
				}, {
					name: "navigation"
				}, {
					name: "region"
				}, {
					name: "search"
				}, {
					name: "doc-abstract"
				}, {
					name: "doc-acknowledgments"
				}, {
					name: "doc-afterword"
				}, {
					name: "doc-appendix"
				}, {
					name: "doc-backlink"
				}, {
					name: "doc-biblioentry"
				}, {
					name: "doc-bibliography"
				}, {
					name: "doc-biblioref"
				}, {
					name: "doc-chapter"
				}, {
					name: "doc-colophon"
				}, {
					name: "doc-conclusion"
				}, {
					name: "doc-cover"
				}, {
					name: "doc-credit"
				}, {
					name: "doc-credits"
				}, {
					name: "doc-dedication"
				}, {
					name: "doc-endnote"
				}, {
					name: "doc-endnotes"
				}, {
					name: "doc-epigraph"
				}, {
					name: "doc-epilogue"
				}, {
					name: "doc-errata"
				}, {
					name: "doc-example"
				}, {
					name: "doc-footnote"
				}, {
					name: "doc-foreword"
				}, {
					name: "doc-glossary"
				}, {
					name: "doc-glossref"
				}, {
					name: "doc-index"
				}, {
					name: "doc-introduction"
				}, {
					name: "doc-noteref"
				}, {
					name: "doc-notice"
				}, {
					name: "doc-pagebreak"
				}, {
					name: "doc-pagelist"
				}, {
					name: "doc-part"
				}, {
					name: "doc-preface"
				}, {
					name: "doc-prologue"
				}, {
					name: "doc-pullquote"
				}, {
					name: "doc-qna"
				}, {
					name: "doc-subtitle"
				}, {
					name: "doc-tip"
				}, {
					name: "doc-toc"
				}]
			}, {
				name: "metanames",
				values: [{
					name: "application-name"
				}, {
					name: "author"
				}, {
					name: "description"
				}, {
					name: "format-detection"
				}, {
					name: "generator"
				}, {
					name: "keywords"
				}, {
					name: "publisher"
				}, {
					name: "referrer"
				}, {
					name: "robots"
				}, {
					name: "theme-color"
				}, {
					name: "viewport"
				}]
			}, {
				name: "haspopup",
				values: [{
					name: "false",
					description: {
						kind: "markdown",
						value: "(default) Indicates the element does not have a popup."
					}
				}, {
					name: "true",
					description: {
						kind: "markdown",
						value: "Indicates the popup is a menu."
					}
				}, {
					name: "menu",
					description: {
						kind: "markdown",
						value: "Indicates the popup is a menu."
					}
				}, {
					name: "listbox",
					description: {
						kind: "markdown",
						value: "Indicates the popup is a listbox."
					}
				}, {
					name: "tree",
					description: {
						kind: "markdown",
						value: "Indicates the popup is a tree."
					}
				}, {
					name: "grid",
					description: {
						kind: "markdown",
						value: "Indicates the popup is a grid."
					}
				}, {
					name: "dialog",
					description: {
						kind: "markdown",
						value: "Indicates the popup is a dialog."
					}
				}]
			}]
		}
	})),
	function(e) {
		if ("object" == typeof module && "object" == typeof module.exports) {
			var t = e(module.require, module.exports);
			void 0 !== t && (module.exports = t)
		} else "function" == typeof define && define.amd && define("vscode-html-languageservice/languageFacts/dataManager", [
			"require", "exports", "./dataProvider", "./data/webCustomData"
		], e)
	}((function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.HTMLDataManager = void 0;
		var n = e("./dataProvider"),
			i = e("./data/webCustomData"),
			r = function() {
				function e(e) {
					this.dataProviders = [], this.setDataProviders(!1 !== e.useDefaultDataProvider, e.customDataProviders || [])
				}
				return e.prototype.setDataProviders = function(e, t) {
					var r;
					this.dataProviders = [], e && this.dataProviders.push(new n.HTMLDataProvider("html5", i.htmlData)), (r = this.dataProviders)
						.push.apply(r, t)
				}, e.prototype.getDataProviders = function() {
					return this.dataProviders
				}, e
			}();
		t.HTMLDataManager = r
	}));
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, n, i) {
		void 0 === i && (i = n), Object.defineProperty(e, i, {
			enumerable: !0,
			get: function() {
				return t[n]
			}
		})
	} : function(e, t, n, i) {
		void 0 === i && (i = n), e[i] = t[n]
	}),
	__exportStar = this && this.__exportStar || function(e, t) {
		for (var n in e) "default" === n || Object.prototype.hasOwnProperty.call(t, n) || __createBinding(t, e, n)
	};
! function(e) {
	if ("object" == typeof module && "object" == typeof module.exports) {
		var t = e(module.require, module.exports);
		void 0 !== t && (module.exports = t)
	} else "function" == typeof define && define.amd && define("vscode-html-languageservice/htmlLanguageService", [
		"require", "exports", "./parser/htmlScanner", "./parser/htmlParser", "./services/htmlCompletion",
		"./services/htmlHover", "./services/htmlFormatter", "./services/htmlLinks", "./services/htmlHighlighting",
		"./services/htmlSymbolsProvider", "./services/htmlRename", "./services/htmlMatchingTagPosition",
		"./services/htmlLinkedEditing", "./services/htmlFolding", "./services/htmlSelectionRange",
		"./languageFacts/dataProvider", "./languageFacts/dataManager", "./languageFacts/data/webCustomData",
		"./htmlLanguageTypes"
	], e)
}((function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.getDefaultHTMLDataProvider = t.newHTMLDataProvider = t.getLanguageService = void 0;
	var n = e("./parser/htmlScanner"),
		i = e("./parser/htmlParser"),
		r = e("./services/htmlCompletion"),
		a = e("./services/htmlHover"),
		o = e("./services/htmlFormatter"),
		s = e("./services/htmlLinks"),
		l = e("./services/htmlHighlighting"),
		c = e("./services/htmlSymbolsProvider"),
		d = e("./services/htmlRename"),
		h = e("./services/htmlMatchingTagPosition"),
		u = e("./services/htmlLinkedEditing"),
		p = e("./services/htmlFolding"),
		m = e("./services/htmlSelectionRange"),
		f = e("./languageFacts/dataProvider"),
		g = e("./languageFacts/dataManager"),
		b = e("./languageFacts/data/webCustomData");
	__exportStar(e("./htmlLanguageTypes"), t);
	var v = {};

	function _(e, t) {
		return new f.HTMLDataProvider(e, t)
	}
	t.getLanguageService = function(e) {
		void 0 === e && (e = v);
		var t = new g.HTMLDataManager(e),
			f = new a.HTMLHover(e, t),
			b = new r.HTMLCompletion(e, t);
		return {
			setDataProviders: t.setDataProviders.bind(t),
			createScanner: n.createScanner,
			parseHTMLDocument: function(e) {
				return i.parse(e.getText())
			},
			doComplete: b.doComplete.bind(b),
			doComplete2: b.doComplete2.bind(b),
			setCompletionParticipants: b.setCompletionParticipants.bind(b),
			doHover: f.doHover.bind(f),
			format: o.format,
			findDocumentHighlights: l.findDocumentHighlights,
			findDocumentLinks: s.findDocumentLinks,
			findDocumentSymbols: c.findDocumentSymbols,
			getFoldingRanges: p.getFoldingRanges,
			getSelectionRanges: m.getSelectionRanges,
			doTagComplete: b.doTagComplete.bind(b),
			doRename: d.doRename,
			findMatchingTagPosition: h.findMatchingTagPosition,
			findOnTypeRenameRanges: u.findLinkedEditingRanges,
			findLinkedEditingRanges: u.findLinkedEditingRanges
		}
	}, t.newHTMLDataProvider = _, t.getDefaultHTMLDataProvider = function() {
		return _("default", b.htmlData)
	}
})), define("vscode-html-languageservice", ["vscode-html-languageservice/htmlLanguageService"], (function(e) {
	return e
})), define("vs/language/html/languageFeatures", ["require", "exports", "vscode-html-languageservice",
	"./fillers/monaco-editor-core"
], (function(e, t, n, i) {
	"use strict";

	function r(e) {
		if (e) return {
			character: e.column - 1,
			line: e.lineNumber - 1
		}
	}

	function a(e) {
		if (e) return new i.Range(e.start.line + 1, e.start.character + 1, e.end.line + 1, e.end.character + 1)
	}

	function o(e) {
		var t = i.languages.CompletionItemKind;
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

	function s(e) {
		if (e) return {
			range: a(e.range),
			text: e.newText
		}
	}
	Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SelectionRangeAdapter = t.FoldingRangeAdapter = t.RenameAdapter = t.DocumentRangeFormattingEditProvider = t.DocumentFormattingEditProvider =
		t.DocumentLinkAdapter = t.DocumentSymbolAdapter = t.DocumentHighlightAdapter = t.HoverAdapter = t.CompletionAdapter =
		void 0;
	var l = function() {
		function e(e) {
			this._worker = e
		}
		return Object.defineProperty(e.prototype, "triggerCharacters", {
			get: function() {
				return [".", ":", "<", '"', "=", "/"]
			},
			enumerable: !1,
			configurable: !0
		}), e.prototype.provideCompletionItems = function(e, t, l, c) {
			var d = e.uri;
			return this._worker(d).then((function(e) {
				return e.doComplete(d.toString(), r(t))
			})).then((function(r) {
				if (r) {
					var l = e.getWordUntilPosition(t),
						c = new i.Range(t.lineNumber, l.startColumn, t.lineNumber, l.endColumn),
						d = r.items.map((function(e) {
							var t, r, l = {
								label: e.label,
								insertText: e.insertText || e.label,
								sortText: e.sortText,
								filterText: e.filterText,
								documentation: e.documentation,
								command: (t = e.command, t && "editor.action.triggerSuggest" === t.command ? {
									id: t.command,
									title: t.title,
									arguments: t.arguments
								} : void 0),
								detail: e.detail,
								range: c,
								kind: o(e.kind)
							};
							return e.textEdit && (void 0 !== (r = e.textEdit).insert && void 0 !== r.replace ? l.range = {
								insert: a(e.textEdit.insert),
								replace: a(e.textEdit.replace)
							} : l.range = a(e.textEdit.range), l.insertText = e.textEdit.newText), e.additionalTextEdits && (l.additionalTextEdits =
								e.additionalTextEdits.map(s)), e.insertTextFormat === n.InsertTextFormat.Snippet && (l.insertTextRules =
								i.languages.CompletionItemInsertTextRule.InsertAsSnippet), l
						}));
					return {
						isIncomplete: r.isIncomplete,
						suggestions: d
					}
				}
			}))
		}, e
	}();

	function c(e) {
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

	function d(e) {
		if (e) return Array.isArray(e) ? e.map(c) : [c(e)]
	}
	t.CompletionAdapter = l;
	var h = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideHover = function(e, t, n) {
			var i = e.uri;
			return this._worker(i).then((function(e) {
				return e.doHover(i.toString(), r(t))
			})).then((function(e) {
				if (e) return {
					range: a(e.range),
					contents: d(e.contents)
				}
			}))
		}, e
	}();

	function u(e) {
		var t = i.languages.DocumentHighlightKind;
		switch (e) {
			case n.DocumentHighlightKind.Read:
				return t.Read;
			case n.DocumentHighlightKind.Write:
				return t.Write;
			case n.DocumentHighlightKind.Text:
				return t.Text
		}
		return t.Text
	}
	t.HoverAdapter = h;
	var p = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDocumentHighlights = function(e, t, n) {
			var i = e.uri;
			return this._worker(i).then((function(e) {
				return e.findDocumentHighlights(i.toString(), r(t))
			})).then((function(e) {
				if (e) return e.map((function(e) {
					return {
						range: a(e.range),
						kind: u(e.kind)
					}
				}))
			}))
		}, e
	}();

	function m(e) {
		var t = i.languages.SymbolKind;
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
	t.DocumentHighlightAdapter = p;
	var f = function() {
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
						kind: m(e.kind),
						tags: [],
						range: a(e.location.range),
						selectionRange: a(e.location.range)
					}
				}))
			}))
		}, e
	}();
	t.DocumentSymbolAdapter = f;
	var g = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideLinks = function(e, t) {
			var n = e.uri;
			return this._worker(n).then((function(e) {
				return e.findDocumentLinks(n.toString())
			})).then((function(e) {
				if (e) return {
					links: e.map((function(e) {
						return {
							range: a(e.range),
							url: e.target
						}
					}))
				}
			}))
		}, e
	}();

	function b(e) {
		return {
			tabSize: e.tabSize,
			insertSpaces: e.insertSpaces
		}
	}
	t.DocumentLinkAdapter = g;
	var v = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDocumentFormattingEdits = function(e, t, n) {
			var i = e.uri;
			return this._worker(i).then((function(e) {
				return e.format(i.toString(), null, b(t)).then((function(e) {
					if (e && 0 !== e.length) return e.map(s)
				}))
			}))
		}, e
	}();
	t.DocumentFormattingEditProvider = v;
	var _ = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideDocumentRangeFormattingEdits = function(e, t, n, i) {
			var a = e.uri;
			return this._worker(a).then((function(e) {
				return e.format(a.toString(), function(e) {
					if (e) return {
						start: r(e.getStartPosition()),
						end: r(e.getEndPosition())
					}
				}(t), b(n)).then((function(e) {
					if (e && 0 !== e.length) return e.map(s)
				}))
			}))
		}, e
	}();
	t.DocumentRangeFormattingEditProvider = _;
	var w = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideRenameEdits = function(e, t, n, o) {
			var s = e.uri;
			return this._worker(s).then((function(e) {
				return e.doRename(s.toString(), r(t), n)
			})).then((function(e) {
				return function(e) {
					if (!e || !e.changes) return;
					var t = [];
					for (var n in e.changes)
						for (var r = i.Uri.parse(n), o = 0, s = e.changes[n]; o < s.length; o++) {
							var l = s[o];
							t.push({
								resource: r,
								edit: {
									range: a(l.range),
									text: l.newText
								}
							})
						}
					return {
						edits: t
					}
				}(e)
			}))
		}, e
	}();
	t.RenameAdapter = w;
	var y = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideFoldingRanges = function(e, t, r) {
			var a = e.uri;
			return this._worker(a).then((function(e) {
				return e.getFoldingRanges(a.toString(), t)
			})).then((function(e) {
				if (e) return e.map((function(e) {
					var t = {
						start: e.startLine + 1,
						end: e.endLine + 1
					};
					return void 0 !== e.kind && (t.kind = function(e) {
						switch (e) {
							case n.FoldingRangeKind.Comment:
								return i.languages.FoldingRangeKind.Comment;
							case n.FoldingRangeKind.Imports:
								return i.languages.FoldingRangeKind.Imports;
							case n.FoldingRangeKind.Region:
								return i.languages.FoldingRangeKind.Region
						}
					}(e.kind)), t
				}))
			}))
		}, e
	}();
	t.FoldingRangeAdapter = y;
	var T = function() {
		function e(e) {
			this._worker = e
		}
		return e.prototype.provideSelectionRanges = function(e, t, n) {
			var i = e.uri;
			return this._worker(i).then((function(e) {
				return e.getSelectionRanges(i.toString(), t.map(r))
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
	t.SelectionRangeAdapter = T
})), define("vs/language/html/htmlMode", ["require", "exports", "./workerManager", "./languageFeatures",
	"./fillers/monaco-editor-core"
], (function(e, t, n, i, r) {
	"use strict";

	function a(e) {
		return {
			dispose: function() {
				return o(e)
			}
		}
	}

	function o(e) {
		for (; e.length;) e.pop().dispose()
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.setupMode = t.setupMode1 = void 0, t.setupMode1 = function(e) {
		var t = new n.WorkerManager(e),
			a = function() {
				for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
				return t.getLanguageServiceWorker.apply(t, e)
			},
			o = e.languageId;
		r.languages.registerCompletionItemProvider(o, new i.CompletionAdapter(a)), r.languages.registerHoverProvider(o,
				new i.HoverAdapter(a)), r.languages.registerDocumentHighlightProvider(o, new i.DocumentHighlightAdapter(a)), r.languages
			.registerLinkProvider(o, new i.DocumentLinkAdapter(a)), r.languages.registerFoldingRangeProvider(o, new i.FoldingRangeAdapter(
				a)), r.languages.registerDocumentSymbolProvider(o, new i.DocumentSymbolAdapter(a)), r.languages.registerSelectionRangeProvider(
				o, new i.SelectionRangeAdapter(a)), r.languages.registerRenameProvider(o, new i.RenameAdapter(a)), "html" ===
			o && (r.languages.registerDocumentFormattingEditProvider(o, new i.DocumentFormattingEditProvider(a)), r.languages
				.registerDocumentRangeFormattingEditProvider(o, new i.DocumentRangeFormattingEditProvider(a)))
	}, t.setupMode = function(e) {
		var t = [],
			s = [],
			l = new n.WorkerManager(e);
		t.push(l);
		var c, d, h = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return l.getLanguageServiceWorker.apply(l, e)
		};
		return c = e.languageId, d = e.modeConfiguration, o(s), d.completionItems && s.push(r.languages.registerCompletionItemProvider(
				c, new i.CompletionAdapter(h))), d.hovers && s.push(r.languages.registerHoverProvider(c, new i.HoverAdapter(h))),
			d.documentHighlights && s.push(r.languages.registerDocumentHighlightProvider(c, new i.DocumentHighlightAdapter(h))),
			d.links && s.push(r.languages.registerLinkProvider(c, new i.DocumentLinkAdapter(h))), d.documentSymbols && s.push(
				r.languages.registerDocumentSymbolProvider(c, new i.DocumentSymbolAdapter(h))), d.rename && s.push(r.languages.registerRenameProvider(
				c, new i.RenameAdapter(h))), d.foldingRanges && s.push(r.languages.registerFoldingRangeProvider(c, new i.FoldingRangeAdapter(
				h))), d.selectionRanges && s.push(r.languages.registerSelectionRangeProvider(c, new i.SelectionRangeAdapter(h))),
			d.documentFormattingEdits && s.push(r.languages.registerDocumentFormattingEditProvider(c, new i.DocumentFormattingEditProvider(
				h))), d.documentRangeFormattingEdits && s.push(r.languages.registerDocumentRangeFormattingEditProvider(c, new i
				.DocumentRangeFormattingEditProvider(h))), t.push(a(s)), a(t)
	}
}));
