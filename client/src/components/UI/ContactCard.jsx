import { EditIcon } from "../../assests/EditIcon";
import { RemoveIcon } from "../../assests/RemoveIcon";
import FormInput from "./FormInput";

export const ContactCard = ({ index, name, email, phone, address, img, deleteContact, id ,edit}) => {
  return (
    <>
      <tr className="border-bottom">
        <td>
          <div className="p-2">
            <span>{index}</span>
          </div>
        </td>
        <td>
          <div className="p-2 d-flex flex-row align-items-center mb-2">
            <img
              src={img ? img : "https://i.imgur.com/ZSkeqnd.jpg"}
              width="40"
              className="rounded-circle"
              alt=""
            />
            <div className="d-flex flex-column ms-2">
              <span className="d-block font-weight-bold">{name} </span>
              <small className="text-muted">email: {email}</small>
            </div>
          </div>
        </td>
        <td>
          <div className="p-2">
            <span className="font-weight-bold">{phone}</span>
          </div>
        </td>
        <td>
          <div className="p-2 d-flex flex-column">
            <span>{address?.street}</span>
            <span>
              {address?.city},{address?.zipcode}
            </span>
          </div>
        </td>
        <td>
          <div className="p-2 icons">
            <i className="fa fa-phone text-danger"></i>
            <i className="fa fa-adjust text-danger"></i>
            <button className="btn btn-outline-danger" onClick={() => deleteContact(id)}>
              <RemoveIcon />
            </button>
            <button className="btn btn-outline-warning" onClick={() => edit(id)}>
              <EditIcon />
            </button>
          </div>
        </td>
      </tr>
  
    </>
  );
};
