import Button from "../../shared/components/FormElements/Button";
import React, {useState} from "react";
import { Link } from 'react-router-dom';

const NewItem = () => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState('');
  const [itemType, setItemType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  
  function createItem() {
    const data = {
      item: item,
      type_of_item: itemType,
      description: description,
      date: date,
      amount: amount,
      location: location,
      price: price,
      image: image,
    };

    const storedData = JSON.parse(localStorage.getItem("userData"));
    const token = storedData.token;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify(data),
    }

    setLoading(true);

    console.log('NewItem: 41');
    console.log(data);

    fetch('https://aqueous-eyrie-60226.herokuapp.com/inventory', requestOptions)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        //item successfyully created
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
        alert('Something went wrong, try again later');
      })
      .finally(() => setLoading(false)
      )
  }

  const redirecting = () => {
    <Link to="/itemlist">Update Iten</Link>

  }
  return (
    <React.Fragment>
      <div className="signUp">
        <form>
          <label>Item name:
          <input value={item} onChange={(e) => {setItem(e.target.value)}}/>
          </label>
          <label>type:
          <input value={itemType} onChange={(e) => {setItemType(e.target.value)}}/>
          </label>
          <label>description:
          <input value={description} onChange={(e) => {setDescription(e.target.value)}}/>
          </label>
          <label>date:
          <input type="date" value={date} onChange={(e) => {setDate(e.target.value)}}/>
          </label>
          <label>amount:
          <input type="number" value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
          </label>
          <label>location:
          <input value={location} onChange={(e) => {setLocation(e.target.value)}}/>
          </label>
          <label>price:
          <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
          </label>
          <label>image:
          <input type="url" value={image} onChange={(e) => {setImage(e.target.value)}}/>
          </label>
          <Link to="/items">
            <Button inverse disabled={loading} onClick={createItem}>make new</Button>
          </Link>
        </form>
      </div>
    </React.Fragment>
  );
}

export default NewItem;
