import React, { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StatusBanner from '../components/status/StatusBanner';
import AvatarWithVoice from '../components/avatar/AvatarWithVoice';
import MessageList from '../components/chat/MessageList';
import InputBar from '../components/chat/InputBar';
import SignUpModal from '../components/subscription/SignUpModal';
import { useWallet } from '../hooks/useWallet';
import { useChat } from '../hooks/useChat';
import { useFloat } from '../hooks/useFloat';
import { useSubscription } from '../hooks/useSubscription';

const Eliza: React.FC = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  // Custom hooks
  const { wallet, connectWallet, disconnectWallet, getShortAddress } = useWallet();
  const { messages, inputValue, setInputValue, isTyping, userStatus, sendMessage } = useChat(wallet.address);
  const { shouldFloat, triggerFloat } = useFloat();
  const { isSignUpModalOpen, openSignUpModal, closeSignUpModal, handleSelectPlan } = useSubscription();

  const handleSendMessage = async () => {
    const success = await sendMessage();
    
    if (success) {
      // Trigger voice and float animations on successful message
      setIsVoiceActive(true);
      triggerFloat();
      
      // Stop voice animation after 3 seconds
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
  };

  return (
    <AppShell>
      <Header
        userStatus={userStatus}
        wallet={wallet}
        onConnectWallet={connectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        getShortAddress={getShortAddress}
      />

      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-0">
        <StatusBanner wallet={wallet} getShortAddress={getShortAddress} />

        <AvatarWithVoice shouldFloat={shouldFloat} isVoiceActive={isVoiceActive} />

        <div className="w-full max-w-2xl space-y-6">
          <MessageList messages={messages} isTyping={isTyping} />
          
          <InputBar
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            userStatus={userStatus}
            onOpenSignUp={openSignUpModal}
          />
        </div>
      </div>

      <Footer />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSelectPlan={handleSelectPlan}
      />
    </AppShell>
  );
};

export default Eliza;