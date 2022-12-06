import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { Button, Input, notification } from "antd";
import React, { useEffect, useState } from "react";

export const Notify = (user) => {
    const [connection, setConnection] = useState(undefined);
    const [inputText, setInputText] = useState("");
  
    useEffect(() => {

      const setupConnectionAsync = async (connectionBuilder) => {
        await connectionBuilder.start();
        //await connectionBuilder.invoke("JoinRoom");
      }
      
      if(!connection) {
        const connectionBuilder = new HubConnectionBuilder()
        .withUrl("https://localhost:44347/hubs",{
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
          })
        //.withAutomaticReconnect()
        .build();

        connectionBuilder.on("ReceiveMessage", (message) => {
                      notification.open({
                        message: "New Notification",
                        description: message,
                      });
                    });
  
                    connectionBuilder.onclose(e => {
                        setConnection();
                      });
                

        try {
        connectionBuilder.start().then(() => {
            connectionBuilder.invoke("JoinRoom", {username: "test"})
        });
        } catch(e) {
            console.log(e);
        }
        //setupConnectionAsync(connectionBuilder);
        setConnection(connectionBuilder);
                }
    }, []);
  
    // useEffect(() => {
    //   if (connection) {
    //     connection
    //       .start()
    //       .then(() => {
    //         connection.on("ReceiveMessage", (message) => {
    //           notification.open({
    //             message: "New Notification",
    //             description: message,
    //           });
    //         });
    //       })
    //       .catch((error) => console.log(error));
    //   }
    // }, [connection]);
  
    const sendMessage = async () => {
      if (connection) await connection.send("SendMessage", inputText);
      setInputText("");
    };
  
    return (
      <>
        <Input
          value={inputText}
          onChange={(input) => {
            setInputText(input.target.value);
          }}
        />
        <Button onClick={sendMessage} type="primary">
          Send
        </Button>
      </>
    );
  };
  