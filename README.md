
# ClubStats

This project was designed to allow for easy data analysis of the chat logs from the Computer Club at WMU's private chat room.

## Architecture Overview

This repository is only one of the three main pieces to make this project work. This project is broken down into three section. 

First, the primary method of data input, the `ccawmu` bot written in python. This bot will be used to sniff all events going through the matrix chatroom and forward them to this server. This bot will act as both data input for storing the messages in the graph database as well as a CLI for users to interact with the data.

Second, this server is where a majority of the data processing will be done. It will handle both inserting and retrieving data from the graph database. It was implemented in Typescript as a standalone server as I believed that the complexity that would be required to achieve these goals would be more than I desired to write in a small chatroom bot.

Finally, the Dgraph database itself. This is a database based off of the idea of nodes and edges. Because of this, the schema is very flexible and is much easier to append to than something like standard SQL. It also makes seeing relations between data very easy, which is one of the primary goals for this project.