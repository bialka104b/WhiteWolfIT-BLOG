<script setup>
import RichEditorGroup from '../RichEditorGroup.vue';
import RichEditorButton from '../RichEditorButton.vue';
import { inject } from 'vue';

const editor = inject('editor');
</script>

<template>
    <RichEditorGroup>
      <RichEditorButton
        icon="table"
        tooltip="Table"
      >
        <v-menu activator="parent" width="auto">
          <v-card class="pa-2 mt-1 sub-menu">
            <RichEditorButton
                @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
                icon="table-plus"
                tooltip="Insert table"
            />

            <RichEditorButton
                @click="editor.chain().focus().addColumnBefore().run()"
                :disabled="!editor.can().addColumnBefore()"
                icon="table-column-plus-before"
                tooltip="Add column before"
            />
            <RichEditorButton
                @click="editor.chain().focus().addColumnAfter().run()"
                :disabled="!editor.can().addColumnAfter()"
                icon="table-column-plus-after"
                tooltip="Add column after"
            />
            <RichEditorButton
                @click="editor.chain().focus().deleteColumn().run()"
                :disabled="!editor.can().deleteColumn()"
                icon="table-column-remove"
                tooltip="Remove column"
            />

            <RichEditorButton
                @click="editor.chain().focus().addRowBefore().run()"
                :disabled="!editor.can().addRowBefore()"
                icon="table-row-plus-before"
                tooltip="Add row before"
            />
            <RichEditorButton
                @click="editor.chain().focus().addRowAfter().run()"
                :disabled="!editor.can().addRowAfter()"
                icon="table-row-plus-after"
                tooltip="Add row after"
            />
            <RichEditorButton
                @click="editor.chain().focus().deleteRow().run()"
                :disabled="!editor.can().deleteRow()"
                icon="table-row-remove"
                tooltip="Remove row"
            />

            <RichEditorButton
                @click="editor.chain().focus().deleteTable().run()"
                :disabled="!editor.can().deleteTable()"
                icon="table-remove"
                tooltip="Remove table"
            />
            <RichEditorButton
                @click="editor.chain().focus().mergeCells().run()"
                :disabled="!editor.can().mergeCells()"
                icon="table-merge-cells"
                tooltip="Merge cells"
            />

            <RichEditorButton
                @click="editor.chain().focus().splitCell().run()"
                :disabled="!editor.can().splitCell()"
                icon="table-split-cell"
                tooltip="Split Cell"
            />
          </v-card>
        </v-menu>
      </RichEditorButton>
    </RichEditorGroup>
</template>

<style lang="scss">
.tiptap {
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;
  
      td,
      th {
        min-width: 1em;
        border: 2px solid #ced4da;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
  
        > * {
          margin-bottom: 0;
        }
      }
  
      th {
        font-weight: bold;
        text-align: left;
        background-color: #f1f3f5;
      }
  
      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0; right: 0; top: 0; bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }
  
      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }
  
      p {
        margin: 0;
      }
    }
  }
  
  .tableWrapper {
    overflow-x: auto;
  }
  
  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
</style>