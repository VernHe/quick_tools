import { useState, useEffect } from "react";
import { List, Button } from 'antd';
import VirtualList from 'rc-virtual-list';

// define a struct for phone number
interface PhoneNumber {
    phoneNumber?: string,
    link?: string,
}



// phone number list component
const PhoneNumberList: React.FC = () => {
    // phone number list state，
    const [phoneNumberList, setPhoneNumberList] = useState<PhoneNumber[]>([
        // default value
        {
            phoneNumber: "123456781",
            link:"http://www.baidu.com",
        },
        {
            phoneNumber: "123456782",
            link:"http://www.baidu.com",
        },
    ])

    useEffect(() => {
        fetch("http://localhost:8080/api/phone-number")
          .then((res) => res.json())
          .then((res) => {
            setPhoneNumberList(res.results);
          });
      }, []);



    return (
        <List>
            <VirtualList
                data={phoneNumberList}
                height={280}
                itemHeight={47}
                itemKey="phoneNumber"
            >
                {(item: PhoneNumber) => (
                    <List.Item
                        key={item.phoneNumber}
                        actions={[<Button type="link" onClick={(e) => {
                            chrome.tabs.create({
                                url: item.link,
                              });
                            console.log(e);console.log(item)
                        }}>View Code</Button>]}
                    >
                        <List.Item.Meta
                            title={item.phoneNumber}
                            description={item.link}
                        />
                        <div>Content</div>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
}

export default PhoneNumberList;