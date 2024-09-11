import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import { Redo, Undo } from "lucide-react"
import React from "react"
import {
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	UNDO_COMMAND,
	ElementFormatType,
	TextFormatType,
	$insertNodes,
} from "lexical"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { LexicalComposer } from "@lexical/react/LexicalComposer"

import { alignment_types, format_types } from "@/config"

interface Props {
	onValueChange: (text: string) => void
	defaultValue?: string
}
const theme = {
	heading: {
		h1: "heading-1",
		h2: "heading-2",
		h3: "heading-3",
		h4: "heading-4",
		h5: "heading-5",
	},
	text: {
		bold: "text-bold",
		italic: "text-italic",
		underline: "text-underline",
		strikethrough: "text-line-through",
		subscript: "text-subscript",
		superscript: "text-superscript",
		code: "text-code",
		highlight: "text-highlight",
	},
}

export const Editor = ({ onValueChange, defaultValue }: Props) => {
	return (
		<LexicalComposer
			initialConfig={{
				namespace: "Editor",
				theme,
				onError: (error) => console.error("editor error: ", error),
			}}>
			<div className="flex w-full items-center gap-1 py-1">
				<CustomTextActions />
				<CustomAlignmentActions />
				<CustomHistoryActions />
			</div>
			<RichTextPlugin
				contentEditable={<ContentEditable className="editor" />}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<HtmlPlugin initialHtml={defaultValue} onHtmlChanged={onValueChange} />
			<HistoryPlugin />
		</LexicalComposer>
	)
}

const CustomHistoryActions = () => {
	const [editor] = useLexicalComposerContext()

	React.useEffect(() => {
		editor.focus()
	}, [editor])

	return (
		<div className="flex items-center gap-1">
			<button
				className="grid size-7 place-items-center rounded-md bg-neutral-400 text-neutral-900 transition-colors hover:bg-neutral-500"
				onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
				<Undo size={16} />
			</button>
			<button
				className="grid size-7 place-items-center rounded-md bg-neutral-400 text-neutral-900 transition-colors hover:bg-neutral-500"
				onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
				<Redo size={16} />
			</button>
		</div>
	)
}

const CustomTextActions = () => {
	const [editor] = useLexicalComposerContext()

	const handleClick = (format: TextFormatType) => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
	}

	return (
		<div className="flex items-center gap-1">
			{format_types.map((format) => (
				<button
					key={format.label}
					onClick={() => handleClick(format.label.toLowerCase() as TextFormatType)}
					className="grid size-7 place-items-center rounded-md bg-neutral-400 text-neutral-900 transition-colors hover:bg-neutral-500">
					<format.icon size={16} />
				</button>
			))}
		</div>
	)
}

const CustomAlignmentActions = () => {
	const [editor] = useLexicalComposerContext()

	const handleClick = (format: ElementFormatType) => {
		editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format)
	}

	return (
		<div className="flex items-center gap-1">
			{alignment_types.map((format) => (
				<button
					key={format.label}
					onClick={() => handleClick(format.label.toLowerCase() as ElementFormatType)}
					className="grid size-7 place-items-center rounded-md bg-neutral-400 text-neutral-900 transition-colors hover:bg-neutral-500">
					<format.icon size={16} />
				</button>
			))}
		</div>
	)
}

interface HtmlPluginProps {
	initialHtml?: string
	onHtmlChanged: (html: string) => void
}

const HtmlPlugin = ({ initialHtml, onHtmlChanged }: HtmlPluginProps) => {
	const [editor] = useLexicalComposerContext()
	const [isFirstRender, setIsFirstRender] = React.useState(true)

	React.useEffect(() => {
		if (!initialHtml || isFirstRender) return
		setIsFirstRender(false)

		editor.update(() => {
			const parser = new DOMParser()
			const dom = parser.parseFromString(initialHtml, "text/html")
			const nodes = $generateNodesFromDOM(editor, dom)
			$insertNodes(nodes)
		})
	}, [editor, initialHtml, isFirstRender])

	return (
		<OnChangePlugin
			onChange={(editorState) => {
				editorState.read(() => {
					onHtmlChanged($generateHtmlFromNodes(editor, null))
				})
			}}
		/>
	)
}
