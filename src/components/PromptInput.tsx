import React from "react";

const PromptInput = () => {
  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          name="prompt"
          id="prompt"
          className="flex-1 p-4 outline-none rounded-md"
        ></textarea>
        <button>Generate</button>
        <button>Use Suggestion</button>
        <button>New Suggestion</button>
      </form>
    </div>
  );
};

export default PromptInput;
