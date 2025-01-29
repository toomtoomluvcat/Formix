"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NavBarInForm from "../component/nav01";
import Text from "../component/forms/text01";

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
    color1: string | null;
    color2: string | null;
    color3: string | null;
    color4: string | null;
    color5: string | null;
    color6: string | null;
    color7: string | null;
    color8: string | null;
    color9: string | null;
    color10: string | null;
  }

  const [color, setColor] = useState<Color>({
    color1: "rgb(247, 248, 243)",
    color2: "rgb(48, 34, 68)",
    color3: "rgb(224, 83, 125)",
    color4: "rgb(77, 120, 231)",
    color5: "rgb(106, 165, 218)",
    color6: "rgb(28, 215, 147)",
    color7: "rgb(254, 216, 60)",
    color8: "rgb(255, 147, 86)",
    color9: "rgb(228, 228, 228)",
    color10: "rgb(58, 44, 77)",
  });

  const changeTheme = (
    one: string | null = color.color1,
    two: string | null = color.color2,
    three: string | null = color.color3,
    four: string | null = color.color4,
    five: string | null = color.color5,
    six: string | null = color.color6,
    seven: string | null = color.color7,
    eight: string | null = color.color8,
    nine: string | null = color.color9,
    ten: string | null = color.color10
  ) => {
    setColor({
      color1: one,
      color2: two,
      color3: three,
      color4: four,
      color5: five,
      color6: six,
      color7: seven,
      color8: eight,
      color9: nine,
      color10: ten,
    });
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
  const [removingId, setRemovingId] = useState<number | null>(null);
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
        id: prev.length >0? prev[prev.length-1].id+1 :1,
        title: "",
        type: "text",
        required: false,
        options: [{ label: "options 1", limit: null }],
      },
    ]);
    setActive(questions.length + 1);
  };

  const addChangeType = (id: number, newType: string): void => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, type: newType } : question
      )
    );
  };

  const deleteFromById = (idToDel: number): void => {
    setRemovingId(idToDel);
    setTimeout(() => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.filter(
          (item) => item.id !== idToDel
        );

        return updatedQuestions;
      });
      setRemovingId(null);
    }, 400);
  };

  const addChangeTitle = (id: number, newTitle: string): void => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, title: newTitle } : question
      )
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
    <div
      style={{ backgroundColor: `${color.color1}` }}
      className="overflow-hidden min-h-screen relative"
    >
      <NavBarInForm />
      <form className="relative md:mb-[50px] mb-[220px] z-40">
        <div className="mx-auto px-10 rounded-lg max-w-[650px]">
          <div className="max-w-[520px] mt-10 flex justify-center mx-auto">
            <div
              ref={titleRef}
              onInput={(e: React.FormEvent<HTMLDivElement>) =>
                setTitle(e.currentTarget.textContent || "")
              }
              className={` page-home font-medium max-w-[450px] font-press-gothic text-center text-[4em] px-4   
      focus:transition-all duration-300 focus:border-b-2 
      focus:border-solid focus:text-start focus:outline-none inline-block mb-2
       ${!title ? "placeholder" : ""}`}
              onFocus={(e) => {
                e.target.style.borderColor = color.color2 ?? "";
                e.target.style.backgroundColor = color.color9 ?? "";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "transparent";
              }}
              style={{
                transition: "all 0.3s ease",
                color: `${color.color2 ?? ""}`,
              }}
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
              className={`page-home text-center text-[0.9em] px-4
               focus:border-b-2 focus:transition-all 
               duration-300 focus:border-b-2 focus:border-black
                focus:border-solid focus:outline-none mb-12 py-[3px]   ${
                  !description ? "placeholder" : ""
                }`}
              onFocus={(e) => {
                e.target.style.backgroundColor = color.color9 ?? "";
                e.target.style.borderColor = color.color2 ?? "";
                ("");
              }}
              style={{ transition: "all 0.3s ease" }}
              onBlur={(e) => {
                e.target.style.borderColor = "transparent";
                e.target.style.backgroundColor = "transparent";
              }}
              contentEditable="true"
              suppressContentEditableWarning={true}
              role="textbox"
              aria-label="Form description"
              data-placeholder="Enter details or instructions for the form."
            />
          </div>
          {questions.map((item) => (
            <div
              key={item.id}
              onClick={() => onActice(item.id)}
              className={`question-item ${
                active === item.id ? "question-animate" : ""
              } ${removingId === item.id ? "question-remove" : ""}`}
              style={{
                zIndex: active === item.id ? 9999 : 0,
                position: "relative",
              }}
            >
              <Text
                requiredQuestion={item.required}
                typeQuestion={item.type}
                titleQuestion={item.title}
                deleteFromById={() => deleteFromById(item.id)}
                updateRequired={() => updateRequired(item.id)}
                deleteChoiceById={(ChoiceToDel: number) =>
                  deleteChoiceById(item.id, ChoiceToDel)
                }
                updateLimit={(optionsIndex: number, limit: number) =>
                  updateLimit(item.id, optionsIndex, limit)
                }
                updateLabel={(optionIndex: number, newLabel: string) =>
                  updateLabel(item.id, optionIndex, newLabel)
                }
                addLabel={() => addLabel(item.id)}
                optionsValue={item.options}
                addChangeType={(newType: string) =>
                  addChangeType(item.id, newType)
                }
                addChangeTitle={(newTitle: string) =>
                  addChangeTitle(item.id, newTitle)
                }
                color={color}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addQuesion}
            className="flex items-center w-full gap-x-2 justify-center py-[22px] rounded-[7px] text-[1.8em] cursor-pointer"
            style={{
              backgroundColor: `${color.color2}`,
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            }}
          >
            <p
              style={{
                color: "white",
                WebkitTextStroke: "3px black",
                paintOrder: "stroke fill",
                textShadow: "2px 3px 0px rgb(0, 0, 0)",
              }}
              className="font-press-gothic text-white"
            >
              +&nbsp;&nbsp;&nbsp;ADD QUESTION
            </p>
          </button>

          <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            {JSON.stringify(questions, null, 2)}
          </div>   
        </div>
      </form>
      <div>
        {/* <div className="mt-4 flex gap-x-[10px] justify-center">
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
              backgroundColor: "#32CD32", // สี
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
        </div> */}
      </div>
    </div>
  );
}

export default Form;
