import React, { useEffect, useState } from 'react';
import { useInteractions } from '../contexts/InteractionContext';

export const InteractionTimeline = ({ connectionId }) => {
    const { interactions } = useInteractions(connectionId);

    return (
        <div className="mt-4 space-y-4">
            {interactions.map((interaction) => (
                <div key={interaction.id} className="flex items-start gap-4">
                    <div className="h-2 w-2 mt-2 bg-gray-400 rounded-full" />
                    <div>
                        <p className="text-sm font-medium">{interaction.interaction_type}</p>
                        <p className="text-sm text-gray-500">{interaction.notes}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}; 