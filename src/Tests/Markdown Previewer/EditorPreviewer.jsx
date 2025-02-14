/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react';
import './styles.css'
import { text } from './text';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { marked } from "marked";

export default function Editor() {
    const [isOpened, setIsOpened] = useState(true);
    const [editorOpen, setEditorOpen] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(true);
    const [markdown, setMarkdown] = useState(text);

const handleChange = (event) => {
    setMarkdown(event.target.value); 
};
    const element = "<div></div>";
    const handleOpenEditor = () => {
        setIsOpened((prevState) => !prevState);
        setEditorOpen(true);
        setPreviewOpen(false);
    }
    const handleCloseEditor = () => {
        setIsOpened((prevState) => !prevState);
        setEditorOpen(true);
        setPreviewOpen(true);
    }
    const handleOpenPreviewer = () => {
        setIsOpened((prevState) => !prevState);
        setPreviewOpen(true);
        setEditorOpen(false);
    }
    const handleClosePreviewer = () => {
        setIsOpened((prevState) => !prevState);
        setPreviewOpen(true);
        setEditorOpen(true);
    }

    const closeEditor = <i onClick={handleCloseEditor} className="fa fa-compress close"></i>;
    const openEditor = <i onClick={handleOpenEditor} className="fa fa-arrows-alt open"></i>;
    const closePreview = <i onClick={handleClosePreviewer} className="fa fa-compress close"></i>;
    const openPreview = <i onClick={handleOpenPreviewer} className="fa fa-arrows-alt open"></i>;
    return (
        <section>
            {editorOpen && 
            <section className='m-5'>
            <div className='editor-section'>
                <div className="d-flex justify-content-between align-items-center mx-1">
                    <h1 className='fs-5'><span><i className="fa fa-free-code-camp fa-xs" title="no-stack-dub-sack"></i></span> Editor</h1>
                    <span>{isOpened ? openEditor : closeEditor}</span>
                </div>
                <div>
                    <textarea
                        onChange={handleChange}
                        name="editor"
                        id="editor"
                        className='w-100'
                        value={markdown}
                    >
                        {text}
                    </textarea>
                </div>
            </div>
        </section>
            }
            {previewOpen &&
                <section className='previewer-section m-5'>
                    <div className="d-flex justify-content-between align-items-center mx-1">
                        <h1 className='fs-5'><span><i className="fa fa-free-code-camp fa-xs" title="no-stack-dub-sack"></i></span> Previewer</h1>
                        {isOpened ? openPreview : closePreview}
                    </div>
                    <div id="preview" className="p-3" dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
                </section>
            }
        </section>
    );
}
