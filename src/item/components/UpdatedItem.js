import Button from "../../shared/components/FormElements/Button";
import React, {useState} from "react";

const UpdatedItem = (props) => {
  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState(props.item);
  const [itemType, setItemType] = useState(props.itemType);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.date);
  const [amount, setAmount] = useState(props.amount);
  const [location, setLocation] = useState(props.location);
  const [price, setPrice] = useState(props.price);
  const [image, setImage] = useState(props.image);
  
  function updateItem() {
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
  return (
    <div>
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
          <Button inverse disabled={loading} onClick={updateItem}>Update</Button>
        </form>
      </div>
    </div>
  );
}

export default UpdatedItem;
