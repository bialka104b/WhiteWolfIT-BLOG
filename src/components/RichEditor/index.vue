<script setup>
import { watch, provide, onBeforeUnmount, defineProps, defineEmits } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import RichEditorGroup from "@/components/RichEditor/RichEditorGroup.vue";
import RichEditorButton from "@/components/RichEditor/RichEditorButton.vue";
import RichEditorTable from "./partials/RichEditorTable.vue";

import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);

// TableCell
const CustomTableCell = TableCell.extend({
	addAttributes() {
		return {
			// extend the existing attributes …
			...this.parent?.(),

			// and add a new one …
			backgroundColor: {
				default: null,
				parseHTML: (element) =>
					element.getAttribute("data-background-color"),
				renderHTML: (attributes) => {
					return {
						"data-background-color": attributes.backgroundColor,
						style: `background-color: ${attributes.backgroundColor}`
					};
				}
			}
		};
	}
});

// Create editor
const editor = useEditor({
	content: props.modelValue,
	extensions: [
		StarterKit,
		Highlight,
		Typography,
		Table.configure({
			resizable: true
		}),
		TableRow,
		TableHeader,
		CustomTableCell,
		Text,
		TextStyle,
		Color
	],
	onUpdate: () => {
		emits("update:modelValue", editor.value.getHTML());
	}
});
onBeforeUnmount(() => {
	editor.value.destroy();
});

// Provide editor instance to buttons
provide("editor", editor);

// logic of v-model
watch(
	props,
	() => {
		const isSame = editor.value?.getHTML() === props.modelValue;

		if (isSame) return;

		editor.value.commands.setContent(props.modelValue, false);
	},
	{ deep: true }
);
</script>

<template>
	<v-card>
		<div class="editor-toolbar d-flex flex-wrap pa-3" v-if="editor">
			<RichEditorGroup multiple>
				<RichEditorButton
					@click="editor.chain().focus().toggleBold().run()"
				>
					<input
						type="color"
						@input="
							editor
								.chain()
								.focus()
								.setColor($event.target.value)
								.run()
						"
						:value="
							editor.getAttributes('textStyle').color || '#ffffff'
						"
					/>
				</RichEditorButton>
				<RichEditorButton
					@click="editor.chain().focus().toggleBold().run()"
					name="bold"
					icon="format-bold"
				/>
				<RichEditorButton
					@click="editor.chain().focus().toggleItalic().run()"
					name="italic"
					icon="format-italic"
				/>
				<RichEditorButton
					@click="editor.chain().focus().toggleStrike().run()"
					name="strike"
					icon="format-strikethrough"
				/>
				<RichEditorButton
					@click="editor.chain().focus().unsetAllMarks().run()"
					icon="format-clear"
				/>
			</RichEditorGroup>

			<RichEditorGroup>
				<RichEditorButton
					@click="editor.chain().focus().clearNodes().run()"
					icon="format-letter-case"
				/>
			</RichEditorGroup>

			<RichEditorGroup>
				<RichEditorButton
					@click="editor.chain().focus().setParagraph().run()"
					name="paragraph"
					icon="format-paragraph"
				/>

				<RichEditorButton
					@click="
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					"
					:active="editor.isActive('heading', { level: 1 })"
					icon="format-header-1"
				/>

				<RichEditorButton
					@click="
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					"
					:active="editor.isActive('heading', { level: 2 })"
					icon="format-header-2"
				/>

				<RichEditorButton
					@click="
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					"
					:active="editor.isActive('heading', { level: 3 })"
					icon="format-header-3"
				/>

				<RichEditorButton
					@click="
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					"
					:active="editor.isActive('heading', { level: 4 })"
					icon="format-header-4"
				/>

				<RichEditorButton
					@click="
						editor.chain().focus().toggleHeading({ level: 5 }).run()
					"
					:active="editor.isActive('heading', { level: 5 })"
					icon="format-header-5"
				/>

				<RichEditorButton
					@click="
						editor.chain().focus().toggleHeading({ level: 6 }).run()
					"
					:active="editor.isActive('heading', { level: 6 })"
					icon="format-header-6"
				/>
			</RichEditorGroup>

			<RichEditorGroup>
				<RichEditorButton
					@click="editor.chain().focus().toggleBulletList().run()"
					name="bulletList"
					icon="format-list-bulleted"
				/>
				<RichEditorButton
					@click="editor.chain().focus().toggleOrderedList().run()"
					name="orderedList"
					icon="format-list-numbered"
				/>
			</RichEditorGroup>

			<RichEditorGroup>
				<RichEditorButton
					@click="editor.chain().focus().toggleCode().run()"
					:disabled="!editor.can().chain().focus().toggleCode().run()"
					name="code"
					icon="code-json"
				/>
				<RichEditorButton
					@click="editor.chain().focus().toggleCodeBlock().run()"
					:disabled="
						!editor.can().chain().focus().toggleCodeBlock().run()
					"
					name="codeBlock"
					icon="code-tags"
				/>
			</RichEditorGroup>

			<RichEditorGroup multiple>
				<RichEditorButton
					@click="editor.chain().focus().toggleBlockquote().run()"
					:disabled="
						!editor.can().chain().focus().toggleBlockquote().run()
					"
					name="blockquote"
					icon="format-quote-close"
				/>
				<RichEditorButton
					@click="editor.chain().focus().setHorizontalRule().run()"
					icon="minus"
				/>
			</RichEditorGroup>

			<RichEditorGroup>
				<RichEditorButton
					@click="editor.chain().focus().undo().run()"
					:disabled="!editor.can().chain().focus().undo().run()"
					icon="undo"
				/>
				<RichEditorButton
					@click="editor.chain().focus().redo().run()"
					:disabled="!editor.can().chain().focus().redo().run()"
					icon="redo"
				/>
			</RichEditorGroup>

			<RichEditorTable />
		</div>

		<v-divider></v-divider>

		<EditorContent :editor="editor" class="pa-3" />
	</v-card>
</template>

<style lang="scss">
.editor-toolbar {
	gap: 10px;
}
.sub-menu {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 5px;
	max-width: 401px;
}
.tiptap {
	outline: none;
	max-height: 600px;
	min-height: 200px;

	> * + * {
		margin-top: 0.75em;
	}

	ul,
	ol {
		padding: 0 1rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
	}

	code {
		background-color: rgba(#616161, 0.1);
		color: #616161;
	}

	pre {
		background: #0d0d0d;
		color: #fff;
		font-family: "JetBrainsMono", monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;

		code {
			color: inherit;
			padding: 0;
			background: none;
			font-size: 0.8rem;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	hr {
		border: none;
		border-top: 2px solid rgba(#0d0d0d, 0.1);
		margin: 2rem 0;
	}
}
</style>
