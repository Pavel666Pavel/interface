import {
  Animation,
  Divider,
  DownOutlined,
  Flex,
  Gutter,
  Menu,
  Typography,
  UpOutlined,
} from '@ergolabs/ui-kit';
import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';

import { OptionsButton } from '../../common/OptionsButton/OptionsButton';
import { List } from '../../List/List';
import { Action } from '../common/Action';
import { Column } from '../common/Column';
import { BORDER_HEIGHT } from '../common/constants';
import { TableExpand } from '../common/Expand';
import { RowRenderer } from '../common/RowRenderer';
import { TableViewDetails } from '../TableViewDetails';
import { TableViewRow } from '../TableViewRow/TableViewRow';
import { TableViewRowRenderer } from '../TableViewRowRenderer/TableViewRowRenderer';

export interface TableViewContentProps<T> {
  readonly itemKey: T[keyof T];
  readonly items: T[];
  readonly maxHeight?: CSSProperties['maxHeight'];
  readonly itemHeight: number;
  readonly height?: CSSProperties['height'];
  readonly gap?: number;
  readonly padding?: Gutter;
  readonly columns: Column<any>[];
  readonly actions: Action<any>[];
  readonly actionsWidth?: number;
  readonly rowRenderer?: RowRenderer;
  readonly expand?: TableExpand<T>;
  readonly hoverable?: boolean;
}

export const TableViewContent: FC<TableViewContentProps<any>> = ({
  maxHeight,
  height,
  itemKey,
  items,
  gap,
  itemHeight,
  padding,
  columns,
  actions,
  actionsWidth,
  rowRenderer = TableViewRowRenderer,
  expand,
  hoverable,
}) => {
  const RowRenderer = rowRenderer;
  const expandConfig = expand;
  const Details = expandConfig?.component;

  return (
    <List
      items={items}
      maxHeight={maxHeight}
      height={height}
      gap={gap}
      expand={expandConfig}
      itemHeight={itemHeight}
      itemKey={itemKey}
    >
      {({
        item,
        height,
        expand,
        collapse,
        expanded,
        expandHeight,
        index,
        itemHeight,
      }) => (
        <RowRenderer
          height={height}
          padding={0}
          hoverable={hoverable || !!expandConfig}
        >
          <div
            onClick={() => {
              if (!expandConfig) {
                return;
              }
              if (expanded) {
                collapse();
              } else {
                expand();
              }
            }}
          >
            <TableViewRow height={itemHeight - BORDER_HEIGHT} padding={padding}>
              {columns.map((c, i) => (
                <TableViewRow.Column
                  key={i}
                  width={c.width}
                  minWidth={c.minWidth}
                  maxWidth={c.maxWidth}
                >
                  {c.children ? c.children(item) : null}
                </TableViewRow.Column>
              ))}
              {actions?.length ? (
                <TableViewRow.Column>
                  <Flex stretch align="center" justify="flex-end">
                    <OptionsButton size="middle" width={actionsWidth}>
                      {actions.map((a, i) => {
                        const Decorator = a.decorator;

                        return Decorator ? (
                          <Decorator item={item}>
                            <Menu.Item
                              key={i}
                              icon={a.icon}
                              onClick={() => a.onClick && a.onClick(item)}
                            >
                              {a.children}
                            </Menu.Item>
                          </Decorator>
                        ) : (
                          <Menu.Item
                            key={i}
                            icon={a.icon}
                            onClick={() => a.onClick && a.onClick(item)}
                          >
                            {a.children}
                          </Menu.Item>
                        );
                      })}
                    </OptionsButton>
                  </Flex>
                </TableViewRow.Column>
              ) : null}
              {expandConfig && (
                <TableViewRow.Column>
                  <Flex stretch align="center" justify="flex-end">
                    <Typography.Body>
                      {expanded ? <UpOutlined /> : <DownOutlined />}
                    </Typography.Body>
                  </Flex>
                </TableViewRow.Column>
              )}
            </TableViewRow>
          </div>
          {expanded && Details && (
            <>
              <Divider />
              <Animation.FadeIn duration={700}>
                <TableViewDetails height={expandHeight} padding={padding}>
                  <Details
                    collapse={collapse}
                    index={index}
                    expandContentHeight="100%"
                    item={item}
                  />
                </TableViewDetails>
              </Animation.FadeIn>
            </>
          )}
        </RowRenderer>
      )}
    </List>
  );
};
