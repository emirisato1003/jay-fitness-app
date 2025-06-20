import React, { useEffect, useState } from 'react';
import RelatedListTarget from './RelatedListTarget';
import RelatedListEquip from './RelatedListEquip';
import { fetchData, youtubeOptions } from '../../../utils/fetchData';
import { useOutletContext } from 'react-router';

export default function DetailRelatedList() {
    return <div>
        <RelatedListTarget />
        <RelatedListEquip />
    </div>;
}
