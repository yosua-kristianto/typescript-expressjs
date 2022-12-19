import Customer from "../../model/entity/Customer";

export class CustomerControllerHandler {

  public createNewCustomer = async (
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    phone: string
  ): Promise<string> => {
    const customer = await Customer.create({
      "first_name": firstName,
      "last_name": lastName,
      "city": city,
      "country": country,
      "phone": phone
    });

    return customer.first_name +  " " + customer.last_name;
  }

}