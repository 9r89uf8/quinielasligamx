import React, {useEffect, useRef, useState} from 'react';
import {List, ListItem, Avatar, ListItemText, Button, Box, Typography, Snackbar, Alert, Paper, Badge} from '@mui/material';
import LikesIcon from "@mui/icons-material/Favorite";
import {alpha, styled} from "@mui/material/styles";


const PaperStyle = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    marginBottom: -50,
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)', // semi-transparent white
    backdropFilter: 'blur(10px)', // apply blur
    borderRadius: 10, // rounded corners
    border: `1px solid ${alpha('#ffffff', 0.2)}`, // optional: add a border for more defined edges
}));

const UserMessage = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    alignSelf: 'flex-end',
    color: 'black'
}));

const AssistantMessage = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: 'black',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    alignSelf: 'flex-start'
}));

const ResponseMessage = styled(Typography)(({ theme }) => ({
    backgroundColor: 'rgba(128, 128, 128, 0.5)', // gray with 50% opacity
    color: 'black',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginBottom: -5,
    marginLeft: 20,
    alignSelf: 'flex-start'
}));

function ConversationHistory({ conversationHistory, user }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversationHistory]);

    const getLastUserMessage = (currentIndex) => {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (conversationHistory[i].role === 'user') {
                return conversationHistory[i];
            }
        }
        return null;
    };


    return (
        <>
            {conversationHistory && conversationHistory.filter(message => ['user', 'assistant'].includes(message.role)).map((message, index) => {
                const isDifferentRole = index === 0 || conversationHistory[index - 1].role !== message.role;
                const isFirstAssistantMessage = message.role === 'assistant' && (isDifferentRole || index === 0);
                const lastUserMessage = isFirstAssistantMessage ? getLastUserMessage(index) : null;

                const hasNextTwoMessages = index + 1 < conversationHistory.length;
                const isNextMessageSameRole = hasNextTwoMessages && message.role === conversationHistory[index + 1].role;


                return message.role === 'user' ? (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 3 }}>
                        {/*{isDifferentRole && <Avatar src="/broken-image.jpg" sx={{ backgroundImage: 'linear-gradient(to right, #ffd60a, #ffc300)', width: 54, height: 54 }}/>}*/}
                        {message.image ? (
                            <img src={message.image} alt="user message" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', marginTop: 9 }} />
                        ) : (
                            <>
                                <Badge
                                    badgeContent={message.liked ? <><LikesIcon style={{color: 'red'}}/></> : null} // using Font Awesome icon, you can replace it with any other icon component
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <UserMessage key={index} style={{fontSize: 22}}>
                                        {message.content}
                                    </UserMessage>
                                </Badge>
                            </>

                        )}
                    </Box>
                ) : (


                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                            {lastUserMessage&&isNextMessageSameRole&&(
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Typography variant="body2" gutterBottom style={{margin: '2px auto -2px 20px'}}>
                                        replied to you
                                    </Typography>
                                    <ResponseMessage style={{fontSize: 22}}>
                                        {lastUserMessage.content}
                                    </ResponseMessage>
                                </Box>
                            )}

                            <Badge
                                badgeContent={message.liked ? <><LikesIcon style={{color: 'red', marginBottom: 15}}/></> : null} // using Font Awesome icon, you can replace it with any other icon component
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <AssistantMessage style={{fontSize: 22}}>
                                    {message.content}
                                </AssistantMessage>
                            </Badge>


                        </Box>

                )
            })}

            <div ref={messagesEndRef} />
        </>
    );
}

export default ConversationHistory;