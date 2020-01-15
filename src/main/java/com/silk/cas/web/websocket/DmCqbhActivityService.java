package com.silk.cas.web.websocket;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.silk.cas.service.dto.DmCqbhDTO;

@Controller
public class DmCqbhActivityService implements ApplicationListener<SessionDisconnectEvent> {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);

    private final SimpMessageSendingOperations messagingTemplate;

    public DmCqbhActivityService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/topic/activityDmCqbh")
    @SendTo("/topic/trackerDmCqbh")
    public DmCqbhDTO sendActivity(@Payload DmCqbhDTO dmCqbhDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        log.debug("Sending user tracking data {}", dmCqbhDTO);
        return dmCqbhDTO;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
    	DmCqbhDTO dmCqbhDTO = new DmCqbhDTO();
        messagingTemplate.convertAndSend("/topic/trackerDmCqbh", dmCqbhDTO);
    }
}
