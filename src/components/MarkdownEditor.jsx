import Editor from '@toast-ui/editor';
import {useEffect, useRef} from "react";

function MarkdownEditor({onContentChange}) {
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = new Editor({
            el: editorRef.current,
            hideModeSwitch: true,
        });
        editor.addHook('change', () => {
            const content = editor.getMarkdown();
            onContentChange(content)
        });
    }, []);
    return (
        <div ref={editorRef}></div>
    )
}
export default MarkdownEditor