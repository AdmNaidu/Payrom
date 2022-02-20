import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
declare var jQuery: any;

@Component({
  selector: 'app-total-items',
  templateUrl: './total-items.component.html',
  styleUrls: ['./total-items.component.scss']
})
export class TotalItemsComponent implements OnInit {

  constructor(
    private app: AppManagerService
  ) {
    this.app.ShowReportDate = 'true';
  }

  isShow: boolean = false;
  // function dataTable() {
  public jsonData = [
    {
      "number": "1",
      "item": "ELECTRICAL CONTRACTORS",
      "item_code": "1731",
      "description": "Electricals contractors."
    },
    {
      "number": "2",
      "item": "MASONRY STONEWORK TILE SETTING PLASTERING",
      "item_code": "1740",
      "description": "These are the items of Masonry stonework."
    },
    {
      "number": "3",
      "item": " MOTOR FREIGHT CARRIERS AND TRUCKING LOCAL AND LONG",
      "item_code": "4214",
      "description": "These are the items of Motor freight carriers and trucking local and long."
    },
    {
      "number": "4",
      "item": "COURIER SERVICES AIR OR GROUND AND FREIGHT FORWARD",
      "item_code": "4215",
      "description": "These are the services provide for Courier services air or ground and freight forward."
    },
    {
      "number": "5",
      "item": "TRAVEL AGENCIES AND TOUR OPERATORS",
      "item_code": "4722",
      "description": "These are the services provide for Travel agencies and tour operators."
    },
    {
      "number": "6",
      "item": "TELECOMMUNICATIONS EQUIPMENT AND TELEPHONE SALES",
      "item_code": "4812",
      "description": "A long and thin pieces of potato that are fried and eaten hot."
    },
    {
      "number": "7",
      "item": "COMPUTER NETWORK AND INFORMATION SERVICES",
      "item_code": "5013",
      "description": "A drink or beverage is a liquid intended for human consumption."
    },
    {
      "number": "8",
      "item": "UTILITIES ELECTRIC GAS WATER AND SANITARY",
      "item_code": "5021",
      "description": "Snacks are a small portion of food generally eaten between meals."
    },
    {
      "number": "9",
      "item": "MOTOR VEHICLE SUPPLIES AND NEW PARTS",
      "item_code": "5045",
      "description": "A cereal is any grass cultivated (grown) for the edible components of its grain, composed of the endosperm, germ, and bran."
    },
    {
      "number": "10",
      "item": "OFFICE AND COMMERCIAL FURNITURE",
      "item_code": "5021",
      "description": "Food produced from organic farming methods and often certified organic according to organic farming standards."
    },
    {
      "number": "11",
      "item": "COMPUTERS COMPUTER PERIPHERAL EQUIPMENT SOFTWARE",
      "item_code": "5045",
      "description": "They are containers made of glass or pottery and typically having a lid, used especially for storing food or other liquids."
    },
    {
      "number": "12",
      "item": "METAL SERVICE CENTERS AND OFFICES",
      "item_code": "5051",
      "description": "Pulses are the crops harvested solely as dry grains used in food consumption."
    },
    {
      "number": "13",
      "item": "Oil & Spices & Sauces",
      "item_code": "1013",
      "description": "A spice is a plant extract primarily used for flavoring or coloring food.Cooking oil is plant, animal, or synthetic fat used in frying, baking, and other types of cooking."
    },
    {
      "number": "14",
      "item": "Baby Care",
      "item_code": "1014",
      "description": "Products used for taking care of a baby."
    },
    {
      "number": "15",
      "item": "Healthy & Beauty",
      "item_code": "1015",
      "description": "A beauty product: a cosmetic, an item designed to enhance one's beauty."
    },
    {
      "number": "16",
      "item": "House Hold",
      "item_code": "1016",
      "description": "A house and its occupants regarded as a unit."
    },
    {
      "number": "17",
      "item": "Pets",
      "item_code": "1017",
      "description": "A pet, or companion animal, is an animal kept primarily for a person's company or entertainment rather than as a working animal, livestock or a laboratory animal."
    },
    {
      "number": "18",
      "item": "Appliances & Kitchenware",
      "item_code": "1018",
      "description": "A device or piece of equipment designed to perform a specific task."
    },
    {
      "number": "19",
      "item": "Kids Toys",
      "item_code": "1019",
      "description": "A toy is an item that is used in play, especially one designed for such use. It is mainly intended for use by children."
    },
    {
      "number": "20",
      "item": "Mens Fashion",
      "item_code": "1020",
      "description": "Clothing that is designed for men to wear."
    },
    {
      "number": "21",
      "item": "Women's Fashion",
      "item_code": "1021",
      "description": "Clothing that is designed for women to wear."
    },
    {
      "number": "22",
      "item": "Shoes",
      "item_code": "1022",
      "description": "A shoe is an item of footwear intended to protect and comfort the human foot. Shoes are also used as an item of decoration and fashion."
    },
    {
      "number": "23",
      "item": "Jewelry & Accessories",
      "item_code": "1023",
      "description": "Jewellery or jewelry consists of decorative items worn for personal adornment, such as brooches, rings, necklaces, earrings, pendants, bracelets, and cufflinks."
    },
    {
      "number": "24",
      "item": "Electronics",
      "item_code": "1024",
      "description": "Electronics comprises the physics, engineering, technology and applications that deal with the emission, flow and control of electrons in vacuum and matter."
    },
    {
      "number": "25",
      "item": "Furniture",
      "item_code": "1025",
      "description": "Furniture refers to movable objects intended to support various human activities such as seating (e.g., chairs, stools, and sofas), eating (tables), and sleeping"
    },
    {
      "number": "26",
      "item": "Automotive & Car Care",
      "item_code": "1026",
      "description": "Automotive is  a self-contained motor or engine or something that has to do with automobiles such as cars."
    },
    {
      "number": "27",
      "item": "Computers & IT Accessories",
      "item_code": "1027",
      "description": "Devices added to a computer that performs an additional capability or feature."
    },
    {
      "number": "28",
      "item": "Household Chemicals",
      "item_code": "1028",
      "description": "Household chemicals are non-food chemicals that are commonly found and used in and around the average household."
    },
    {
      "number": "29",
      "item": "Tableware & Kitchenware",
      "item_code": "1029",
      "description": "Kitchenware are the tools, utensils, appliances, dishes, and cookware used in food preparation, or the serving of food."
    },
    {
      "number": "30",
      "item": "Flowers",
      "item_code": "1030",
      "description": "A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants"
    },
    {
      "number": "31",
      "item": "Garden Tools",
      "item_code": "1031",
      "description": "A garden tool is any one of many tools made for gardening and overlaps with the range of tools made for agriculture and horticulture."
    },
    {
      "number": "32",
      "item": "Hobbies & Leisure",
      "item_code": "1032",
      "description": "A hobby is an activity, interest, or pastime that is undertaken for pleasure or relaxation, done during one's own time."
    },
    {
      "number": "33",
      "item": "Pharmacy",
      "item_code": "1033",
      "description": "The science and art concerned with the preparation and standardization of drugs"
    },
    {
      "number": "34",
      "item": "Coffee",
      "item_code": "1034",
      "description": "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species."
    },
    {
      "number": "35",
      "item": "Dessert",
      "item_code": "1035",
      "description": "The sweet course eaten at the end of a meal"
    },
    {
      "number": "36",
      "item": "Hot Drinks",
      "item_code": "1036",
      "description": "It is a beverage made from the infusion or decoction of herbs, spices, or other plant material in hot water."
    },
    {
      "number": "37",
      "item": "IceCream",
      "item_code": "1037",
      "description": "Ice cream  is a sweetened frozen food typically eaten as a snack or dessert."
    }
  ];

  // $('#total_items_table').DataTable({
  //   data: jsonData,
  //   columns: [{
  //           data: "number",
  //           className: 'text-center',
  //           orderable: true,
  //           searchable: true
  //       },
  //       {
  //           data: "item",
  //           orderable: true,
  //           searchable: true
  //       },
  //       {
  //         data: "item_code",
  //         className: 'text-center',
  //         orderable: true,
  //         searchable: true
  //       },
  //       {
  //         data: "description",
  //         orderable: true,
  //         searchable: true
  //       }
  //     ],
  //     "bDestroy": true,
  //     "pageLength": 40
  // });

  // }

  // dataTable();



  ngOnInit(): void {
    this.loadScripts();
  }

  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_total_items').addClass("active");
    })(jQuery);
  }
  value1: string = '';
  value2: string = '';
  value3: string = '';
  value4: string = '';
  csvData: any[] = [];
  items: Array<any> = JSON.parse(localStorage.getItem('items') || '[]').length > 0 ? JSON.parse(localStorage.getItem('items') || '[]') : this.jsonData;








  addItem() {

    this.isShow = !this.isShow
    console.log(this.items);
    if (!this.isShow) {
      this.items.push({ number: this.items.length + 1, price: this.value1, item: this.value2, item_code: this.value3, description: this.value4 });
      localStorage.setItem('items', JSON.stringify(this.items));
      console.log(this.items);
    }

  }
  getVal(value: any) {


  }
  getVal2(value: any) {
    this.value2 = value;
    console.log(value);
  }
  getVal3(value: any) {
    this.value3 = value;
    console.log(value);
  }
  getVal4(value: any) {
    this.value4 = value;
    console.log(value);
  }


  downloadCSV() {
    this.csvData = [];
    if (this.items.length > 0) {
      this.items.map((csv: any) => {
        let Obj: any = {};
        Obj['no'] = csv.number;
        Obj['item'] = csv.item;
        Obj['itemcode'] = csv.item_code;
        Obj['description'] = csv.description;
        this.csvData = [...this.csvData, Obj];
      })
    }
    const options = {
      title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
      headers: ['no', 'item', 'itemcode', 'description']
    };


    new AngularCsv(this.csvData, 'total-items', options);
  }
}
