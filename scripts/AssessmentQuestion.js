
gRecordData = {
    Status: "NotStarted",
    AssessmentScore: "4",
    VisitedNumberOfPages: "0",
    LastVisitedPage: "", // UserSelectedOptionId will be used to jump to the unattempted question
    RecordTitle: "How Does Barbara Corcoran Pick Her Investments on Shark Tank?",
    LandingPageURL: "record2_landing.htm",
    QuestionSequence: "Numbers", // this can be used later if different display style is required
    OptionSequence: "LowerAlphabets", // this can be used later if different display style is required
    RandomizeQuestions: true,
    RandomizeOptions: true,
    Score:0,
    Questions: [
                    {
                        QuestionId: "1",
                        QuestionText: "How can you recognize an unsecured wireless network?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "The network name will tell you.",
                                         "IsCorrect": false,

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "The network icon will have a warning symbol.",
                                         "IsCorrect": true,
                                         "score": 2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "The network icon will have line through it.",
                                         "IsCorrect": false
                                     }

                        ],
                        IsAnswered:false,
                        CorrectFeedback: "That’s right.",
                        IncorrectFeedback: "​That’s not right. The network icon will have a warning symbol.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "2",
                        QuestionText: "How would you set up your connection so that it connects to a particular wireless network every time you’re in the area without requesting any manual intervention?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Click the connection and then click the Connect automatically check box.",
                                         "IsCorrect": true,                                        
                                         score: 2,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Right-click the connection and then click Connect automatically",
                                         "IsCorrect": false
                                        
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "You cannot set up a connection this way.",
                                         "IsCorrect": false


                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "That’s not right. You would click the connection and then click the Connect automatically check box.",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "3",
                        QuestionText: "Which of the following tasks should you not consider performing on a public-accessed secured network?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Check email for confirmation of a purchase.",
                                         "IsCorrect": false
                                        
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Check your checking account balance.",
                                         "IsCorrect": true,
                                         score:2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Search for available flights to a business conference.",
                                         "IsCorrect": false
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That’s not right. This is safe to do on a public-accessed network. You should not check your checking account balance on a public-accessed network.",
                        CorrectFeedback: "That’s right. Even though the connection is secure, this is still risky on a public-accessed network.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "4",
                        QuestionText: "Where is the Wireless Network Connection button located on the desktop?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "On the Start menu.",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "On the Windows Taskbar.",
                                         "IsCorrect": true
                                         ,
                                         score: 2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "On the Control Panel.",
                                         "IsCorrect": false,
                                         
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That’s not right. The Wireless Network Connection button is located on the Windows Taskbar.",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    }

    ]
}