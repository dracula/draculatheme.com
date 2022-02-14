import React, { useRef, useState } from 'react'
import Editor from '@monaco-editor/react'

import snippets from '../lib/snippets/all'
import theme from '../lib/monaco.json'

function CodeEditor({ language }) {
  const editorRef = useRef(null)
  const [editorLoaded, setEditorLoaded] = useState(false)

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme('dracula', theme)
    monaco.editor.setTheme('dracula')
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    setEditorLoaded(true)
  }

  return (
    <Editor
      height="90vh"
      width="100%"
      theme="dracula"
      path={language}
      defaultLanguage={language}
      defaultValue={snippets[language].value}
      options={{
        cursorSmoothCaretAnimation: true,
        scrollBeyondLastLine: false,
        fontLigatures: true,
        fontSize: '18px',
        minimap: {
          enabled: false,
        },
      }}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  )
}

export default CodeEditor
