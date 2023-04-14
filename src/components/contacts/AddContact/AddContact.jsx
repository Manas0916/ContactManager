import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const AddContact = () => {

  let navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact : {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    groups : [],
    errorMessage: ''

  });


  let updateInput = (event) =>{
    setState({
      ...state,
      contact:{
        ...state.contact,
        [event.target.name] : event.target.value,
      }
    })
  }

  useEffect(() => {
    async function fetchData(){
      try {
        setState({...state, loading: true});
        let response = await ContactService.getGroups();
        setState({...state, loading: false, groups: response.data});
        // console.log(response.data);

      } catch (error) {
        setState({...state, loading: false, errorMessage: error.message});
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let submitForm = async (event)=>{
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if(response){
        navigate('/contacts/list', {replace: true});
      }
    } catch (error) {
      setState({...state, errorMessage: error.message});
      navigate('/contacts/add', {replace: false});
    }

  }

  // eslint-disable-next-line no-unused-vars
  let {loading, contact, groups, errorMessage} = state;
  // console.log(groups);

  return (
    <React.Fragment>
      {
        loading ? <Spinner/> :
        <>
          <section className='add-contact p-3'>
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-success fw-bold">Create Contact</p>
                  <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium assumenda, architecto doloribus mollitia, quo veniam velit rem perspiciatis saepe quam odio sequi quis vel quidem pariatur vero maiores? Ea, atque.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input type="text" name='name' value={contact.name} onChange={updateInput} required={true} placeholder='Name'className='form-control'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name='photo' value={contact.photo} onChange={updateInput} required={true}  className='form-control' placeholder='Photo URL'/>
                    </div>
                    <div className="mb-2">
                      <input type="number" name='mobile' value={contact.mobile} onChange={updateInput} required={true}  className='form-control' placeholder='Mobile'/>
                    </div>
                    <div className="mb-2">
                      <input type="email" name='email' value={contact.email} onChange={updateInput} required={true}  className='form-control' placeholder='Email'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name='company' value={contact.company} onChange={updateInput} required={true}  className='form-control' placeholder='Company'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name='title' value={contact.title} onChange={updateInput} required={true}  className='form-control' placeholder='Title'/>
                    </div>
                    <div className="mb-2">
                      <select id="" className='form-control' name='groupId' value={contact.groupId} onChange={updateInput} required={true} >
                        <option>Select a Group</option>
                        {
                          groups.length > 0 &&
                            groups.map(group =>{
                              return (
                                <option key={group.id} value={group.id}> {group.name} </option>
                              )
                            })
                        }
                      </select>
                    </div>
                    <div className="mb-2">
                      <input type="submit" className='btn btn-success' value='Create'/>
                      <Link to={"/contacts/list"} className='btn btn-dark ms-2'>Cancel</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    </React.Fragment>
  );
}

export default AddContact;
