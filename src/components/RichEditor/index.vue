<script setup>
import { watch, provide } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import RichEditorGroup from '@/components/RichEditor/RichEditorGroup.vue';
import RichEditorButton from '@/components/RichEditor/RichEditorButton.vue';

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

// Create editor
const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Highlight,
        Typography,
    ],
    onUpdate: () => {
        emits('update:modelValue', editor.value.getHTML())
    }
})

// Provide editor instance to buttons
provide('editor', editor);

// logic of v-model
watch(props.modelValue, (value) => {
    const isSame = editor.value.getHTML() === value

    if(isSame)
        return

    editor.value.commands.setContent(value, false)
})
</script>

<template>
  <div class="editor-toolbar d-flex flex-wrap" v-if="editor">
    <rich-editor-group multiple>
      <rich-editor-button
        @click="editor.chain().focus().toggleBold().run()"
        name="bold"
        icon="format-bold"
      />
      <rich-editor-button 
        @click="editor.chain().focus().toggleItalic().run()" 
        name="italic" 
        icon="format-italic" 
      />
      <rich-editor-button 
        @click="editor.chain().focus().toggleStrike().run()" 
        name="strike" 
        icon="format-strikethrough" 
      />
      <rich-editor-button 
        @click="editor.chain().focus().unsetAllMarks().run()" 
        icon="format-clear" 
      />
    </rich-editor-group>

    <rich-editor-group>
      <rich-editor-button 
        @click="editor.chain().focus().clearNodes().run()"
        icon="format-letter-case"
      />
    </rich-editor-group>

    <rich-editor-group>
      <rich-editor-button 
        @click="editor.chain().focus().setParagraph().run()"  
        name="paragraph"
        icon="format-paragraph"
      />

      <rich-editor-button 
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :active="editor.isActive('heading', { level: 1 })"
        icon="format-header-1"
      />

      <rich-editor-button 
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :active="editor.isActive('heading', { level: 2 })"
        icon="format-header-2"
      />

      <rich-editor-button 
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :active="editor.isActive('heading', { level: 3 })"
        icon="format-header-3"
      />

      <rich-editor-button 
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :active="editor.isActive('heading', { level: 4 })"
        icon="format-header-4"
      />

      <rich-editor-button 
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :active="editor.isActive('heading', { level: 5 })"
        icon="format-header-5"
      />
      
      <rich-editor-button 
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :active="editor.isActive('heading', { level: 6 })"
        icon="format-header-6"
      />
    </rich-editor-group>

    <rich-editor-group>
      <rich-editor-button 
        @click="editor.chain().focus().toggleBulletList().run()"
        name="bulletList"
        icon="format-list-bulleted"
      />
      <rich-editor-button 
        @click="editor.chain().focus().toggleOrderedList().run()"
        name="orderedList"
        icon="format-list-numbered"
      />
    </rich-editor-group>

    <rich-editor-group>
      <rich-editor-button 
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" 
        name="code" 
        icon="code-json" 
      />
      <rich-editor-button 
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :disabled="!editor.can().chain().focus().toggleCodeBlock().run()"
        name="codeBlock" 
        icon="code-tags" 
      />
    </rich-editor-group>

    <rich-editor-group multiple>
      <rich-editor-button 
        @click="editor.chain().focus().toggleBlockquote().run()"
        :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
        name="blockquote" 
        icon="format-quote-close" 
      />
      <rich-editor-button 
        @click="editor.chain().focus().setHorizontalRule().run()"
        icon="minus" 
      />
    </rich-editor-group>

    <rich-editor-group>
      <rich-editor-button 
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        icon="undo" 
      />
      <rich-editor-button 
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        icon="redo" 
      />
    </rich-editor-group>

    <rich-editor-group>
      <rich-editor-button
        @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        icon="table"
      />
    </rich-editor-group>
  </div>

  <editor-content :editor="editor" class="mt-2" />
</template>

<style lang="scss">
.editor-toolbar {
  gap: 10px;
}
.tiptap {
  outline: none;

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
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
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
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>