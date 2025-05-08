import {tender} from "~/enums/tender";
export const tenderList = [
  {
    ...tender,
    id: 0,
    type: 0, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders; 3 => Abandoned tenders
    hadCollected: true,
  },
  {
    ...tender,
    id: 1,
    type: 1, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders
  },
  {
    ...tender,
    id: 2,
    type: 2, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders
  },
  {
    ...tender,
    id: 3,
    type: 3, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders
  },
  {
    ...tender,
    id: 4,
    type: 2, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders
  },
  {
    ...tender,
    id: 5,
    type: 2, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders
  },
]
