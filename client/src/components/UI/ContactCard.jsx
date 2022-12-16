import { RemoveIcon } from "../../assests/RemoveIcon";

export const ContactCard = ({ index, name, email, phone, address }) => {
  return (
    <tr className="border-bottom">
      <td>
        <div className="p-2">
          <span>{1}</span>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img src="https://i.imgur.com/ZSkeqnd.jpg" width="40" className="rounded-circle" alt="" />
          <div className="d-flex flex-column ml-2">
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
          <span> {(address?.city, address?.zipcode)}</span>
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <i className="fa fa-phone text-danger"></i>
          <i className="fa fa-adjust text-danger"></i>
          <button className="btn btn-outline-danger">
            <RemoveIcon />
          </button>
          
        </div>
      </td>
    </tr>
  );
};
