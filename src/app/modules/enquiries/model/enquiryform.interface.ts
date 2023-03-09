export interface CreateEnquiryFormInterface {
  title: string;
  content: string;
  topic: string;
  property: string;
}

export interface EnquiryModelInterface {
  title: string;
  sender: string;
  propertyOwner: string;
  senderEmail: string;
  content: string;
  property: string;
  topic: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
