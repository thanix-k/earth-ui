import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/registry/default/ui/message";

export default function MessageDemo() {
  return (
    <MessageGroup className="w-full max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Maya Patel</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Hi, can I move my 3pm cut to Friday?</BubbleContent>
          </Bubble>
          <MessageFooter>10:42 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>Friday at 3pm is open. Booked.</BubbleContent>
          </Bubble>
          <MessageFooter>10:44 AM</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
