import { useState } from "react";

const messages = [
     "Learn React ⚛️",
     "Apply for jobs 💼",
     "Invest your new income 🤑",
];

function App() {
     return <Step />;
}

function Step() {
     const [step, setStep] = useState(1);
     const [isOpen, setIsOpen] = useState(true);

     function handlePrevious() {
          if (step > 1) {
               setStep((step) => step - 1);
          }
     }

     function handleNext() {
          if (step < 3) {
               setStep((step) => step + 1);
          }
     }

     function handleIsOpen() {
          setIsOpen((isOpen) => !isOpen);
     }

     return (
          <div>
               <button className="close" onClick={handleIsOpen}>
                    &times;
               </button>

               {isOpen && (
                    <div className="steps">
                         <div className="numbers">
                              <div className={step >= 1 ? "active" : ""}>
                                   1
                              </div>
                              <div className={step >= 2 ? "active" : ""}>
                                   2
                              </div>
                              <div className={step >= 3 ? "active" : ""}>
                                   3
                              </div>
                         </div>

                         <StepMessage step={step}>
                              {messages[step - 1]}
                              <div className="buttons">
                                   <Button
                                        bgColor={"#e7e7e7"}
                                        textColor={"#333"}
                                        onClick={() =>
                                             alert(
                                                  `learn how to ${
                                                       messages[step - 1]
                                                  }`
                                             )
                                        }
                                   >
                                        Learn How
                                   </Button>
                              </div>
                         </StepMessage>

                         <div className="buttons">
                              <Button
                                   onClick={handlePrevious}
                                   textColor={"#fff"}
                                   bgColor={"#7950f2"}
                              >
                                   <span>⏮</span> Previous
                              </Button>
                              <Button
                                   onClick={handleNext}
                                   textColor={"#fff"}
                                   bgColor={"#7950f2"}
                              >
                                   Next <span>⏭</span>
                              </Button>
                         </div>
                    </div>
               )}
          </div>
     );
}

function StepMessage({ step, children }) {
     return (
          <div className="message">
               <h3> Step {step}</h3>
               {children}
          </div>
     );
}

function Button({ textColor, bgColor, onClick, children }) {
     return (
          <button
               style={{
                    backgroundColor: bgColor,
                    color: textColor,
               }}
               onClick={onClick}
          >
               {children}
          </button>
     );
}

export default App;
