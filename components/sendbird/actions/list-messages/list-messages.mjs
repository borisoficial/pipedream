import app from "../../sendbird.app.mjs";
import { ConfigurationError } from "@pipedream/platform";

export default {
  key: "sendbird-list-messages",
  name: "List messages",
  description: "Retrieves a list of past messages of a specific channel.",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    applicationId: {
      propDefinition: [
        app,
        "applicationId",
      ],
    },
    channelUrl: {
      propDefinition: [
        app,
        "channelUrl",
        (c) => ({
          applicationId: c.applicationId,
        }),
      ],
    },
    channelType: {
      propDefinition: [
        app,
        "channelType",
      ],
    },
    messageTs: {
      propDefinition: [
        app,
        "messageTs",
      ],
    },
    messageId: {
      propDefinition: [
        app,
        "messageId",
      ],
    },
    prevLimit: {
      propDefinition: [
        app,
        "prevLimit",
      ],
    },
    nextLimit: {
      propDefinition: [
        app,
        "nextLimit",
      ],
    },
    include: {
      propDefinition: [
        app,
        "include",
      ],
    },
    reverse: {
      propDefinition: [
        app,
        "reverse",
      ],
    },
    senderIds: {
      propDefinition: [
        app,
        "senderIds",
        (c) => ({
          applicationId: c.applicationId,
        }),
      ],
    },
    operatorFilter: {
      propDefinition: [
        app,
        "operatorFilter",
      ],
    },
    messageType: {
      propDefinition: [
        app,
        "messageType",
      ],
    },
    includingRemoved: {
      propDefinition: [
        app,
        "includingRemoved",
      ],
    },
    withSortedMetaArray: {
      propDefinition: [
        app,
        "withSortedMetaArray",
      ],
    },
  },
  async run({ $ }) {
    if (!this.messageId && !this.messageTs) {
      throw new ConfigurationError("Either `Message Timestamp` or `Message Id` must to be specified.");
    }
    const opts = {
      messageTs: this.messageTs,
      messageId: this.messageId,
      prevLimit: this.prevLimit,
      nextLimit: this.nextLimit,
      include: this.include,
      reverse: this.reverse,
      senderIds: this.senderIds,
      operatorFilter: this.operatorFilter,
      messageType: this.messageType,
      includingRemoved: this.includingRemoved,
      withSortedMetaArray: this.withSortedMetaArray,
    };
    const messages = await this.app.listMessages(
      this.applicationId,
      this.channelType,
      this.channelUrl,
      opts,
    );
    $.export("$summary", `Successfully fetched messages ${messages}`);
    return messages;
  },
};