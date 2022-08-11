import React from 'react';
import CustomButtonGroup from '../components/button-group/button-group';
import CompanyAdminCard from '../components/company-admin-card/company-admin-card';
import ContactDetailsFormComponent from '../components/contact-details-form-component/contact-details-form-component';
import ItemCard from '../components/item-card/item-card';
import SideOver from '../components/side-over/side-over';

function testPage1() {
  return (
    <div>
      <CompanyAdminCard />
      {/* <ContactDetailsFormComponent /> */}
      <ItemCard warehouse='Warehouse A' quantity={200} item="Biscuit" />
      <CustomButtonGroup btnNames={['Button 1', 'Button 2', 'Button 3']} />
    </div>
  );
}

export default testPage1;
