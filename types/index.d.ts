export { MyInterface };

declare global {
  type NostrEvent = {
    id: string;
    pubkey: string;
    created_at: number;
    kind: number;
    tags: any[];
    content: string;
    sig: string;
  };

  type NostrFilter = {
    ids?: string[];
    kinds?: number[];
    authors?: string[];
    since?: number;
    until?: number;
    tags?: Record<string, string[]>;
  };

  interface Comment {
    id?: number;
    hash: string;
    owner: string;
    message: string;
    created_at: number;
    status: "draft" | "sending" | "send" | "published" | "spam";
  }

  interface UserProfile {
    firstName: string;
    lastName: string;
    displayName: string;
    userName: string;
    about: string;
    email: string;
    avatar: string;
  }
  type UserCerts = {
    pub: string;
    priv: string;
  };
  type UserRole = "NewComer" | "Verified" | "Owner";
}
