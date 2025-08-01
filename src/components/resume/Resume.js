import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
// eslint-disable-next-line import/no-unresolved
import resume from "./resume-Marc-Bucchieri.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 h-100">
        <Document file={resume}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  </div>
);

export default Resume;
