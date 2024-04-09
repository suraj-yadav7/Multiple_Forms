import React, { useState } from 'react';
import './App.css'

const App = () => {

    // Initial options
    const [selectedOption, setSelectedOption] = useState('');

    //It Holds counts of number of questions filled by user
    const [filledCount, setFilledCount] = useState(0);
    // const [secondFilledCount, setSecondFilledCount] =useState(0)

    // Holds second from render value
    const [secondFormRender, setSecondFormRender] =useState(false)

    // Holds first form data
    const [formData, setFormData] = useState({
      name: '',
      profession: '',
      gender: '',
      natureDriving: '',
      location:'',
      licenseType:'',
      renewal:''
    });

    const [finalFormData, setFinalFormData]=useState(false)
  
    // Function to handle initial option change
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      // this below setState reset the it values, when user select option in the final review
      setFinalFormData(false)
      setFormData({
        name: '',
        profession: '',
        gender: '',
        natureDriving: '',
        location:'',
        licenseType:'',
        renewal:''
      })
      setSecondFormRender(false)
      setFilledCount(0)
    };
  
    // Each fields of first form data used for render in jsx
    const firstFormFields = [
      { name: 'name', label: 'Name', type:'text' },
      { name: 'profession', label: 'Profession' , type:'text'},
      { name: 'gender', label: 'Gender', type:'radio', options:['male','female'] },
      { name: 'natureDriving', label: 'Nature of Driving License', type:'radio', options:['Private', 'commerical'] },
      { name: 'typeLicense', label: 'Type of License', type:'radio', options:['Paper DL', 'Smart DL'] },
      {name:'location', label:'Location', type:"text"},
      {name:'licenseType', label:'License Type', type:"checkbox", options:['2Wheeler without gear','2Wheeler with gear','4Wheeler']},
      {name:'renewal', label:'Renewal', type:'radio', options:['OneYear','TwoYear','FiveYear']},
    ];

    const firstFormFi=[...firstFormFields].slice(0,5)
    const secondFormFi=[...firstFormFields].slice(5,firstFormFields.length)

    // Handle First Form Changes done by user
    const firstHandleChange = (event) => {
      const { name, value,type } = event.target;
      setFormData({ ...formData, [name]: value });
  
      // Check if the field for the current question is filled out for text type
      if(type==='text'){
        // it increment filled count when text field cross 2 charaters
        const isQuestionAnswered = value.trim().length>=3;
        const fieldName = name;
        
        // Check if the question was already answered before
        const wasQuestionAnswered = formData[fieldName].trim().length>=3;
        
        // Update filledCount only when answering a new question 
        if (!wasQuestionAnswered && isQuestionAnswered) {
          setFilledCount((prevCount) => prevCount + 1);
        } else if (wasQuestionAnswered && !isQuestionAnswered) {
          // decrase value filledCount if unanswering a previously answered question
          setFilledCount((prevCount) => prevCount - 1);
        }
      }
      else{
        const isQuestionAnswered = value;
        const fieldName = name;
        
        // Check if the question was already answered before
        const wasQuestionAnswered = formData[fieldName];
        
        if (!wasQuestionAnswered && isQuestionAnswered) {
          setFilledCount((prevCount) => prevCount + 1);
        } else if (wasQuestionAnswered && !isQuestionAnswered) {
          setFilledCount((prevCount) => prevCount - 1);
        }
      }

    };

    if(filledCount===5){
      setTimeout(()=>{
        setSecondFormRender(true)
      },1000)
    }
    
// Taking total question count for progress bar
  const totalQuestions = firstFormFields.length;

  // Progress bar percentage logic
  const progress = ((filledCount) / totalQuestions) * 100;

  // render second form in 1.2seconds after checking first form-> filledCount from above variable


 // Handling form data at submission
  const handleSubmit = (event) => {
    event.preventDefault();
    let arr=Object.entries(formData)
    setFinalFormData(arr)
    setSelectedOption('')
  };

  return (
  <>
    <div className='main'>
      {
        !selectedOption && (

          <div className='optionContainer'>
          <h2>Select Issue: </h2>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">-- Please select --</option>
            <option value="red">Sales</option>
            <option value="green">Document Pickup</option>
            <option value="blue">Document Dispatch</option>
            <option value="yellow">Document Return</option>
            <option value="purple">Payment</option>
          </select>
        </div>
        )

        }
      {selectedOption && !finalFormData  &&(
        <div className='entireFormContainer'>
          <div className='introHeading'>
          <h2>Let's Get Started</h2>
          <p>Add your details (as per your registered records) </p>
          </div>
          <form className="formContainer" onSubmit={handleSubmit}>
            {/* First form render */}
            {!secondFormRender && firstFormFi.map((field) => (
              <div class='firstForm' key={field.name}>
                <label className='labelName'>
                  {field.label}:
                  {field.type==="text" ?(
                    <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={firstHandleChange}
                    />
                  )
                  :(
                  field.options.map((option)=>(
                    <lable className="radioLabel" key={option}>
                      <input 
                      type="radio"
                      name={field.name}
                      value={option}
                      checked={formData[field.name]===option}
                      onChange={firstHandleChange}
                  />
                  {" "}{option.charAt(0).toUpperCase()+option.slice(1)}
                    </lable>
                  ))
            
                  )
                  }
                </label>
              </div>
            ))}
            {
              secondFormRender && (
              <div className='secondForm'>
                  {/* second form render when above conditon  is true*/}
                  {secondFormFi.map((field) => (
                  <div key={field.name}>
                    <label className='secondLabelName'>
                      {field.label}:
                      {field.type==="text" ?(
                        <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={firstHandleChange}
                        />
                      )
                      :(
                      field.options.map((option)=>(
                        <lable className='secondRadioLabel' key={option}>
                          <input 
                          type={field.type}
                          name={field.name}
                          value={option}
                          checked={formData[field.name]===option}
                          onChange={firstHandleChange}
                      />
                      {" "}{option.charAt(0).toUpperCase()+option.slice(1)}
                        </lable>
                      ))
                
                      )
                      }
                    </label>
                  </div>
                  ))}
                  {progress.toFixed() == 100 &&
                  <button className='btnSubmit' type="submit">Submit</button>
                  }
              </div>
              )
            }
          </form>
                <div className=' progressContainer'style={{ marginTop: '20px' }}>
                <progress className='progressbar' value={(filledCount)} max={totalQuestions}></progress>
                <span style={{ marginLeft: '10px' }}>{`${(filledCount)} / ${totalQuestions} questions answered`}</span>
                <p>Progress: {progress.toFixed()}%</p>
            </div>
        </div>
      )}
        
      <div className={`${finalFormData? `fromPreview`:"headingPreview"}`}>
        <h3>Preview of Details Entered</h3>
        <ul>
        {
          !selectedOption && finalFormData && finalFormData.map((elem,index)=>(
            <li key={index}>{elem[0].charAt(0).toUpperCase()+elem[0].slice(1)} : {elem[1].charAt(0).toUpperCase()+elem[1].slice(1)}</li>
          ))
        }
        </ul>
      </div>
    </div>
    </>
  )};

export default App;
