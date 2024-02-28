import { v4 as uuidv4 } from "uuid";
import images from "../constants/image";

const VisaCard = images.VisaCard;
const MasterCard = images.MasterCard;

const cardData = [
  {
    id: uuidv4(),
    holder: "Henry Clein",
    cardNum: "4356************",
    cardType: VisaCard,
    price: 30,
  },
  {
    id: uuidv4(),
    holder: "Jerry Henson",
    cardNum: "5102************",
    cardType: MasterCard,
    price: 25,
  },
  {
    id: uuidv4(),
    holder: "Davidson Tennant",
    cardNum: "2341************",
    cardType: MasterCard,
    price: 60,
  },
  {
    id: uuidv4(),
    holder: "Peter Selman",
    cardNum: "9017************",
    cardType: VisaCard,
    price: 100,
  },
  {
    id: uuidv4(),
    holder: "Rogers Codlington",
    cardNum: "8371************",
    cardType: VisaCard,
    price: 50,
  },
  {
    id: uuidv4(),
    holder: "Philip Jose",
    cardNum: "4490************",
    cardType: MasterCard,
    price: 70,
  },
  {
    id: uuidv4(),
    holder: "Sylvia Jake",
    cardNum: "7812************",
    cardType: MasterCard,
    price: 100,
  },
  {
    id: uuidv4(),
    holder: "Matthew Leibovich",
    cardNum: "6676************",
    cardType: VisaCard,
    price: 80,
  },
  {
    id: uuidv4(),
    holder: "Hannah  Mills",
    cardNum: "3611************",
    cardType: MasterCard,
    price: 120,
  },
  {
    id: uuidv4(),
    holder: "Nancy  Drew",
    cardNum: "3719************",
    cardType: VisaCard,
    price: 150,
  },
  {
    id: uuidv4(),
    holder: "Mercy Johnson",
    cardNum: "3812************",
    cardType: MasterCard,
    price: 96,
  },
  {
    id: uuidv4(),
    holder: "Chris Grey",
    cardNum: "8711************",
    cardType: MasterCard,
    price: 50,
  },
  {
    id: uuidv4(),
    holder: "Kimberly Saint",
    cardNum: "1962************",
    cardType: VisaCard,
    price: 25,
  },
  {
    id: uuidv4(),
    holder: "Felicia McCaleb",
    cardNum: "6786************",
    cardType: MasterCard,
    price: 30,
  },
];

export default cardData;
