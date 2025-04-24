import React, { Fragment, use, useEffect, useRef } from "react";
import MessageContent from "./MessageContent";
import { parseISO, differenceInMinutes } from "date-fns";
import RenderIf from "../RenderIf";
import MessageLike from "./MessageLike";
import { useSelector } from "react-redux";
import CONSTS from "../../constants/consts";
import MessageImage from "./MessageImage";
import { ClipLoader } from "react-spinners";
import { ThreeDot } from "react-loading-indicators";

const MessageList = React.memo(
  ({
    messages,
    isSendingSet,
    onLoadMessage,
    chatId,
    isLoadingMoreMessage,
    isOtherSendingMessage,
    chatPartner,
  }) => {
    const scrollToLastMessageRef = useRef(null);
    const onScroll = useRef(null);
    const DISTANCE_MINUTES = 25;
    const DISTANCE_CLOSE_MINUTES = 7;
    const currentUserId = useSelector((state) => state.profile.data.id);
    const prevScrollHeightRef = useRef(0);
    const prevScrollTopRef = useRef(0);

    const handleScroll = () => {
      if (onScroll.current.scrollTop === 0) {
        prevScrollHeightRef.current = onScroll.current.scrollHeight;
        prevScrollTopRef.current = onScroll.current.scrollTop;
        onLoadMessage();
      }
    };

    useEffect(() => {
      requestAnimationFrame(() => {
        console.log("scroll");
        scrollToLastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }, [chatId]);

    useEffect(() => {
      if (prevScrollHeightRef.current && onScroll.current) {
        const newScrollHeight = onScroll.current.scrollHeight;
        const diff = newScrollHeight - prevScrollHeightRef.current;
        onScroll.current.scrollTop += diff;

        prevScrollHeightRef.current = 0;
        prevScrollTopRef.current = 0;
      } else {
        requestAnimationFrame(() => {
          if (onScroll.current && onScroll.current.scrollTop !== 0) {
            scrollToLastMessageRef.current?.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
      }
    }, [messages]);

    const distanceInMinutes = (messageTime1, messageTime2) => {
      try {
        const messageTime1ISO = parseISO(messageTime1);
        const messageTime2ISO = parseISO(messageTime2);
        return Math.abs(differenceInMinutes(messageTime1ISO, messageTime2ISO));
      } catch (error) {
        return 0;
      }
    };

    const isOverMinutes = (minutes, messageTime1, messageTime2) => {
      try {
        if (distanceInMinutes(messageTime1, messageTime2) >= minutes) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    };

    const isClosePrevMessage = (index) => {
      const prevMessageTime = messages[index - 1]?.messageTimeDetail;
      const curMessageTime = messages[index]?.messageTimeDetail;
      if (!prevMessageTime) {
        return false;
      }
      if (
        isOverMinutes(DISTANCE_CLOSE_MINUTES, prevMessageTime, curMessageTime)
      ) {
        return false;
      }
      return true;
    };

    const isCloseNextMessage = (index) => {
      const curMessageTime = messages[index]?.messageTimeDetail;
      const nextMessageTime = messages[index + 1]?.messageTimeDetail;
      if (!nextMessageTime) {
        return false;
      }
      if (
        isOverMinutes(DISTANCE_CLOSE_MINUTES, curMessageTime, nextMessageTime)
      ) {
        return false;
      }
      return true;
    };

    return (
      <>
        <div
          className="flex-1 pt-2 px-3 overflow-scroll"
          ref={onScroll}
          onScroll={handleScroll}
        >
          <div className="flex justify-center">
            <ClipLoader color="#fff" loading={isLoadingMoreMessage} />
          </div>
          {messages?.map((item, index) => {
            const prevMessageTimeDetail =
              messages[index - 1]?.messageTimeDetail;
            const isLike = item.content.startsWith(CONSTS.PREFIX_LIKE);
            const isImg = item.content.startsWith(CONSTS.PREFIX_IMG);
            const isMe = currentUserId == messages[index].sender.id;
            const isPrevMessageIsMine =
              currentUserId == messages[index - 1]?.sender.id;
            const isNextMessageIsMine =
              currentUserId == messages[index + 1]?.sender.id;
            let isSending = false;
            if (isSendingSet.has(messages[index].id)) {
              isSending = true;
            }
            return (
              <div key={item.id}>
                <RenderIf
                  condition={
                    isOverMinutes(
                      DISTANCE_MINUTES,
                      prevMessageTimeDetail,
                      item.messageTimeDetail
                    ) || prevMessageTimeDetail == null
                  }
                >
                  <p className="text-gray-500 text-center text-[14px] py-1.5">
                    {messages[index].messageTime}
                  </p>
                </RenderIf>
                <RenderIf condition={isLike}>
                  <MessageLike
                    isSending={isSending}
                    isMe={isMe}
                    isLastMessage={index === messages.length - 1}
                  />
                </RenderIf>
                <RenderIf condition={!isLike && !isImg}>
                  <MessageContent
                    isOver30Minutes={isOverMinutes(
                      DISTANCE_MINUTES,
                      prevMessageTimeDetail,
                      item.messageTimeDetail
                    )}
                    isClosePrevMessage={isClosePrevMessage(index)}
                    isCloseNextMessage={isCloseNextMessage(index)}
                    distanceFromPrevMessage={distanceInMinutes(
                      prevMessageTimeDetail,
                      item.messageTimeDetail
                    )}
                    isPrevMessageIsMine={isPrevMessageIsMine}
                    isNextMessageIsMine={isNextMessageIsMine}
                    message={item}
                    isMe={isMe}
                    isSending={isSending}
                    isLastMessage={index === messages.length - 1}
                  />
                </RenderIf>
                <RenderIf condition={isImg}>
                  <MessageImage
                    isMe={isMe}
                    src={item.content.replace(CONSTS.PREFIX_IMG, "")}
                    isLastMessage={index === messages.length - 1}
                    isSending={isSending}
                  />
                </RenderIf>
              </div>
            );
          })}
          <div ref={scrollToLastMessageRef}></div>
        </div>
        <div className="relative">
          <RenderIf condition={isOtherSendingMessage}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-center px-2 py-0.5 gap-2 bg-[#242F3D] rounded-2xl">
              <img
                src={chatPartner.avatar ?? CONSTS.PATH_NO_AVATAR}
                className="rounded-full w-6 h-6 "
              />
              <ThreeDot
                style={{
                  fontSize: "7px",
                }}
                color="#fff"
              />
            </div>
          </RenderIf>
        </div>
      </>
    );
  }
);

export default MessageList;
