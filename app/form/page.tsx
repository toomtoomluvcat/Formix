"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NavBarInForm from "../component/nav";
import Text from "../component/forms/text";

function Form() {
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = title;
    }
    if (descriptionRef.current) {
      descriptionRef.current.textContent = description;
    }
  }, []);
  interface Color {
    color1: string;
    color2: string;
    color3: string;
  }

  const [color, setColor] = useState<Color>({
    color1: "#7f1d1d",
    color2: "#e72e2e",
    color3: "#fef2f2",
  });
  const changeTheme = (one: string, two: string, three: string) => {
    setColor({ color1: one, color2: two, color3: three });
  };
  const [title, setTitle] = useState<string>("Unitled Forms");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<
    {
      id: number;
      title: string;
      type: string;
      required: boolean;
      options?: Array<{ label: string; limit: number | null }>;
    }[]
  >([]);
  const [active, setActive] = useState<number | null>(null);
  const onActice = (id: number): void => {
    setActive(id);
  };

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const addLabel = (questionId: number): void => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [
                ...(question.options || []),
                {
                  label: `options ${
                    question.options ? question.options.length + 1 : 1
                  }`,
                  limit: null,
                },
              ],
            }
          : question
      )
    );
  };

  const updateLabel = (
    questionId: number,
    optionIndex: number,
    newLabel: string
  ): void => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options?.map((option, index) =>
                index === optionIndex ? { ...option, label: newLabel } : option
              ),
            }
          : question
      )
    );
  };

  const updateLimit = (
    questionId: number,
    optionIndex: number,
    newLimit: number | null
  ): void => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options?.map((option, index) =>
                index === optionIndex ? { ...option, limit: newLimit } : option
              ),
            }
          : question
      )
    );
  };

  const addQuesion = (): void => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        type: "text",
        required: false,
        options: [{ label: "options 1", limit: null }],
      },
    ]);
  };

  const addChangeType = (id: number, newType: string): void => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, type: newType } : question
      )
    );
  };

  const deleteFromById = (idToDel: number): void => {
    setQuestions(
      questions
        .filter((items) => items.id != idToDel)
        .map((item) =>
          item.id > idToDel ? { ...item, id: item.id - 1 } : item
        )
    );
  };

  const addChangeTitle = (id: number, newTitle: string): void => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title: newTitle } : q))
    );
  };
  const deleteChoiceById = (idToDel: number, ChoiceToDel: number) => {
    setQuestions((prev) =>
      prev.map((questions) =>
        questions.id === idToDel
          ? {
              ...questions,
              options: questions.options?.filter(
                (choice, index) => index != ChoiceToDel
              ),
            }
          : questions
      )
    );
  };
  const updateRequired = (id: number): void => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, required: !item.required } : item
      )
    );
  };

  return (
    <div>
      <NavBarInForm />
      <form>
        <div className="mx-auto px-10 rounded-lg max-w-[650px]">
          <div className="max-w-[520px] mt-10 flex justify-center mx-auto">
            <div
              ref={titleRef}
              onInput={(e: React.FormEvent<HTMLDivElement>) =>
                setTitle(e.currentTarget.textContent || "")
              }
              className={` font-medium max-w-[450px]  text-center text-[30px] px-4   
      focus:transition-all duration-300 focus:border-b-2 
      focus:border-solid focus:text-start focus:outline-none inline-block mb-6
       ${!title ? "placeholder" : ""}`}
              onFocus={(e) => {
                e.target.style.borderColor = color.color1;
                e.target.style.backgroundColor = color.color3;
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "transparent";
              }}
              style={{ transition: "all 0.3s ease" }}
              contentEditable="true"
              suppressContentEditableWarning={true}
              role="textbox"
              data-placeholder="Enter title"
            />
          </div>
          <div className="max-w-[520px] flex justify-center mx-auto">
            <div
              ref={descriptionRef}
              onInput={(e: React.FormEvent<HTMLDivElement>) =>
                setDescription(e.currentTarget.textContent || "")
              }
              className={`text-center text-[15px] px-4
               focus:border-b-2 focus:transition-all 
               duration-300 focus:border-b-2 focus:border-black
                focus:border-solid focus:outline-none mb-4 py-[3px]ฃ  ${
                  !description ? "placeholder" : ""
                }`}
              onFocus={(e) => {
                e.target.style.backgroundColor = color.color3;
              }}
              style={{ transition: "all 0.3s ease" }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
              contentEditable="true"
              suppressContentEditableWarning={true}
              role="textbox"
              aria-label="Form description"
              data-placeholder="Enter details or instructions for the form."
            />
          </div>
          {questions.map((items) => (
            <div
              key={items.id}
              onClick={() => onActice(items.id)}
              style={{
                zIndex: active === items.id ? 9999 : 0,
                position: "relative",
              }}
            >
              <Text
                deleteFromById={() => deleteFromById(items.id)}
                updateRequired={() => updateRequired(items.id)}
                deleteChoiceById={(ChoiceToDel: number) =>
                  deleteChoiceById(items.id, ChoiceToDel)
                }
                updateLimit={(optionsIndex: number, limit: number) =>
                  updateLimit(items.id, optionsIndex, limit)
                }
                updateLabel={(optionIndex: number, newLabel: string) =>
                  updateLabel(items.id, optionIndex, newLabel)
                }
                addLabel={() => addLabel(items.id)}
                optionsValue={items.options}
                addChangeType={(newType: string) =>
                  addChangeType(items.id, newType)
                }
                addChangeTitle={(newTitle: string) =>
                  addChangeTitle(items.id, newTitle)
                }
                color={color}
              />
            </div>
          ))}

          <div
            onClick={addQuesion}
            className="flex items-center gap-x-2 justify-center border-2 py-[22px] rounded-[7px] border-dashed text-[17px] cursor-pointer"
            style={{
              color: `#${color.color2}`,
              borderColor: `#${color.color2}`,
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            }}
          >
            <Image
              src="/Icon-form/4.png"
              width={25}
              height={25}
              quality={100}
              alt="question"
              className="h-[20px] w-[20px]"
            />
            <p>Add question</p>
          </div>
          {/* 
          <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            {JSON.stringify(questions, null, 2)}
          </div> */}
        </div>
      </form>
      <div>
        <div className="mt-4 flex gap-x-[10px] justify-center">
          <button
            style={{
              backgroundColor: "#FFB6C1", // สีพาสเทลชมพู
              color: "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => changeTheme("#FFB6C1", "#F8D7DA", "#D3A9B7")}
          >
            Theme 1
          </button>
          <button
            style={{
              backgroundColor: "#FFD700", // สีทอง
              color: "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => changeTheme("#FFD700", "#FFFACD", "#F0E68C")}
          >
            Theme 2
          </button>
          <button
            style={{
              backgroundColor: "#8A2BE2", // สีม่วง
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => changeTheme("#8A2BE2", "#9370DB", "#D8BFD8")}
          >
            Theme 3
          </button>
          <button
            style={{
              backgroundColor: "#00CED1", // สีฟ้า
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => changeTheme("#00CED1", "#AFEEEE", "#20B2AA")}
          >
            Theme 4
          </button>
          <button
            style={{
              backgroundColor: "#32CD32", // สีเขียวมรกต
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => changeTheme("#32CD32", "#98FB98", "#8FBC8F")}
          >
            Theme 5
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
