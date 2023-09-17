import { useState, useEffect } from "react";
import { List, Button } from 'antd';
import VirtualList from 'rc-virtual-list';

async function copyContent(content: string) {
    try {
        await navigator.clipboard.writeText(content);
        console.log('Content copied to clipboard');
        /* Resolved - 文本被成功复制到剪贴板 */
    } catch (err) {
        console.error('Failed to copy: ', err);
        /* Rejected - 文本未被复制到剪贴板 */
    }
}

// define a struct for phone number
interface PhoneNumber {
    phone_number?: string,
    link?: string,
}

// phone number list component
const PhoneNumberList: React.FC = () => {
    // phone number list state，
    const [phoneNumberList, setPhoneNumberList] = useState<PhoneNumber[]>([
    ])

    useEffect(() => {
        let localStorageKey: "phone_number_list";

        // fetch phone number list from local cache first, if not exist, fetch from mock api
        // fetch phone number list from local cache, if exist, set data for phone number list and return
        if (localStorage.getItem(localStorageKey)) {
            setPhoneNumberList(JSON.parse(localStorage.getItem(localStorageKey) || "[]"));
            return;
        }

        // fetch phone number list from mock api
        fetch("https://64f33734edfa0459f6c6671d.mockapi.io/phone-number-list/phon_numbers")
            .then(res => res.json()) // parse response as JSON
            .then(
                (result) => {
                    setPhoneNumberList(result);
                    localStorage.setItem(localStorageKey, JSON.stringify(result));
                },
                (error) => {
                    console.log(error);
                }
            ) // set data for phone number list
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
                        key={item.phone_number}
                        actions={
                            [
                                <Button type="primary" onClick={(e) => {
                                    copyContent(item.phone_number);
                                }}>Copy</Button>,
                                <Button type="link" onClick={(e) => {
                                    chrome.tabs.create({
                                        url: item.link,
                                    });
                                    console.log(e); console.log(item)
                                }}>View Code</Button>,
                            ]
                        }
                    >
                        <List.Item.Meta
                            title={item.phone_number}
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